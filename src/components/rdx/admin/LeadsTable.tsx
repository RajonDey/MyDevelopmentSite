"use client";

import { useCallback, useEffect, useState } from "react";
import type { LeadRecord, LeadStatus } from "@/types/rdx/lead";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { rdxInputClassName } from "@/components/rdx/forms/FormField";

const statusOptions: LeadStatus[] = [
  "new",
  "reviewing",
  "qualified",
  "closed",
];

export function LeadsTable() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/leads");
      if (!response.ok) {
        throw new Error("Unable to load leads");
      }
      const data = (await response.json()) as { leads: LeadRecord[] };
      setLeads(data.leads);
    } catch {
      setError("Could not load leads. Check Supabase config and admin access.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  async function updateStatus(id: string, status: LeadStatus) {
    const response = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (response.ok) {
      setLeads((current) =>
        current.map((lead) => (lead.id === id ? { ...lead, status } : lead))
      );
    }
  }

  if (loading) {
    return <p className="text-sm text-rdx-muted">Loading leads…</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (leads.length === 0) {
    return (
      <p className="text-sm text-rdx-muted">
        No leads yet. Submissions from /start will appear here.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-rdx border border-rdx-border">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-rdx-border bg-rdx-surface">
          <tr>
            <th className="px-4 py-3 font-medium text-rdx-ink">Date</th>
            <th className="px-4 py-3 font-medium text-rdx-ink">Type</th>
            <th className="px-4 py-3 font-medium text-rdx-ink">Agency</th>
            <th className="px-4 py-3 font-medium text-rdx-ink">Contact</th>
            <th className="px-4 py-3 font-medium text-rdx-ink">Email</th>
            <th className="px-4 py-3 font-medium text-rdx-ink">Budget</th>
            <th className="px-4 py-3 font-medium text-rdx-ink">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-rdx-border last:border-0">
              <td className="px-4 py-3 text-rdx-muted">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <RdxBadge>{lead.form_type}</RdxBadge>
              </td>
              <td className="px-4 py-3 text-rdx-ink">{lead.agency_name}</td>
              <td className="px-4 py-3 text-rdx-ink">{lead.contact_name}</td>
              <td className="px-4 py-3">
                <a
                  href={`mailto:${lead.email}`}
                  className="text-rdx-accent hover:text-rdx-accent-hover"
                >
                  {lead.email}
                </a>
              </td>
              <td className="px-4 py-3 text-rdx-muted">
                {lead.payload.budget ?? "—"}
              </td>
              <td className="px-4 py-3">
                <select
                  value={lead.status}
                  onChange={(event) =>
                    updateStatus(lead.id, event.target.value as LeadStatus)
                  }
                  className={`${rdxInputClassName} min-w-[8rem] py-1.5`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
