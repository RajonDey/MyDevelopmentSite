import type {
  InvoiceLineDetail,
  InvoiceLineItem,
  InvoiceLineItemKind,
  InvoiceLineItemUnit,
} from "@/types/rdx/invoice";

export type LineDetailDraft = {
  key: string;
  text: string;
  done: boolean;
  note: string;
};

export type LineItemDraft = {
  key: string;
  kind: InvoiceLineItemKind;
  description: string;
  quantity: string;
  unit: InvoiceLineItemUnit | "";
  unitRateUsd: string;
  amountUsd: string;
  details: LineDetailDraft[];
};

export function lineItemKey() {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function detailKey() {
  return `detail-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyDetail(): LineDetailDraft {
  return { key: detailKey(), text: "", done: false, note: "" };
}

export function emptyLineItem(): LineItemDraft {
  return {
    key: lineItemKey(),
    kind: "service",
    description: "",
    quantity: "",
    unit: "",
    unitRateUsd: "",
    amountUsd: "",
    details: [],
  };
}

export function lineItemToDraft(item: InvoiceLineItem): LineItemDraft {
  return {
    key: lineItemKey(),
    kind: item.kind === "info" ? "info" : "service",
    description: item.description,
    quantity: item.quantity !== undefined ? String(item.quantity) : "",
    unit: (item.unit ?? "") as InvoiceLineItemUnit | "",
    unitRateUsd: item.unitRateUsd !== undefined ? String(item.unitRateUsd) : "",
    amountUsd: item.kind === "info" ? "" : String(item.amountUsd),
    details: (item.details ?? []).map((detail) => ({
      key: detailKey(),
      text: detail.text,
      done: detail.done === true,
      note: detail.note ?? "",
    })),
  };
}

export function inferSharedHourlyRate(items: InvoiceLineItem[]): string {
  const rates = items
    .filter(
      (item) =>
        item.kind !== "info" &&
        item.unit === "hours" &&
        item.unitRateUsd !== undefined
    )
    .map((item) => item.unitRateUsd as number);
  if (rates.length === 0) return "";
  const first = rates[0];
  return rates.every((rate) => rate === first) ? String(first) : "";
}

function parseDetails(details: LineDetailDraft[]): InvoiceLineDetail[] | undefined {
  const parsed: InvoiceLineDetail[] = [];
  for (const detail of details) {
    const text = detail.text.trim();
    if (!text) continue;
    parsed.push({
      text,
      ...(detail.done ? { done: true } : {}),
      ...(detail.note.trim() ? { note: detail.note.trim() } : {}),
    });
  }
  return parsed.length > 0 ? parsed : undefined;
}

export function parseLineItemDraft(
  row: LineItemDraft,
  defaultHourlyRate?: string
): InvoiceLineItem | null {
  const description = row.description.trim();
  if (!description) return null;

  const details = parseDetails(row.details);

  if (row.kind === "info") {
    return {
      description,
      kind: "info",
      amountUsd: 0,
      details,
    };
  }

  const quantity = row.quantity.trim() ? Number(row.quantity) : undefined;
  let unitRateUsd = row.unitRateUsd.trim() ? Number(row.unitRateUsd) : undefined;
  const unit = row.unit || undefined;

  if (
    (unitRateUsd === undefined || Number.isNaN(unitRateUsd)) &&
    unit === "hours" &&
    defaultHourlyRate?.trim()
  ) {
    const fallback = Number(defaultHourlyRate);
    if (!Number.isNaN(fallback) && fallback > 0) unitRateUsd = fallback;
  }

  let amountUsd = row.amountUsd.trim() ? Number(row.amountUsd) : 0;
  if (
    amountUsd <= 0 &&
    quantity !== undefined &&
    !Number.isNaN(quantity) &&
    unitRateUsd !== undefined &&
    !Number.isNaN(unitRateUsd)
  ) {
    amountUsd = quantity * unitRateUsd;
  }

  if (amountUsd <= 0 || Number.isNaN(amountUsd)) return null;

  return {
    description,
    quantity:
      quantity !== undefined && !Number.isNaN(quantity) ? quantity : undefined,
    unit,
    unitRateUsd:
      unitRateUsd !== undefined && !Number.isNaN(unitRateUsd)
        ? unitRateUsd
        : undefined,
    amountUsd,
    details,
  };
}

export function sumDraftHours(rows: LineItemDraft[]): number {
  return rows.reduce((sum, row) => {
    if (row.kind === "info" || row.unit !== "hours") return sum;
    const qty = Number(row.quantity);
    return Number.isFinite(qty) && qty > 0 ? sum + qty : sum;
  }, 0);
}

export function sumLineItemsUsd(items: InvoiceLineItem[]): number {
  return items.reduce((sum, item) => {
    if (item.kind === "info") return sum;
    return sum + item.amountUsd;
  }, 0);
}

export function formatHours(hours: number): string {
  if (!Number.isFinite(hours) || hours <= 0) return "0";
  return Number.isInteger(hours)
    ? String(hours)
    : String(Math.round(hours * 100) / 100);
}
