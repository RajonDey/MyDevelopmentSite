"use client";

import { useState } from "react";
import { LogOut, Menu, Plus } from "lucide-react";
import { OsBadge } from "@/components/os/ui/OsBadge";
import { QuickAddModal } from "@/components/os/quick-add/QuickAddModal";
import { useOsData } from "@/components/os/context/OsDataContext";
import { getQuarterLabel, getCurrentQuarter } from "@/lib/os/progress";

type OsTopBarProps = {
  onMenuOpen: () => void;
  onSignOut?: () => void;
};

export function OsTopBar({ onMenuOpen, onSignOut }: OsTopBarProps) {
  const { data, currentMember } = useOsData();
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  const quarter = getCurrentQuarter();
  const year = data.northStar.year;
  const focusProjects = data.focusProjectIds
    .map((id) => data.projects.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-os-border bg-os-surface px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="rounded-md p-1.5 text-os-muted hover:bg-os-surface-raised hover:text-os-text md:hidden"
            onClick={onMenuOpen}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <OsBadge variant="accent">{getQuarterLabel(quarter, year)}</OsBadge>
          {focusProjects.length > 0 ? (
            <div className="hidden min-w-0 items-center gap-2 lg:flex">
              <span className="text-xs text-os-muted">Focus:</span>
              {focusProjects.slice(0, 3).map((project) =>
                project ? (
                  <span
                    key={project.id}
                    className="truncate rounded-rdx-pill border border-os-border bg-os-surface-raised px-2 py-0.5 text-xs text-os-muted"
                  >
                    {project.title.split("—")[0]?.trim() ?? project.title}
                  </span>
                ) : null
              )}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-xs text-os-muted sm:inline">
            {currentMember.name}
          </span>
          <button
            type="button"
            onClick={() => setQuickAddOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-os-accent/40 bg-os-accent/10 px-3 py-1.5 text-sm text-os-accent hover:bg-os-accent/20"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Park idea</span>
          </button>
          {onSignOut ? (
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-md border border-os-border px-2.5 py-1.5 text-sm text-os-muted hover:border-os-accent hover:text-os-accent"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          ) : null}
        </div>
      </header>

      <QuickAddModal open={quickAddOpen} onClose={() => setQuickAddOpen(false)} />
    </>
  );
}
