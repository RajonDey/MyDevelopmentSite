import type { CommandCenterData, OsMember, Project, WeeklyCheckIn } from "@/types/os";

export function countsTowardCapacity(status: Project["status"]): boolean {
  return status === "active" || status === "blocked";
}

export function getTeamInFlight(projects: Project[]): number {
  return projects.filter((p) => countsTowardCapacity(p.status)).length;
}

export function getPillarInFlight(
  projects: Project[],
  pillarId: string,
  data: CommandCenterData
): Project[] {
  const objectiveIds = data.objectives
    .filter((o) => o.pillarId === pillarId)
    .map((o) => o.id);
  return projects.filter(
    (p) =>
      objectiveIds.includes(p.objectiveId) && countsTowardCapacity(p.status)
  );
}

export function getPillarCapacityState(
  pillar: { id: string; activeSlotLimit: number },
  projects: Project[],
  data: CommandCenterData
) {
  const inFlight = getPillarInFlight(projects, pillar.id, data);
  const used = inFlight.length;
  const limit = pillar.activeSlotLimit;
  const available = Math.max(limit - used, 0);
  const over = used > limit;

  return { inFlight, used, limit, available, over };
}

export function getTeamCapacityState(data: CommandCenterData) {
  const used = getTeamInFlight(data.projects);
  const limit = data.teamCapacity.teamActiveLimit;
  const available = Math.max(limit - used, 0);
  const over = used > limit;

  return { used, limit, available, over };
}

export function getMemberInFlight(
  projects: Project[],
  memberId: string
): number {
  // Collaborators do not count — only accountable owner
  return projects.filter(
    (p) => p.ownerId === memberId && countsTowardCapacity(p.status)
  ).length;
}

export function getMemberCapacityState(
  memberId: string,
  data: CommandCenterData
) {
  const member = data.members.find((m) => m.id === memberId);
  const used = getMemberInFlight(data.projects, memberId);
  const limit = member?.activeLimit ?? 3;
  const available = Math.max(limit - used, 0);
  const over = used > limit;

  return { used, limit, available, over };
}

export function getBacklogProjects(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.status === "backlog")
    .sort((a, b) => {
      const priorityOrder = { p1: 0, p2: 1, p3: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}

export function getDeclinedProjects(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.status === "declined")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getArchivedProjects(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.status === "archived")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getRecentDone(projects: Project[], limit = 4): Project[] {
  return projects
    .filter((p) => p.status === "done")
    .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""))
    .slice(0, limit);
}

export function getWeekStart(date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

export function getMembersMissingCheckIn(
  members: OsMember[],
  checkIns: WeeklyCheckIn[] | undefined,
  weekStart = getWeekStart()
): OsMember[] {
  const submitted = new Set(
    (checkIns ?? [])
      .filter((c) => c.weekStart === weekStart)
      .map((c) => c.memberId)
  );
  return members.filter((m) => !submitted.has(m.id));
}
