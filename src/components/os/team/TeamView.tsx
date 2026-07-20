"use client";

import { useState } from "react";
import Link from "next/link";
import { OsCard } from "@/components/os/ui/OsCard";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import { ProgressBar } from "@/components/os/ui/ProgressBar";
import { CheckInNudge } from "@/components/os/team/CheckInNudge";
import { CheckInForm } from "@/components/os/check-in/CheckInForm";
import { useOsData } from "@/components/os/context/OsDataContext";
import {
  getMemberCapacityState,
  getTeamCapacityState,
} from "@/lib/os/capacity";
import { cn } from "@/lib/utils";

function EnergyDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < value ? "bg-os-accent" : "bg-os-border"
          )}
        />
      ))}
    </div>
  );
}

export function TeamView() {
  const { data, resetMockData } = useOsData();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const teamCap = getTeamCapacityState(data);
  const checkIns = data.checkIns ?? [];
  const coreMembers = data.members.filter((m) => m.kind !== "employee");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-medium text-os-text">Team</h1>
          <p className="mt-1 text-sm text-os-muted">
            {coreMembers.length} core member{coreMembers.length !== 1 ? "s" : ""}{" "}
            — weekly check-ins and load
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCheckInOpen(true)}
          className="rounded-md bg-os-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Weekly check-in
        </button>
      </div>

      <CheckInNudge />

      <OsCard raised>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-os-text">Team capacity</p>
            <p className="mt-0.5 text-xs text-os-muted">
              {teamCap.used}/{teamCap.limit} active + blocked slots
              {teamCap.over ? " — over limit" : ""}
            </p>
          </div>
          <Link
            href="/os/review"
            className="text-xs text-os-accent hover:underline"
          >
            Capacity rules →
          </Link>
        </div>
        <ProgressBar
          value={Math.min(Math.round((teamCap.used / teamCap.limit) * 100), 100)}
          className={cn("mt-3", teamCap.over && "[&>div]:bg-os-red")}
        />
      </OsCard>

      {data.capacityOverrides && data.capacityOverrides.length > 0 ? (
        <OsCard>
          <h2 className="text-sm font-medium text-os-text">Recent overrides</h2>
          <ul className="mt-2 space-y-2">
            {data.capacityOverrides.map((o) => (
              <li key={o.id} className="text-xs text-os-muted">
                <span className="text-os-text">{o.projectTitle}</span> — {o.reason}
              </li>
            ))}
          </ul>
        </OsCard>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {coreMembers.map((member) => {
          const cap = getMemberCapacityState(member.id, data);
          const checkIn = checkIns.find((c) => c.memberId === member.id);
          const memberProjects = data.projects.filter(
            (p) =>
              p.ownerId === member.id &&
              (p.status === "active" || p.status === "blocked")
          );

          return (
            <OsCard key={member.id}>
              <div className="flex items-center gap-3">
                <MemberAvatar member={member} />
                <div>
                  <p className="font-medium text-os-text">{member.name}</p>
                  <p className="text-xs capitalize text-os-muted">
                    {member.role === "admin" ? "Admin · core" : "Core member"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-os-muted">Load</span>
                  <span
                    className={cn(
                      cap.over
                        ? "text-os-red"
                        : cap.used === cap.limit
                          ? "text-os-yellow"
                          : "text-os-muted"
                    )}
                  >
                    {cap.used}/{cap.limit}
                  </span>
                </div>
                <ProgressBar
                  value={Math.min(Math.round((cap.used / cap.limit) * 100), 100)}
                  size="sm"
                  className="mt-1"
                />
              </div>

              {memberProjects.length > 0 ? (
                <ul className="mt-3 space-y-1">
                  {memberProjects.map((p) => (
                    <li key={p.id} className="truncate text-xs text-os-muted">
                      · {p.title}
                      {p.status === "blocked" ? " (blocked)" : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-os-muted">No active projects</p>
              )}

              {checkIn ? (
                <div className="mt-4 border-t border-os-border/60 pt-4">
                  <p className="text-xs font-medium text-os-muted">This week</p>
                  <p className="mt-1 text-xs text-os-text">
                    <span className="text-os-muted">Moved: </span>
                    {checkIn.moved}
                  </p>
                  <p className="mt-1 text-xs text-os-text">
                    <span className="text-os-muted">Next: </span>
                    {checkIn.next}
                  </p>
                  {checkIn.blockers ? (
                    <p className="mt-1 text-xs text-os-yellow">{checkIn.blockers}</p>
                  ) : null}
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-os-muted">Energy</p>
                      <EnergyDots value={checkIn.energy} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-os-muted">Confidence</p>
                      <EnergyDots value={checkIn.confidence} />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-xs text-os-muted">No check-in this week yet</p>
              )}
            </OsCard>
          );
        })}
      </div>

      <p className="text-center text-xs text-os-muted">
        Future hires join as employees first; core OS access only when needed.{" "}
        <button
          type="button"
          onClick={resetMockData}
          className="text-os-muted hover:text-os-text"
        >
          Reset mock data
        </button>
      </p>

      <CheckInForm open={checkInOpen} onClose={() => setCheckInOpen(false)} />
    </div>
  );
}
