import type { PaymentMethod } from "@/types/rdx/invoice";
import { contactEmails } from "@/content/rdx/contact";
import { siteMetadata } from "@/content/rdx/metadata";

export const invoiceIssuer = {
  name: siteMetadata.siteName,
  tagline: siteMetadata.tagline,
  email: contactEmails.hello,
  website: siteMetadata.siteUrl,
  displayUrl: "rdxhive.com",
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
      "Payment via Payoneer request to RDXHIVE.",
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
