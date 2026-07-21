import type {
  CommandCenterData,
  Objective,
  OsMember,
  OsRoleDef,
  Pillar,
  Project,
} from "@/types/os";
import {
  deriveObjectiveHealth,
  getObjectiveProgress,
  getMemberActiveCount,
} from "@/lib/os/progress";

export function getMember(
  data: CommandCenterData,
  memberId: string
): OsMember | undefined {
  return data.members.find((m) => m.id === memberId);
}

export function getRoleDef(
  data: CommandCenterData,
  roleId: string | undefined
): OsRoleDef | undefined {
  if (!roleId) return undefined;
  return (data.roleDefs ?? []).find((r) => r.id === roleId);
}

export function getActiveRoleDefs(data: CommandCenterData): OsRoleDef[] {
  return [...(data.roleDefs ?? [])]
    .filter((r) => r.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPillar(
  data: CommandCenterData,
  pillarId: string
): Pillar | undefined {
  return data.pillars.find((p) => p.id === pillarId);
}

export function getObjective(
  data: CommandCenterData,
  objectiveId: string
): Objective | undefined {
  return data.objectives.find((o) => o.id === objectiveId);
}

export function getProjectsForObjective(
  data: CommandCenterData,
  objectiveId: string
): Project[] {
  return data.projects.filter((p) => p.objectiveId === objectiveId);
}

export function getPillarForObjective(
  data: CommandCenterData,
  objective: Objective
): Pillar | undefined {
  return getPillar(data, objective.pillarId);
}

export function getObjectiveWithProgress(
  data: CommandCenterData,
  objective: Objective
) {
  const progressPct = getObjectiveProgress(data.projects, objective.id);
  const health = deriveObjectiveHealth(
    progressPct,
    objective.year,
    objective.quarter,
    data.projects,
    objective.id,
    objective.health
  );
  const projects = getProjectsForObjective(data, objective.id);
  const keyResults = data.keyResults.filter(
    (kr) => kr.objectiveId === objective.id
  );

  return { objective, progressPct, health, projects, keyResults };
}

export function getMemberLoads(data: CommandCenterData) {
  return data.members.map((member) => ({
    member,
    activeCount: getMemberActiveCount(data.projects, member.id),
  }));
}
