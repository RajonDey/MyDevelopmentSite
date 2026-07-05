"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  ClientRegion,
  CreateLeadInput,
  LeadKind,
  LeadNextStep,
  LeadRecord,
  LeadReport,
  LeadStatus,
  UpdateLeadInput,
} from "@/types/rdx/lead";
import type { InvoiceRecord } from "@/types/rdx/invoice";
import type { ProjectRecord } from "@/types/rdx/project";
import {
  clientRegionLabels,
  clientRegionOptions,
  formatLeadSource,
  formatUsd,
  leadKindLabels,
  leadNextStepLabels,
  leadStatusLabels,
} from "@/content/rdx/lead-desk";
import { ClientSummaryStrip } from "@/components/rdx/admin/ClientSummaryStrip";
import { InvoicePanel } from "@/components/rdx/admin/InvoicePanel";
import { ProjectPanel } from "@/components/rdx/admin/ProjectPanel";
import { LeadStats } from "@/components/rdx/admin/LeadStats";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";
import {
  emptyBillingSummary,
  leadHasBillingHistory,
  summarizeInvoices,
} from "@/lib/invoices";

const statusOptions: LeadStatus[] = [
  "new",
  "in_discussion",
  "won",
  "lost",
  "archived",
];

const nextStepOptions: LeadNextStep[] = [
  "follow_up",
  "send_proposal",
  "no_response",
  "waiting",
  "none",
];

const kindOptions: LeadKind[] = ["lead", "task", "idea"];

type StatusFilter = "all" | LeadStatus;
type DetailTab = "details" | "projects" | "invoices";
type ActionMessage = { type: "success" | "error"; text: string };

const detailTabs: { id: DetailTab; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "projects", label: "Projects" },
  { id: "invoices", label: "Invoices" },
];

const emptyLeadForm: CreateLeadInput = {
  agencyName: "",
  contactName: "",
  email: "",
  source: "manual",
  status: "new",
  leadKind: "lead",
};

export function LeadDesk() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [report, setReport] = useState<LeadReport | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<CreateLeadInput>(emptyLeadForm);
  const [draft, setDraft] = useState<UpdateLeadInput | null>(null);
  const [saving, setSaving] = useState(false);
  const [detailTab, setDetailTab] = useState<DetailTab>("details");
  const [actionMessage, setActionMessage] = useState<ActionMessage | null>(null);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedId) ?? null,
    [leads, selectedId]
  );

  const filteredLeads = useMemo(() => {
    if (statusFilter === "all") return leads;
    return leads.filter((lead) => lead.status === statusFilter);
  }, [leads, statusFilter]);

  const selectedBilling = useMemo(
    () => summarizeInvoices(invoices),
    [invoices]
  );

  const selectedHasBillingHistory = useMemo(
    () => leadHasBillingHistory(invoices),
    [invoices]
  );

  function billingForLead(leadId: string) {
    return report?.billingByLead[leadId] ?? emptyBillingSummary;
  }

  function showAction(type: ActionMessage["type"], text: string) {
    setActionMessage({ type, text });
  }

  const loadDesk = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadsResponse, reportResponse] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/leads?report=1"),
      ]);

      if (!leadsResponse.ok) {
        throw new Error("Unable to load leads");
      }

      const leadsData = (await leadsResponse.json()) as { leads: LeadRecord[] };
      setLeads(leadsData.leads);

      if (reportResponse.ok) {
        const reportData = (await reportResponse.json()) as { report: LeadReport };
        setReport(reportData.report);
      }
    } catch {
      setError("Could not load lead desk. Check admin session and Supabase config.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadInvoices = useCallback(async (leadId: string) => {
    const response = await fetch(`/api/invoices?leadId=${leadId}`);
    if (!response.ok) return;
    const data = (await response.json()) as { invoices: InvoiceRecord[] };
    setInvoices(data.invoices);
  }, []);

  const loadProjects = useCallback(async (leadId: string) => {
    const response = await fetch(`/api/projects?leadId=${leadId}`);
    if (!response.ok) return;
    const data = (await response.json()) as { projects: ProjectRecord[] };
    setProjects(data.projects);
  }, []);

  useEffect(() => {
    loadDesk();
  }, [loadDesk]);

  useEffect(() => {
    if (!selectedLead) {
      setDraft(null);
      setInvoices([]);
      setProjects([]);
      setDetailTab("details");
      return;
    }

    setDetailTab("details");
    setDraft({
      id: selectedLead.id,
      agencyName: selectedLead.agency_name,
      contactName: selectedLead.contact_name,
      email: selectedLead.email,
      phone: selectedLead.phone,
      billingName: selectedLead.billing_name,
      billingAddress: selectedLead.billing_address,
      clientRegion: selectedLead.client_region,
      status: selectedLead.status,
      source: selectedLead.source,
      nextStep: selectedLead.next_step,
      notes: selectedLead.notes,
      lastContactAt: selectedLead.last_contact_at,
      leadKind: selectedLead.lead_kind,
    });
    loadInvoices(selectedLead.id);
    loadProjects(selectedLead.id);
  }, [selectedLead, loadInvoices, loadProjects]);

  const refreshLeadDetails = useCallback(async () => {
    if (!selectedLead) return;
    await Promise.all([
      loadInvoices(selectedLead.id),
      loadProjects(selectedLead.id),
      loadDesk(),
    ]);
  }, [selectedLead, loadInvoices, loadProjects, loadDesk]);

  const refreshInvoicesAndReport = refreshLeadDetails;

  async function saveLead() {
    if (!draft) return;
    setSaving(true);
    const response = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    setSaving(false);

    if (!response.ok) {
      showAction("error", "Could not save changes.");
      return;
    }

    const data = (await response.json()) as { lead: LeadRecord };
    setLeads((current) =>
      current.map((lead) => (lead.id === data.lead.id ? data.lead : lead))
    );
    showAction("success", "Changes saved.");
    await loadDesk();
  }

  async function createLead() {
    if (!addForm.agencyName.trim()) return;
    setSaving(true);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    setSaving(false);

    if (!response.ok) {
      showAction("error", "Could not create lead.");
      return;
    }

    const data = (await response.json()) as { lead: LeadRecord };
    setLeads((current) => [data.lead, ...current]);
    setAddForm(emptyLeadForm);
    setShowAddForm(false);
    setSelectedId(data.lead.id);
    showAction("success", "Lead added.");
    await loadDesk();
  }

  async function archiveSelectedLead() {
    if (!selectedLead) return;
    if (
      !window.confirm(`Archive "${selectedLead.agency_name}"? Billing history will be kept.`)
    ) {
      return;
    }

    setSaving(true);
    const response = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedLead.id, status: "archived" }),
    });
    setSaving(false);

    if (!response.ok) {
      showAction("error", "Could not archive lead.");
      return;
    }

    const data = (await response.json()) as { lead: LeadRecord };
    setLeads((current) =>
      current.map((lead) => (lead.id === data.lead.id ? data.lead : lead))
    );
    showAction("success", "Lead archived.");
    await loadDesk();
  }

  async function deleteSelectedLead() {
    if (!selectedLead) return;
    if (
      !window.confirm(
        `Permanently delete "${selectedLead.agency_name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    setSaving(true);
    const response = await fetch(`/api/leads/${selectedLead.id}`, {
      method: "DELETE",
    });
    setSaving(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      showAction("error", data?.error ?? "Could not delete lead.");
      return;
    }

    setLeads((current) => current.filter((lead) => lead.id !== selectedLead.id));
    setSelectedId(null);
    showAction("success", "Lead deleted.");
    await loadDesk();
  }

  if (loading) {
    return <p className="text-sm text-rdx-muted">Loading lead desk…</p>;
  }

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">{error}</p>
        <RdxButton type="button" variant="secondary" onClick={loadDesk}>
          Retry
        </RdxButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LeadStats report={report} loading={false} />

      {actionMessage && (
        <div
          role="alert"
          className={`rounded-rdx border px-4 py-3 text-sm ${
            actionMessage.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-rdx-border bg-rdx-surface text-rdx-ink"
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", ...statusOptions] as StatusFilter[]).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`rounded-rdx px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === filter
                  ? "bg-rdx-ink text-rdx-paper"
                  : "bg-rdx-surface text-rdx-muted hover:text-rdx-ink"
              }`}
            >
              {filter === "all" ? "All" : leadStatusLabels[filter]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <RdxButton type="button" variant="secondary" onClick={loadDesk}>
            Refresh
          </RdxButton>
          <RdxButton type="button" onClick={() => setShowAddForm((open) => !open)}>
            {showAddForm ? "Cancel" : "Add lead"}
          </RdxButton>
        </div>
      </div>

      {showAddForm && (
        <RdxCard className="space-y-4">
          <h2 className="text-lg font-semibold text-rdx-ink">Add lead or task</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" htmlFor="add_name" required>
              <input
                id="add_name"
                className={rdxInputClassName}
                value={addForm.agencyName}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    agencyName: event.target.value,
                  }))
                }
              />
            </FormField>
            <FormField label="Email" htmlFor="add_email">
              <input
                id="add_email"
                type="email"
                className={rdxInputClassName}
                value={addForm.email ?? ""}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </FormField>
            <FormField label="Source" htmlFor="add_source">
              <input
                id="add_source"
                className={rdxInputClassName}
                value={addForm.source ?? ""}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    source: event.target.value,
                  }))
                }
              />
            </FormField>
            <FormField label="Kind" htmlFor="add_kind">
              <select
                id="add_kind"
                className={rdxInputClassName}
                value={addForm.leadKind}
                onChange={(event) =>
                  setAddForm((current) => ({
                    ...current,
                    leadKind: event.target.value as LeadKind,
                  }))
                }
              >
                {kindOptions.map((kind) => (
                  <option key={kind} value={kind}>
                    {leadKindLabels[kind]}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <RdxButton type="button" onClick={createLead} disabled={saving}>
            Save lead
          </RdxButton>
        </RdxCard>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)]">
        <div className="overflow-x-auto rounded-rdx border border-rdx-border">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-rdx-border bg-rdx-surface">
              <tr>
                <th className="px-4 py-3 font-medium text-rdx-ink">Name</th>
                <th className="px-4 py-3 font-medium text-rdx-ink">Kind</th>
                <th className="px-4 py-3 font-medium text-rdx-ink">Status</th>
                <th className="px-4 py-3 font-medium text-rdx-ink">Revenue</th>
                <th className="px-4 py-3 font-medium text-rdx-ink">Invoices</th>
                <th className="px-4 py-3 font-medium text-rdx-ink">Next step</th>
                <th className="px-4 py-3 font-medium text-rdx-ink">Source</th>
                <th className="px-4 py-3 font-medium text-rdx-ink">Last contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-rdx-muted">
                    No leads in this view.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const billing = billingForLead(lead.id);
                  return (
                  <tr
                    key={lead.id}
                    className={`cursor-pointer border-b border-rdx-border last:border-0 hover:bg-rdx-surface ${
                      selectedId === lead.id ? "bg-rdx-surface" : ""
                    }`}
                    onClick={() => setSelectedId(lead.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-rdx-ink">{lead.agency_name}</div>
                      {lead.email && (
                        <div className="text-xs text-rdx-muted">{lead.email}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <RdxBadge>{leadKindLabels[lead.lead_kind]}</RdxBadge>
                    </td>
                    <td className="px-4 py-3 text-rdx-ink">
                      {leadStatusLabels[lead.status]}
                    </td>
                    <td className="px-4 py-3 text-rdx-ink">
                      {billing.paidUsd > 0 ? formatUsd(billing.paidUsd) : "—"}
                    </td>
                    <td className="px-4 py-3 text-rdx-muted">
                      {billing.invoiceCount > 0 ? billing.invoiceCount : "—"}
                    </td>
                    <td className="px-4 py-3 text-rdx-muted">
                      {lead.next_step
                        ? leadNextStepLabels[lead.next_step]
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-rdx-muted">
                      {formatLeadSource(lead.source, lead.payload)}
                    </td>
                    <td className="px-4 py-3 text-rdx-muted">
                      {lead.last_contact_at
                        ? new Date(lead.last_contact_at).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <RdxCard className="h-fit space-y-4 lg:sticky lg:top-24">
          {!selectedLead || !draft ? (
            <p className="text-sm text-rdx-muted">
              Select a lead to edit notes, status, and invoices.
            </p>
          ) : (
            <>
              <ClientSummaryStrip lead={selectedLead} billing={selectedBilling} />

              <div className="flex gap-1 border-b border-rdx-border">
                {detailTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setDetailTab(tab.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      detailTab === tab.id
                        ? "border-b-2 border-rdx-ink text-rdx-ink"
                        : "text-rdx-muted hover:text-rdx-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {detailTab === "details" && (
                <>
                  <p className="text-sm text-rdx-muted">
                    {selectedLead.form_type === "manual"
                      ? "Manual entry"
                      : `From /${selectedLead.form_type}`}
                  </p>

                  <div className="grid gap-3">
                    <FormField label="Display name" htmlFor="edit_agency_name" required>
                      <input
                        id="edit_agency_name"
                        className={rdxInputClassName}
                        value={draft.agencyName ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? { ...current, agencyName: event.target.value }
                              : current
                          )
                        }
                      />
                    </FormField>

                    <FormField label="Contact name" htmlFor="edit_contact_name">
                      <input
                        id="edit_contact_name"
                        className={rdxInputClassName}
                        value={draft.contactName ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? { ...current, contactName: event.target.value }
                              : current
                          )
                        }
                      />
                    </FormField>

                    <FormField label="Billing name" htmlFor="edit_billing_name">
                      <input
                        id="edit_billing_name"
                        className={rdxInputClassName}
                        value={draft.billingName ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  billingName: event.target.value || null,
                                }
                              : current
                          )
                        }
                        placeholder="Company on invoice"
                      />
                    </FormField>

                    <FormField label="Billing address" htmlFor="edit_billing_address">
                      <input
                        id="edit_billing_address"
                        className={rdxInputClassName}
                        value={draft.billingAddress ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  billingAddress: event.target.value || null,
                                }
                              : current
                          )
                        }
                        placeholder="City or full address"
                      />
                    </FormField>

                    <FormField label="Client region" htmlFor="edit_client_region">
                      <select
                        id="edit_client_region"
                        className={rdxInputClassName}
                        value={draft.clientRegion ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  clientRegion: (event.target.value ||
                                    null) as ClientRegion | null,
                                }
                              : current
                          )
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

                    <FormField label="Status" htmlFor="edit_status">
                      <select
                        id="edit_status"
                        className={rdxInputClassName}
                        value={draft.status}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? { ...current, status: event.target.value as LeadStatus }
                              : current
                          )
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {leadStatusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Next step" htmlFor="edit_next_step">
                      <select
                        id="edit_next_step"
                        className={rdxInputClassName}
                        value={draft.nextStep ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  nextStep: (event.target.value ||
                                    null) as LeadNextStep | null,
                                }
                              : current
                          )
                        }
                      >
                        <option value="">—</option>
                        {nextStepOptions.map((step) => (
                          <option key={step} value={step}>
                            {leadNextStepLabels[step]}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Last contact" htmlFor="edit_last_contact">
                      <input
                        id="edit_last_contact"
                        type="date"
                        className={rdxInputClassName}
                        value={draft.lastContactAt?.slice(0, 10) ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  lastContactAt: event.target.value
                                    ? new Date(event.target.value).toISOString()
                                    : null,
                                }
                              : current
                          )
                        }
                      />
                    </FormField>

                    <FormField label="Email" htmlFor="edit_email">
                      <input
                        id="edit_email"
                        type="email"
                        className={rdxInputClassName}
                        value={draft.email ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? { ...current, email: event.target.value || null }
                              : current
                          )
                        }
                      />
                    </FormField>

                    <FormField label="Notes" htmlFor="edit_notes">
                      <textarea
                        id="edit_notes"
                        rows={4}
                        className={rdxInputClassName}
                        value={draft.notes ?? ""}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? { ...current, notes: event.target.value || null }
                              : current
                          )
                        }
                      />
                    </FormField>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <RdxButton type="button" onClick={saveLead} disabled={saving}>
                      Save changes
                    </RdxButton>
                    {draft.email && (
                      <RdxButton
                        type="button"
                        variant="secondary"
                        href={`mailto:${draft.email}`}
                      >
                        Email
                      </RdxButton>
                    )}
                    {selectedHasBillingHistory ? (
                      <RdxButton
                        type="button"
                        variant="secondary"
                        onClick={archiveSelectedLead}
                        disabled={saving}
                      >
                        Archive
                      </RdxButton>
                    ) : (
                      <RdxButton
                        type="button"
                        variant="ghost"
                        onClick={deleteSelectedLead}
                        disabled={saving}
                      >
                        Delete
                      </RdxButton>
                    )}
                  </div>

                  {selectedHasBillingHistory && (
                    <p className="text-xs text-rdx-muted">
                      Leads with sent or paid invoices cannot be deleted. Archive
                      hides them from the pipeline while keeping billing history.
                    </p>
                  )}
                </>
              )}

              {detailTab === "projects" && (
                <ProjectPanel
                  lead={selectedLead}
                  projects={projects}
                  saving={saving}
                  onSavingChange={setSaving}
                  onRefresh={refreshLeadDetails}
                  embedded
                />
              )}

              {detailTab === "invoices" && (
                <InvoicePanel
                  lead={selectedLead}
                  projects={projects}
                  invoices={invoices}
                  saving={saving}
                  onSavingChange={setSaving}
                  onRefresh={refreshInvoicesAndReport}
                  embedded
                />
              )}
            </>
          )}
        </RdxCard>
      </div>
    </div>
  );
}
