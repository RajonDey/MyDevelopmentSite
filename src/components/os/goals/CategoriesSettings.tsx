"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { OsCard } from "@/components/os/ui/OsCard";
import { useOsData } from "@/components/os/context/OsDataContext";
import type { Pillar } from "@/types/os";
import { getMember } from "@/lib/os/selectors";

function CategoryRow({ pillar }: { pillar: Pillar }) {
  const { data, isAdmin, updatePillar } = useOsData();
  const [editing, setEditing] = useState(false);
  const [leadId, setLeadId] = useState(pillar.leadId ?? "");
  const [slotLimit, setSlotLimit] = useState(pillar.activeSlotLimit);
  const [description, setDescription] = useState(pillar.description);

  const lead = pillar.leadId ? getMember(data, pillar.leadId) : undefined;
  const coreMembers = data.members.filter((m) => m.kind !== "employee");

  function save() {
    updatePillar(pillar.id, {
      leadId: leadId || undefined,
      activeSlotLimit: slotLimit,
      description: description.trim(),
    });
    setEditing(false);
  }

  return (
    <div className="border-b border-os-border/60 py-4 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-medium text-os-text">
            {pillar.emoji} {pillar.name}
          </h4>
          {!editing ? (
            <>
              <p className="mt-1 text-xs text-os-muted">{pillar.description}</p>
              <p className="mt-2 text-xs text-os-muted">
                Lead: {lead?.name ?? "—"} · {pillar.activeSlotLimit} slot
                {pillar.activeSlotLimit !== 1 ? "s" : ""}
              </p>
            </>
          ) : null}
        </div>
        {isAdmin && !editing ? (
          <button
            type="button"
            onClick={() => {
              setLeadId(pillar.leadId ?? "");
              setSlotLimit(pillar.activeSlotLimit);
              setDescription(pillar.description);
              setEditing(true);
            }}
            className="flex items-center gap-1 text-xs text-os-muted hover:text-os-accent"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
        ) : null}
      </div>

      {editing ? (
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-xs text-os-muted">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs text-os-muted">Quarter lead</label>
              <select
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
              >
                <option value="">None</option>
                {coreMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-os-muted">Active slot limit</label>
              <input
                type="number"
                min={1}
                max={5}
                value={slotLimit}
                onChange={(e) => setSlotLimit(Number(e.target.value) || 1)}
                className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              className="rounded-md bg-os-accent px-3 py-1.5 text-sm text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md border border-os-border px-3 py-1.5 text-sm text-os-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function CategoriesSettings() {
  const { data } = useOsData();

  return (
    <OsCard>
      <h3 className="text-base font-medium text-os-text">Work categories</h3>
      <p className="mt-1 text-xs text-os-muted">
        Four fixed lanes — adjust slot limits and quarter leads. Categories
        cannot be added or removed.
      </p>
      <div className="mt-2">
        {data.pillars.map((pillar) => (
          <CategoryRow key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </OsCard>
  );
}
