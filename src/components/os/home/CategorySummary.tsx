"use client";

import Link from "next/link";
import { OsCard } from "@/components/os/ui/OsCard";
import { useOsData } from "@/components/os/context/OsDataContext";
import { getPillarCapacityState } from "@/lib/os/capacity";
import { getMember } from "@/lib/os/selectors";
import { cn } from "@/lib/utils";

export function CategorySummary() {
  const { data } = useOsData();

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium text-os-text">Categories at a glance</h2>
          <p className="mt-0.5 text-xs text-os-muted">
            Slot usage across four fixed lanes — manage on Projects
          </p>
        </div>
        <Link
          href="/os/projects"
          className="text-xs text-os-accent hover:underline"
        >
          Open Projects →
        </Link>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {data.pillars.map((pillar) => {
          const { used, limit, over } = getPillarCapacityState(
            pillar,
            data.projects,
            data
          );
          const lead = pillar.leadId ? getMember(data, pillar.leadId) : undefined;

          return (
            <OsCard key={pillar.id} className="!p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-os-text">
                    {pillar.emoji} {pillar.name}
                  </p>
                  {lead ? (
                    <p className="text-xs text-os-muted">Lead: {lead.name}</p>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-rdx-pill px-2 py-0.5 text-xs font-medium",
                    over
                      ? "bg-os-red/15 text-os-red"
                      : used === limit
                        ? "bg-os-yellow/15 text-os-yellow"
                        : "bg-os-surface-raised text-os-muted"
                  )}
                >
                  {used}/{limit}
                </span>
              </div>
            </OsCard>
          );
        })}
      </div>
    </section>
  );
}
