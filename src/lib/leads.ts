import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type {
  LeadRecord,
  LeadStatus,
  SubmitLeadInput,
} from "@/types/rdx/lead";

export async function insertLead(
  input: SubmitLeadInput
): Promise<LeadRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("rdx_leads")
    .insert({
      form_type: input.formType,
      agency_name: input.agencyName,
      contact_name: input.contactName,
      email: input.email,
      payload: input.payload,
      source: input.payload.lead_source?.trim() || "website",
      status: "new",
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to insert lead:", error.message);
    return null;
  }

  return data as LeadRecord;
}

export async function listLeads(limit = 50): Promise<LeadRecord[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("rdx_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to list leads:", error.message);
    return [];
  }

  return (data ?? []) as LeadRecord[];
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase
    .from("rdx_leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Failed to update lead status:", error.message);
    return false;
  }

  return true;
}

export function validateSubmitLeadInput(
  body: unknown
): SubmitLeadInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const formType = record.formType;
  const agencyName = record.agencyName;
  const contactName = record.contactName;
  const email = record.email;
  const payload = record.payload;

  if (formType !== "start" && formType !== "audit" && formType !== "contact") {
    return { error: "Invalid form type" };
  }

  if (typeof agencyName !== "string" || !agencyName.trim()) {
    return { error: "Company / agency name is required" };
  }

  if (typeof contactName !== "string" || !contactName.trim()) {
    return { error: "Contact name is required" };
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return { error: "Valid email is required" };
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { error: "Invalid payload" };
  }

  const cleanPayload: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload as Record<string, unknown>)) {
    if (typeof value === "string") {
      cleanPayload[key] = value.trim();
    }
  }

  return {
    formType,
    agencyName: agencyName.trim(),
    contactName: contactName.trim(),
    email: email.trim().toLowerCase(),
    payload: cleanPayload,
  };
}
