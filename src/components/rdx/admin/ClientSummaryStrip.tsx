"use client";

import type { LeadBillingSummary, LeadRecord } from "@/types/rdx/lead";
import {
  clientRegionLabels,
  formatBdt,
  formatUsd,
  leadKindLabels,
  leadStatusLabels,
} from "@/content/rdx/lead-desk";
import { RdxBadge } from "@/components/rdx/ui/Badge";

type ClientSummaryStripProps = {
  lead: LeadRecord;
  billing: LeadBillingSummary;
};

function invoiceHint(billing: LeadBillingSummary): string {
  if (billing.invoiceCount === 0) return "No invoices yet";

  const parts: string[] = [];
  if (billing.paidCount > 0) parts.push(`${billing.paidCount} paid`);
  if (billing.sentCount > 0) parts.push(`${billing.sentCount} sent`);
  if (billing.draftCount > 0) parts.push(`${billing.draftCount} draft`);

  return `${billing.invoiceCount} invoice${billing.invoiceCount === 1 ? "" : "s"} · ${parts.join(" · ")}`;
}

export function ClientSummaryStrip({ lead, billing }: ClientSummaryStripProps) {
  const billTo = lead.billing_name?.trim();
  const billAddress = lead.billing_address?.trim();
  const region = lead.client_region
    ? clientRegionLabels[lead.client_region]
    : null;

  return (
    <div className="rounded-rdx border border-rdx-border bg-rdx-surface/60 p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-rdx-ink">{lead.agency_name}</h2>
        <RdxBadge>{leadStatusLabels[lead.status]}</RdxBadge>
        <RdxBadge>{leadKindLabels[lead.lead_kind]}</RdxBadge>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-rdx-muted">Collected</p>
          <p className="mt-0.5 font-semibold text-rdx-ink">
            {billing.paidUsd > 0 ? formatUsd(billing.paidUsd) : "—"}
          </p>
          {billing.paidBdt > 0 && (
            <p className="text-xs text-rdx-muted">{formatBdt(billing.paidBdt)}</p>
          )}
        </div>
        <div>
          <p className="text-rdx-muted">Outstanding</p>
          <p className="mt-0.5 font-semibold text-rdx-ink">
            {billing.outstandingUsd > 0 ? formatUsd(billing.outstandingUsd) : "—"}
          </p>
          {billing.outstandingBdt > 0 && (
            <p className="text-xs text-rdx-muted">
              {formatBdt(billing.outstandingBdt)}
            </p>
          )}
        </div>
        <div>
          <p className="text-rdx-muted">Invoices</p>
          <p className="mt-0.5 font-semibold text-rdx-ink">
            {billing.invoiceCount > 0 ? billing.invoiceCount : "—"}
          </p>
        </div>
      </div>

      <p className="text-xs text-rdx-muted">{invoiceHint(billing)}</p>

      {(billTo || billAddress || region) && (
        <p className="text-xs text-rdx-muted">
          Bill to{" "}
          {[billTo, billAddress, region].filter(Boolean).join(" · ")}
        </p>
      )}
    </div>
  );
}
