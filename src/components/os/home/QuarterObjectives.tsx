import { OsCard } from "@/components/os/ui/OsCard";
import { ProgressBar } from "@/components/os/ui/ProgressBar";
import { HealthDot } from "@/components/os/ui/HealthDot";
import type { CommandCenterData } from "@/types/os";
import { getCurrentQuarter, getQuarterLabel } from "@/lib/os/progress";
import { getObjectiveWithProgress, getPillarForObjective } from "@/lib/os/selectors";

type QuarterObjectivesProps = {
  data: CommandCenterData;
};

export function QuarterObjectives({ data }: QuarterObjectivesProps) {
  const quarter = getCurrentQuarter();
  const year = data.northStar.year;
  const objectives = data.objectives
    .filter((o) => o.year === year && o.quarter === quarter)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-os-muted">
        {getQuarterLabel(quarter, year)} objectives
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {objectives.map((objective) => {
          const { progressPct, health, projects } = getObjectiveWithProgress(
            data,
            objective
          );
          const pillar = getPillarForObjective(data, objective);
          const p1Active = projects.filter(
            (p) => p.priority === "p1" && p.status === "active"
          ).length;

          return (
            <OsCard key={objective.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-os-muted">
                    {pillar?.emoji} {pillar?.name}
                  </p>
                  <h3 className="mt-1 text-sm font-medium text-os-text">
                    {objective.title}
                  </h3>
                </div>
                <HealthDot health={health} />
              </div>
              <ProgressBar value={progressPct} className="mt-3" />
              <div className="mt-2 flex items-center justify-between text-xs text-os-muted">
                <span>{progressPct}% complete</span>
                <span>
                  {p1Active} P1 active · {projects.length} projects
                </span>
              </div>
            </OsCard>
          );
        })}
      </div>
    </section>
  );
}
