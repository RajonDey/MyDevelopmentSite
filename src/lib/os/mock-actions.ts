import type { CommandCenterData, Project, ProgressSnapshot } from "@/types/os";
import {
  getMemberCapacityState,
  getPillarCapacityState,
  getTeamCapacityState,
} from "@/lib/os/capacity";
import { getObjective, getPillarForObjective } from "@/lib/os/selectors";

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export type CapacityCheckResult =
  | { ok: true }
  | { ok: false; message: string };

export function canActivateProject(
  data: CommandCenterData,
  project: Project
): CapacityCheckResult {
  const objective = getObjective(data, project.objectiveId);
  if (!objective) {
    return { ok: false, message: "Project has no linked objective." };
  }

  const pillar = getPillarForObjective(data, objective);
  if (!pillar) {
    return { ok: false, message: "Project category not found." };
  }

  const team = getTeamCapacityState(data);
  if (team.used >= team.limit) {
    return {
      ok: false,
      message: `Team at capacity (${team.limit} slots). Ship or park something first.`,
    };
  }

  const pillarCap = getPillarCapacityState(pillar, data.projects, data);
  if (pillarCap.used >= pillar.activeSlotLimit) {
    return {
      ok: false,
      message: `${pillar.name} is full (${pillar.activeSlotLimit} slots). Park another project in this category.`,
    };
  }

  const memberCap = getMemberCapacityState(project.ownerId, data);
  if (memberCap.used >= memberCap.limit) {
    const member = data.members.find((m) => m.id === project.ownerId);
    return {
      ok: false,
      message: `${member?.name ?? "Owner"} is at their limit (${memberCap.limit} active).`,
    };
  }

  return { ok: true };
}

export function appendSnapshot(
  snapshots: ProgressSnapshot[],
  data: CommandCenterData,
  objectiveId: string,
  progressPct: number
): ProgressSnapshot[] {
  const objective = data.objectives.find((o) => o.id === objectiveId);
  if (!objective) return snapshots;

  const krValues = data.keyResults
    .filter((kr) => kr.objectiveId === objectiveId)
    .map((kr) => ({ krId: kr.id, current: kr.current }));

  const snapshot: ProgressSnapshot = {
    id: generateId("snap"),
    capturedAt: new Date().toISOString(),
    year: objective.year,
    quarter: objective.quarter,
    objectiveId,
    progressPct,
    krValues,
  };

  return [...snapshots, snapshot];
}
