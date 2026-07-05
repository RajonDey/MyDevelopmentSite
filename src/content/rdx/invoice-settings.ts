import type { PaymentMethod } from "@/types/rdx/invoice";
import { siteMetadata } from "@/content/rdx/metadata";
import { getBusinessEmail } from "@/content/rdx/sales-ops";

export const invoiceIssuer = {
  name: siteMetadata.siteName,
  email: getBusinessEmail(),
  website: siteMetadata.siteUrl,
} as const;

export type PaymentBlock = {
  title: string;
  lines: string[];
};

export const paymentBlocks: Record<PaymentMethod, PaymentBlock> = {
  bank_transfer_bd: {
    title: "Bank transfer (Bangladesh)",
    lines: [
      "Bank: Bank Asia",
      "Account name: Gourob Debnath",
      "Account no: 05834002796",
      "Branch: Laldighirpar Branch",
    ],
  },
  payoneer: {
    title: "Payoneer",
    lines: [
      "Payment via Payoneer request to RDX Technologies.",
      `Email: ${invoiceIssuer.email}`,
    ],
  },
  wise: {
    title: "Wise",
    lines: [
      "Payment via Wise transfer.",
      `Contact ${invoiceIssuer.email} for transfer details.`,
    ],
  },
  wire: {
    title: "Wire transfer",
    lines: [
      "International wire transfer.",
      `Contact ${invoiceIssuer.email} for banking details.`,
    ],
  },
  other: {
    title: "Payment",
    lines: [`Contact ${invoiceIssuer.email} for payment instructions.`],
  },
};

export function getPaymentBlock(method: PaymentMethod | null): PaymentBlock {
  if (!method) {
    return paymentBlocks.other;
  }
  return paymentBlocks[method];
}

/** Default BDT per USD for BD invoices when no rate is entered yet (form hint only). */
export const DEFAULT_USD_BDT_RATE = 122;
