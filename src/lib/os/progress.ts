import type { Health, Project } from "@/types/os";

export function getCurrentQuarter(now = new Date()): 1 | 2 | 3 | 4 {
  return (Math.floor(now.getMonth() / 3) + 1) as 1 | 2 | 3 | 4;
}

export function getQuarterLabel(quarter: 1 | 2 | 3 | 4, year: number): string {
  return `Q${quarter} ${year}`;
}

function getQuarterDates(year: number, quarter: 1 | 2 | 3 | 4) {
  const startMonth = (quarter - 1) * 3;
  const start = new Date(year, startMonth, 1);
  const end = new Date(year, startMonth + 3, 0, 23, 59, 59, 999);
  return { start, end };
}

export function getExpectedQuarterProgress(
  year: number,
  quarter: 1 | 2 | 3 | 4,
  now = new Date()
): number {
  const { start, end } = getQuarterDates(year, quarter);
  const total = end.getTime() - start.getTime();
  if (total <= 0) return 0;
  const elapsed = Math.min(Math.max(now.getTime() - start.getTime(), 0), total);
  return Math.round((elapsed / total) * 100);
}

export function getObjectiveProgress(
  projects: Project[],
  objectiveId: string
): number {
  const linked = projects.filter((p) => p.objectiveId === objectiveId);
  if (linked.length === 0) return 0;
  const done = linked.filter((p) => p.status === "done").length;
  return Math.round((done / linked.length) * 100);
}

export function deriveObjectiveHealth(
  progressPct: number,
  year: number,
  quarter: 1 | 2 | 3 | 4,
  projects: Project[],
  objectiveId: string,
  storedHealth?: Health
): Health {
  if (storedHealth) return storedHealth;

  const linked = projects.filter((p) => p.objectiveId === objectiveId);
  if (linked.length === 0) return "yellow";

  const hasBlockedP1 = linked.some(
    (p) => p.status === "blocked" && p.priority === "p1"
  );
  if (hasBlockedP1 || progressPct < 40) return "red";

  const expected = getExpectedQuarterProgress(year, quarter);
  if (progressPct + 15 < expected) {
    return progressPct >= 70 ? "yellow" : "yellow";
  }

  if (progressPct >= 70) return "green";
  if (progressPct >= 40) return "yellow";
  return "red";
}

export function getMemberActiveCount(
  projects: Project[],
  memberId: string
): number {
  return projects.filter(
    (p) =>
      p.ownerId === memberId &&
      (p.status === "active" || p.status === "blocked")
  ).length;
}

export function getLoadSignal(count: number): "ok" | "watch" | "overloaded" {
  if (count >= 4) return "overloaded";
  if (count >= 3) return "watch";
  return "ok";
}

export function getYearProgress(
  objectiveProgress: number[]
): number {
  if (objectiveProgress.length === 0) return 0;
  const sum = objectiveProgress.reduce((a, b) => a + b, 0);
  return Math.round(sum / objectiveProgress.length);
}

export function getKrProgress(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

export function daysUntil(dateIso: string | null, now = new Date()): number | null {
  if (!dateIso) return null;
  const deadline = new Date(dateIso);
  const diff = deadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
