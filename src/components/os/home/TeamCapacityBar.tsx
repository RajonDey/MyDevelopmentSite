"use client";

import Link from "next/link";
import { OsCard } from "@/components/os/ui/OsCard";
import { ProgressBar } from "@/components/os/ui/ProgressBar";
import { useOsData } from "@/components/os/context/OsDataContext";
import { getTeamCapacityState } from "@/lib/os/capacity";
import { cn } from "@/lib/utils";

export function TeamCapacityBar() {
  const { data } = useOsData();
  const { used, limit, over } = getTeamCapacityState(data);
  const pct = Math.min(Math.round((used / limit) * 100), 100);

  return (
    <OsCard className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-os-text">Team capacity</h2>
          {over ? (
            <span className="rounded-rdx-pill bg-os-red/15 px-2 py-0.5 text-xs text-os-red">
              Over limit
            </span>
          ) : used === limit ? (
            <span className="rounded-rdx-pill bg-os-yellow/15 px-2 py-0.5 text-xs text-os-yellow">
              At capacity
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-os-muted">
          {used} of {limit} active slots — park new ideas until something ships
        </p>
        <ProgressBar
          value={pct}
          className={cn("mt-2 max-w-md", over && "[&>div]:bg-os-red")}
        />
      </div>
      <Link
        href="/os/team"
        className="shrink-0 text-sm text-os-accent hover:underline"
      >
        View team →
      </Link>
    </OsCard>
  );
}
