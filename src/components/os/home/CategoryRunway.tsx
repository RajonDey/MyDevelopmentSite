"use client";

import { OsCard } from "@/components/os/ui/OsCard";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import type { Project } from "@/types/os";
import { getPillarCapacityState } from "@/lib/os/capacity";
import { daysUntil } from "@/lib/os/progress";
import { getMember } from "@/lib/os/selectors";
import { useOsData } from "@/components/os/context/OsDataContext";
import { useOsProject } from "@/components/os/context/OsProjectContext";
import { cn } from "@/lib/utils";

function ProjectSlot({ project, compact }: { project: Project; compact?: boolean }) {
  const { data } = useOsData();
  const { openProject } = useOsProject();
  const owner = getMember(data, project.ownerId);
  const days = daysUntil(project.deadline);
  const isBlocked = project.status === "blocked";

  return (
    <button
      type="button"
      onClick={() => openProject(project.id)}
      className={cn(
        "group w-full rounded-lg border p-3 text-left transition-colors hover:border-os-accent/40",
        isBlocked
          ? "border-os-yellow/30 bg-os-yellow/5"
          : "border-os-border bg-os-surface-raised hover:bg-os-surface-raised/80"
      )}
    >
      <p
        className={cn(
          "font-medium leading-snug text-os-text group-hover:text-os-accent",
          compact ? "text-xs" : "text-sm"
        )}
      >
        {project.title}
      </p>
      <div className="mt-2 flex items-center justify-between gap-2">
        {owner ? <MemberAvatar member={owner} size="sm" /> : null}
        <span className="text-xs text-os-muted">
          {isBlocked ? "Blocked" : days !== null ? (days < 0 ? `${Math.abs(days)}d late` : `${days}d`) : "—"}
        </span>
      </div>
    </button>
  );
}

function EmptySlot() {
  return (
    <div className="flex h-full min-h-[72px] items-center justify-center rounded-lg border border-dashed border-os-border/80 bg-os-bg/50 px-3">
      <p className="text-center text-xs text-os-muted">Open slot</p>
    </div>
  );
}

export function CategoryRunway() {
  const { data } = useOsData();

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium text-os-text">Work categories</h2>
          <p className="mt-0.5 text-xs text-os-muted">
            Four fixed lanes — slot limits keep the team from overflowing
          </p>
        </div>
        <span className="text-xs text-os-muted">{data.pillars.length} categories</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {data.pillars.map((pillar) => {
          const { inFlight, used, limit, available, over } = getPillarCapacityState(
            pillar,
            data.projects,
            data
          );

          const slots: (Project | null)[] = [
            ...inFlight,
            ...Array.from({ length: available }, () => null),
          ];

          return (
            <OsCard key={pillar.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-medium text-os-text">
                    <span>{pillar.emoji}</span>
                    {pillar.name}
                  </h3>
                  <p className="mt-1 text-xs text-os-muted">{pillar.description}</p>
                  {pillar.leadId ? (
                    <p className="mt-1 text-xs text-os-muted">
                      Lead: {getMember(data, pillar.leadId)?.name ?? "—"}
                    </p>
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

              <div
                className="mt-4 grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(limit, 1)}, minmax(0, 1fr))`,
                }}
              >
                {slots.map((project, i) =>
                  project ? (
                    <ProjectSlot
                      key={project.id}
                      project={project}
                      compact={limit > 2}
                    />
                  ) : (
                    <EmptySlot key={`empty-${pillar.id}-${i}`} />
                  )
                )}
              </div>
            </OsCard>
          );
        })}
      </div>
    </section>
  );
}
