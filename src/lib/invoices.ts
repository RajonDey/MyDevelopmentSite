import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getLead } from "@/lib/leads";
import type {
  CreateInvoiceInput,
  InvoiceLineItem,
  InvoiceRecord,
  InvoiceStatus,
  PaymentMethod,
  UpdateInvoiceInput,
} from "@/types/rdx/invoice";
import type { ClientRegion, LeadBillingSummary } from "@/types/rdx/lead";
import { DEFAULT_USD_BDT_RATE } from "@/content/rdx/invoice-settings";

export const emptyBillingSummary: LeadBillingSummary = {
  invoiceCount: 0,
  paidCount: 0,
  sentCount: 0,
  draftCount: 0,
  paidUsd: 0,
  outstandingUsd: 0,
  paidBdt: 0,
  outstandingBdt: 0,
};

/** USD equivalent for dashboard totals — uses locked BDT rate when set. */
export function invoiceReportingUsd(invoice: InvoiceRecord): number {
  const bdt = invoice.amount_bdt;
  const rate = invoice.usd_bdt_rate;

  if (bdt !== null && bdt > 0 && rate !== null && rate > 0) {
    return Math.round(bdt / rate);
  }

  // Legacy rows: BDT saved without locked rate (stored as $1 placeholder)
  if (bdt !== null && bdt > 0 && invoice.amount_usd <= 1) {
    return Math.round(bdt / DEFAULT_USD_BDT_RATE);
  }

  return invoice.amount_usd > 0 ? invoice.amount_usd : 0;
}

export function summarizeInvoices(invoices: InvoiceRecord[]): LeadBillingSummary {
  let paidCount = 0;
  let sentCount = 0;
  let draftCount = 0;
  let paidUsd = 0;
  let outstandingUsd = 0;
  let paidBdt = 0;
  let outstandingBdt = 0;

  for (const invoice of invoices) {
    const usd = invoiceReportingUsd(invoice);
    const bdt = invoice.amount_bdt ?? 0;

    if (invoice.status === "draft") draftCount += 1;
    if (invoice.status === "sent") {
      sentCount += 1;
      outstandingUsd += usd;
      if (bdt > 0) outstandingBdt += bdt;
    }
    if (invoice.status === "paid") {
      paidCount += 1;
      paidUsd += usd;
      if (bdt > 0) paidBdt += bdt;
    }
  }

  return {
    invoiceCount: paidCount + sentCount + draftCount,
    paidCount,
    sentCount,
    draftCount,
    paidUsd,
    outstandingUsd,
    paidBdt,
    outstandingBdt,
  };
}

export function buildBillingSummaryByLead(
  invoices: InvoiceRecord[]
): Record<string, LeadBillingSummary> {
  const grouped = new Map<string, InvoiceRecord[]>();

  for (const invoice of invoices) {
    const existing = grouped.get(invoice.lead_id) ?? [];
    existing.push(invoice);
    grouped.set(invoice.lead_id, existing);
  }

  const billingByLead: Record<string, LeadBillingSummary> = {};
  for (const [leadId, leadInvoices] of grouped) {
    billingByLead[leadId] = summarizeInvoices(leadInvoices);
  }

  return billingByLead;
}

export function leadHasBillingHistory(invoices: InvoiceRecord[]): boolean {
  return invoices.some(
    (invoice) => invoice.status === "sent" || invoice.status === "paid"
  );
}

const INVOICE_STATUSES: InvoiceStatus[] = [
  "draft",
  "sent",
  "paid",
  "cancelled",
];

const PAYMENT_METHODS: PaymentMethod[] = [
  "payoneer",
  "wise",
  "wire",
  "bank_transfer_bd",
  "other",
];

const CLIENT_REGIONS: ClientRegion[] = ["bd", "international"];

function mapLineItem(row: Record<string, unknown>): InvoiceLineItem {
  const description = String(row.description ?? row.label ?? "");
  const quantity =
    row.quantity !== undefined && row.quantity !== null
      ? Number(row.quantity)
      : undefined;
  const unitRateUsd =
    row.unitRateUsd !== undefined && row.unitRateUsd !== null
      ? Number(row.unitRateUsd)
      : row.unit_rate_usd !== undefined && row.unit_rate_usd !== null
        ? Number(row.unit_rate_usd)
        : undefined;

  let amountUsd = Number(row.amountUsd ?? row.amount_usd ?? 0);
  if (
    amountUsd <= 0 &&
    quantity !== undefined &&
    unitRateUsd !== undefined
  ) {
    amountUsd = quantity * unitRateUsd;
  }

  const unit = row.unit as InvoiceLineItem["unit"] | undefined;

  return {
    description,
    quantity,
    unit: unit === "hours" || unit === "fixed" ? unit : undefined,
    unitRateUsd,
    amountUsd,
  };
}

function mapInvoiceRow(data: Record<string, unknown>): InvoiceRecord {
  const rawLineItems = data.line_items;
  const lineItems = Array.isArray(rawLineItems)
    ? rawLineItems.map((item) => mapLineItem(item as Record<string, unknown>))
    : [];

  return {
    id: String(data.id),
    lead_id: String(data.lead_id),
    project_id: data.project_id ? String(data.project_id) : null,
    invoice_number: String(data.invoice_number),
    legacy_ref: data.legacy_ref ? String(data.legacy_ref) : null,
    billing_period: data.billing_period ? String(data.billing_period) : null,
    amount_usd: Number(data.amount_usd),
    amount_bdt:
      data.amount_bdt !== undefined && data.amount_bdt !== null
        ? Number(data.amount_bdt)
        : null,
    usd_bdt_rate:
      data.usd_bdt_rate !== undefined && data.usd_bdt_rate !== null
        ? Number(data.usd_bdt_rate)
        : null,
    currency: String(data.currency ?? "USD"),
    status: data.status as InvoiceStatus,
    description: data.description ? String(data.description) : null,
    line_items: lineItems,
    issued_at: data.issued_at ? String(data.issued_at) : null,
    due_at: data.due_at ? String(data.due_at) : null,
    paid_at: data.paid_at ? String(data.paid_at) : null,
    bill_to_name: data.bill_to_name ? String(data.bill_to_name) : null,
    bill_to_address: data.bill_to_address
      ? String(data.bill_to_address)
      : null,
    client_region: (data.client_region as ClientRegion | null) ?? null,
    payment_method: (data.payment_method as PaymentMethod | null) ?? null,
    payment_notes: data.payment_notes ? String(data.payment_notes) : null,
    created_at: String(data.created_at),
    updated_at: String(data.updated_at),
  };
}

function serializeLineItems(items: InvoiceLineItem[]) {
  return items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    unitRateUsd: item.unitRateUsd,
    amountUsd: item.amountUsd,
  }));
}

function normalizeLineItems(
  lineItems: InvoiceLineItem[] | undefined,
  description: string | undefined,
  amountUsd: number | undefined
): InvoiceLineItem[] {
  if (lineItems && lineItems.length > 0) {
    return lineItems.map((item) => {
      const quantity = item.quantity;
      const unitRateUsd = item.unitRateUsd;
      let amount = item.amountUsd;
      if (
        amount <= 0 &&
        quantity !== undefined &&
        unitRateUsd !== undefined
      ) {
        amount = quantity * unitRateUsd;
      }
      return { ...item, amountUsd: amount };
    });
  }

  if (amountUsd !== undefined && amountUsd > 0) {
    return [
      {
        description: description?.trim() || "Project",
        amountUsd,
      },
    ];
  }

  return [];
}

function sumLineItemsUsd(items: InvoiceLineItem[]): number {
  return items.reduce((sum, item) => sum + item.amountUsd, 0);
}

function resolveAmounts(input: {
  amountUsd?: number;
  amountBdt?: number;
  usdBdtRate?: number;
  lineItems: InvoiceLineItem[];
}): { amountUsd: number; amountBdt: number | null; usdBdtRate: number | null } {
  let amountUsd = sumLineItemsUsd(input.lineItems);
  if (amountUsd <= 0 && input.amountUsd !== undefined && input.amountUsd > 0) {
    amountUsd = input.amountUsd;
  }

  const rate = input.usdBdtRate ?? null;
  let amountBdt = input.amountBdt ?? null;

  if (amountBdt === null && rate !== null && amountUsd > 0) {
    amountBdt = Math.round(amountUsd * rate);
  } else if (
    amountUsd <= 0 &&
    amountBdt !== null &&
    amountBdt > 0 &&
    rate !== null &&
    rate > 0
  ) {
    amountUsd = Math.round(amountBdt / rate);
  }

  return {
    amountUsd: amountUsd > 0 ? amountUsd : 0,
    amountBdt,
    usdBdtRate: rate,
  };
}

async function nextInvoiceNumber(issuedAt?: string): Promise<string> {
  const supabase = getSupabaseAdmin();
  const year = issuedAt
    ? new Date(issuedAt).getFullYear()
    : new Date().getFullYear();
  const prefix = `RDX-${year}-`;

  if (!supabase) {
    return `${prefix}0001`;
  }

  const { data } = await supabase
    .from("rdx_invoices")
    .select("invoice_number")
    .like("invoice_number", `${prefix}%`)
    .order("invoice_number", { ascending: false })
    .limit(1);

  const last = data?.[0]?.invoice_number as string | undefined;
  const lastSequence = last
    ? Number.parseInt(last.slice(prefix.length), 10)
    : 0;
  const sequence = String((Number.isFinite(lastSequence) ? lastSequence : 0) + 1).padStart(
    4,
    "0"
  );

  return `${prefix}${sequence}`;
}

async function snapshotBillTo(leadId: string) {
  const lead = await getLead(leadId);
  if (!lead) {
    return { billToName: null, billToAddress: null, clientRegion: null };
  }

  return {
    billToName: lead.billing_name?.trim() || lead.agency_name,
    billToAddress: lead.billing_address?.trim() || null,
    clientRegion: lead.client_region,
  };
}

export async function listInvoices(leadId?: string): Promise<InvoiceRecord[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("rdx_invoices")
    .select("*")
    .order("created_at", { ascending: false });

  if (leadId) {
    query = query.eq("lead_id", leadId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to list invoices:", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapInvoiceRow(row as Record<string, unknown>));
}

export async function getInvoice(id: string): Promise<InvoiceRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("rdx_invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to get invoice:", error.message);
    return null;
  }

  return mapInvoiceRow(data as Record<string, unknown>);
}

export async function createInvoice(
  input: CreateInvoiceInput
): Promise<InvoiceRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const lead = await getLead(input.leadId);
  if (!lead) {
    return null;
  }

  const lineItems = normalizeLineItems(
    input.lineItems,
    input.description,
    input.amountUsd
  );
  const { amountUsd, amountBdt, usdBdtRate } = resolveAmounts({
    amountUsd: input.amountUsd,
    amountBdt: input.amountBdt,
    usdBdtRate: input.usdBdtRate,
    lineItems,
  });

  if (amountUsd <= 0 && (amountBdt === null || amountBdt <= 0)) {
    return null;
  }

  const issuedAt = input.issuedAt ?? new Date().toISOString().slice(0, 10);
  const invoiceNumber = await nextInvoiceNumber(issuedAt);
  const clientRegion = input.clientRegion ?? lead.client_region ?? null;
  const paymentMethod =
    input.paymentMethod ??
    (clientRegion === "bd" ? "bank_transfer_bd" : null);

  const { data, error } = await supabase
    .from("rdx_invoices")
    .insert({
      lead_id: input.leadId,
      project_id: input.projectId ?? null,
      invoice_number: invoiceNumber,
      legacy_ref: input.legacyRef?.trim() || null,
      billing_period: input.billingPeriod?.trim() || null,
      amount_usd: amountUsd,
      amount_bdt: amountBdt,
      usd_bdt_rate: usdBdtRate,
      description: input.description?.trim() || null,
      line_items: serializeLineItems(lineItems),
      issued_at: issuedAt,
      due_at: input.dueAt ?? null,
      payment_method: paymentMethod,
      client_region: clientRegion,
      status: input.status ?? "draft",
    })
    .select("*")
    .single();

  if (error) {
    console.error("Failed to create invoice:", error.message);
    return null;
  }

  return mapInvoiceRow(data as Record<string, unknown>);
}

export async function updateInvoice(
  input: UpdateInvoiceInput
): Promise<InvoiceRecord | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const existing = await getInvoice(input.id);
  if (!existing) {
    return null;
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (input.projectId !== undefined) patch.project_id = input.projectId;
  if (input.description !== undefined) patch.description = input.description;
  if (input.billingPeriod !== undefined) {
    patch.billing_period = input.billingPeriod;
  }
  if (input.clientRegion !== undefined) patch.client_region = input.clientRegion;

  if (input.lineItems !== undefined) {
    const lineItems = normalizeLineItems(input.lineItems, undefined, undefined);
    patch.line_items = serializeLineItems(lineItems);
    patch.amount_usd = sumLineItemsUsd(lineItems);
  }

  if (input.amountUsd !== undefined) patch.amount_usd = input.amountUsd;
  if (input.amountBdt !== undefined) patch.amount_bdt = input.amountBdt;
  if (input.usdBdtRate !== undefined) patch.usd_bdt_rate = input.usdBdtRate;

  if (
    input.lineItems !== undefined ||
    input.amountUsd !== undefined ||
    input.amountBdt !== undefined ||
    input.usdBdtRate !== undefined
  ) {
    const lineItems =
      input.lineItems !== undefined
        ? normalizeLineItems(input.lineItems, undefined, undefined)
        : existing.line_items;
    const resolved = resolveAmounts({
      amountUsd:
        typeof patch.amount_usd === "number"
          ? patch.amount_usd
          : existing.amount_usd,
      amountBdt:
        input.amountBdt !== undefined
          ? (input.amountBdt ?? undefined)
          : (existing.amount_bdt ?? undefined),
      usdBdtRate:
        input.usdBdtRate !== undefined
          ? (input.usdBdtRate ?? undefined)
          : (existing.usd_bdt_rate ?? undefined),
      lineItems,
    });
    patch.amount_usd = resolved.amountUsd;
    patch.amount_bdt = resolved.amountBdt;
    patch.usd_bdt_rate = resolved.usdBdtRate;
  }

  if (input.issuedAt !== undefined) patch.issued_at = input.issuedAt;
  if (input.dueAt !== undefined) patch.due_at = input.dueAt;
  if (input.paidAt !== undefined) patch.paid_at = input.paidAt;
  if (input.paymentMethod !== undefined) {
    patch.payment_method = input.paymentMethod;
  }
  if (input.paymentNotes !== undefined) patch.payment_notes = input.paymentNotes;

  if (input.status !== undefined) {
    patch.status = input.status;
    if (input.status === "paid" && input.paidAt === undefined) {
      patch.paid_at = new Date().toISOString();
    }
    if (input.status === "sent" && !existing.bill_to_name) {
      const snapshot = await snapshotBillTo(existing.lead_id);
      patch.bill_to_name = snapshot.billToName;
      patch.bill_to_address = snapshot.billToAddress;
      if (input.clientRegion === undefined && !existing.client_region) {
        patch.client_region = snapshot.clientRegion;
      }
    }
  }

  const { data, error } = await supabase
    .from("rdx_invoices")
    .update(patch)
    .eq("id", input.id)
    .select("*")
    .single();

  if (error) {
    console.error("Failed to update invoice:", error.message);
    return null;
  }

  return mapInvoiceRow(data as Record<string, unknown>);
}

export async function deleteInvoice(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return false;
  }

  const existing = await getInvoice(id);
  if (!existing) {
    return false;
  }

  if (existing.status !== "draft") {
    return false;
  }

  const { error } = await supabase.from("rdx_invoices").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete invoice:", error.message);
    return false;
  }

  return true;
}

export async function getInvoiceSummaryForReport() {
  const invoices = await listInvoices();
  const summary = summarizeInvoices(invoices);

  return {
    draft: summary.draftCount,
    sent: summary.sentCount,
    paid: summary.paidCount,
    totalOutstandingUsd: summary.outstandingUsd,
    totalPaidUsd: summary.paidUsd,
    billingByLead: buildBillingSummaryByLead(invoices),
  };
}

function parseLineItems(value: unknown): InvoiceLineItem[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items: InvoiceLineItem[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const row = entry as Record<string, unknown>;
    const description = String(row.description ?? row.label ?? "").trim();
    if (!description) continue;

    const item = mapLineItem({ ...row, description });
    if (item.amountUsd <= 0 && item.quantity && item.unitRateUsd) {
      item.amountUsd = item.quantity * item.unitRateUsd;
    }
    if (item.amountUsd <= 0) continue;
    items.push(item);
  }

  return items.length > 0 ? items : undefined;
}

export function validateCreateInvoiceInput(
  body: unknown
): CreateInvoiceInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const leadId = record.leadId;

  if (typeof leadId !== "string" || !leadId.trim()) {
    return { error: "Lead id is required" };
  }

  const amountUsd =
    typeof record.amountUsd === "number" ? record.amountUsd : undefined;
  const amountBdt =
    typeof record.amountBdt === "number" ? record.amountBdt : undefined;
  const lineItems = parseLineItems(record.lineItems);

  if (
    (amountUsd === undefined || amountUsd <= 0) &&
    (amountBdt === undefined || amountBdt <= 0) &&
    !lineItems
  ) {
    return { error: "Valid amount or line items required" };
  }

  const status = record.status;
  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !INVOICE_STATUSES.includes(status as InvoiceStatus))
  ) {
    return { error: "Invalid invoice status" };
  }

  const paymentMethod = record.paymentMethod;
  if (
    paymentMethod !== undefined &&
    (typeof paymentMethod !== "string" ||
      !PAYMENT_METHODS.includes(paymentMethod as PaymentMethod))
  ) {
    return { error: "Invalid payment method" };
  }

  const clientRegion = record.clientRegion;
  if (
    clientRegion !== undefined &&
    (typeof clientRegion !== "string" ||
      !CLIENT_REGIONS.includes(clientRegion as ClientRegion))
  ) {
    return { error: "Invalid client region" };
  }

  return {
    leadId: leadId.trim(),
    projectId:
      typeof record.projectId === "string" ? record.projectId : undefined,
    amountUsd,
    amountBdt,
    usdBdtRate:
      typeof record.usdBdtRate === "number" ? record.usdBdtRate : undefined,
    description:
      typeof record.description === "string" ? record.description : undefined,
    billingPeriod:
      typeof record.billingPeriod === "string"
        ? record.billingPeriod
        : undefined,
    legacyRef:
      typeof record.legacyRef === "string" ? record.legacyRef : undefined,
    lineItems,
    issuedAt: typeof record.issuedAt === "string" ? record.issuedAt : undefined,
    dueAt: typeof record.dueAt === "string" ? record.dueAt : undefined,
    paymentMethod: paymentMethod as PaymentMethod | undefined,
    clientRegion: clientRegion as ClientRegion | undefined,
    status: status as InvoiceStatus | undefined,
  };
}

export function validateUpdateInvoiceInput(
  body: unknown
): UpdateInvoiceInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const id = record.id;

  if (typeof id !== "string" || !id.trim()) {
    return { error: "Invoice id is required" };
  }

  const status = record.status;
  if (
    status !== undefined &&
    (typeof status !== "string" ||
      !INVOICE_STATUSES.includes(status as InvoiceStatus))
  ) {
    return { error: "Invalid invoice status" };
  }

  const paymentMethod = record.paymentMethod;
  if (
    paymentMethod !== undefined &&
    paymentMethod !== null &&
    (typeof paymentMethod !== "string" ||
      !PAYMENT_METHODS.includes(paymentMethod as PaymentMethod))
  ) {
    return { error: "Invalid payment method" };
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

  if (
    record.amountUsd !== undefined &&
    (typeof record.amountUsd !== "number" || record.amountUsd < 0)
  ) {
    return { error: "Valid amount is required" };
  }

  if (
    record.amountBdt !== undefined &&
    record.amountBdt !== null &&
    (typeof record.amountBdt !== "number" || record.amountBdt <= 0)
  ) {
    return { error: "Valid BDT amount is required" };
  }

  return {
    id,
    projectId:
      record.projectId === null
        ? null
        : typeof record.projectId === "string"
          ? record.projectId
          : undefined,
    amountUsd: typeof record.amountUsd === "number" ? record.amountUsd : undefined,
    amountBdt:
      record.amountBdt === null
        ? null
        : typeof record.amountBdt === "number"
          ? record.amountBdt
          : undefined,
    usdBdtRate:
      record.usdBdtRate === null
        ? null
        : typeof record.usdBdtRate === "number"
          ? record.usdBdtRate
          : undefined,
    description:
      record.description === null
        ? null
        : typeof record.description === "string"
          ? record.description
          : undefined,
    billingPeriod:
      record.billingPeriod === null
        ? null
        : typeof record.billingPeriod === "string"
          ? record.billingPeriod
          : undefined,
    lineItems: parseLineItems(record.lineItems),
    issuedAt:
      record.issuedAt === null
        ? null
        : typeof record.issuedAt === "string"
          ? record.issuedAt
          : undefined,
    dueAt:
      record.dueAt === null
        ? null
        : typeof record.dueAt === "string"
          ? record.dueAt
          : undefined,
    paidAt:
      record.paidAt === null
        ? null
        : typeof record.paidAt === "string"
          ? record.paidAt
          : undefined,
    paymentMethod:
      paymentMethod === null
        ? null
        : (paymentMethod as PaymentMethod | undefined),
    paymentNotes:
      record.paymentNotes === null
        ? null
        : typeof record.paymentNotes === "string"
          ? record.paymentNotes
          : undefined,
    clientRegion:
      clientRegion === null
        ? null
        : (clientRegion as ClientRegion | undefined),
    status: status as InvoiceStatus | undefined,
  };
}
