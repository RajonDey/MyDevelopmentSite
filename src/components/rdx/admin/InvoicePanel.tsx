"use client";

import { useEffect, useMemo, useState } from "react";
import type { ClientRegion, LeadRecord } from "@/types/rdx/lead";
import type {
  CreateInvoiceInput,
  InvoiceLineItem,
  InvoiceLineItemUnit,
  InvoiceRecord,
  PaymentMethod,
  UpdateInvoiceInput,
} from "@/types/rdx/invoice";
import {
  clientRegionLabels,
  clientRegionOptions,
  formatBdt,
  formatUsd,
  invoiceStatusLabels,
  paymentMethodLabels,
  paymentMethodOptions,
} from "@/content/rdx/lead-desk";
import type { ProjectRecord } from "@/types/rdx/project";
import { DEFAULT_USD_BDT_RATE } from "@/content/rdx/invoice-settings";
import {
  invoiceReportingUsd,
  summarizeInvoices,
} from "@/lib/invoices";
import { RdxButton } from "@/components/rdx/ui/Button";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";

type LineItemDraft = {
  key: string;
  description: string;
  quantity: string;
  unit: InvoiceLineItemUnit | "";
  unitRateUsd: string;
  amountUsd: string;
};

type InvoiceFormState = {
  billingPeriod: string;
  issuedAt: string;
  dueAt: string;
  description: string;
  lineItems: LineItemDraft[];
  amountBdt: string;
  usdBdtRate: string;
  paymentMethod: PaymentMethod | "";
  clientRegion: ClientRegion | "";
  projectId: string;
};

type InvoicePanelProps = {
  lead: LeadRecord;
  projects: ProjectRecord[];
  invoices: InvoiceRecord[];
  saving: boolean;
  onSavingChange: (saving: boolean) => void;
  onRefresh: () => Promise<void>;
  embedded?: boolean;
};

const unitOptions: { value: InvoiceLineItemUnit | ""; label: string }[] = [
  { value: "", label: "—" },
  { value: "hours", label: "Hours" },
  { value: "fixed", label: "Fixed" },
];

function lineItemKey() {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function emptyLineItem(): LineItemDraft {
  return {
    key: lineItemKey(),
    description: "",
    quantity: "",
    unit: "",
    unitRateUsd: "",
    amountUsd: "",
  };
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function defaultPaymentMethod(lead: LeadRecord): PaymentMethod | "" {
  if (lead.client_region === "bd") return "bank_transfer_bd";
  if (lead.client_region === "international") return "payoneer";
  return "";
}

function defaultUsdBdtRate(lead: LeadRecord): string {
  if (lead.client_region === "bd") return String(DEFAULT_USD_BDT_RATE);
  return "";
}

function emptyForm(lead: LeadRecord): InvoiceFormState {
  return {
    billingPeriod: "",
    issuedAt: todayIsoDate(),
    dueAt: "",
    description: "",
    lineItems: [emptyLineItem()],
    amountBdt: "",
    usdBdtRate: defaultUsdBdtRate(lead),
    paymentMethod: defaultPaymentMethod(lead),
    clientRegion: lead.client_region ?? "",
    projectId: "",
  };
}

function invoiceToForm(invoice: InvoiceRecord): InvoiceFormState {
  const lineItems =
    invoice.line_items.length > 0
      ? invoice.line_items.map((item) => ({
          key: lineItemKey(),
          description: item.description,
          quantity: item.quantity !== undefined ? String(item.quantity) : "",
          unit: (item.unit ?? "") as InvoiceLineItemUnit | "",
          unitRateUsd:
            item.unitRateUsd !== undefined ? String(item.unitRateUsd) : "",
          amountUsd: String(item.amountUsd),
        }))
      : [emptyLineItem()];

  return {
    billingPeriod: invoice.billing_period ?? "",
    issuedAt: invoice.issued_at?.slice(0, 10) ?? todayIsoDate(),
    dueAt: invoice.due_at?.slice(0, 10) ?? "",
    description: invoice.description ?? "",
    lineItems,
    amountBdt: invoice.amount_bdt !== null ? String(invoice.amount_bdt) : "",
    usdBdtRate:
      invoice.usd_bdt_rate !== null
        ? String(invoice.usd_bdt_rate)
        : invoice.amount_bdt
          ? String(DEFAULT_USD_BDT_RATE)
          : "",
    paymentMethod: invoice.payment_method ?? "",
    clientRegion: invoice.client_region ?? "",
    projectId: invoice.project_id ?? "",
  };
}

function parseLineItemDraft(row: LineItemDraft): InvoiceLineItem | null {
  const description = row.description.trim();
  if (!description) return null;

  const quantity = row.quantity.trim() ? Number(row.quantity) : undefined;
  const unitRateUsd = row.unitRateUsd.trim()
    ? Number(row.unitRateUsd)
    : undefined;
  const unit = row.unit || undefined;

  let amountUsd = row.amountUsd.trim() ? Number(row.amountUsd) : 0;
  if (
    amountUsd <= 0 &&
    quantity !== undefined &&
    !Number.isNaN(quantity) &&
    unitRateUsd !== undefined &&
    !Number.isNaN(unitRateUsd)
  ) {
    amountUsd = quantity * unitRateUsd;
  }

  if (amountUsd <= 0 || Number.isNaN(amountUsd)) return null;

  return {
    description,
    quantity: quantity !== undefined && !Number.isNaN(quantity) ? quantity : undefined,
    unit,
    unitRateUsd:
      unitRateUsd !== undefined && !Number.isNaN(unitRateUsd)
        ? unitRateUsd
        : undefined,
    amountUsd,
  };
}

function sumLineItemsUsd(items: InvoiceLineItem[]): number {
  return items.reduce((sum, item) => sum + item.amountUsd, 0);
}

function buildPayload(
  leadId: string,
  form: InvoiceFormState
): CreateInvoiceInput | { error: string } {
  const lineItems = form.lineItems
    .map(parseLineItemDraft)
    .filter((item): item is InvoiceLineItem => item !== null);

  const amountBdt = form.amountBdt.trim() ? Number(form.amountBdt) : undefined;
  const usdBdtRate = form.usdBdtRate.trim()
    ? Number(form.usdBdtRate)
    : undefined;

  const amountUsd = sumLineItemsUsd(lineItems);

  if (
    lineItems.length === 0 &&
    (amountBdt === undefined || amountBdt <= 0)
  ) {
    return { error: "Add at least one line item or a BDT total." };
  }

  if (amountBdt !== undefined && Number.isNaN(amountBdt)) {
    return { error: "Invalid BDT amount." };
  }

  if (usdBdtRate !== undefined && Number.isNaN(usdBdtRate)) {
    return { error: "Invalid exchange rate." };
  }

  if (
    amountBdt !== undefined &&
    amountBdt > 0 &&
    amountUsd <= 0 &&
    (!usdBdtRate || usdBdtRate <= 0)
  ) {
    return {
      error: "Enter USD/BDT rate — it is locked on the invoice when saved.",
    };
  }

  return {
    leadId,
    projectId: form.projectId.trim() || undefined,
    lineItems: lineItems.length > 0 ? lineItems : undefined,
    amountUsd: amountUsd > 0 ? amountUsd : undefined,
    amountBdt: amountBdt && amountBdt > 0 ? amountBdt : undefined,
    usdBdtRate: usdBdtRate && usdBdtRate > 0 ? usdBdtRate : undefined,
    billingPeriod: form.billingPeriod.trim() || undefined,
    description: form.description.trim() || undefined,
    issuedAt: form.issuedAt || undefined,
    dueAt: form.dueAt || undefined,
    paymentMethod: form.paymentMethod || undefined,
    clientRegion: form.clientRegion || undefined,
    status: "draft",
  };
}

export function InvoicePanel({
  lead,
  projects,
  invoices,
  saving,
  onSavingChange,
  onRefresh,
  embedded = false,
}: InvoicePanelProps) {
  const [mode, setMode] = useState<"list" | "new" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<InvoiceFormState>(() => emptyForm(lead));
  const [formError, setFormError] = useState<string | null>(null);

  const editingInvoice = useMemo(
    () => invoices.find((invoice) => invoice.id === editingId) ?? null,
    [invoices, editingId]
  );

  const isEditable = mode === "new" || editingInvoice?.status === "draft";

  const computedUsd = useMemo(() => {
    const items = form.lineItems
      .map(parseLineItemDraft)
      .filter((item): item is InvoiceLineItem => item !== null);
    return sumLineItemsUsd(items);
  }, [form.lineItems]);

  const billingSummary = useMemo(
    () => summarizeInvoices(invoices),
    [invoices]
  );

  const computedBdt = useMemo(() => {
    const rate = form.usdBdtRate.trim() ? Number(form.usdBdtRate) : 0;
    const explicit = form.amountBdt.trim() ? Number(form.amountBdt) : 0;
    if (explicit > 0) return explicit;
    if (rate > 0 && computedUsd > 0) return Math.round(computedUsd * rate);
    return 0;
  }, [form.amountBdt, form.usdBdtRate, computedUsd]);

  const computedReportingUsd = useMemo(() => {
    const bdt = form.amountBdt.trim() ? Number(form.amountBdt) : 0;
    const rate = form.usdBdtRate.trim() ? Number(form.usdBdtRate) : 0;
    if (bdt > 0 && rate > 0) return Math.round(bdt / rate);
    return computedUsd;
  }, [form.amountBdt, form.usdBdtRate, computedUsd]);

  useEffect(() => {
    if (mode === "list") {
      setFormError(null);
    }
  }, [mode]);

  function openNew() {
    setForm(emptyForm(lead));
    setEditingId(null);
    setMode("new");
    setFormError(null);
  }

  function openEdit(invoice: InvoiceRecord) {
    setForm(invoiceToForm(invoice));
    setEditingId(invoice.id);
    setMode("edit");
    setFormError(null);
  }

  function closeEditor() {
    setMode("list");
    setEditingId(null);
    setFormError(null);
  }

  function invoicePdfHref(invoiceId: string) {
    return `/api/invoices/${invoiceId}/pdf`;
  }

  function updateLineItem(
    key: string,
    patch: Partial<Omit<LineItemDraft, "key">>
  ) {
    setForm((current) => ({
      ...current,
      lineItems: current.lineItems.map((row) =>
        row.key === key ? { ...row, ...patch } : row
      ),
    }));
  }

  function addLineItem() {
    setForm((current) => ({
      ...current,
      lineItems: [...current.lineItems, emptyLineItem()],
    }));
  }

  function removeLineItem(key: string) {
    setForm((current) => ({
      ...current,
      lineItems:
        current.lineItems.length <= 1
          ? [emptyLineItem()]
          : current.lineItems.filter((row) => row.key !== key),
    }));
  }

  async function saveDraft() {
    const payload = buildPayload(lead.id, form);
    if ("error" in payload) {
      setFormError(payload.error);
      return;
    }

    onSavingChange(true);
    setFormError(null);

    const response =
      mode === "new"
        ? await fetch("/api/invoices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : editingId
          ? await fetch("/api/invoices", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: editingId,
                ...toUpdatePayload(payload),
              } satisfies UpdateInvoiceInput),
            })
          : null;

    onSavingChange(false);

    if (!response || !response.ok) {
      setFormError("Could not save invoice.");
      return;
    }

    await onRefresh();
    closeEditor();
  }

  async function updateStatus(
    invoiceId: string,
    status: InvoiceRecord["status"]
  ) {
    onSavingChange(true);
    const response = await fetch("/api/invoices", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: invoiceId, status }),
    });
    onSavingChange(false);

    if (!response.ok) return;
    await onRefresh();
    if (mode === "edit" && editingId === invoiceId && status !== "draft") {
      closeEditor();
    }
  }

  async function deleteDraft(invoiceId: string) {
    if (!window.confirm("Delete this draft invoice?")) return;

    onSavingChange(true);
    const response = await fetch(`/api/invoices?id=${invoiceId}`, {
      method: "DELETE",
    });
    onSavingChange(false);

    if (!response.ok) {
      setFormError("Could not delete draft invoice.");
      return;
    }
    setFormError(null);
    await onRefresh();
    if (editingId === invoiceId) closeEditor();
  }

  return (
    <div
      className={
        embedded ? "space-y-3" : "border-t border-rdx-border pt-4 space-y-3"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-rdx-ink">Invoices</h3>
        {mode === "list" && (
          <RdxButton type="button" variant="secondary" onClick={openNew}>
            New invoice
          </RdxButton>
        )}
      </div>

      {formError && (
        <p className="text-sm text-red-600" role="alert">
          {formError}
        </p>
      )}

      {mode !== "list" && (
        <div className="space-y-3 rounded-rdx border border-rdx-border bg-rdx-surface/50 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-rdx-ink">
              {mode === "new"
                ? "New draft"
                : editingInvoice?.invoice_number ?? "Invoice"}
            </p>
            <button
              type="button"
              className="text-xs text-rdx-muted hover:text-rdx-ink"
              onClick={closeEditor}
            >
              Close
            </button>
          </div>

          {editingInvoice && !isEditable && (
            <p className="text-xs text-rdx-muted">
              {invoiceStatusLabels[editingInvoice.status]} — read only
              {editingInvoice.bill_to_name
                ? ` · Bill to ${editingInvoice.bill_to_name}`
                : ""}
            </p>
          )}

          <FormField label="Billing period" htmlFor="inv_billing_period">
            <input
              id="inv_billing_period"
              className={rdxInputClassName}
              value={form.billingPeriod}
              disabled={!isEditable}
              placeholder="Jun 2026"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  billingPeriod: event.target.value,
                }))
              }
            />
          </FormField>

          {projects.length > 0 && (
            <FormField label="Project" htmlFor="inv_project_id">
              <select
                id="inv_project_id"
                className={rdxInputClassName}
                value={form.projectId}
                disabled={!isEditable}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    projectId: event.target.value,
                  }))
                }
              >
                <option value="">—</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </FormField>
          )}

          <div className="grid grid-cols-2 gap-2">
            <FormField label="Issue date" htmlFor="inv_issued_at">
              <input
                id="inv_issued_at"
                type="date"
                className={rdxInputClassName}
                value={form.issuedAt}
                disabled={!isEditable}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    issuedAt: event.target.value,
                  }))
                }
              />
            </FormField>
            <FormField label="Due date" htmlFor="inv_due_at">
              <input
                id="inv_due_at"
                type="date"
                className={rdxInputClassName}
                value={form.dueAt}
                disabled={!isEditable}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    dueAt: event.target.value,
                  }))
                }
              />
            </FormField>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-rdx-muted">
              Line items
            </p>
            {form.lineItems.map((row, index) => (
              <div
                key={row.key}
                className="space-y-2 rounded-rdx border border-rdx-border p-2"
              >
                <FormField
                  label={`Service ${index + 1}`}
                  htmlFor={`inv_line_desc_${row.key}`}
                >
                  <input
                    id={`inv_line_desc_${row.key}`}
                    className={rdxInputClassName}
                    value={row.description}
                    disabled={!isEditable}
                    placeholder="What you delivered"
                    onChange={(event) =>
                      updateLineItem(row.key, {
                        description: event.target.value,
                      })
                    }
                  />
                </FormField>
                <div className="grid grid-cols-2 gap-2">
                  <FormField label="Qty" htmlFor={`inv_line_qty_${row.key}`}>
                    <input
                      id={`inv_line_qty_${row.key}`}
                      type="number"
                      min="0"
                      step="0.5"
                      className={rdxInputClassName}
                      value={row.quantity}
                      disabled={!isEditable}
                      onChange={(event) =>
                        updateLineItem(row.key, { quantity: event.target.value })
                      }
                    />
                  </FormField>
                  <FormField label="Unit" htmlFor={`inv_line_unit_${row.key}`}>
                    <select
                      id={`inv_line_unit_${row.key}`}
                      className={rdxInputClassName}
                      value={row.unit}
                      disabled={!isEditable}
                      onChange={(event) =>
                        updateLineItem(row.key, {
                          unit: event.target.value as InvoiceLineItemUnit | "",
                        })
                      }
                    >
                      {unitOptions.map((option) => (
                        <option key={option.value || "none"} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Rate $" htmlFor={`inv_line_rate_${row.key}`}>
                    <input
                      id={`inv_line_rate_${row.key}`}
                      type="number"
                      min="0"
                      step="1"
                      className={rdxInputClassName}
                      value={row.unitRateUsd}
                      disabled={!isEditable}
                      onChange={(event) =>
                        updateLineItem(row.key, {
                          unitRateUsd: event.target.value,
                        })
                      }
                    />
                  </FormField>
                  <FormField label="Amount $" htmlFor={`inv_line_amt_${row.key}`}>
                    <input
                      id={`inv_line_amt_${row.key}`}
                      type="number"
                      min="0"
                      step="1"
                      className={rdxInputClassName}
                      value={row.amountUsd}
                      disabled={!isEditable}
                      placeholder="Auto from qty × rate"
                      onChange={(event) =>
                        updateLineItem(row.key, {
                          amountUsd: event.target.value,
                        })
                      }
                    />
                  </FormField>
                </div>
                {isEditable && form.lineItems.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-rdx-muted hover:text-red-600"
                    onClick={() => removeLineItem(row.key)}
                  >
                    Remove line
                  </button>
                )}
              </div>
            ))}
            {isEditable && (
              <button
                type="button"
                className="text-xs text-rdx-accent hover:text-rdx-accent-hover"
                onClick={addLineItem}
              >
                + Add line
              </button>
            )}
          </div>

          <div className="rounded-rdx bg-rdx-surface px-3 py-2 text-sm">
            <div className="flex justify-between text-rdx-ink">
              <span>Total USD (reporting)</span>
              <span className="font-medium">{formatUsd(computedReportingUsd)}</span>
            </div>
            {computedUsd > 0 && computedUsd !== computedReportingUsd && (
              <div className="mt-1 flex justify-between text-rdx-muted">
                <span>From line items</span>
                <span>{formatUsd(computedUsd)}</span>
              </div>
            )}
            {computedBdt > 0 && (
              <div className="mt-1 flex justify-between text-rdx-muted">
                <span>Total BDT</span>
                <span>{formatBdt(computedBdt)}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FormField label="BDT total" htmlFor="inv_amount_bdt">
              <input
                id="inv_amount_bdt"
                type="number"
                min="0"
                step="1"
                className={rdxInputClassName}
                value={form.amountBdt}
                disabled={!isEditable}
                placeholder="21600"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    amountBdt: event.target.value,
                  }))
                }
              />
            </FormField>
            <FormField label="USD/BDT rate" htmlFor="inv_usd_bdt_rate">
              <input
                id="inv_usd_bdt_rate"
                type="number"
                min="0"
                step="0.01"
                className={rdxInputClassName}
                value={form.usdBdtRate}
                disabled={!isEditable}
                placeholder={String(DEFAULT_USD_BDT_RATE)}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    usdBdtRate: event.target.value,
                  }))
                }
              />
              <p className="mt-1 text-xs text-rdx-muted">
                Locked at save — not live FX. Default {DEFAULT_USD_BDT_RATE} for BD.
              </p>
            </FormField>
          </div>

          <FormField label="Payment method" htmlFor="inv_payment_method">
            <select
              id="inv_payment_method"
              className={rdxInputClassName}
              value={form.paymentMethod}
              disabled={!isEditable}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  paymentMethod: event.target.value as PaymentMethod | "",
                }))
              }
            >
              <option value="">—</option>
              {paymentMethodOptions.map((method) => (
                <option key={method} value={method}>
                  {paymentMethodLabels[method]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Client region" htmlFor="inv_client_region">
            <select
              id="inv_client_region"
              className={rdxInputClassName}
              value={form.clientRegion}
              disabled={!isEditable}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  clientRegion: (event.target.value || "") as ClientRegion | "",
                }))
              }
            >
              <option value="">—</option>
              {clientRegionOptions.map((region) => (
                <option key={region} value={region}>
                  {clientRegionLabels[region]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Notes (optional)" htmlFor="inv_description">
            <textarea
              id="inv_description"
              rows={2}
              className={rdxInputClassName}
              value={form.description}
              disabled={!isEditable}
              placeholder="Internal note or summary"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </FormField>

          {formError && (
            <p className="text-sm text-red-600">{formError}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {isEditable && (
              <RdxButton type="button" onClick={saveDraft} disabled={saving}>
                {mode === "new" ? "Create draft" : "Save draft"}
              </RdxButton>
            )}
            {editingInvoice?.status === "draft" && (
              <>
                <RdxButton
                  type="button"
                  variant="secondary"
                  disabled={saving}
                  onClick={() => updateStatus(editingInvoice.id, "sent")}
                >
                  Mark sent
                </RdxButton>
                <RdxButton
                  type="button"
                  variant="ghost"
                  disabled={saving}
                  onClick={() => deleteDraft(editingInvoice.id)}
                >
                  Delete
                </RdxButton>
              </>
            )}
            {editingInvoice?.status === "sent" && (
              <RdxButton
                type="button"
                variant="secondary"
                disabled={saving}
                onClick={() => updateStatus(editingInvoice.id, "paid")}
              >
                Mark paid
              </RdxButton>
            )}
            {editingInvoice && (
              <RdxButton
                type="button"
                variant="secondary"
                href={invoicePdfHref(editingInvoice.id)}
              >
                Download PDF
              </RdxButton>
            )}
          </div>
        </div>
      )}

      {invoices.length === 0 && mode === "list" ? (
        <p className="text-sm text-rdx-muted">No invoices yet.</p>
      ) : (
        mode === "list" && (
          <ul className="space-y-2">
            {invoices.map((invoice) => (
              <li
                key={invoice.id}
                className="rounded-rdx border border-rdx-border p-3 text-sm"
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => openEdit(invoice)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-rdx-ink">
                      {invoice.invoice_number}
                    </span>
                    <span>
                      {formatUsd(invoiceReportingUsd(invoice))}
                      {invoice.amount_bdt
                        ? ` · ${formatBdt(invoice.amount_bdt)}`
                        : ""}
                    </span>
                  </div>
                  {invoice.billing_period && (
                    <p className="text-xs text-rdx-muted">
                      {invoice.billing_period}
                    </p>
                  )}
                  <p className="mt-1 text-rdx-muted">
                    {invoiceStatusLabels[invoice.status]}
                    {invoice.payment_method
                      ? ` · ${paymentMethodLabels[invoice.payment_method]}`
                      : ""}
                  </p>
                </button>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href={invoicePdfHref(invoice.id)}
                    className="text-xs text-rdx-accent hover:text-rdx-accent-hover"
                  >
                    PDF
                  </a>
                  {invoice.status === "draft" && (
                    <>
                      <button
                        type="button"
                        className="text-xs text-rdx-accent hover:text-rdx-accent-hover"
                        onClick={() => openEdit(invoice)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-xs text-rdx-accent hover:text-rdx-accent-hover"
                        onClick={(event) => {
                          event.stopPropagation();
                          void updateStatus(invoice.id, "sent");
                        }}
                      >
                        Mark sent
                      </button>
                      <button
                        type="button"
                        className="text-xs text-red-600 hover:text-red-700"
                        onClick={(event) => {
                          event.stopPropagation();
                          void deleteDraft(invoice.id);
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {invoice.status === "sent" && (
                    <button
                      type="button"
                      className="text-xs text-rdx-accent hover:text-rdx-accent-hover"
                      onClick={() => updateStatus(invoice.id, "paid")}
                    >
                      Mark paid
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )
      )}

      {mode === "list" && billingSummary.invoiceCount > 0 && (
        <p className="text-xs text-rdx-muted">
          {formatUsd(billingSummary.paidUsd)} collected
          {billingSummary.outstandingUsd > 0
            ? ` · ${formatUsd(billingSummary.outstandingUsd)} outstanding`
            : ""}
          {" · "}
          {billingSummary.paidCount} paid
          {billingSummary.sentCount > 0
            ? ` · ${billingSummary.sentCount} sent`
            : ""}
          {billingSummary.draftCount > 0
            ? ` · ${billingSummary.draftCount} draft`
            : ""}
        </p>
      )}
    </div>
  );
}

function toUpdatePayload(
  input: CreateInvoiceInput
): Omit<UpdateInvoiceInput, "id"> {
  return {
    projectId: input.projectId ?? null,
    lineItems: input.lineItems,
    amountUsd: input.amountUsd,
    amountBdt: input.amountBdt ?? null,
    usdBdtRate: input.usdBdtRate ?? null,
    billingPeriod: input.billingPeriod ?? null,
    description: input.description ?? null,
    issuedAt: input.issuedAt ?? null,
    dueAt: input.dueAt ?? null,
    paymentMethod: input.paymentMethod ?? null,
    clientRegion: input.clientRegion ?? null,
  };
}
