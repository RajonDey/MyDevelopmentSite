import type { InvoiceLineDetail, InvoiceLineItem } from "@/types/rdx/invoice";

export type ParsedEstimate = {
  title?: string;
  hourlyRateUsd?: number;
  usdBdtRate?: number;
  amountBdt?: number;
  statedHours?: number;
  lines: InvoiceLineItem[];
  warnings: string[];
};

type OpenSection = {
  kind: "service" | "info";
  description: string;
  hours?: number;
  details: InvoiceLineDetail[];
};

const HOURS_TOKEN = String.raw`(\d+(?:\.\d+)?)\s*(?:hrs?|hours?)\b`;

function isSeparator(line: string) {
  return /^[-_=*]{3,}$/.test(line);
}

function isTotalLine(line: string) {
  return /^(total|subtotal|complete\s+development|grand\s+total)\b/i.test(line);
}

function hoursFromLine(line: string): number | undefined {
  const match = line.match(new RegExp(HOURS_TOKEN, "i"));
  if (!match) return undefined;
  const hours = Number(match[1]);
  return Number.isFinite(hours) ? hours : undefined;
}

function parseInvoiceMeta(line: string): {
  hourlyRateUsd?: number;
  usdBdtRate?: number;
  amountBdt?: number;
  hours?: number;
} | null {
  const looksLikeInvoice =
    /^invoice\s*:/i.test(line) ||
    (/\d+\s*\*\s*\$\d/.test(line) && /\*/.test(line));
  if (!looksLikeInvoice) return null;

  const result: {
    hourlyRateUsd?: number;
    usdBdtRate?: number;
    amountBdt?: number;
    hours?: number;
  } = {};

  const hourly = line.match(/(\d+(?:\.\d+)?)\s*\*\s*\$(\d+(?:\.\d+)?)/);
  if (hourly) {
    result.hours = Number(hourly[1]);
    result.hourlyRateUsd = Number(hourly[2]);
  }

  const fx = line.match(
    /\$(\d+(?:\.\d+)?)\s*\*\s*(\d+(?:\.\d+)?)\s*=\s*(\d+(?:\.\d+)?)/
  );
  if (fx) {
    result.usdBdtRate = Number(fx[2]);
    result.amountBdt = Number(fx[3]);
  }

  if (
    result.hourlyRateUsd === undefined &&
    result.usdBdtRate === undefined &&
    result.hours === undefined
  ) {
    return null;
  }

  return result;
}

function parseHeadingWithHours(
  line: string
): { title: string; hours: number } | null {
  const patterns = [
    new RegExp(String.raw`^#{1,6}\s+(.+?)\s*[—–-]\s*${HOURS_TOKEN}\s*$`, "i"),
    new RegExp(String.raw`^(.+?)\s+[—–]\s*${HOURS_TOKEN}\s*$`, "i"),
    new RegExp(String.raw`^(.+?)\s+-\s+${HOURS_TOKEN}\s*$`, "i"),
    new RegExp(String.raw`^(.+?):\s*${HOURS_TOKEN}\s*$`, "i"),
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (!match) continue;
    const title = match[1].replace(/^#{1,6}\s+/, "").trim();
    const hours = Number(match[2]);
    if (!title || !Number.isFinite(hours) || hours < 0) continue;
    return { title, hours };
  }

  return null;
}

function isInfoHeader(line: string) {
  return /no additional\s+hours?/i.test(line);
}

function normalizeInfoTitle(line: string) {
  const labeled = line.match(/^(.+?):\s*(.+)$/);
  if (labeled && /no additional\s+hours?/i.test(labeled[2])) {
    return `${labeled[1].trim()} — no additional hours`;
  }
  return line.trim();
}

function parseDetailText(raw: string): InvoiceLineDetail {
  let text = raw.trim();
  let done = false;
  let note: string | undefined;

  const afterMark = text.match(
    /^(.*?)(?:✅|✓|✔|☑)\s*(?:\(([^)]*)\))?\s*$/u
  );
  if (afterMark) {
    done = true;
    text = afterMark[1].trim();
    note = afterMark[2]?.trim() || undefined;
  } else if (/✅|✓|✔|☑/u.test(text)) {
    done = true;
    text = text.replace(/✅|✓|✔|☑/gu, "").replace(/\s+/g, " ").trim();
  }

  return {
    text,
    ...(done ? { done: true } : {}),
    ...(note ? { note } : {}),
  };
}

function parseBulletLine(line: string): InvoiceLineDetail | null {
  const bullet = line.match(/^[-*•]\s+(.+)$/);
  const numbered = line.match(/^\d+[.)]\s+(.+)$/);
  const body = bullet?.[1] ?? numbered?.[1];
  if (!body) return null;
  return parseDetailText(body);
}

function isProbableTitle(line: string) {
  if (line.length > 80) return false;
  if (/[.!?]$/.test(line)) return false;
  const cleaned = line.replace(/:$/, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 8;
}

function toLineItems(
  sections: OpenSection[],
  hourlyRateUsd?: number
): InvoiceLineItem[] {
  return sections.map((section) => {
    const details =
      section.details.length > 0 ? section.details : undefined;

    if (section.kind === "info" || section.hours === 0) {
      return {
        description: section.description,
        kind: "info" as const,
        amountUsd: 0,
        details,
      };
    }

    const quantity = section.hours;
    const unitRateUsd =
      hourlyRateUsd && hourlyRateUsd > 0 ? hourlyRateUsd : undefined;
    const amountUsd =
      quantity !== undefined && unitRateUsd !== undefined
        ? quantity * unitRateUsd
        : 0;

    return {
      description: section.description,
      quantity,
      unit: "hours" as const,
      unitRateUsd,
      amountUsd,
      details,
    };
  });
}

export function parseInvoiceEstimate(raw: string): ParsedEstimate {
  const warnings: string[] = [];
  const sections: OpenSection[] = [];
  let current: OpenSection | null = null;
  let title: string | undefined;
  let hourlyRateUsd: number | undefined;
  let usdBdtRate: number | undefined;
  let amountBdt: number | undefined;
  let statedHours: number | undefined;

  const rows = raw.replace(/\r\n/g, "\n").split("\n");

  for (const row of rows) {
    const line = row.trim();
    if (!line || isSeparator(line)) continue;

    const meta = parseInvoiceMeta(line);
    if (meta) {
      if (meta.hourlyRateUsd !== undefined) hourlyRateUsd = meta.hourlyRateUsd;
      if (meta.usdBdtRate !== undefined) usdBdtRate = meta.usdBdtRate;
      if (meta.amountBdt !== undefined) amountBdt = meta.amountBdt;
      if (meta.hours !== undefined) statedHours = meta.hours;
      continue;
    }

    if (isTotalLine(line)) {
      const hours = hoursFromLine(line);
      if (hours !== undefined) statedHours = hours;
      continue;
    }

    const heading = parseHeadingWithHours(line);
    if (heading) {
      current = {
        kind: heading.hours === 0 ? "info" : "service",
        description: heading.title,
        hours: heading.hours === 0 ? undefined : heading.hours,
        details: [],
      };
      sections.push(current);
      continue;
    }

    if (isInfoHeader(line)) {
      current = {
        kind: "info",
        description: normalizeInfoTitle(line),
        details: [],
      };
      sections.push(current);
      continue;
    }

    const detail = parseBulletLine(line);
    if (detail) {
      if (!current) {
        warnings.push(`Detail without a section: ${detail.text}`);
        continue;
      }
      if (!detail.text) continue;
      current.details.push(detail);
      continue;
    }

    if (!title && sections.length === 0 && isProbableTitle(line)) {
      title = line.replace(/:$/, "").trim();
      continue;
    }

    warnings.push(`Ignored: ${line}`);
  }

  const lines = toLineItems(sections, hourlyRateUsd);
  const summedHours = lines.reduce((sum, item) => {
    if (item.kind === "info" || item.unit !== "hours") return sum;
    return sum + (item.quantity ?? 0);
  }, 0);

  if (
    statedHours !== undefined &&
    summedHours > 0 &&
    Math.abs(statedHours - summedHours) > 0.05
  ) {
    warnings.push(
      `Stated hours (${statedHours}) differ from line hours (${summedHours}).`
    );
  }

  return {
    title,
    hourlyRateUsd,
    usdBdtRate,
    amountBdt,
    statedHours,
    lines,
    warnings,
  };
}
