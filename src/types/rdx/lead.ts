export type LeadFormType = "start" | "audit" | "contact" | "manual";

export type LeadStatus =
  | "new"
  | "in_discussion"
  | "won"
  | "lost"
  | "archived";

export type LeadNextStep =
  | "follow_up"
  | "send_proposal"
  | "no_response"
  | "waiting"
  | "none";

export type LeadKind = "lead" | "task" | "idea";

export type ClientRegion = "bd" | "international";

export type LeadRecord = {
  id: string;
  created_at: string;
  form_type: LeadFormType;
  agency_name: string;
  contact_name: string;
  email: string | null;
  phone: string | null;
  billing_name: string | null;
  billing_address: string | null;
  client_region: ClientRegion | null;
  status: LeadStatus;
  next_step: LeadNextStep | null;
  notes: string | null;
  last_contact_at: string | null;
  lead_kind: LeadKind;
  payload: Record<string, string>;
  source: string;
};

export type SubmitLeadInput = {
  formType: LeadFormType;
  agencyName: string;
  contactName: string;
  email: string;
  payload: Record<string, string>;
};

export type CreateLeadInput = {
  agencyName: string;
  contactName?: string;
  email?: string;
  phone?: string;
  billingName?: string;
  billingAddress?: string;
  clientRegion?: ClientRegion | null;
  status?: LeadStatus;
  source?: string;
  nextStep?: LeadNextStep | null;
  notes?: string;
  lastContactAt?: string | null;
  leadKind?: LeadKind;
};

export type UpdateLeadInput = {
  id: string;
  agencyName?: string;
  contactName?: string;
  email?: string | null;
  phone?: string | null;
  billingName?: string | null;
  billingAddress?: string | null;
  clientRegion?: ClientRegion | null;
  status?: LeadStatus;
  source?: string;
  nextStep?: LeadNextStep | null;
  notes?: string | null;
  lastContactAt?: string | null;
  leadKind?: LeadKind;
};

export type LeadBillingSummary = {
  invoiceCount: number;
  paidCount: number;
  sentCount: number;
  draftCount: number;
  paidUsd: number;
  outstandingUsd: number;
  paidBdt: number;
  outstandingBdt: number;
};

export type LeadReport = {
  total: number;
  byStatus: Record<LeadStatus, number>;
  byKind: Record<LeadKind, number>;
  bySource: Record<string, number>;
  needsFollowUp: number;
  openPipeline: number;
  wonCount: number;
  invoiceSummary: {
    draft: number;
    sent: number;
    paid: number;
    totalOutstandingUsd: number;
    totalPaidUsd: number;
  };
  billingByLead: Record<string, LeadBillingSummary>;
};

export type DeleteLeadResult =
  | { ok: true }
  | { ok: false; error: string; status: 404 | 409 | 500 | 503 };
