import { OsCard } from "@/components/os/ui/OsCard";
import { ProgressBar } from "@/components/os/ui/ProgressBar";
import type { CommandCenterData } from "@/types/os";
import { getCurrentQuarter, getObjectiveProgress } from "@/lib/os/progress";

type PillarCardsProps = {
  data: CommandCenterData;
};

export function PillarCards({ data }: PillarCardsProps) {
  const quarter = getCurrentQuarter();
  const year = data.northStar.year;

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {data.pillars.map((pillar) => {
        const pillarObjectives = data.objectives.filter(
          (o) =>
            o.pillarId === pillar.id && o.year === year && o.quarter === quarter
        );
        const allYearObjectives = data.objectives.filter(
          (o) => o.pillarId === pillar.id && o.year === year
        );
        const objectiveIds = allYearObjectives.map((o) => o.id);
        const pillarProjects = data.projects.filter((p) =>
          objectiveIds.includes(p.objectiveId)
        );
        const activeCount = pillarProjects.filter(
          (p) => p.status === "active" || p.status === "blocked"
        ).length;

        const progressValues = allYearObjectives.map((o) =>
          getObjectiveProgress(data.projects, o.id)
        );
        const avgProgress =
          progressValues.length > 0
            ? Math.round(
                progressValues.reduce((a, b) => a + b, 0) /
                  progressValues.length
              )
            : 0;

        return (
          <OsCard
            key={pillar.id}
            className="min-w-[200px] flex-1 shrink-0 sm:min-w-[220px]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-lg" aria-hidden>
                {pillar.emoji}
              </span>
              <span className="text-xs text-os-muted">
                {activeCount} active
              </span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-os-text">
              {pillar.name}
            </h3>
            <p className="mt-1 text-xs text-os-muted">
              {pillarObjectives.length} objective
              {pillarObjectives.length !== 1 ? "s" : ""} this quarter
            </p>
            <div className="mt-3">
              <ProgressBar value={avgProgress} size="sm" />
              <p className="mt-1 text-xs text-os-muted">{avgProgress}% year avg</p>
            </div>
          </OsCard>
        );
      })}
    </div>
  );
}
