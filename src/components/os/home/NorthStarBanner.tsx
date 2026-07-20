"use client";

import { OsCard } from "@/components/os/ui/OsCard";
import { useOsData } from "@/components/os/context/OsDataContext";
import {
  getObjectiveProgress,
  getYearProgress,
} from "@/lib/os/progress";

function YearRing({ progress }: { progress: number }) {
  const size = 72;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--os-color-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--os-color-accent)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-os-text">
        {progress}%
      </span>
    </div>
  );
}

export function NorthStarBanner() {
  const { data } = useOsData();
  const yearObjectives = data.objectives.filter(
    (o) => o.year === data.northStar.year
  );
  const progressValues = yearObjectives.map((o) =>
    getObjectiveProgress(data.projects, o.id)
  );
  const yearProgress = getYearProgress(progressValues);

  return (
    <OsCard raised className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-os-accent/5 via-transparent to-transparent" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-os-accent">
              Why we exist · {data.northStar.year}
            </p>
            <p className="mt-3 font-rdx-display text-xl leading-snug text-os-text md:text-2xl">
              {data.northStar.statement}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-os-muted">
            {data.northStar.whyItMatters}
          </p>
          <p className="border-l-2 border-os-accent/40 pl-3 text-sm text-os-text/90">
            <span className="text-os-muted">We serve: </span>
            {data.northStar.mission}
          </p>
        </div>
        <YearRing progress={yearProgress} />
      </div>
    </OsCard>
  );
}
