"use client";

import { useEffect, useState } from "react";
import { OsModal } from "@/components/os/ui/OsModal";
import { useOsData } from "@/components/os/context/OsDataContext";
import type { Project, ProjectKind, ProjectPriority } from "@/types/os";
import { PROJECT_KIND_LABELS } from "@/types/os";
import { getObjective, getPillarForObjective } from "@/lib/os/selectors";

type ProjectFormModalProps = {
  open: boolean;
  onClose: () => void;
  /** Omit for create; pass for edit */
  project?: Project;
};

export function ProjectFormModal({ open, onClose, project }: ProjectFormModalProps) {
  const { data, currentMember, createProject, updateProject } = useOsData();
  const isEdit = Boolean(project);

  const [title, setTitle] = useState("");
  const [pillarId, setPillarId] = useState(data.pillars[0]?.id ?? "");
  const [ownerId, setOwnerId] = useState(currentMember.id);
  const [collaboratorIds, setCollaboratorIds] = useState<string[]>([]);
  const [status, setStatus] = useState<"backlog" | "active">("backlog");
  const [priority, setPriority] = useState<ProjectPriority>("p2");
  const [kind, setKind] = useState<ProjectKind>("internal");
  const [deadline, setDeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [whoItHelps, setWhoItHelps] = useState("");
  const [fulfillmentNote, setFulfillmentNote] = useState("");
  const [backlogReason, setBacklogReason] = useState("");
  const [blockerNote, setBlockerNote] = useState("");

  useEffect(() => {
    if (!open) return;
    if (project) {
      setTitle(project.title);
      const objective = getObjective(data, project.objectiveId);
      const pillar = objective ? getPillarForObjective(data, objective) : undefined;
      setPillarId(pillar?.id ?? data.pillars[0]?.id ?? "");
      setOwnerId(project.ownerId);
      setCollaboratorIds(
        (project.collaboratorIds ?? []).filter((id) => id !== project.ownerId)
      );
      setStatus(
        project.status === "active" || project.status === "blocked"
          ? "active"
          : "backlog"
      );
      setPriority(project.priority);
      setKind(project.kind);
      setDeadline(project.deadline ?? "");
      setSummary(project.summary ?? "");
      setNotes(project.notes ?? "");
      setWhoItHelps(project.whoItHelps ?? "");
      setFulfillmentNote(project.fulfillmentNote ?? "");
      setBacklogReason(project.backlogReason ?? "");
      setBlockerNote(project.blockerNote ?? "");
    } else {
      const firstPillar = data.pillars[0];
      setTitle("");
      setPillarId(firstPillar?.id ?? "");
      setOwnerId(currentMember.id);
      setCollaboratorIds([]);
      setStatus("backlog");
      setPriority("p2");
      setKind(
        firstPillar?.slug === "client-services" ? "client_linked" : "internal"
      );
      setDeadline("");
      setSummary("");
      setNotes("");
      setWhoItHelps("");
      setFulfillmentNote("");
      setBacklogReason("");
      setBlockerNote("");
    }
  }, [open, project, data, currentMember.id]);

  function handlePillarChange(nextPillarId: string) {
    setPillarId(nextPillarId);
    const pillar = data.pillars.find((p) => p.id === nextPillarId);
    if (!isEdit) {
      setKind(
        pillar?.slug === "client-services" ? "client_linked" : "internal"
      );
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    if (isEdit && project) {
      const objective = data.objectives.find(
        (o) =>
          o.pillarId === pillarId &&
          o.year === data.northStar.year &&
          o.quarter === 3
      ) ?? data.objectives.find((o) => o.pillarId === pillarId);

      updateProject(project.id, {
        title: title.trim(),
        ownerId,
        collaboratorIds,
        priority,
        kind,
        deadline: deadline || null,
        summary: summary || undefined,
        notes: notes || undefined,
        whoItHelps: whoItHelps || undefined,
        fulfillmentNote: fulfillmentNote || undefined,
        backlogReason: backlogReason || undefined,
        blockerNote: blockerNote || undefined,
        objectiveId: objective?.id,
      });
      onClose();
      return;
    }

    const ok = createProject({
      title,
      pillarId,
      ownerId,
      collaboratorIds,
      status,
      priority,
      kind,
      deadline: deadline || null,
      summary: summary || undefined,
      notes: notes || undefined,
      whoItHelps: whoItHelps || undefined,
      fulfillmentNote: fulfillmentNote || undefined,
      backlogReason: backlogReason || undefined,
      blockerNote: blockerNote || undefined,
    });

    if (ok) onClose();
  }

  const lockedStatus =
    isEdit &&
    project &&
    (project.status === "done" ||
      project.status === "declined" ||
      project.status === "archived");

  return (
    <OsModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit project" : "Add project"}
      description={
        isEdit
          ? "Update details — use the panel actions for status changes."
          : "Create in backlog or activate if capacity allows."
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pf-title" className="block text-sm font-medium text-os-text">
            Title
          </label>
          <input
            id="pf-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pf-pillar" className="block text-sm font-medium text-os-text">
              Category
            </label>
            <select
              id="pf-pillar"
              value={pillarId}
              onChange={(e) => handlePillarChange(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            >
              {data.pillars.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.emoji} {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pf-owner" className="block text-sm font-medium text-os-text">
              Owner
            </label>
            <select
              id="pf-owner"
              value={ownerId}
              onChange={(e) => {
                const next = e.target.value;
                setOwnerId(next);
                setCollaboratorIds((prev) => prev.filter((id) => id !== next));
              }}
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            >
              {data.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {data.members.filter((m) => m.id !== ownerId).length > 0 ? (
          <div>
            <p className="text-sm font-medium text-os-text">Collaborators</p>
            <p className="mt-0.5 text-xs text-os-muted">
              Helping — does not count toward their load
            </p>
            <ul className="mt-2 space-y-2">
              {data.members
                .filter((m) => m.id !== ownerId)
                .map((m) => {
                  const checked = collaboratorIds.includes(m.id);
                  return (
                    <li key={m.id}>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-os-text">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setCollaboratorIds((prev) =>
                              checked
                                ? prev.filter((id) => id !== m.id)
                                : [...prev, m.id]
                            );
                          }}
                          className="rounded border-os-border"
                        />
                        {m.name}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : null}

        {!isEdit ? (
          <div>
            <label htmlFor="pf-status" className="block text-sm font-medium text-os-text">
              Start as
            </label>
            <select
              id="pf-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "backlog" | "active")}
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            >
              <option value="backlog">Backlog (parked)</option>
              <option value="active">Active (uses capacity)</option>
            </select>
          </div>
        ) : lockedStatus ? (
          <p className="text-xs text-os-muted">
            Status: {project?.status} — use panel actions to change lifecycle.
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pf-priority" className="block text-sm font-medium text-os-text">
              Priority
            </label>
            <select
              id="pf-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as ProjectPriority)}
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            >
              <option value="p1">P1 — Critical</option>
              <option value="p2">P2 — Important</option>
              <option value="p3">P3 — Someday</option>
            </select>
          </div>

          <div>
            <label htmlFor="pf-kind" className="block text-sm font-medium text-os-text">
              Kind
            </label>
            <select
              id="pf-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as ProjectKind)}
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            >
              <option value="internal">{PROJECT_KIND_LABELS.internal}</option>
              <option value="client_linked">
                {PROJECT_KIND_LABELS.client_linked}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="pf-deadline" className="block text-sm font-medium text-os-text">
            Deadline
          </label>
          <input
            id="pf-deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>

        <div>
          <label htmlFor="pf-summary" className="block text-sm font-medium text-os-text">
            Summary
          </label>
          <textarea
            id="pf-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            placeholder={
              kind === "internal"
                ? "What this is — stays in OS"
                : "Optional — Desk holds full client context"
            }
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>

        {kind === "internal" ? (
          <div>
            <label htmlFor="pf-notes" className="block text-sm font-medium text-os-text">
              Notes
            </label>
            <textarea
              id="pf-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Working notes, next slices, draft status…"
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="pf-who" className="block text-sm font-medium text-os-text">
            Who it helps
          </label>
          <input
            id="pf-who"
            value={whoItHelps}
            onChange={(e) => setWhoItHelps(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>

        <div>
          <label htmlFor="pf-why" className="block text-sm font-medium text-os-text">
            Why it matters
          </label>
          <textarea
            id="pf-why"
            value={fulfillmentNote}
            onChange={(e) => setFulfillmentNote(e.target.value)}
            rows={2}
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>

        {(status === "backlog" || (isEdit && project?.status === "backlog")) ? (
          <div>
            <label htmlFor="pf-reason" className="block text-sm font-medium text-os-text">
              Why parked
            </label>
            <input
              id="pf-reason"
              value={backlogReason}
              onChange={(e) => setBacklogReason(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            />
          </div>
        ) : null}

        {isEdit &&
        project &&
        (project.status === "blocked" || blockerNote) ? (
          <div>
            <label htmlFor="pf-blocker" className="block text-sm font-medium text-os-text">
              Blocker note
            </label>
            <input
              id="pf-blocker"
              value={blockerNote}
              onChange={(e) => setBlockerNote(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            />
          </div>
        ) : null}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-os-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            {isEdit ? "Save changes" : "Create project"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-os-border px-4 py-2.5 text-sm text-os-muted hover:text-os-text"
          >
            Cancel
          </button>
        </div>
      </form>
    </OsModal>
  );
}
