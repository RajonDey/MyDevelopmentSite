import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type {
  ClientRegion,
  CreateLeadInput,
  DeleteLeadResult,
  LeadKind,
  LeadNextStep,
  LeadRecord,
  LeadReport,
  LeadStatus,
  SubmitLeadInput,
  UpdateLeadInput,
} from "@/types/rdx/lead";
import {
  getInvoiceSummaryForReport,
} from "@/lib/invoices";
import { deleteProject, listProjects } from "@/lib/projects";

const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "in_discussion",
  "won",
  "lost",
  "archived",
];

const LEAD_KINDS: LeadKind[] = ["lead", "task", "idea"];

const NEXT_STEPS: LeadNextStep[] = [
  "follow_up",
  "send_proposal",
  "no_response",
  "waiting",
  "none",
];

const CLIENT_REGIONS: ClientRegion[] = ["bd", "international"];

function mapLeadRow(data: Record<string, unknown>): LeadRecord {
  return {
    id: String(data.id),
    created_at: String(data.created_at),
    form_type: data.form_type as LeadRecord["form_type"],
    agency_name: String(data.agency_name),
    contact_name: String(data.contact_name ?? ""),
    email: data.email ? String(data.email) : null,
    phone: data.phone ? String(data.phone) : null,
    billing_name: data.billing_name ? String(data.billing_name) : null,
    billing_address: data.billing_address ? String(data.billing_address) : null,
    client_region: (data.client_region as ClientRegion | null) ?? null,
    status: data.status as LeadStatus,
    next_step: (data.next_step as LeadNextStep | null) ?? null,
    notes: data.notes ? String(data.notes) : null,
    last_contact_at: data.last_contact_at ? String(data.last_contact_at) : null,
    lead_kind: (data.lead_kind as LeadKind) ?? "lead",
    payload: (data.payload as Record<string, string>) ?? {},
    source: String(data.source ?? "website"),
  };
}

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
      lead_kind: "lead",
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to insert lead:", error.message);
    return null;
  }

  return mapLeadRow(data as Record<string, unknown>);
}

export async function createLead(
  input: CreateLeadInput
): Promise<LeadRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("rdx_leads")
    .insert({
      form_type: "manual",
      agency_name: input.agencyName.trim(),
      contact_name: input.contactName?.trim() || input.agencyName.trim(),
      email: input.email?.trim().toLowerCase() || null,
      phone: input.phone?.trim() || null,
      status: input.status ?? "new",
      source: input.source?.trim() || "manual",
      next_step: input.nextStep ?? null,
      notes: input.notes?.trim() || null,
      last_contact_at: input.lastContactAt ?? null,
      lead_kind: input.leadKind ?? "lead",
      billing_name: input.billingName?.trim() || null,
      billing_address: input.billingAddress?.trim() || null,
      client_region: input.clientRegion ?? null,
      payload: {},
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to create lead:", error.message);
    return null;
  }

  return mapLeadRow(data as Record<string, unknown>);
}

export async function listLeads(limit = 100): Promise<LeadRecord[]> {
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

  return (data ?? []).map((row) => mapLeadRow(row as Record<string, unknown>));
}

export async function getLead(id: string): Promise<LeadRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("rdx_leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to get lead:", error.message);
    return null;
  }

  return mapLeadRow(data as Record<string, unknown>);
}

export async function updateLead(
  input: UpdateLeadInput
): Promise<LeadRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const patch: Record<string, unknown> = {};
  if (input.agencyName !== undefined) patch.agency_name = input.agencyName.trim();
  if (input.contactName !== undefined) {
    patch.contact_name = input.contactName.trim();
  }
  if (input.email !== undefined) {
    patch.email = input.email?.trim().toLowerCase() || null;
  }
  if (input.phone !== undefined) patch.phone = input.phone?.trim() || null;
  if (input.billingName !== undefined) {
    patch.billing_name = input.billingName?.trim() || null;
  }
  if (input.billingAddress !== undefined) {
    patch.billing_address = input.billingAddress?.trim() || null;
  }
  if (input.clientRegion !== undefined) patch.client_region = input.clientRegion;
  if (input.status !== undefined) patch.status = input.status;
  if (input.source !== undefined) patch.source = input.source.trim();
  if (input.nextStep !== undefined) patch.next_step = input.nextStep;
  if (input.notes !== undefined) patch.notes = input.notes;
  if (input.lastContactAt !== undefined) {
    patch.last_contact_at = input.lastContactAt;
  }
  if (input.leadKind !== undefined) patch.lead_kind = input.leadKind;

  const { data, error } = await supabase
    .from("rdx_leads")
    .update(patch)
    .eq("id", input.id)
    .select("*")
    .single();

  if (error) {
    console.error("Failed to update lead:", error.message);
    return null;
  }

  return mapLeadRow(data as Record<string, unknown>);
}

export async function deleteLead(id: string): Promise<DeleteLeadResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Database unavailable", status: 503 };
  }

  const lead = await getLead(id);
  if (!lead) {
    return { ok: false, error: "Lead not found", status: 404 };
  }

  const { leadHasBillingHistory, listInvoices, deleteInvoice } =
    await import("@/lib/invoices");

  const invoices = await listInvoices(id);
  if (leadHasBillingHistory(invoices)) {
    return {
      ok: false,
      error:
        "This lead has sent or paid invoices. Archive it instead of deleting.",
      status: 409,
    };
  }

  for (const invoice of invoices) {
    const removed = await deleteInvoice(invoice.id);
    if (!removed) {
      return {
        ok: false,
        error: "Failed to remove draft invoices for this lead",
        status: 500,
      };
    }
  }

  const projects = await listProjects(id);
  for (const project of projects) {
    const removed = await deleteProject(project.id);
    if (!removed) {
      return {
        ok: false,
        error: "Failed to remove projects for this lead",
        status: 500,
      };
    }
  }

  const { error } = await supabase.from("rdx_leads").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete lead:", error.message);
    return { ok: false, error: error.message, status: 500 };
  }

  return { ok: true };
}

export async function buildLeadReport(): Promise<LeadReport | null> {
  const leads = await listLeads(500);
  const invoiceSummary = await getInvoiceSummaryForReport();

  if (!invoiceSummary) {
    return null;
  }

  const byStatus = Object.fromEntries(
    LEAD_STATUSES.map((status) => [status, 0])
  ) as Record<LeadStatus, number>;
  const byKind = Object.fromEntries(
    LEAD_KINDS.map((kind) => [kind, 0])
  ) as Record<LeadKind, number>;
  const bySource: Record<string, number> = {};

  let needsFollowUp = 0;
  let openPipeline = 0;
  let wonCount = 0;

  const now = Date.now();
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;

  for (const lead of leads) {
    byStatus[lead.status] += 1;
    byKind[lead.lead_kind] += 1;
    bySource[lead.source] = (bySource[lead.source] ?? 0) + 1;

    if (lead.status === "won") {
      wonCount += 1;
    }

    if (lead.status === "new" || lead.status === "in_discussion") {
      openPipeline += 1;
    }

    const stale =
      !lead.last_contact_at ||
      now - new Date(lead.last_contact_at).getTime() > fourteenDaysMs;

    if (
      lead.lead_kind === "lead" &&
      (lead.status === "new" || lead.status === "in_discussion") &&
      (lead.next_step === "follow_up" || stale)
    ) {
      needsFollowUp += 1;
    }
  }

  return {
    total: leads.length,
    byStatus,
    byKind,
    bySource,
    needsFollowUp,
    openPipeline,
    wonCount,
    invoiceSummary: {
      draft: invoiceSummary.draft,
      sent: invoiceSummary.sent,
      paid: invoiceSummary.paid,
      totalOutstandingUsd: invoiceSummary.totalOutstandingUsd,
      totalPaidUsd: invoiceSummary.totalPaidUsd,
    },
    billingByLead: invoiceSummary.billingByLead,
  };
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

export function validateCreateLeadInput(
  body: unknown
): CreateLeadInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const agencyName = record.agencyName;

  if (typeof agencyName !== "string" || !agencyName.trim()) {
    return { error: "Name is required" };
  }

  const status = record.status;
  if (
    status !== undefined &&
    (typeof status !== "string" || !LEAD_STATUSES.includes(status as LeadStatus))
  ) {
    return { error: "Invalid status" };
  }

  const nextStep = record.nextStep;
  if (
    nextStep !== undefined &&
    nextStep !== null &&
    (typeof nextStep !== "string" ||
      !NEXT_STEPS.includes(nextStep as LeadNextStep))
  ) {
    return { error: "Invalid next step" };
  }

  const leadKind = record.leadKind;
  if (
    leadKind !== undefined &&
    (typeof leadKind !== "string" || !LEAD_KINDS.includes(leadKind as LeadKind))
  ) {
    return { error: "Invalid lead kind" };
  }

  const clientRegion = record.clientRegion;
  if (
    clientRegion !== undefined &&
    clientRegion !== null &&
    (typeof clientRegion !== "string" ||
      !CLIENT_REGIONS.includes(clientRegion as ClientRegion))
  ) {
    return { error: "Invalid client region" };
  }

  return {
    agencyName: agencyName.trim(),
    contactName:
      typeof record.contactName === "string" ? record.contactName : undefined,
    email: typeof record.email === "string" ? record.email : undefined,
    phone: typeof record.phone === "string" ? record.phone : undefined,
    billingName:
      typeof record.billingName === "string" ? record.billingName : undefined,
    billingAddress:
      typeof record.billingAddress === "string"
        ? record.billingAddress
        : undefined,
    clientRegion:
      clientRegion === null
        ? null
        : (clientRegion as ClientRegion | undefined),
    status: status as LeadStatus | undefined,
    source: typeof record.source === "string" ? record.source : undefined,
    nextStep: (nextStep as LeadNextStep | null | undefined) ?? undefined,
    notes: typeof record.notes === "string" ? record.notes : undefined,
    lastContactAt:
      typeof record.lastContactAt === "string" ? record.lastContactAt : undefined,
    leadKind: leadKind as LeadKind | undefined,
  };
}

export function validateUpdateLeadInput(
  body: unknown
): UpdateLeadInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const id = record.id;

  if (typeof id !== "string" || !id.trim()) {
    return { error: "Lead id is required" };
  }

  const status = record.status;
  if (
    status !== undefined &&
    (typeof status !== "string" || !LEAD_STATUSES.includes(status as LeadStatus))
  ) {
    return { error: "Invalid status" };
  }

  const nextStep = record.nextStep;
  if (
    nextStep !== undefined &&
    nextStep !== null &&
    (typeof nextStep !== "string" ||
      !NEXT_STEPS.includes(nextStep as LeadNextStep))
  ) {
    return { error: "Invalid next step" };
  }

  const leadKind = record.leadKind;
  if (
    leadKind !== undefined &&
    (typeof leadKind !== "string" || !LEAD_KINDS.includes(leadKind as LeadKind))
  ) {
    return { error: "Invalid lead kind" };
  }

  const agencyName = record.agencyName;
  if (
    agencyName !== undefined &&
    (typeof agencyName !== "string" || !agencyName.trim())
  ) {
    return { error: "Name cannot be empty" };
  }

  const clientRegion = record.clientRegion;
  if (
    clientRegion !== undefined &&
    clientRegion !== null &&
    (typeof clientRegion !== "string" ||
      !CLIENT_REGIONS.includes(clientRegion as ClientRegion))
  ) {
    return { error: "Invalid client region" };
  }

  return {
    id,
    agencyName:
      typeof agencyName === "string" ? agencyName : undefined,
    contactName:
      typeof record.contactName === "string" ? record.contactName : undefined,
    email:
      record.email === null
        ? null
        : typeof record.email === "string"
          ? record.email
          : undefined,
    phone:
      record.phone === null
        ? null
        : typeof record.phone === "string"
          ? record.phone
          : undefined,
    billingName:
      record.billingName === null
        ? null
        : typeof record.billingName === "string"
          ? record.billingName
          : undefined,
    billingAddress:
      record.billingAddress === null
        ? null
        : typeof record.billingAddress === "string"
          ? record.billingAddress
          : undefined,
    clientRegion:
      clientRegion === null ? null : (clientRegion as ClientRegion | undefined),
    status: status as LeadStatus | undefined,
    source: typeof record.source === "string" ? record.source : undefined,
    nextStep:
      nextStep === null ? null : (nextStep as LeadNextStep | undefined),
    notes:
      record.notes === null
        ? null
        : typeof record.notes === "string"
          ? record.notes
          : undefined,
    lastContactAt:
      record.lastContactAt === null
        ? null
        : typeof record.lastContactAt === "string"
          ? record.lastContactAt
          : undefined,
    leadKind: leadKind as LeadKind | undefined,
  };
}

/** @deprecated use updateLead */
export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<boolean> {
  const lead = await updateLead({ id, status });
  return Boolean(lead);
}
