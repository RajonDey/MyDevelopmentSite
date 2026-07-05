import type { ClientRegion, LeadKind, LeadNextStep, LeadStatus } from "@/types/rdx/lead";
import type { InvoiceStatus, PaymentMethod } from "@/types/rdx/invoice";

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  in_discussion: "In discussion",
  won: "Won",
  lost: "Lost",
  archived: "Archived",
};

export const leadNextStepLabels: Record<LeadNextStep, string> = {
  follow_up: "Follow up",
  send_proposal: "Send proposal",
  no_response: "No response",
  waiting: "Waiting",
  none: "None",
};

export const leadKindLabels: Record<LeadKind, string> = {
  lead: "Lead",
  task: "Task",
  idea: "Idea",
};

export const invoiceStatusLabels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  cancelled: "Cancelled",
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  payoneer: "Payoneer",
  wise: "Wise",
  wire: "Wire",
  bank_transfer_bd: "Bank transfer (BD)",
  other: "Other",
};

export const paymentMethodOptions: PaymentMethod[] = [
  "bank_transfer_bd",
  "payoneer",
  "wise",
  "wire",
  "other",
];

export const clientRegionLabels: Record<ClientRegion, string> = {
  bd: "Bangladesh (local)",
  international: "International",
};

export const clientRegionOptions: ClientRegion[] = ["bd", "international"];

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatBdt(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLeadSource(
  source: string,
  payload: Record<string, string>
): string {
  return payload.lead_source?.trim() || source;
}
