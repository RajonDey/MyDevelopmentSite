"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CategoryRunway } from "@/components/os/home/CategoryRunway";
import { BacklogPark } from "@/components/os/home/BacklogPark";
import { FocusEditor } from "@/components/os/projects/FocusEditor";
import { ProjectFormModal } from "@/components/os/projects/ProjectFormModal";
import { useOsData } from "@/components/os/context/OsDataContext";
import { useOsProject } from "@/components/os/context/OsProjectContext";
import { getRecentDone } from "@/lib/os/capacity";

function ShippedStrip() {
  const { data } = useOsData();
  const { openProject } = useOsProject();
  const done = getRecentDone(data.projects);

  if (done.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-os-muted">Recently shipped</h2>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {done.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => openProject(project.id)}
            className="shrink-0 rounded-lg border border-os-border bg-os-surface px-4 py-3 text-left transition-colors hover:border-os-accent/30"
          >
            <p className="max-w-[200px] truncate text-sm text-os-text">
              {project.title}
            </p>
            {project.fulfillmentNote ? (
              <p className="mt-1 max-w-[200px] truncate text-xs text-os-muted">
                {project.fulfillmentNote}
              </p>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}

export function ProjectsWorkspace() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-medium text-os-text">Projects</h1>
          <p className="mt-1 text-sm text-os-muted">
            Manage categories, focus, backlog, and lifecycle
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-md bg-os-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add project
        </button>
      </div>

      <FocusEditor />
      <CategoryRunway />
      <div id="backlog">
        <BacklogPark />
      </div>
      <ShippedStrip />

      <ProjectFormModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
