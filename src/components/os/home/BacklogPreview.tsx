"use client";

import Link from "next/link";
import { Archive } from "lucide-react";
import { OsCard } from "@/components/os/ui/OsCard";
import { useOsData } from "@/components/os/context/OsDataContext";
import { useOsProject } from "@/components/os/context/OsProjectContext";
import { getBacklogProjects } from "@/lib/os/capacity";
import { MAX_BACKLOG_ITEMS } from "@/types/os";
import { cn } from "@/lib/utils";

export function BacklogPreview() {
  const { data } = useOsData();
  const { openProject } = useOsProject();
  const backlog = getBacklogProjects(data.projects);
  const preview = backlog.slice(0, 3);
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
            Ideas parked until capacity opens
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

      {preview.length === 0 ? (
        <p className="mt-4 text-sm text-os-muted">
          Nothing parked. Use + Park idea to capture one.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {preview.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => openProject(project.id)}
                className="w-full truncate text-left text-sm text-os-text hover:text-os-accent"
              >
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      )}

      {backlog.length > 3 ? (
        <p className="mt-3 text-xs text-os-muted">
          +{backlog.length - 3} more in backlog
        </p>
      ) : null}

      <Link
        href="/os/projects#backlog"
        className="mt-4 inline-block text-xs text-os-accent hover:underline"
      >
        Manage backlog on Projects →
      </Link>
    </OsCard>
  );
}
