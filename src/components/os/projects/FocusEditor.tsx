"use client";

import { useState } from "react";
import { Focus, Pencil } from "lucide-react";
import type { Project } from "@/types/os";
import { MAX_FOCUS_PROJECTS } from "@/types/os";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import { useOsData } from "@/components/os/context/OsDataContext";
import { useOsProject } from "@/components/os/context/OsProjectContext";
import { getMember } from "@/lib/os/selectors";
import { daysUntil } from "@/lib/os/progress";
import { cn } from "@/lib/utils";

function FocusCard({ project }: { project: Project }) {
  const { data } = useOsData();
  const { openProject } = useOsProject();
  const owner = getMember(data, project.ownerId);
  const days = daysUntil(project.deadline);

  return (
    <button
      type="button"
      onClick={() => openProject(project.id)}
      className="os-card-raised flex flex-col p-4 text-left transition-colors hover:border-os-accent/40"
    >
      <p className="text-sm font-medium text-os-text">{project.title}</p>
      {project.whoItHelps ? (
        <p className="mt-2 line-clamp-2 text-xs text-os-muted">
          {project.whoItHelps}
        </p>
      ) : null}
      <div className="mt-auto flex items-center justify-between pt-4">
        {owner ? <MemberAvatar member={owner} size="sm" /> : null}
        {days !== null ? (
          <span className="text-xs text-os-muted">{days}d</span>
        ) : null}
      </div>
    </button>
  );
}

export function FocusEditor() {
  const { data, isAdmin, setFocusProjectIds } = useOsData();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string[]>(data.focusProjectIds);

  const focusProjects = data.focusProjectIds
    .map((id) => data.projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const eligible = data.projects.filter(
    (p) => p.status === "active" || p.status === "blocked"
  );

  function toggle(id: string) {
    setDraft((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_FOCUS_PROJECTS) return prev;
      return [...prev, id];
    });
  }

  function save() {
    setFocusProjectIds(draft);
    setEditing(false);
  }

  function cancel() {
    setDraft(data.focusProjectIds);
    setEditing(false);
  }

  return (
    <section id="focus">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Focus className="h-4 w-4 text-os-accent" />
          <h2 className="text-sm font-medium text-os-text">Focus this week</h2>
          <span className="text-xs text-os-muted">Max {MAX_FOCUS_PROJECTS}</span>
        </div>
        {isAdmin && !editing ? (
          <button
            type="button"
            onClick={() => {
              setDraft(data.focusProjectIds);
              setEditing(true);
            }}
            className="flex items-center gap-1 text-xs text-os-muted hover:text-os-accent"
          >
            <Pencil className="h-3 w-3" />
            Edit focus
          </button>
        ) : null}
      </div>

      {editing ? (
        <div className="os-card space-y-3 p-4">
          <p className="text-xs text-os-muted">
            Pick up to {MAX_FOCUS_PROJECTS} active projects the team should
            prioritize this week.
          </p>
          <ul className="space-y-2">
            {eligible.map((project) => {
              const selected = draft.includes(project.id);
              const disabled =
                !selected && draft.length >= MAX_FOCUS_PROJECTS;
              return (
                <li key={project.id}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2",
                      selected
                        ? "border-os-accent/40 bg-os-accent/5"
                        : "border-os-border",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={disabled}
                      onChange={() => toggle(project.id)}
                      className="rounded border-os-border"
                    />
                    <span className="text-sm text-os-text">{project.title}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          {eligible.length === 0 ? (
            <p className="text-sm text-os-muted">No active projects to focus on.</p>
          ) : null}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={save}
              className="rounded-md bg-os-accent px-4 py-2 text-sm font-medium text-white"
            >
              Save focus
            </button>
            <button
              type="button"
              onClick={cancel}
              className="rounded-md border border-os-border px-4 py-2 text-sm text-os-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : focusProjects.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {focusProjects.map((project) => (
            <FocusCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-os-muted">
          No focus set. {isAdmin ? "Use Edit focus to pick priorities." : "Admin sets weekly focus."}
        </p>
      )}
    </section>
  );
}
