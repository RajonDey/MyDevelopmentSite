"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { OsCard } from "@/components/os/ui/OsCard";
import { RoleFormModal } from "@/components/os/team/RoleFormModal";
import { useOsData } from "@/components/os/context/OsDataContext";
import type { OsRoleDef } from "@/types/os";
import { cn } from "@/lib/utils";

export function RoleCatalog() {
  const { data, isAdmin, createRoleDef, updateRoleDef, archiveRoleDef } =
    useOsData();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<OsRoleDef | null>(null);

  const roles = [...(data.roleDefs ?? [])].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-os-text">Role catalog</h2>
          <p className="mt-0.5 text-xs text-os-muted">
            Seats with responsibilities and principles — create new ones as the
            team grows
          </p>
        </div>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-md border border-os-border px-3 py-1.5 text-xs font-medium text-os-text hover:border-os-accent hover:text-os-accent"
          >
            <Plus className="h-3.5 w-3.5" />
            New role
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((role) => (
          <OsCard
            key={role.id}
            className={cn(!role.active && "opacity-50")}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-os-text">
                  {role.name}
                  {!role.active ? (
                    <span className="ml-2 text-[10px] uppercase text-os-muted">
                      Archived
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-xs text-os-muted">{role.summary}</p>
              </div>
              {isAdmin && role.active ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(role);
                    setFormOpen(true);
                  }}
                  className="flex items-center gap-1 text-xs text-os-muted hover:text-os-accent"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
              ) : null}
            </div>

            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wide text-os-muted">
                Responsibilities
              </p>
              <ul className="mt-1.5 space-y-1">
                {role.responsibilities.map((item) => (
                  <li key={item} className="text-xs text-os-text">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wide text-os-muted">
                Principles
              </p>
              <ul className="mt-1.5 space-y-1">
                {role.principles.map((item) => (
                  <li key={item} className="text-xs text-os-muted">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>

            {isAdmin && role.active ? (
              <button
                type="button"
                onClick={() => archiveRoleDef(role.id)}
                className="mt-4 text-[11px] text-os-muted hover:text-os-red"
              >
                Archive role
              </button>
            ) : null}
          </OsCard>
        ))}
      </div>

      <RoleFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        initial={editing}
        onSave={(input) => {
          if (editing) {
            updateRoleDef(editing.id, input);
            return true;
          }
          return createRoleDef(input);
        }}
      />
    </section>
  );
}
