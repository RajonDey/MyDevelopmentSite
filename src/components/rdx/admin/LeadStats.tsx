"use client";

import type { LeadReport } from "@/types/rdx/lead";
import { formatUsd } from "@/content/rdx/lead-desk";

type LeadStatsProps = {
  report: LeadReport | null;
  loading: boolean;
};

export function LeadStats({ report, loading }: LeadStatsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-rdx border border-rdx-border bg-rdx-surface"
          />
        ))}
      </div>
    );
  }

  if (!report) {
    return null;
  }

  const { invoiceSummary } = report;
  const totalInvoices =
    invoiceSummary.draft + invoiceSummary.sent + invoiceSummary.paid;

  const cards = [
    {
      label: "Total clients",
      value: String(report.total),
      hint: `${report.openPipeline} in pipeline`,
    },
    {
      label: "Collected",
      value: formatUsd(invoiceSummary.totalPaidUsd),
      hint: `${invoiceSummary.paid} paid invoice${invoiceSummary.paid === 1 ? "" : "s"}`,
    },
    {
      label: "Outstanding",
      value: formatUsd(invoiceSummary.totalOutstandingUsd),
      hint: `${invoiceSummary.sent} awaiting payment`,
    },
    {
      label: "Invoices",
      value: String(totalInvoices),
      hint: `${invoiceSummary.paid} paid · ${invoiceSummary.sent} sent · ${invoiceSummary.draft} draft`,
    },
    {
      label: "Needs follow-up",
      value: String(report.needsFollowUp),
      hint: "Stale or follow-up step",
    },
    {
      label: "Won",
      value: String(report.wonCount),
      hint: "Closed deals",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-rdx border border-rdx-border bg-rdx-surface p-4"
        >
          <p className="text-sm text-rdx-muted">{card.label}</p>
          <p className="mt-1 text-2xl font-semibold text-rdx-ink">{card.value}</p>
          <p className="mt-1 text-xs text-rdx-subtle">{card.hint}</p>
        </div>
      ))}
    </div>
  );
}
