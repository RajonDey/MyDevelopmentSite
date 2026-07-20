"use client";

import { useState } from "react";
import { Archive, ChevronDown } from "lucide-react";
import { OsCard } from "@/components/os/ui/OsCard";
import { useOsData } from "@/components/os/context/OsDataContext";
import { useOsProject } from "@/components/os/context/OsProjectContext";
import {
  getBacklogProjects,
  getDeclinedProjects,
  getArchivedProjects,
} from "@/lib/os/capacity";
import { MAX_BACKLOG_ITEMS } from "@/types/os";
import { cn } from "@/lib/utils";

export function BacklogPark() {
  const { data } = useOsData();
  const { openProject } = useOsProject();
  const [showDeclined, setShowDeclined] = useState(false);

  const backlog = getBacklogProjects(data.projects);
  const declined = getDeclinedProjects(data.projects);
  const archived = getArchivedProjects(data.projects);
  const atLimit = backlog.length >= MAX_BACKLOG_ITEMS;

  return (
    <OsCard>
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-os-surface-raised p-2">
          <Archive className="h-4 w-4 text-os-muted" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-medium text-os-text">Backlog park</h2>
          <p className="mt-0.5 text-xs text-os-muted">
            Max {MAX_BACKLOG_ITEMS} parked — decline or archive to triage
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-rdx-pill px-2 py-0.5 text-xs",
            atLimit ? "bg-os-yellow/15 text-os-yellow" : "text-os-muted"
          )}
        >
          {backlog.length}/{MAX_BACKLOG_ITEMS}
        </span>
      </div>

      {backlog.length === 0 ? (
        <p className="mt-4 text-sm text-os-muted">
          Nothing parked. Use + Park idea to capture one.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-os-border/60">
          {backlog.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => openProject(project.id)}
                className="flex w-full flex-col gap-1 py-3 text-left transition-colors hover:text-os-accent"
              >
                <span className="text-sm font-medium text-os-text">
                  {project.title}
                </span>
                {project.backlogReason ? (
                  <span className="text-xs text-os-muted">
                    {project.backlogReason}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}

      {declined.length > 0 || archived.length > 0 ? (
        <div className="mt-4 border-t border-os-border/60 pt-4">
          <button
            type="button"
            onClick={() => setShowDeclined(!showDeclined)}
            className="flex w-full items-center justify-between text-xs text-os-muted hover:text-os-text"
          >
            <span>
              Declined ({declined.length}) · Archived ({archived.length})
            </span>
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", showDeclined && "rotate-180")}
            />
          </button>
          {showDeclined ? (
            <ul className="mt-2 space-y-2">
              {declined.map((p) => (
                <li key={p.id} className="text-xs text-os-muted">
                  <button
                    type="button"
                    onClick={() => openProject(p.id)}
                    className="text-left hover:text-os-accent"
                  >
                    {p.title}
                    {p.declineReason ? ` — ${p.declineReason}` : ""}
                  </button>
                </li>
              ))}
              {archived.map((p) => (
                <li key={p.id} className="text-xs text-os-muted/70">
                  [archived] {p.title}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </OsCard>
  );
}
