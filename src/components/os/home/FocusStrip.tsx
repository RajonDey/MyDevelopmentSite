"use client";

import Link from "next/link";
import { Focus } from "lucide-react";
import type { Project } from "@/types/os";
import { useOsData } from "@/components/os/context/OsDataContext";
import { useOsProject } from "@/components/os/context/OsProjectContext";

function FocusChip({ project }: { project: Project }) {
  const { openProject } = useOsProject();

  return (
    <button
      type="button"
      onClick={() => openProject(project.id)}
      className="rounded-rdx-pill border border-os-border bg-os-surface-raised px-3 py-1.5 text-left text-xs text-os-text transition-colors hover:border-os-accent/40"
    >
      {project.title}
    </button>
  );
}

export function FocusStrip() {
  const { data } = useOsData();
  const focusProjects = data.focusProjectIds
    .map((id) => data.projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  if (focusProjects.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Focus className="h-4 w-4 text-os-accent" />
          <h2 className="text-sm font-medium text-os-text">Focus this week</h2>
        </div>
        <Link
          href="/os/projects#focus"
          className="text-xs text-os-accent hover:underline"
        >
          Edit on Projects →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {focusProjects.map((project) => (
          <FocusChip key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
