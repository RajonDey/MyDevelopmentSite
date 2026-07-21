"use client";

import { useState } from "react";
import Link from "next/link";
import { OsCard } from "@/components/os/ui/OsCard";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import { ProgressBar } from "@/components/os/ui/ProgressBar";
import { CheckInNudge } from "@/components/os/team/CheckInNudge";
import { CheckInForm } from "@/components/os/check-in/CheckInForm";
import { RoleCatalog } from "@/components/os/team/RoleCatalog";
import { useOsData } from "@/components/os/context/OsDataContext";
import {
  getMemberCapacityState,
  getTeamCapacityState,
} from "@/lib/os/capacity";
import { getActiveRoleDefs, getRoleDef } from "@/lib/os/selectors";
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
  const { data, isAdmin, resetMockData, assignMemberOrgRole } = useOsData();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const teamCap = getTeamCapacityState(data);
  const checkIns = data.checkIns ?? [];
  const coreMembers = data.members.filter(
    (m) => m.kind !== "employee" && m.status !== "disabled"
  );
  const activeRoles = getActiveRoleDefs(data);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-medium text-os-text">Team</h1>
          <p className="mt-1 text-sm text-os-muted">
            RDX Core only — roles, load, and weekly check-ins
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

      <OsCard className="border-os-accent/30 bg-os-surface-raised/40">
        <p className="text-xs text-os-muted">
          Access is limited to allowlisted core members. Public visitors cannot
          sign in. Magic-link auth lands in Phase 1 — until then this is the
          mock roster.
        </p>
      </OsCard>

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
                <span className="text-os-text">{o.projectTitle}</span> —{" "}
                {o.reason}
              </li>
            ))}
          </ul>
        </OsCard>
      ) : null}

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-os-text">Core roster</h2>
          <p className="mt-0.5 text-xs text-os-muted">
            {coreMembers.length} member{coreMembers.length !== 1 ? "s" : ""} ·
            expand a card for role responsibilities
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {coreMembers.map((member) => {
            const cap = getMemberCapacityState(member.id, data);
            const checkIn = checkIns.find((c) => c.memberId === member.id);
            const orgRole = getRoleDef(data, member.orgRoleId);
            const expanded = expandedId === member.id;
            const memberProjects = data.projects.filter(
              (p) =>
                p.ownerId === member.id &&
                (p.status === "active" || p.status === "blocked")
            );

            return (
              <OsCard key={member.id}>
                <div className="flex items-center gap-3">
                  <MemberAvatar member={member} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-os-text">{member.name}</p>
                    <p className="truncate text-xs text-os-muted">
                      {orgRole?.name ?? "No org role"}
                      {member.role === "admin" ? " · Admin" : ""}
                    </p>
                  </div>
                </div>

                {isAdmin ? (
                  <div className="mt-3">
                    <label className="text-[10px] uppercase text-os-muted">
                      Assign role
                    </label>
                    <select
                      value={member.orgRoleId ?? ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          assignMemberOrgRole(member.id, e.target.value);
                        }
                      }}
                      className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-2 py-1.5 text-xs text-os-text"
                    >
                      <option value="" disabled>
                        Select role…
                      </option>
                      {activeRoles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

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
                    value={Math.min(
                      Math.round((cap.used / cap.limit) * 100),
                      100
                    )}
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

                {orgRole ? (
                  <div className="mt-4 border-t border-os-border/60 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(expanded ? null : member.id)
                      }
                      className="text-xs text-os-accent hover:underline"
                    >
                      {expanded ? "Hide" : "Show"} responsibilities & principles
                    </button>
                    {expanded ? (
                      <div className="mt-3 space-y-3">
                        <p className="text-xs text-os-muted">{orgRole.summary}</p>
                        <div>
                          <p className="text-[10px] uppercase text-os-muted">
                            Responsibilities
                          </p>
                          <ul className="mt-1 space-y-1">
                            {orgRole.responsibilities.map((item) => (
                              <li key={item} className="text-xs text-os-text">
                                · {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-os-muted">
                            Principles
                          </p>
                          <ul className="mt-1 space-y-1">
                            {orgRole.principles.map((item) => (
                              <li key={item} className="text-xs text-os-muted">
                                · {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

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
                      <p className="mt-1 text-xs text-os-yellow">
                        {checkIn.blockers}
                      </p>
                    ) : null}
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase text-os-muted">
                          Energy
                        </p>
                        <EnergyDots value={checkIn.energy} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-os-muted">
                          Confidence
                        </p>
                        <EnergyDots value={checkIn.confidence} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-os-muted">
                    No check-in this week yet
                  </p>
                )}
              </OsCard>
            );
          })}
        </div>
      </section>

      <RoleCatalog />

      <p className="text-center text-xs text-os-muted">
        Core allowlist only — future hires stay out of OS until promoted.{" "}
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
