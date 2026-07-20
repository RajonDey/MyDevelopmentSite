export type OsRole = "admin" | "member";
/** Core team (OS access) vs future hired employees */
export type MemberKind = "core" | "employee";

export type ProjectStatus =
  | "backlog"
  | "active"
  | "blocked"
  | "done"
  | "declined"
  | "archived";

export type ProjectPriority = "p1" | "p2" | "p3";
export type Health = "green" | "yellow" | "red";

export interface OsMember {
  id: string;
  email: string;
  name: string;
  role: OsRole;
  kind?: MemberKind;
  avatarUrl?: string;
  activeLimit?: number;
}

export interface NorthStar {
  id: string;
  year: number;
  statement: string;
  mission: string;
  whyItMatters: string;
  updatedAt: string;
}

export interface Pillar {
  id: string;
  slug: string;
  name: string;
  emoji?: string;
  description: string;
  sortOrder: number;
  activeSlotLimit: number;
  /** Lane owner for the quarter */
  leadId?: string;
}

export interface TeamCapacity {
  teamActiveLimit: number;
}

export interface Objective {
  id: string;
  pillarId: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  title: string;
  outcome: string;
  health: Health;
  sortOrder: number;
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  updatedAt: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  objectiveId: string;
  title: string;
  /** Accountable person — only this id counts toward load */
  ownerId: string;
  /** Helpers on the same project — display only, does not affect capacity */
  collaboratorIds?: string[];
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string | null;
  whoItHelps?: string;
  fulfillmentNote?: string;
  blockerNote?: string;
  backlogReason?: string;
  declineReason?: string;
  links?: ProjectLink[];
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Win {
  id: string;
  projectId?: string;
  title: string;
  note?: string;
  createdById: string;
  createdAt: string;
}

export interface WeeklyCheckIn {
  id: string;
  memberId: string;
  weekStart: string;
  moved: string;
  next: string;
  blockers?: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  energy: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
}

export interface CapacityOverride {
  id: string;
  projectId: string;
  projectTitle: string;
  reason: string;
  createdById: string;
  createdAt: string;
}

export interface QuarterlyReview {
  year: number;
  quarter: 1 | 2 | 3 | 4;
  learnings: string;
  completedSteps: string[];
  updatedAt: string;
}

export interface ProgressSnapshot {
  id: string;
  capturedAt: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  objectiveId: string;
  progressPct: number;
  krValues: { krId: string; current: number }[];
}

export interface CommandCenterData {
  northStar: NorthStar;
  pillars: Pillar[];
  teamCapacity: TeamCapacity;
  objectives: Objective[];
  keyResults: KeyResult[];
  projects: Project[];
  members: OsMember[];
  wins: Win[];
  focusProjectIds: string[];
  checkIns?: WeeklyCheckIn[];
  capacityOverrides?: CapacityOverride[];
  quarterlyReview?: QuarterlyReview;
}

export const PROJECT_STATUSES: ProjectStatus[] = [
  "backlog",
  "active",
  "blocked",
  "done",
  "declined",
  "archived",
];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  backlog: "Backlog",
  active: "Active",
  blocked: "Blocked",
  done: "Done",
  declined: "Declined",
  archived: "Archived",
};

export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  p1: "P1",
  p2: "P2",
  p3: "P3",
};

export const REVIEW_STEP_IDS = [
  "north-star",
  "wins",
  "scorecard",
  "capacity",
  "backlog",
  "next-quarter",
  "focus",
] as const;

export type ReviewStepId = (typeof REVIEW_STEP_IDS)[number];

export const FIXED_CATEGORY_COUNT = 4;

export const MAX_BACKLOG_ITEMS = 10;
export const MAX_FOCUS_PROJECTS = 3;
