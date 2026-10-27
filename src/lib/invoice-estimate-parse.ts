import type { InvoiceLineDetail, InvoiceLineItem } from "@/types/rdx/invoice";

export type ParsedEstimate = {
  title?: string;
  hourlyRateUsd?: number;
  usdBdtRate?: number;
  statedHours?: number;
  statedUsd?: number;
  statedBdt?: number;
  discountBdt?: number;
  discountUsd?: number;
  amountDueBdt?: number;
  lines: InvoiceLineItem[];
  warnings: string[];
};

type DetailDraft = {
  text: string;
  hours?: number;
  done?: boolean;
  note?: string;
};

type OpenSection = {
  kind: "service" | "info";
  description: string;
  headerHours?: number;
  details: DetailDraft[];
};

type PendingDetail = {
  text: string;
  indent: number;
  done?: boolean;
  note?: string;
  used: boolean;
};

const NUM = String.raw`\d+(?:\.\d+)?`;
const HOUR_UNIT = String.raw`(?:hours?|hrs?|hr|h)`;
const MIN_UNIT = String.raw`(?:minutes?|mins?|min|m)`;
const CLOCK = String.raw`(?:${NUM}\s*${HOUR_UNIT}(?:\s+${NUM}\s*${MIN_UNIT})?|${NUM}\s*${MIN_UNIT})`;
const MULT = String.raw`${NUM}\s*(?:${HOUR_UNIT}|${MIN_UNIT})?\s*[*x×]\s*${NUM}(?:\s*=\s*${NUM}\s*(?:${HOUR_UNIT}|${MIN_UNIT})?)?`;

function roundHours(value: number) {
  return Math.round(value * 100) / 100;
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function isSeparator(line: string) {
  return /^[-_=*]{3,}$/.test(line);
}

function isTotalLine(line: string) {
  return /^(total|subtotal|complete\s+development|grand\s+total)\b/i.test(line);
}

function isDiscountLine(line: string) {
  return /^(after\s+)?discount\b/i.test(line);
}

function unwrap(line: string) {
  return line
    .replace(/^\*{1,2}(.+)\*{1,2}$/, "$1")
    .replace(/^_(.+)_$/, "$1")
    .trim();
}

function unitToHours(value: number, unit?: string) {
  if (unit && /^m/i.test(unit)) return value / 60;
  return value;
}

function durationFromText(text: string): number | undefined {
  const mult = new RegExp(
    `(${NUM})\\s*(${HOUR_UNIT}|${MIN_UNIT})?\\s*[*x×]\\s*(${NUM})(?:\\s*=\\s*(${NUM})\\s*(${HOUR_UNIT}|${MIN_UNIT})?)?`,
    "gi"
  );
  let found: RegExpExecArray | null = null;
  let match: RegExpExecArray | null;
  while ((match = mult.exec(text))) found = match;

  if (found) {
    const times = Number(found[3]);
    if (found[4]) {
      return roundHours(unitToHours(Number(found[4]), found[5] || found[2]));
    }
    return roundHours(unitToHours(Number(found[1]), found[2]) * times);
  }

  const clock = text.match(
    new RegExp(
      `(${NUM})\\s*(${HOUR_UNIT})(?:\\s+(${NUM})\\s*(${MIN_UNIT}))?\\s*$`,
      "i"
    )
  );
  if (clock) {
    const extra = clock[3] ? Number(clock[3]) / 60 : 0;
    return roundHours(Number(clock[1]) + extra);
  }

  const minutes = text.match(new RegExp(`(${NUM})\\s*(${MIN_UNIT})\\s*$`, "i"));
  if (minutes) return roundHours(Number(minutes[1]) / 60);
  return undefined;
}

function isOnlyDuration(text: string) {
  return new RegExp(`^(?:${CLOCK}|${MULT})$`, "i").test(text.trim());
}

function splitTitleDuration(
  line: string
): { title: string; hours: number } | null {
  const match = line.match(
    /^(?:#{1,6}\s+)?(.+?)\s*(?:—|–|:|\s-\s)\s*(.+)$/
  );
  if (!match) return null;
  const rhs = match[2].trim();
  if (!isOnlyDuration(rhs)) return null;
  const hours = durationFromText(rhs);
  const title = match[1].replace(/^#{1,6}\s+/, "").trim();
  if (!title || hours === undefined || hours < 0) return null;
  return { title, hours };
}

function parseInvoiceMeta(line: string): {
  hourlyRateUsd?: number;
  usdBdtRate?: number;
  statedHours?: number;
  statedUsd?: number;
  statedBdt?: number;
} | null {
  const compact = line.replace(/,/g, "");
  const labeled = /^invoice\b/i.test(compact);
  const formula = compact.match(
    new RegExp(
      `(${NUM})\\s*(?:${HOUR_UNIT})?\\s*[*x×]\\s*\\$\\s*(${NUM})`,
      "i"
    )
  );
  if (!labeled && !formula) return null;

  const result: {
    hourlyRateUsd?: number;
    usdBdtRate?: number;
    statedHours?: number;
    statedUsd?: number;
    statedBdt?: number;
  } = {};

  if (formula) {
    result.statedHours = Number(formula[1]);
    result.hourlyRateUsd = Number(formula[2]);
  }

  const statedUsd = compact.match(/=\s*\$\s*(\d+(?:\.\d+)?)/);
  if (statedUsd) result.statedUsd = Number(statedUsd[1]);

  const fx = compact.match(
    /\$\s*(\d+(?:\.\d+)?)\s*[*x×]\s*(\d+(?:\.\d+)?)\s*=\s*(\d+(?:\.\d+)?)/
  );
  if (fx) {
    if (result.statedUsd === undefined) result.statedUsd = Number(fx[1]);
    result.usdBdtRate = Number(fx[2]);
    result.statedBdt = Number(fx[3]);
  }

  if (
    result.hourlyRateUsd === undefined &&
    result.usdBdtRate === undefined &&
    result.statedHours === undefined
  ) {
    return null;
  }

  return result;
}

function parseDiscount(line: string): {
  discountBdt?: number;
  discountUsd?: number;
  amountDueBdt?: number;
  statedBdt?: number;
} | null {
  if (!isDiscountLine(line)) return null;
  const compact = line.replace(/,/g, "");
  const after = compact.match(
    /discount\s*:\s*\$?\s*(\d+(?:\.\d+)?)\s*-\s*\$?\s*(\d+(?:\.\d+)?)\s*=\s*\$?\s*(\d+(?:\.\d+)?)/i
  );
  if (after) {
    const discount = Number(after[2]);
    const due = Number(after[3]);
    const subtotal = Number(after[1]);
    const usd = /\$/.test(line) && !/bdt/i.test(line);
    if (usd) return { discountUsd: discount };
    return { discountBdt: discount, amountDueBdt: due, statedBdt: subtotal };
  }

  const simple = compact.match(
    /discount\s*:\s*(\$\s*)?(\d+(?:\.\d+)?)\s*(bdt|usd)?/i
  );
  if (!simple) return null;
  const amount = Number(simple[2]);
  const usd = Boolean(simple[1]) || /^usd$/i.test(simple[3] ?? "");
  if (usd) return { discountUsd: amount };
  return { discountBdt: amount };
}

function parseDetailText(raw: string): {
  text: string;
  done?: boolean;
  note?: string;
} {
  let text = raw.trim();
  let done = false;
  let note: string | undefined;

  const afterMark = text.match(/^(.*?)(?:✅|✓|✔|☑)\s*(?:\(([^)]*)\))?\s*$/u);
  if (afterMark) {
    done = true;
    text = afterMark[1].trim();
    note = afterMark[2]?.trim() || undefined;
  } else if (/✅|✓|✔|☑/u.test(text)) {
    done = true;
    text = text.replace(/✅|✓|✔|☑/gu, "").replace(/\s+/g, " ").trim();
  }

  return { text, ...(done ? { done: true } : {}), ...(note ? { note } : {}) };
}

function parseBullet(text: string): { body: string } | null {
  const bullet = text.match(/^[-*•]\s+(.+)$/);
  const numbered = text.match(/^\d+[.)]\s+(.+)$/);
  const body = bullet?.[1] ?? numbered?.[1];
  if (!body) return null;
  return { body };
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

function isProbableTitle(line: string) {
  if (line.length > 80) return false;
  if (/[.!?]$/.test(line)) return false;
  if (/^#{1,6}\s+/.test(line)) return false;
  const cleaned = line.replace(/:$/, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 8;
}

function formatHours(hours: number) {
  return Number.isInteger(hours) ? String(hours) : String(roundHours(hours));
}

function toLineItems(
  sections: OpenSection[],
  hourlyRateUsd: number | undefined,
  warnings: string[]
): InvoiceLineItem[] {
  return sections.map((section) => {
    const childHours = roundHours(
      section.details.reduce((sum, detail) => sum + (detail.hours ?? 0), 0)
    );
    const details: InvoiceLineDetail[] | undefined =
      section.details.length > 0
        ? section.details.map((detail) => ({
            text: detail.text,
            ...(detail.done ? { done: true } : {}),
            ...(detail.note ? { note: detail.note } : {}),
          }))
        : undefined;

    let hours: number | undefined;
    if (childHours > 0) {
      hours = childHours;
      if (
        section.headerHours !== undefined &&
        Math.abs(section.headerHours - childHours) > 0.05
      ) {
        warnings.push(
          `${section.description}: heading says ${formatHours(section.headerHours)} hrs, tasks add up to ${formatHours(childHours)} hrs. Using the tasks.`
        );
      }
    } else if (section.headerHours !== undefined && section.headerHours > 0) {
      hours = section.headerHours;
    }

    if (section.kind === "info" || hours === undefined) {
      return {
        description: section.description,
        kind: "info" as const,
        amountUsd: 0,
        details,
      };
    }

    const unitRateUsd =
      hourlyRateUsd && hourlyRateUsd > 0 ? hourlyRateUsd : undefined;
    const amountUsd =
      unitRateUsd !== undefined ? roundMoney(hours * unitRateUsd) : 0;

    return {
      description: section.description,
      quantity: hours,
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
  let pending: PendingDetail | null = null;
  let title: string | undefined;
  let hourlyRateUsd: number | undefined;
  let usdBdtRate: number | undefined;
  let statedHours: number | undefined;
  let statedUsd: number | undefined;
  let statedBdt: number | undefined;
  let discountBdt: number | undefined;
  let discountUsd: number | undefined;
  let amountDueBdt: number | undefined;
  let billingClosed = false;

  function flushPending() {
    if (!current || !pending) {
      pending = null;
      return;
    }
    if (!pending.used && pending.text) {
      current.details.push({
        text: pending.text,
        ...(pending.done ? { done: true } : {}),
        ...(pending.note ? { note: pending.note } : {}),
      });
    }
    pending = null;
  }

  function makeSection(description: string, headerHours?: number) {
    flushPending();
    const info = headerHours === 0 || isInfoHeader(description);
    const section: OpenSection = {
      kind: info ? "info" : "service",
      description,
      headerHours: headerHours && headerHours > 0 ? headerHours : undefined,
      details: [],
    };
    sections.push(section);
    return section;
  }

  const rows = raw.replace(/\r\n/g, "\n").split("\n");

  for (const row of rows) {
    const indent = row.match(/^\s*/)?.[0].length ?? 0;
    const line = unwrap(row.trim());
    if (!line || isSeparator(line)) continue;

    const meta = parseInvoiceMeta(line);
    if (meta) {
      flushPending();
      if (meta.hourlyRateUsd !== undefined) hourlyRateUsd = meta.hourlyRateUsd;
      if (meta.usdBdtRate !== undefined) usdBdtRate = meta.usdBdtRate;
      if (meta.statedHours !== undefined) {
        if (
          statedHours !== undefined &&
          Math.abs(statedHours - meta.statedHours) > 0.05
        ) {
          warnings.push(
            `Total says ${formatHours(statedHours)} hrs and the invoice says ${formatHours(meta.statedHours)} hrs.`
          );
        }
        statedHours ??= meta.statedHours;
      }
      if (meta.statedUsd !== undefined) statedUsd = meta.statedUsd;
      if (meta.statedBdt !== undefined) statedBdt = meta.statedBdt;
      billingClosed = true;
      continue;
    }

    const discount = isDiscountLine(line) ? parseDiscount(line) : null;
    if (discount) {
      flushPending();
      if (discount.discountBdt !== undefined) discountBdt = discount.discountBdt;
      if (discount.discountUsd !== undefined) discountUsd = discount.discountUsd;
      if (discount.amountDueBdt !== undefined) amountDueBdt = discount.amountDueBdt;
      if (discount.statedBdt !== undefined && statedBdt === undefined) {
        statedBdt = discount.statedBdt;
      }
      billingClosed = true;
      continue;
    }

    if (isTotalLine(line)) {
      flushPending();
      const hours = durationFromText(line);
      if (hours !== undefined) statedHours = hours;
      billingClosed = true;
      continue;
    }

    const bullet = parseBullet(line);
    if (bullet) {
      const detail = parseDetailText(bullet.body);
      if (!detail.text) continue;
      if (billingClosed) {
        warnings.push(`Ignored: ${detail.text}`);
        continue;
      }
      if (!current) {
        warnings.push(`Detail without a section: ${detail.text}`);
        continue;
      }
      const hours = durationFromText(detail.text);
      if (pending && indent > pending.indent) {
        pending.used = true;
        current.details.push({
          text: `${pending.text} — ${detail.text}`,
          ...(hours !== undefined && hours > 0 ? { hours } : {}),
          ...(detail.done ? { done: true } : {}),
          ...(detail.note ? { note: detail.note } : {}),
        });
        continue;
      }
      flushPending();
      if (hours === undefined) {
        pending = {
          text: detail.text,
          indent,
          done: detail.done,
          note: detail.note,
          used: false,
        };
        continue;
      }
      current.details.push({
        text: detail.text,
        hours,
        ...(detail.done ? { done: true } : {}),
        ...(detail.note ? { note: detail.note } : {}),
      });
      continue;
    }

    if (billingClosed) {
      const late = splitTitleDuration(line);
      if (late && late.hours > 0) {
        warnings.push(
          `${late.title} (${formatHours(late.hours)} ${late.hours === 1 ? "hr" : "hrs"}) is below the total, so it was not billed. Move it above the total to include it.`
        );
      } else if (!isProbableTitle(line)) {
        warnings.push(`Ignored: ${line}`);
      }
      continue;
    }

    const hashed = /^#{1,6}\s+/.test(line);
    const heading = splitTitleDuration(line);
    if (hashed || heading) {
      const description = heading?.title
        ?? line.replace(/^#{1,6}\s+/, "").trim();
      if (description) current = makeSection(description, heading?.hours);
      continue;
    }

    if (isInfoHeader(line)) {
      current = makeSection(normalizeInfoTitle(line), 0);
      continue;
    }

    if (!title && sections.length === 0 && isProbableTitle(line)) {
      title = line.replace(/:$/, "").trim();
      continue;
    }

    warnings.push(`Ignored: ${line}`);
  }

  flushPending();

  const lines = toLineItems(sections, hourlyRateUsd, warnings);
  const summedHours = roundHours(
    lines.reduce((sum, item) => {
      if (item.kind === "info" || item.unit !== "hours") return sum;
      return sum + (item.quantity ?? 0);
    }, 0)
  );

  if (
    statedHours !== undefined &&
    summedHours > 0 &&
    Math.abs(statedHours - summedHours) > 0.05
  ) {
    warnings.push(
      `Stated hours (${formatHours(statedHours)}) differ from line hours (${formatHours(summedHours)}).`
    );
  }

  if (
    statedUsd !== undefined &&
    statedHours !== undefined &&
    hourlyRateUsd !== undefined &&
    Math.abs(statedHours * hourlyRateUsd - statedUsd) > 0.5
  ) {
    warnings.push(
      `Invoice writes $${statedUsd}, while ${formatHours(statedHours)} × $${hourlyRateUsd} is $${roundMoney(statedHours * hourlyRateUsd)}. Line hours are billed.`
    );
  }

  if (
    statedBdt !== undefined &&
    statedUsd !== undefined &&
    usdBdtRate !== undefined &&
    Math.abs(Math.round(statedUsd * usdBdtRate) - statedBdt) > 1
  ) {
    warnings.push(
      `BDT ${statedBdt.toLocaleString("en-US")} does not match $${statedUsd} × ${usdBdtRate}.`
    );
  }

  return {
    title,
    hourlyRateUsd,
    usdBdtRate,
    statedHours,
    statedUsd,
    statedBdt,
    discountBdt,
    discountUsd,
    amountDueBdt,
    lines,
    warnings,
  };
}
