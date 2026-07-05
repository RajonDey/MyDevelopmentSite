import type { ClientRegion } from "@/types/rdx/lead";

export type InvoiceStatus = "draft" | "sent" | "paid" | "cancelled";

export type PaymentMethod =
  | "payoneer"
  | "wise"
  | "wire"
  | "bank_transfer_bd"
  | "other";

export type InvoiceLineItemUnit = "hours" | "fixed";

export type InvoiceLineItem = {
  description: string;
  quantity?: number;
  unit?: InvoiceLineItemUnit;
  unitRateUsd?: number;
  amountUsd: number;
};

export type InvoiceRecord = {
  id: string;
  lead_id: string;
  project_id: string | null;
  invoice_number: string;
  legacy_ref: string | null;
  billing_period: string | null;
  amount_usd: number;
  amount_bdt: number | null;
  usd_bdt_rate: number | null;
  currency: string;
  status: InvoiceStatus;
  description: string | null;
  line_items: InvoiceLineItem[];
  issued_at: string | null;
  due_at: string | null;
  paid_at: string | null;
  bill_to_name: string | null;
  bill_to_address: string | null;
  client_region: ClientRegion | null;
  payment_method: PaymentMethod | null;
  payment_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateInvoiceInput = {
  leadId: string;
  projectId?: string;
  amountUsd?: number;
  amountBdt?: number;
  usdBdtRate?: number;
  description?: string;
  billingPeriod?: string;
  legacyRef?: string;
  lineItems?: InvoiceLineItem[];
  issuedAt?: string;
  dueAt?: string;
  paymentMethod?: PaymentMethod;
  clientRegion?: ClientRegion;
  status?: InvoiceStatus;
};

export type UpdateInvoiceInput = {
  id: string;
  projectId?: string | null;
  amountUsd?: number;
  amountBdt?: number | null;
  usdBdtRate?: number | null;
  description?: string | null;
  billingPeriod?: string | null;
  lineItems?: InvoiceLineItem[];
  issuedAt?: string | null;
  dueAt?: string | null;
  paidAt?: string | null;
  paymentMethod?: PaymentMethod | null;
  paymentNotes?: string | null;
  clientRegion?: ClientRegion | null;
  status?: InvoiceStatus;
};
