"use client";

import { useState } from "react";
import { OsModal } from "@/components/os/ui/OsModal";
import { useOsData } from "@/components/os/context/OsDataContext";
import type { ProjectPriority } from "@/types/os";

type QuickAddModalProps = {
  open: boolean;
  onClose: () => void;
};

export function QuickAddModal({ open, onClose }: QuickAddModalProps) {
  const { data, currentMember, addBacklogProject } = useOsData();
  const [title, setTitle] = useState("");
  const [pillarId, setPillarId] = useState(data.pillars[0]?.id ?? "");
  const [whoItHelps, setWhoItHelps] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState<ProjectPriority>("p3");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const ok = addBacklogProject({
      title,
      pillarId,
      whoItHelps: whoItHelps || undefined,
      backlogReason: reason || undefined,
      ownerId: currentMember.id,
      priority,
    });

    if (ok) {
      setTitle("");
      setWhoItHelps("");
      setReason("");
      onClose();
    }
  }

  return (
    <OsModal
      open={open}
      onClose={onClose}
      title="Park an idea"
      description="Capture distractions safely in backlog — activate only when capacity opens."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="qa-title" className="block text-sm font-medium text-os-text">
            Idea / project name
          </label>
          <input
            id="qa-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Invoice tool for freelancers"
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text placeholder:text-os-muted/60"
            required
          />
        </div>

        <div>
          <label htmlFor="qa-pillar" className="block text-sm font-medium text-os-text">
            Category
          </label>
          <select
            id="qa-pillar"
            value={pillarId}
            onChange={(e) => setPillarId(e.target.value)}
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
          <label htmlFor="qa-who" className="block text-sm font-medium text-os-text">
            Who it helps (optional)
          </label>
          <input
            id="qa-who"
            value={whoItHelps}
            onChange={(e) => setWhoItHelps(e.target.value)}
            placeholder="People or community this would serve"
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text placeholder:text-os-muted/60"
          />
        </div>

        <div>
          <label htmlFor="qa-reason" className="block text-sm font-medium text-os-text">
            Why park for now?
          </label>
          <input
            id="qa-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. No capacity until Shuvvo ships"
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text placeholder:text-os-muted/60"
          />
        </div>

        <div>
          <label htmlFor="qa-priority" className="block text-sm font-medium text-os-text">
            Priority if activated
          </label>
          <select
            id="qa-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as ProjectPriority)}
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          >
            <option value="p1">P1 — Critical</option>
            <option value="p2">P2 — Important</option>
            <option value="p3">P3 — Someday</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-os-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Park in backlog
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
