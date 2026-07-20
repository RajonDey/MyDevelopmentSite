"use client";

import type { ProgressSnapshot } from "@/types/os";
import { OsCard } from "@/components/os/ui/OsCard";

type ProgressTrendChartProps = {
  title: string;
  subtitle?: string;
  snapshots: ProgressSnapshot[];
  objectiveId: string;
  height?: number;
};

export function ProgressTrendChart({
  title,
  subtitle,
  snapshots,
  objectiveId,
  height = 120,
}: ProgressTrendChartProps) {
  const points = snapshots
    .filter((s) => s.objectiveId === objectiveId)
    .sort((a, b) => a.capturedAt.localeCompare(b.capturedAt));

  if (points.length < 2) {
    return (
      <OsCard className="p-4">
        <p className="text-sm font-medium text-os-text">{title}</p>
        <p className="mt-2 text-xs text-os-muted">Not enough history yet.</p>
      </OsCard>
    );
  }

  const width = 280;
  const pad = 8;
  const maxY = 100;
  const minY = 0;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (width - pad * 2));
  const ys = points.map(
    (p) =>
      pad +
      (1 - (p.progressPct - minY) / (maxY - minY)) * (height - pad * 2)
  );

  const linePath = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`)
    .join(" ");

  const areaPath = `${linePath} L ${xs[xs.length - 1]} ${height - pad} L ${xs[0]} ${height - pad} Z`;

  const latest = points[points.length - 1];
  const first = points[0];
  const delta = latest.progressPct - first.progressPct;

  return (
    <OsCard className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-os-text">{title}</p>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-os-muted">{subtitle}</p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-os-text">{latest.progressPct}%</p>
          <p
            className={
              delta >= 0 ? "text-xs text-os-green" : "text-xs text-os-red"
            }
          >
            {delta >= 0 ? "+" : ""}
            {delta}% since {new Date(first.capturedAt).toLocaleDateString("en-US", { month: "short" })}
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`grad-${objectiveId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--os-color-accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--os-color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#grad-${objectiveId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="var(--os-color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {xs.map((x, i) => (
          <circle
            key={points[i].id}
            cx={x}
            cy={ys[i]}
            r="3"
            fill="var(--os-color-accent)"
          />
        ))}
      </svg>

      <p className="mt-2 text-[10px] text-os-muted">
        {points.length} snapshots · mock history (syncs on ship & KR updates)
      </p>
    </OsCard>
  );
}
