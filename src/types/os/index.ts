/** App access level — what they can do in OS */
export type OsAccessLevel = "admin" | "member";
/** @deprecated Use OsAccessLevel — kept as alias during migration */
export type OsRole = OsAccessLevel;

/** Core team (OS access) vs future hired employees (no login until promoted) */
export type MemberKind = "core" | "employee";

export type MemberStatus = "active" | "invited" | "disabled";

export type ProjectStatus =
  | "backlog"
  | "active"
  | "blocked"
  | "done"
  | "declined"
  | "archived";

export type ProjectPriority = "p1" | "p2" | "p3";
export type Health = "green" | "yellow" | "red";

/** Client work links to Lead Desk; internal work is owned in OS */
export type ProjectKind = "client_linked" | "internal";

/**
 * Dynamic org role — seat definition with responsibilities & principles.
 * Admin can create/edit these; not the same as access level (admin/member).
 */
export interface OsRoleDef {
  id: string;
  slug: string;
  name: string;
  /** One-line purpose of this seat */
  summary: string;
  responsibilities: string[];
  principles: string[];
  sortOrder: number;
  /** Soft-archive — hidden from assign picker when false */
  active: boolean;
}

export interface OsMember {
  id: string;
  email: string;
  name: string;
  /** Access level: admin | member */
  role: OsAccessLevel;
  /** Primary org role (responsibilities / principles) */
  orgRoleId?: string;
  kind?: MemberKind;
  status?: MemberStatus;
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
  /** Desk-linked vs OS-owned internal work */
  kind: ProjectKind;
  /** Accountable person — only this id counts toward load */
  ownerId: string;
  /** Helpers on the same project — display only, does not affect capacity */
  collaboratorIds?: string[];
  status: ProjectStatus;
  priority: ProjectPriority;
  deadline: string | null;
  /** Short description — required richness for internal; optional for client_linked */
  summary?: string;
  /** Working notes (OS-owned for internal projects) */
  notes?: string;
  whoItHelps?: string;
  fulfillmentNote?: string;
  blockerNote?: string;
  backlogReason?: string;
  declineReason?: string;
  links?: ProjectLink[];
  /** Lead Desk rdx_projects.id when kind === client_linked */
  rdxProjectId?: string;
  rdxLeadId?: string;
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
  /** Dynamic org role catalog */
  roleDefs: OsRoleDef[];
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

export const PROJECT_KIND_LABELS: Record<ProjectKind, string> = {
  client_linked: "Client (Desk)",
  internal: "Internal",
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
