"use client";

import { useEffect, useMemo, useState } from "react";
import type { LeadRecord } from "@/types/rdx/lead";
import type {
  CreateProjectInput,
  ProjectLinks,
  ProjectRecord,
  ProjectStatus,
  UpdateProjectInput,
} from "@/types/rdx/project";
import {
  projectLinkFields,
  projectStatusLabels,
  projectStatusOptions,
} from "@/content/rdx/project-desk";
import { RdxButton } from "@/components/rdx/ui/Button";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";

type ProjectFormState = {
  title: string;
  summary: string;
  notes: string;
  status: ProjectStatus;
  links: ProjectLinks;
};

type ProjectPanelProps = {
  lead: LeadRecord;
  projects: ProjectRecord[];
  saving: boolean;
  onSavingChange: (saving: boolean) => void;
  onRefresh: () => Promise<void>;
  embedded?: boolean;
};

const emptyForm = (): ProjectFormState => ({
  title: "",
  summary: "",
  notes: "",
  status: "active",
  links: {},
});

function projectToForm(project: ProjectRecord): ProjectFormState {
  return {
    title: project.title,
    summary: project.summary ?? "",
    notes: project.notes ?? "",
    status: project.status,
    links: { ...project.links },
  };
}

export function ProjectPanel({
  lead,
  projects,
  saving,
  onSavingChange,
  onRefresh,
  embedded = false,
}: ProjectPanelProps) {
  const [mode, setMode] = useState<"list" | "new" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);

  const editingProject = useMemo(
    () => projects.find((project) => project.id === editingId) ?? null,
    [projects, editingId]
  );

  useEffect(() => {
    if (mode === "list") setFormError(null);
  }, [mode]);

  function openNew() {
    setForm(emptyForm());
    setEditingId(null);
    setMode("new");
    setFormError(null);
  }

  function openEdit(project: ProjectRecord) {
    setForm(projectToForm(project));
    setEditingId(project.id);
    setMode("edit");
    setFormError(null);
  }

  function closeEditor() {
    setMode("list");
    setEditingId(null);
    setFormError(null);
  }

  function updateLink(key: string, value: string) {
    setForm((current) => ({
      ...current,
      links: {
        ...current.links,
        [key]: value.trim() || undefined,
      },
    }));
  }

  async function saveProject() {
    if (!form.title.trim()) {
      setFormError("Project title is required.");
      return;
    }

    const payload: CreateProjectInput | UpdateProjectInput =
      mode === "new"
        ? {
            leadId: lead.id,
            title: form.title.trim(),
            summary: form.summary.trim() || undefined,
            notes: form.notes.trim() || undefined,
            links: form.links,
            status: form.status,
          }
        : {
            id: editingId!,
            title: form.title.trim(),
            summary: form.summary.trim() || null,
            notes: form.notes.trim() || null,
            links: form.links,
            status: form.status,
          };

    onSavingChange(true);
    setFormError(null);

    const response = await fetch("/api/projects", {
      method: mode === "new" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    onSavingChange(false);

    if (!response.ok) {
      setFormError("Could not save project.");
      return;
    }

    await onRefresh();
    closeEditor();
  }

  async function deleteProject(projectId: string) {
    if (!window.confirm("Delete this project?")) return;

    onSavingChange(true);
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    onSavingChange(false);

    if (!response.ok) return;
    await onRefresh();
    if (editingId === projectId) closeEditor();
  }

  return (
    <div
      className={
        embedded ? "space-y-3" : "border-t border-rdx-border pt-4 space-y-3"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-rdx-ink">Projects</h3>
        {mode === "list" && (
          <RdxButton type="button" variant="secondary" onClick={openNew}>
            Add project
          </RdxButton>
        )}
      </div>

      {mode !== "list" && (
        <div className="space-y-3 rounded-rdx border border-rdx-border bg-rdx-surface/50 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-rdx-ink">
              {mode === "new" ? "New project" : form.title || "Project"}
            </p>
            <button
              type="button"
              className="text-xs text-rdx-muted hover:text-rdx-ink"
              onClick={closeEditor}
            >
              Close
            </button>
          </div>

          <FormField label="Title" htmlFor="project_title" required>
            <input
              id="project_title"
              className={rdxInputClassName}
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="HICU Platform"
            />
          </FormField>

          <FormField label="Summary" htmlFor="project_summary">
            <input
              id="project_summary"
              className={rdxInputClassName}
              value={form.summary}
              onChange={(event) =>
                setForm((current) => ({ ...current, summary: event.target.value }))
              }
              placeholder="Short scope in one line"
            />
          </FormField>

          <FormField label="Status" htmlFor="project_status">
            <select
              id="project_status"
              className={rdxInputClassName}
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as ProjectStatus,
                }))
              }
            >
              {projectStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {projectStatusLabels[status]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Notes" htmlFor="project_notes">
            <textarea
              id="project_notes"
              rows={3}
              className={rdxInputClassName}
              value={form.notes}
              onChange={(event) =>
                setForm((current) => ({ ...current, notes: event.target.value }))
              }
              placeholder="Internal context, stack, milestones…"
            />
          </FormField>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-rdx-muted">
              Links
            </p>
            {projectLinkFields.map((field) => (
              <FormField
                key={field.key}
                label={field.label}
                htmlFor={`project_link_${field.key}`}
              >
                <input
                  id={`project_link_${field.key}`}
                  type="url"
                  className={rdxInputClassName}
                  value={form.links[field.key] ?? ""}
                  onChange={(event) => updateLink(field.key, event.target.value)}
                  placeholder="https://"
                />
              </FormField>
            ))}
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <div className="flex flex-wrap gap-2">
            <RdxButton type="button" onClick={saveProject} disabled={saving}>
              {mode === "new" ? "Create project" : "Save project"}
            </RdxButton>
            {editingProject && (
              <RdxButton
                type="button"
                variant="ghost"
                disabled={saving}
                onClick={() => deleteProject(editingProject.id)}
              >
                Delete
              </RdxButton>
            )}
          </div>
        </div>
      )}

      {projects.length === 0 && mode === "list" ? (
        <p className="text-sm text-rdx-muted">No projects yet.</p>
      ) : (
        mode === "list" && (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="rounded-rdx border border-rdx-border p-3 text-sm"
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => openEdit(project)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-rdx-ink">
                      {project.title}
                    </span>
                    <span className="text-rdx-muted">
                      {projectStatusLabels[project.status]}
                    </span>
                  </div>
                  {project.summary && (
                    <p className="mt-1 text-rdx-muted">{project.summary}</p>
                  )}
                </button>
                {Object.entries(project.links).some(([, url]) => url?.trim()) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {projectLinkFields.map((field) => {
                      const url = project.links[field.key]?.trim();
                      if (!url) return null;
                      return (
                        <a
                          key={field.key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-rdx-accent hover:text-rdx-accent-hover"
                        >
                          {field.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
