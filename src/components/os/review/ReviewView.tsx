"use client";

import Link from "next/link";
import { getCurrentQuarter, getQuarterLabel } from "@/lib/os/progress";
import {
  getObjectiveWithProgress,
  getPillarForObjective,
} from "@/lib/os/selectors";
import {
  getBacklogProjects,
  getTeamCapacityState,
} from "@/lib/os/capacity";
import { OsCard } from "@/components/os/ui/OsCard";
import { HealthDot } from "@/components/os/ui/HealthDot";
import { useOsData } from "@/components/os/context/OsDataContext";
import { REVIEW_STEP_IDS } from "@/types/os";
import { cn } from "@/lib/utils";

const STEP_LABELS: Record<(typeof REVIEW_STEP_IDS)[number], string> = {
  "north-star": "Re-read North Star — still true?",
  wins: "Celebrate wins — who did we help?",
  scorecard: "Objectives scorecard — honest health",
  capacity: "Capacity retro — limits help or hurt?",
  backlog: "Backlog triage — decline / keep / activate",
  "next-quarter": "Next quarter bets — max 1–2 per pillar",
  focus: "Week 1 focus — pick 3 projects",
};

export function ReviewView() {
  const { data, updateQuarterlyReview, toggleReviewStep } = useOsData();

  const quarter = getCurrentQuarter();
  const year = data.northStar.year;
  const review = data.quarterlyReview ?? {
    year,
    quarter,
    learnings: "",
    completedSteps: [],
    updatedAt: "",
  };

  const objectives = data.objectives.filter(
    (o) => o.year === year && o.quarter === quarter
  );
  const objectiveDetails = objectives.map((o) =>
    getObjectiveWithProgress(data, o)
  );
  const onTrack = objectiveDetails.filter((d) => d.health === "green").length;
  const atRisk = objectiveDetails.filter(
    (d) => d.health === "yellow" || d.health === "red"
  ).length;
  const shipped = data.projects.filter(
    (p) => p.status === "done" && p.completedAt
  ).length;
  const teamCap = getTeamCapacityState(data);
  const backlogCount = getBacklogProjects(data.projects).length;
  const completedCount = review.completedSteps.length;
  const totalSteps = REVIEW_STEP_IDS.length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-lg font-medium text-os-text">Quarterly review</h1>
        <p className="mt-1 text-sm text-os-muted">
          {getQuarterLabel(quarter, year)} — guided retro (mock)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OsCard>
          <p className="text-xs text-os-muted">On track</p>
          <p className="text-2xl font-semibold text-os-green">{onTrack}</p>
        </OsCard>
        <OsCard>
          <p className="text-xs text-os-muted">At risk</p>
          <p className="text-2xl font-semibold text-os-yellow">{atRisk}</p>
        </OsCard>
        <OsCard>
          <p className="text-xs text-os-muted">Shipped (all time)</p>
          <p className="text-2xl font-semibold text-os-text">{shipped}</p>
        </OsCard>
        <OsCard>
          <p className="text-xs text-os-muted">Team load</p>
          <p className="text-2xl font-semibold text-os-text">
            {teamCap.used}/{teamCap.limit}
          </p>
        </OsCard>
      </div>

      <OsCard>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-os-text">Review checklist</h2>
          <span className="text-xs text-os-muted">
            {completedCount}/{totalSteps}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {REVIEW_STEP_IDS.map((stepId) => {
            const done = review.completedSteps.includes(stepId);
            return (
              <li key={stepId}>
                <button
                  type="button"
                  onClick={() => toggleReviewStep(stepId)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                    done
                      ? "border-os-green/30 bg-os-green/5 text-os-text"
                      : "border-os-border hover:border-os-accent/30"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px]",
                      done
                        ? "border-os-green bg-os-green text-os-bg"
                        : "border-os-border"
                    )}
                  >
                    {done ? "✓" : ""}
                  </span>
                  {STEP_LABELS[stepId]}
                </button>
              </li>
            );
          })}
        </ul>
      </OsCard>

      <OsCard>
        <h2 className="text-sm font-medium text-os-text">Objectives snapshot</h2>
        <ul className="mt-3 space-y-2">
          {objectiveDetails.map(({ objective, health }) => {
            const pillar = getPillarForObjective(data, objective);
            return (
              <li
                key={objective.id}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-os-muted">
                  {pillar?.emoji} {objective.title}
                </span>
                <HealthDot health={health} />
              </li>
            );
          })}
        </ul>
      </OsCard>

      <OsCard>
        <label htmlFor="learnings" className="text-sm font-medium text-os-text">
          What we learned about how we work
        </label>
        <textarea
          id="learnings"
          value={review.learnings}
          onChange={(e) => updateQuarterlyReview({ learnings: e.target.value })}
          rows={4}
          placeholder="1–2 sentences — honest, no blame"
          className="mt-2 w-full rounded-md border border-os-border bg-os-bg px-3 py-2 text-sm text-os-text"
        />
      </OsCard>

      <OsCard>
        <p className="text-sm text-os-muted">
          Backlog: {backlogCount} parked · Overrides logged:{" "}
          {data.capacityOverrides?.length ?? 0}
        </p>
        {data.capacityOverrides && data.capacityOverrides.length > 0 ? (
          <ul className="mt-2 space-y-1 text-xs text-os-muted">
            {data.capacityOverrides.slice(0, 5).map((o) => (
              <li key={o.id}>
                · {o.projectTitle}: {o.reason}
              </li>
            ))}
          </ul>
        ) : null}
      </OsCard>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/os/goals"
          className="rounded-md border border-os-border px-4 py-2 text-sm text-os-text hover:border-os-accent/40"
        >
          Edit vision →
        </Link>
        <Link
          href="/os/projects"
          className="rounded-md bg-os-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Set focus on Projects →
        </Link>
      </div>
    </div>
  );
}
