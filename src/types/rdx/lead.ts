export type LeadFormType = "start" | "audit" | "contact";

export type LeadStatus = "new" | "reviewing" | "qualified" | "closed";

export type LeadRecord = {
  id: string;
  created_at: string;
  form_type: LeadFormType;
  agency_name: string;
  contact_name: string;
  email: string;
  status: LeadStatus;
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
