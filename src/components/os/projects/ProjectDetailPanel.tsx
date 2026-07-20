"use client";

import { useState } from "react";
import { X, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { PROJECT_STATUS_LABELS, PROJECT_PRIORITY_LABELS } from "@/types/os";
import type { ProjectLink } from "@/types/os";
import { useOsProject } from "@/components/os/context/OsProjectContext";
import { useOsData } from "@/components/os/context/OsDataContext";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import { OsBadge } from "@/components/os/ui/OsBadge";
import { OsModal } from "@/components/os/ui/OsModal";
import { ProjectFormModal } from "@/components/os/projects/ProjectFormModal";
import { canActivateProject } from "@/lib/os/mock-actions";
import { daysUntil } from "@/lib/os/progress";
import {
  getMember,
  getObjective,
  getPillarForObjective,
} from "@/lib/os/selectors";

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-os-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-os-text">{children}</dd>
    </div>
  );
}

export function ProjectDetailPanel() {
  const {
    data,
    isAdmin,
    promoteProject,
    promoteProjectWithOverride,
    parkProject,
    declineProject,
    archiveProject,
    markProjectDone,
    updateProjectLinks,
    deleteProject,
  } = useOsData();
  const { selectedProjectId, closeProject } = useOsProject();

  const [shipOpen, setShipOpen] = useState(false);
  const [reflection, setReflection] = useState("");
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [overrideReason, setOverrideReason] = useState("");
  const [declineOpen, setDeclineOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const project = data.projects.find((p) => p.id === selectedProjectId);
  if (!project) return null;

  const owner = getMember(data, project.ownerId);
  const objective = getObjective(data, project.objectiveId);
  const pillar = objective ? getPillarForObjective(data, objective) : undefined;
  const days = daysUntil(project.deadline);
  const activateCheck =
    project.status === "backlog" ? canActivateProject(data, project) : null;
  const canActivate = activateCheck?.ok === true;
  const needsOverride =
    project.status === "backlog" && activateCheck && !activateCheck.ok;

  function handleAddLink(e: React.FormEvent) {
    e.preventDefault();
    if (!project || !linkLabel.trim() || !linkUrl.trim()) return;
    const links: ProjectLink[] = [
      ...(project.links ?? []),
      { label: linkLabel.trim(), url: linkUrl.trim() },
    ];
    updateProjectLinks(project.id, links);
    setLinkLabel("");
    setLinkUrl("");
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-black/40"
        onClick={closeProject}
        aria-label="Close project details"
      />
      <aside className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-os-border bg-os-surface shadow-xl">
        <header className="flex items-start justify-between gap-4 border-b border-os-border p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <OsBadge variant={project.priority}>
                {PROJECT_PRIORITY_LABELS[project.priority]}
              </OsBadge>
              <span className="text-xs capitalize text-os-muted">
                {PROJECT_STATUS_LABELS[project.status]}
              </span>
            </div>
            <h2 className="mt-2 text-lg font-medium leading-snug text-os-text">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeProject}
            className="rounded-md p-1 text-os-muted hover:bg-os-surface-raised hover:text-os-text"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex gap-2 border-b border-os-border px-5 py-2">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-os-muted hover:bg-os-surface-raised hover:text-os-text"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
          {isAdmin ? (
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-os-red/80 hover:bg-os-red/10"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </button>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <dl className="space-y-5">
            {project.whoItHelps ? (
              <DetailRow label="Who it helps">{project.whoItHelps}</DetailRow>
            ) : null}
            {project.fulfillmentNote ? (
              <DetailRow label="Why it matters">
                {project.fulfillmentNote}
              </DetailRow>
            ) : null}
            {project.blockerNote ? (
              <DetailRow label="Blocker">
                <span className="text-os-yellow">{project.blockerNote}</span>
              </DetailRow>
            ) : null}
            {project.backlogReason && project.status === "backlog" ? (
              <DetailRow label="Why parked">{project.backlogReason}</DetailRow>
            ) : null}
            {project.declineReason ? (
              <DetailRow label="Declined">{project.declineReason}</DetailRow>
            ) : null}

            <DetailRow label="Owner">
              {owner ? (
                <div className="flex items-center gap-2">
                  <MemberAvatar member={owner} size="sm" />
                  {owner.name}
                  <span className="text-xs text-os-muted">(load)</span>
                </div>
              ) : (
                "—"
              )}
            </DetailRow>

            {project.collaboratorIds && project.collaboratorIds.length > 0 ? (
              <DetailRow label="Collaborators">
                <ul className="space-y-1.5">
                  {project.collaboratorIds.map((id) => {
                    const member = getMember(data, id);
                    if (!member) return null;
                    return (
                      <li key={id} className="flex items-center gap-2">
                        <MemberAvatar member={member} size="sm" />
                        {member.name}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-1 text-xs text-os-muted">
                  Display only — does not affect capacity
                </p>
              </DetailRow>
            ) : null}

            <DetailRow label="Deadline">
              {project.deadline ? (
                <>
                  {new Date(project.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {days !== null && project.status !== "done" ? (
                    <span className="ml-2 text-os-muted">
                      ({days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`})
                    </span>
                  ) : null}
                </>
              ) : (
                "No deadline"
              )}
            </DetailRow>

            {pillar && objective ? (
              <DetailRow label="Category & goal">
                <span>
                  {pillar.emoji} {pillar.name}
                </span>
                <p className="mt-1 text-os-muted">{objective.title}</p>
              </DetailRow>
            ) : null}

            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-os-muted">
                Links
              </dt>
              <dd className="mt-2 space-y-2">
                {(project.links ?? []).map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-os-accent hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                ))}
                <form onSubmit={handleAddLink} className="flex gap-2 pt-1">
                  <input
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="Label"
                    className="w-24 rounded-md border border-os-border bg-os-bg px-2 py-1 text-xs text-os-text"
                  />
                  <input
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="URL"
                    className="min-w-0 flex-1 rounded-md border border-os-border bg-os-bg px-2 py-1 text-xs text-os-text"
                  />
                  <button
                    type="submit"
                    className="rounded-md border border-os-border px-2 py-1 text-xs text-os-muted hover:text-os-text"
                  >
                    Add
                  </button>
                </form>
              </dd>
            </div>
          </dl>
        </div>

        <footer className="space-y-2 border-t border-os-border p-5">
          {project.status === "backlog" ? (
            <>
              {needsOverride && isAdmin ? (
                <p className="text-xs text-os-yellow">{activateCheck.message}</p>
              ) : needsOverride ? (
                <p className="text-xs text-os-muted">{activateCheck.message}</p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {canActivate ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (promoteProject(project.id)) closeProject();
                    }}
                    className="flex-1 rounded-md bg-os-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                  >
                    Activate
                  </button>
                ) : isAdmin ? (
                  <button
                    type="button"
                    onClick={() => setOverrideOpen(true)}
                    className="flex-1 rounded-md border border-os-yellow/40 bg-os-yellow/10 px-4 py-2.5 text-sm text-os-yellow"
                  >
                    Override capacity
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setDeclineOpen(true)}
                  className="rounded-md border border-os-border px-3 py-2.5 text-sm text-os-muted hover:text-os-text"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => {
                    archiveProject(project.id);
                    closeProject();
                  }}
                  className="rounded-md border border-os-border px-3 py-2.5 text-sm text-os-muted hover:text-os-text"
                >
                  Archive
                </button>
              </div>
            </>
          ) : null}

          {project.status === "active" || project.status === "blocked" ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setReflection(project.fulfillmentNote ?? "");
                  setShipOpen(true);
                }}
                className="flex-1 rounded-md bg-os-green/20 px-4 py-2.5 text-sm font-medium text-os-green hover:bg-os-green/30"
              >
                Mark shipped
              </button>
              <button
                type="button"
                onClick={() => {
                  parkProject(project.id);
                  closeProject();
                }}
                className="flex-1 rounded-md border border-os-border px-4 py-2.5 text-sm text-os-muted hover:text-os-text"
              >
                Park
              </button>
            </div>
          ) : null}
        </footer>
      </aside>

      <OsModal
        open={shipOpen}
        onClose={() => setShipOpen(false)}
        title="Ship reflection"
        description="What changed for the people this project serves?"
      >
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          placeholder="e.g. Their team saves 3 hours/week on billing..."
          className="w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
        />
        <button
          type="button"
          onClick={() => {
            markProjectDone(project.id, reflection);
            setShipOpen(false);
            closeProject();
          }}
          className="mt-4 w-full rounded-md bg-os-green/80 px-4 py-2.5 text-sm font-medium text-white hover:bg-os-green"
        >
          Confirm shipped
        </button>
      </OsModal>

      <OsModal
        open={overrideOpen}
        onClose={() => setOverrideOpen(false)}
        title="Capacity override"
        description="Admin only — log why you're exceeding limits."
      >
        <textarea
          value={overrideReason}
          onChange={(e) => setOverrideReason(e.target.value)}
          rows={3}
          placeholder="e.g. Client deadline — Gourob pauses dashboard this week"
          className="w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
        />
        <button
          type="button"
          onClick={() => {
            if (promoteProjectWithOverride(project.id, overrideReason)) {
              setOverrideOpen(false);
              closeProject();
            }
          }}
          className="mt-4 w-full rounded-md bg-os-yellow/80 px-4 py-2.5 text-sm font-medium text-os-bg hover:bg-os-yellow"
        >
          Activate with override
        </button>
      </OsModal>

      <OsModal
        open={declineOpen}
        onClose={() => setDeclineOpen(false)}
        title="Decline idea"
        description="Not now, not ever (or not us). Removed from active backlog."
      >
        <input
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          placeholder="Why we're saying no"
          className="w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
        />
        <button
          type="button"
          onClick={() => {
            declineProject(project.id, declineReason);
            setDeclineOpen(false);
            closeProject();
          }}
          className="mt-4 w-full rounded-md border border-os-border px-4 py-2.5 text-sm text-os-muted hover:text-os-text"
        >
          Decline
        </button>
      </OsModal>

      <ProjectFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        project={project}
      />

      <OsModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete project"
        description="Permanent in mock — removes from focus, wins, and lists."
      >
        <p className="text-sm text-os-muted">
          Delete <span className="text-os-text">{project.title}</span>?
        </p>
        <button
          type="button"
          onClick={() => {
            deleteProject(project.id);
            setDeleteOpen(false);
            closeProject();
          }}
          className="mt-4 w-full rounded-md bg-os-red/80 px-4 py-2.5 text-sm font-medium text-white hover:bg-os-red"
        >
          Delete project
        </button>
      </OsModal>
    </>
  );
}
