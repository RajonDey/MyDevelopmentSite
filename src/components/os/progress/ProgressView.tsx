"use client";

import Link from "next/link";
import { OsCard } from "@/components/os/ui/OsCard";
import { ProgressBar } from "@/components/os/ui/ProgressBar";
import { HealthDot } from "@/components/os/ui/HealthDot";
import { ProgressTrendChart } from "@/components/os/progress/ProgressTrendChart";
import { useOsData } from "@/components/os/context/OsDataContext";
import {
  getCurrentQuarter,
  getQuarterLabel,
} from "@/lib/os/progress";
import {
  getObjectiveWithProgress,
  getPillarForObjective,
} from "@/lib/os/selectors";

export function ProgressView() {
  const { data, snapshots, resetMockData } = useOsData();

  const quarter = getCurrentQuarter();
  const year = data.northStar.year;
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

  const shippedThisQuarter = data.projects.filter((p) => {
    if (p.status !== "done" || !p.completedAt) return false;
    const completed = new Date(p.completedAt);
    const startMonth = (quarter - 1) * 3;
    const endMonth = startMonth + 3;
    return (
      completed.getFullYear() === year &&
      completed.getMonth() >= startMonth &&
      completed.getMonth() < endMonth
    );
  }).length;

  const winsThisQuarter = data.wins.filter((w) => {
    const created = new Date(w.createdAt);
    const startMonth = (quarter - 1) * 3;
    const endMonth = startMonth + 3;
    return (
      created.getFullYear() === year &&
      created.getMonth() >= startMonth &&
      created.getMonth() < endMonth
    );
  }).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-medium text-os-text">
            {getQuarterLabel(quarter, year)} progress
          </h1>
          <p className="mt-1 text-sm text-os-muted">
            Roll-up + trends — updates when you ship or edit key results
          </p>
        </div>
        <button
          type="button"
          onClick={resetMockData}
          className="text-xs text-os-muted hover:text-os-text"
        >
          Reset mock data
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <OsCard>
          <p className="text-xs text-os-muted">On track</p>
          <p className="mt-1 text-2xl font-semibold text-os-green">{onTrack}</p>
        </OsCard>
        <OsCard>
          <p className="text-xs text-os-muted">At risk</p>
          <p className="mt-1 text-2xl font-semibold text-os-yellow">{atRisk}</p>
        </OsCard>
        <OsCard>
          <p className="text-xs text-os-muted">Shipped</p>
          <p className="mt-1 text-2xl font-semibold text-os-text">
            {shippedThisQuarter}
          </p>
          <p className="text-xs text-os-muted">{winsThisQuarter} wins</p>
        </OsCard>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium text-os-text">Trend lines</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {objectives.map((obj) => {
            const pillar = getPillarForObjective(data, obj);
            return (
              <ProgressTrendChart
                key={obj.id}
                title={obj.title}
                subtitle={pillar ? `${pillar.emoji} ${pillar.name}` : undefined}
                snapshots={snapshots}
                objectiveId={obj.id}
              />
            );
          })}
        </div>
      </section>

      <OsCard className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-os-border text-xs text-os-muted">
              <th className="pb-3 pr-4 font-medium">Objective</th>
              <th className="pb-3 pr-4 font-medium">Progress</th>
              <th className="pb-3 pr-4 font-medium">Health</th>
              <th className="pb-3 pr-4 font-medium">Projects</th>
              <th className="pb-3 font-medium">Key results</th>
            </tr>
          </thead>
          <tbody>
            {objectiveDetails.map(({ objective, progressPct, health, projects, keyResults }) => {
              const pillar = getPillarForObjective(data, objective);
              const done = projects.filter((p) => p.status === "done").length;

              return (
                <tr
                  key={objective.id}
                  className="border-b border-os-border/60 last:border-0"
                >
                  <td className="py-3 pr-4">
                    <p className="font-medium text-os-text">{objective.title}</p>
                    <p className="text-xs text-os-muted">
                      {pillar?.emoji} {pillar?.name}
                    </p>
                  </td>
                  <td className="py-3 pr-4">
                    <ProgressBar value={progressPct} size="sm" />
                    <span className="mt-1 block text-xs text-os-muted">
                      {progressPct}%
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <HealthDot health={health} label={health} />
                  </td>
                  <td className="py-3 pr-4 text-os-muted">
                    {done}/{projects.length} done
                  </td>
                  <td className="py-3 text-xs text-os-muted">
                    {keyResults.length > 0
                      ? keyResults
                          .map(
                            (kr) =>
                              `${kr.label}: ${kr.current}/${kr.target}`
                          )
                          .join(" · ")
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </OsCard>

      <p className="text-center text-xs text-os-muted">
        Weekly check-ins live on{" "}
        <Link href="/os/team" className="text-os-accent hover:underline">
          Team →
        </Link>
      </p>
    </div>
  );
}
