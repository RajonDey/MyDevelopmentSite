"use client";

import { useEffect, useState } from "react";
import { OsModal } from "@/components/os/ui/OsModal";
import type { OsRoleDef } from "@/types/os";
import type { RoleDefInput } from "@/components/os/context/OsDataContext";

type RoleFormModalProps = {
  open: boolean;
  onClose: () => void;
  initial?: OsRoleDef | null;
  onSave: (input: RoleDefInput) => boolean;
};

function linesToText(lines: string[]) {
  return lines.join("\n");
}

function textToLines(text: string) {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function RoleFormModal({
  open,
  onClose,
  initial,
  onSave,
}: RoleFormModalProps) {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [principles, setPrinciples] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? "");
    setSummary(initial?.summary ?? "");
    setResponsibilities(linesToText(initial?.responsibilities ?? []));
    setPrinciples(linesToText(initial?.principles ?? []));
  }, [open, initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = onSave({
      name,
      summary,
      responsibilities: textToLines(responsibilities),
      principles: textToLines(principles),
    });
    if (ok) onClose();
  }

  return (
    <OsModal
      open={open}
      onClose={onClose}
      title={initial ? "Edit role" : "New role"}
      description="One line per responsibility and principle. Admins can add seats anytime."
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-os-muted" htmlFor="role-name">
            Role name
          </label>
          <input
            id="role-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            placeholder="e.g. Delivery"
          />
        </div>
        <div>
          <label className="text-xs text-os-muted" htmlFor="role-summary">
            Summary
          </label>
          <input
            id="role-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            placeholder="One-line purpose of this seat"
          />
        </div>
        <div>
          <label className="text-xs text-os-muted" htmlFor="role-resp">
            Responsibilities (one per line)
          </label>
          <textarea
            id="role-resp"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            rows={4}
            required
            className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>
        <div>
          <label className="text-xs text-os-muted" htmlFor="role-prin">
            Principles (one per line)
          </label>
          <textarea
            id="role-prin"
            value={principles}
            onChange={(e) => setPrinciples(e.target.value)}
            rows={3}
            required
            className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-os-muted hover:text-os-text"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-os-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {initial ? "Save role" : "Create role"}
          </button>
        </div>
      </form>
    </OsModal>
  );
}
