import type { PaymentMethod } from "@/types/rdx/invoice";
import { getPaymentBlock } from "@/content/rdx/invoice-settings";

export type InvoiceAdjustments = {
  /** null = saved invoices with no override, so the PDF uses the method default. */
  bankDetails: string | null;
  discountBdt: number;
  discountUsd: number;
};

type StoredAdjustments = {
  v: 1;
  bank: string;
  discountBdt: number;
  discountUsd: number;
};

function positive(value: unknown): number {
  const amount = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return Math.round(amount * 100) / 100;
}

export function defaultPaymentDetails(
  method: PaymentMethod | "" | null | undefined
): string {
  if (!method) return "";
  return getPaymentBlock(method).lines.join("\n");
}

export function encodeInvoiceAdjustments(input: {
  bankDetails: string;
  discountBdt: number;
  discountUsd: number;
}): string {
  const stored: StoredAdjustments = {
    v: 1,
    bank: input.bankDetails.trim(),
    discountBdt: input.discountBdt > 0 ? input.discountBdt : 0,
    discountUsd: input.discountUsd > 0 ? input.discountUsd : 0,
  };
  return JSON.stringify(stored);
}

export function decodeInvoiceAdjustments(
  raw: string | null | undefined
): InvoiceAdjustments {
  if (!raw?.trim()) {
    return { bankDetails: null, discountBdt: 0, discountUsd: 0 };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredAdjustments>;
    if (parsed && parsed.v === 1 && typeof parsed.bank === "string") {
      return {
        bankDetails: parsed.bank,
        discountBdt: positive(parsed.discountBdt),
        discountUsd: positive(parsed.discountUsd),
      };
    }
  } catch {
    // Older rows stored plain payment text.
  }

  return { bankDetails: raw, discountBdt: 0, discountUsd: 0 };
}
