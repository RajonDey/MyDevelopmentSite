"use client";

import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import { OsCard } from "@/components/os/ui/OsCard";
import { ProgressBar } from "@/components/os/ui/ProgressBar";
import { HealthDot } from "@/components/os/ui/HealthDot";
import type { Objective } from "@/types/os";
import { getKrProgress, getQuarterLabel } from "@/lib/os/progress";
import {
  getObjectiveWithProgress,
  getProjectsForObjective,
} from "@/lib/os/selectors";
import { useOsData } from "@/components/os/context/OsDataContext";
import { CategoriesSettings } from "@/components/os/goals/CategoriesSettings";
import { cn } from "@/lib/utils";

function ObjectiveAccordion({ objective }: { objective: Objective }) {
  const [open, setOpen] = useState(false);
  const { data, updateKeyResult } = useOsData();
  const { progressPct, health, keyResults } = getObjectiveWithProgress(
    data,
    objective
  );
  const projects = getProjectsForObjective(data, objective.id);

  return (
    <div className="border-b border-os-border/60 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-3 py-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <HealthDot health={health} />
            <span className="text-xs text-os-muted">
              {getQuarterLabel(objective.quarter, objective.year)}
            </span>
          </div>
          <h4 className="mt-1 text-sm font-medium text-os-text">
            {objective.title}
          </h4>
          <ProgressBar value={progressPct} className="mt-2" size="sm" />
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 text-os-muted transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div className="pb-4 pl-1">
          <p className="text-sm text-os-muted">{objective.outcome}</p>

          {keyResults.length > 0 ? (
            <div className="mt-4 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-os-muted">
                Key results
              </p>
              {keyResults.map((kr) => (
                <div key={kr.id}>
                  <div className="flex justify-between text-sm">
                    <span className="text-os-text">{kr.label}</span>
                    <span className="text-os-muted">
                      / {kr.target.toLocaleString()} {kr.unit}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="number"
                      value={kr.current}
                      onChange={(e) =>
                        updateKeyResult(kr.id, Number(e.target.value) || 0)
                      }
                      className="w-24 rounded-md border border-os-border bg-os-bg px-2 py-1 text-sm text-os-text"
                    />
                    <ProgressBar
                      value={getKrProgress(kr.current, kr.target)}
                      size="sm"
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {projects.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-os-muted">
                Linked projects ({projects.length})
              </p>
              <ul className="mt-2 space-y-1">
                {projects.map((p) => (
                  <li key={p.id} className="text-sm text-os-muted">
                    · {p.title}{" "}
                    <span className="capitalize">({p.status})</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function VisionEditor() {
  const { data, isAdmin, updateNorthStar } = useOsData();
  const [editing, setEditing] = useState(false);
  const [statement, setStatement] = useState(data.northStar.statement);
  const [mission, setMission] = useState(data.northStar.mission);
  const [whyItMatters, setWhyItMatters] = useState(data.northStar.whyItMatters);
  const year = data.northStar.year;

  function save() {
    updateNorthStar({ statement, mission, whyItMatters });
    setEditing(false);
  }

  if (editing && isAdmin) {
    return (
      <OsCard raised className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wider text-os-accent">
          Edit vision · {year}
        </p>
        <div>
          <label className="text-xs text-os-muted">Statement</label>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>
        <div>
          <label className="text-xs text-os-muted">Why it matters</label>
          <textarea
            value={whyItMatters}
            onChange={(e) => setWhyItMatters(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>
        <div>
          <label className="text-xs text-os-muted">We serve</label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={save}
            className="rounded-md bg-os-accent px-4 py-2 text-sm font-medium text-white"
          >
            Save vision
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-md border border-os-border px-4 py-2 text-sm text-os-muted"
          >
            Cancel
          </button>
        </div>
      </OsCard>
    );
  }

  return (
    <OsCard raised>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-os-accent">
          Why we exist · {year}
        </p>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => {
              setStatement(data.northStar.statement);
              setMission(data.northStar.mission);
              setWhyItMatters(data.northStar.whyItMatters);
              setEditing(true);
            }}
            className="flex items-center gap-1 text-xs text-os-muted hover:text-os-accent"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
        ) : null}
      </div>
      <p className="mt-3 font-rdx-display text-xl text-os-text">
        {data.northStar.statement}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-os-muted">
        {data.northStar.whyItMatters}
      </p>
      <p className="mt-3 border-l-2 border-os-accent/40 pl-3 text-sm text-os-text/90">
        <span className="text-os-muted">We serve: </span>
        {data.northStar.mission}
      </p>
    </OsCard>
  );
}

export function GoalsView() {
  const { data } = useOsData();
  const year = data.northStar.year;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <VisionEditor />

      {data.pillars.map((pillar) => {
        const objectives = data.objectives
          .filter((o) => o.pillarId === pillar.id && o.year === year)
          .sort((a, b) =>
            a.quarter !== b.quarter
              ? a.quarter - b.quarter
              : a.sortOrder - b.sortOrder
          );

        if (objectives.length === 0) return null;

        return (
          <OsCard key={pillar.id}>
            <h3 className="flex items-center gap-2 text-base font-medium text-os-text">
              <span>{pillar.emoji}</span>
              {pillar.name}
            </h3>
            <p className="mt-1 text-xs text-os-muted">{pillar.description}</p>
            <div className="mt-2">
              {objectives.map((objective) => (
                <ObjectiveAccordion key={objective.id} objective={objective} />
              ))}
            </div>
          </OsCard>
        );
      })}

      <CategoriesSettings />
    </div>
  );
}
