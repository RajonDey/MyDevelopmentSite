"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  appendSnapshot,
  canActivateProject,
  generateId,
} from "@/lib/os/mock-actions";
import { getWeekStart, getBacklogProjects } from "@/lib/os/capacity";
import {
  MOCK_STORAGE_KEY,
  mockProgressSnapshots,
} from "@/lib/os/mock-snapshots";
import { getObjectiveProgress } from "@/lib/os/progress";
import type {
  CommandCenterData,
  NorthStar,
  Pillar,
  ProgressSnapshot,
  Project,
  ProjectLink,
  ProjectPriority,
  ProjectStatus,
  QuarterlyReview,
  ReviewStepId,
  WeeklyCheckIn,
  Win,
  OsMember,
  OsRoleDef,
} from "@/types/os";
import { MAX_BACKLOG_ITEMS, MAX_FOCUS_PROJECTS } from "@/types/os";

export type RoleDefInput = {
  name: string;
  summary: string;
  responsibilities: string[];
  principles: string[];
};

export type AddBacklogInput = {
  title: string;
  pillarId: string;
  whoItHelps?: string;
  backlogReason?: string;
  ownerId?: string;
  priority?: ProjectPriority;
};

export type CheckInInput = {
  moved: string;
  next: string;
  blockers?: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  energy: 1 | 2 | 3 | 4 | 5;
};

export type CreateProjectInput = {
  title: string;
  pillarId: string;
  ownerId: string;
  collaboratorIds?: string[];
  status: "backlog" | "active";
  priority?: ProjectPriority;
  deadline?: string | null;
  kind?: Project["kind"];
  summary?: string;
  notes?: string;
  whoItHelps?: string;
  fulfillmentNote?: string;
  backlogReason?: string;
  blockerNote?: string;
};

export type UpdateProjectInput = Partial<{
  title: string;
  ownerId: string;
  collaboratorIds: string[];
  priority: ProjectPriority;
  deadline: string | null;
  kind: Project["kind"];
  summary: string;
  notes: string;
  whoItHelps: string;
  fulfillmentNote: string;
  backlogReason: string;
  blockerNote: string;
  objectiveId: string;
}>;

export type UpdatePillarInput = Partial<
  Pick<Pillar, "leadId" | "activeSlotLimit" | "description">
>;

type PersistedState = {
  data: CommandCenterData;
  snapshots: ProgressSnapshot[];
};

type OsDataContextValue = {
  data: CommandCenterData;
  snapshots: ProgressSnapshot[];
  currentMember: OsMember;
  isAdmin: boolean;
  toast: string | null;
  dismissToast: () => void;
  resetMockData: () => void;
  addBacklogProject: (input: AddBacklogInput) => boolean;
  createProject: (input: CreateProjectInput) => boolean;
  updateProject: (projectId: string, input: UpdateProjectInput) => void;
  deleteProject: (projectId: string) => void;
  setFocusProjectIds: (ids: string[]) => void;
  updatePillar: (pillarId: string, input: UpdatePillarInput) => void;
  promoteProject: (projectId: string) => boolean;
  promoteProjectWithOverride: (projectId: string, reason: string) => boolean;
  parkProject: (projectId: string, reason?: string) => void;
  declineProject: (projectId: string, reason: string) => void;
  archiveProject: (projectId: string) => void;
  markProjectDone: (projectId: string, reflectionNote: string) => void;
  updateProjectLinks: (projectId: string, links: ProjectLink[]) => void;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => boolean;
  submitCheckIn: (input: CheckInInput) => void;
  updateNorthStar: (
    fields: Partial<Pick<NorthStar, "statement" | "mission" | "whyItMatters">>
  ) => void;
  updateKeyResult: (krId: string, current: number) => void;
  updateQuarterlyReview: (
    fields: Partial<Pick<QuarterlyReview, "learnings" | "completedSteps">>
  ) => void;
  toggleReviewStep: (stepId: ReviewStepId) => void;
  createRoleDef: (input: RoleDefInput) => boolean;
  updateRoleDef: (roleId: string, input: Partial<RoleDefInput> & { active?: boolean }) => void;
  archiveRoleDef: (roleId: string) => void;
  assignMemberOrgRole: (memberId: string, orgRoleId: string) => void;
};

const OsDataContext = createContext<OsDataContextValue | null>(null);

function loadPersisted(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(MOCK_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function savePersisted(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

type OsDataProviderProps = {
  initialData: CommandCenterData;
  currentMemberId: string;
  children: React.ReactNode;
};

export function OsDataProvider({
  initialData,
  currentMemberId,
  children,
}: OsDataProviderProps) {
  const [data, setData] = useState<CommandCenterData>(initialData);
  const [snapshots, setSnapshots] = useState<ProgressSnapshot[]>(
    mockProgressSnapshots
  );
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadPersisted();
    if (saved) {
      setData(saved.data);
      setSnapshots(saved.snapshots);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePersisted({ data, snapshots });
  }, [data, snapshots, hydrated]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 4000);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const resetMockData = useCallback(() => {
    setData(initialData);
    setSnapshots(mockProgressSnapshots);
    sessionStorage.removeItem(MOCK_STORAGE_KEY);
    showToast("Mock data reset to defaults.");
  }, [initialData, showToast]);

  const currentMember = useMemo(() => {
    return (
      data.members.find((m) => m.id === currentMemberId) ??
      data.members.find((m) => m.role === "admin") ??
      data.members[0]
    );
  }, [data.members, currentMemberId]);

  const isAdmin = currentMember?.role === "admin";

  const resolveObjectiveForPillar = useCallback(
    (pillarId: string) => {
      return (
        data.objectives.find(
          (o) =>
            o.pillarId === pillarId &&
            o.year === data.northStar.year &&
            o.quarter === 3
        ) ?? data.objectives.find((o) => o.pillarId === pillarId)
      );
    },
    [data.objectives, data.northStar.year]
  );

  const addBacklogProject = useCallback(
    (input: AddBacklogInput): boolean => {
      if (!currentMember) return false;

      const backlogCount = getBacklogProjects(data.projects).length;
      if (backlogCount >= MAX_BACKLOG_ITEMS) {
        showToast(
          `Backlog full (${MAX_BACKLOG_ITEMS}). Decline or archive something first.`
        );
        return false;
      }

      const pillar = data.pillars.find((p) => p.id === input.pillarId);
      if (!pillar) {
        showToast("Pick a valid category.");
        return false;
      }

      const objective =
        data.objectives.find(
          (o) =>
            o.pillarId === input.pillarId &&
            o.year === data.northStar.year &&
            o.quarter === 3
        ) ?? data.objectives.find((o) => o.pillarId === input.pillarId);

      if (!objective) {
        showToast("No objective linked for this category.");
        return false;
      }

      const now = new Date().toISOString();
      const pillarSlug = pillar.slug;
      const project: Project = {
        id: generateId("proj"),
        objectiveId: objective.id,
        title: input.title.trim(),
        kind: pillarSlug === "client-services" ? "client_linked" : "internal",
        ownerId: input.ownerId ?? currentMember.id,
        status: "backlog",
        priority: input.priority ?? "p3",
        deadline: null,
        whoItHelps: input.whoItHelps,
        backlogReason:
          input.backlogReason ??
          "Parked from quick-add — review when capacity opens.",
        createdAt: now,
        updatedAt: now,
      };

      setData((prev) => ({
        ...prev,
        projects: [...prev.projects, project],
      }));
      showToast(`Parked in backlog: ${project.title}`);
      return true;
    },
    [currentMember, data, showToast]
  );

  const createProject = useCallback(
    (input: CreateProjectInput): boolean => {
      if (!currentMember) return false;
      if (!input.title.trim()) {
        showToast("Project title is required.");
        return false;
      }

      const objective = resolveObjectiveForPillar(input.pillarId);
      if (!objective) {
        showToast("No objective linked for this category.");
        return false;
      }

      const now = new Date().toISOString();
      const collaborators = (input.collaboratorIds ?? []).filter(
        (id) => id !== input.ownerId
      );
      const pillar = data.pillars.find((p) => p.id === input.pillarId);
      const defaultKind =
        pillar?.slug === "client-services" ? "client_linked" : "internal";
      const project: Project = {
        id: generateId("proj"),
        objectiveId: objective.id,
        title: input.title.trim(),
        kind: input.kind ?? defaultKind,
        ownerId: input.ownerId,
        collaboratorIds: collaborators.length > 0 ? collaborators : undefined,
        status: input.status === "active" ? "active" : "backlog",
        priority: input.priority ?? "p2",
        deadline: input.deadline ?? null,
        summary: input.summary,
        notes: input.notes,
        whoItHelps: input.whoItHelps,
        fulfillmentNote: input.fulfillmentNote,
        backlogReason: input.backlogReason,
        blockerNote: input.blockerNote,
        createdAt: now,
        updatedAt: now,
      };

      if (input.status === "backlog") {
        const backlogCount = getBacklogProjects(data.projects).length;
        if (backlogCount >= MAX_BACKLOG_ITEMS) {
          showToast(
            `Backlog full (${MAX_BACKLOG_ITEMS}). Decline or archive something first.`
          );
          return false;
        }
      } else {
        const check = canActivateProject(data, project);
        if (!check.ok) {
          showToast(check.message);
          return false;
        }
      }

      setData((prev) => ({
        ...prev,
        projects: [...prev.projects, project],
      }));
      showToast(
        input.status === "active"
          ? `Created active project: ${project.title}`
          : `Parked in backlog: ${project.title}`
      );
      return true;
    },
    [currentMember, data, resolveObjectiveForPillar, showToast]
  );

  const updateProject = useCallback(
    (projectId: string, input: UpdateProjectInput) => {
      const now = new Date().toISOString();
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => {
          if (p.id !== projectId) return p;
          const nextOwner = input.ownerId ?? p.ownerId;
          const rawCollaborators =
            input.collaboratorIds !== undefined
              ? input.collaboratorIds
              : p.collaboratorIds;
          const collaboratorIds = (rawCollaborators ?? []).filter(
            (id) => id !== nextOwner
          );
          return {
            ...p,
            ...input,
            ownerId: nextOwner,
            collaboratorIds:
              collaboratorIds.length > 0 ? collaboratorIds : undefined,
            updatedAt: now,
          };
        }),
      }));
      showToast("Project updated.");
    },
    [showToast]
  );

  const deleteProject = useCallback(
    (projectId: string) => {
      if (!isAdmin) {
        showToast("Only admins can delete projects.");
        return;
      }
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== projectId),
        focusProjectIds: prev.focusProjectIds.filter((id) => id !== projectId),
        wins: prev.wins.filter((w) => w.projectId !== projectId),
      }));
      showToast("Project deleted.");
    },
    [isAdmin, showToast]
  );

  const setFocusProjectIds = useCallback(
    (ids: string[]) => {
      if (!isAdmin) {
        showToast("Only admins can set weekly focus.");
        return;
      }
      if (ids.length > MAX_FOCUS_PROJECTS) {
        showToast(`Focus limited to ${MAX_FOCUS_PROJECTS} projects.`);
        return;
      }

      const activeIds = new Set(
        data.projects
          .filter((p) => p.status === "active" || p.status === "blocked")
          .map((p) => p.id)
      );
      const valid = ids.filter((id) => activeIds.has(id));
      if (valid.length !== ids.length) {
        showToast("Focus can only include active or blocked projects.");
        return;
      }

      setData((prev) => ({ ...prev, focusProjectIds: valid }));
      showToast("Weekly focus updated.");
    },
    [data.projects, isAdmin, showToast]
  );

  const updatePillar = useCallback(
    (pillarId: string, input: UpdatePillarInput) => {
      if (!isAdmin) {
        showToast("Only admins can edit categories.");
        return;
      }
      if (
        input.activeSlotLimit !== undefined &&
        (input.activeSlotLimit < 1 || input.activeSlotLimit > 5)
      ) {
        showToast("Slot limit must be between 1 and 5.");
        return;
      }

      setData((prev) => ({
        ...prev,
        pillars: prev.pillars.map((p) =>
          p.id === pillarId ? { ...p, ...input } : p
        ),
      }));
      showToast("Category updated.");
    },
    [isAdmin, showToast]
  );

  const activateProject = useCallback(
    (projectId: string, overrideReason?: string) => {
      const now = new Date().toISOString();
      const project = data.projects.find((p) => p.id === projectId);
      if (!project) return;

      setData((prev) => {
        const overrides = overrideReason
          ? [
              {
                id: generateId("override"),
                projectId,
                projectTitle: project.title,
                reason: overrideReason,
                createdById: currentMember?.id ?? "member-raj",
                createdAt: now,
              },
              ...(prev.capacityOverrides ?? []),
            ]
          : prev.capacityOverrides;

        return {
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  status: "active" as const,
                  backlogReason: undefined,
                  declineReason: undefined,
                  updatedAt: now,
                }
              : p
          ),
          capacityOverrides: overrides,
        };
      });
      showToast(`Activated: ${project.title}`);
    },
    [currentMember?.id, data.projects, showToast]
  );

  const promoteProject = useCallback(
    (projectId: string): boolean => {
      const project = data.projects.find((p) => p.id === projectId);
      if (!project) return false;

      const check = canActivateProject(data, project);
      if (!check.ok) {
        showToast(check.message);
        return false;
      }

      activateProject(projectId);
      return true;
    },
    [activateProject, data, showToast]
  );

  const promoteProjectWithOverride = useCallback(
    (projectId: string, reason: string): boolean => {
      if (!isAdmin) {
        showToast("Only admins can override capacity.");
        return false;
      }
      if (!reason.trim()) {
        showToast("Override reason is required.");
        return false;
      }

      const project = data.projects.find((p) => p.id === projectId);
      if (!project) return false;

      activateProject(projectId, reason.trim());
      return true;
    },
    [activateProject, data.projects, isAdmin, showToast]
  );

  const parkProject = useCallback(
    (projectId: string, reason?: string) => {
      const now = new Date().toISOString();
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                status: "backlog" as const,
                backlogReason:
                  reason ?? "Parked to free capacity — revisit later.",
                blockerNote: undefined,
                updatedAt: now,
              }
            : p
        ),
        focusProjectIds: prev.focusProjectIds.filter((id) => id !== projectId),
      }));
      const project = data.projects.find((p) => p.id === projectId);
      showToast(`Parked: ${project?.title ?? "Project"}`);
    },
    [data.projects, showToast]
  );

  const declineProject = useCallback(
    (projectId: string, reason: string) => {
      if (!reason.trim()) {
        showToast("Decline reason is required.");
        return;
      }
      const now = new Date().toISOString();
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                status: "declined" as const,
                declineReason: reason.trim(),
                updatedAt: now,
              }
            : p
        ),
      }));
      showToast("Item declined — removed from active backlog.");
    },
    [showToast]
  );

  const archiveProject = useCallback(
    (projectId: string) => {
      const now = new Date().toISOString();
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projectId
            ? { ...p, status: "archived" as const, updatedAt: now }
            : p
        ),
      }));
      showToast("Item archived.");
    },
    [showToast]
  );

  const markProjectDone = useCallback(
    (projectId: string, reflectionNote: string) => {
      const project = data.projects.find((p) => p.id === projectId);
      if (!project) return;

      if (!reflectionNote.trim()) {
        showToast("Add a short reflection — what changed for them?");
        return;
      }

      const now = new Date().toISOString();
      const win: Win = {
        id: generateId("win"),
        projectId,
        title: `${project.title} shipped`,
        note: reflectionNote.trim(),
        createdById: currentMember?.id ?? project.ownerId,
        createdAt: now,
      };

      setData((prev) => {
        const next = {
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  status: "done" as const,
                  completedAt: now,
                  updatedAt: now,
                }
              : p
          ),
          wins: [win, ...prev.wins],
          focusProjectIds: prev.focusProjectIds.filter((id) => id !== projectId),
        };

        const progressPct = getObjectiveProgress(
          next.projects,
          project.objectiveId
        );
        setSnapshots((snaps) =>
          appendSnapshot(snaps, next, project.objectiveId, progressPct)
        );

        return next;
      });

      showToast(`Shipped! ${project.title}`);
    },
    [currentMember?.id, data.projects, showToast]
  );

  const updateProjectLinks = useCallback(
    (projectId: string, links: ProjectLink[]) => {
      const now = new Date().toISOString();
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projectId ? { ...p, links, updatedAt: now } : p
        ),
      }));
      showToast("Links updated.");
    },
    [showToast]
  );

  const updateProjectStatus = useCallback(
    (projectId: string, status: ProjectStatus): boolean => {
      if (status === "active") return promoteProject(projectId);
      if (status === "backlog") {
        parkProject(projectId);
        return true;
      }
      return false;
    },
    [parkProject, promoteProject]
  );

  const submitCheckIn = useCallback(
    (input: CheckInInput) => {
      if (!currentMember) return;

      const checkIn: WeeklyCheckIn = {
        id: generateId("checkin"),
        memberId: currentMember.id,
        weekStart: getWeekStart(),
        moved: input.moved.trim(),
        next: input.next.trim(),
        blockers: input.blockers?.trim(),
        confidence: input.confidence,
        energy: input.energy,
        createdAt: new Date().toISOString(),
      };

      setData((prev) => ({
        ...prev,
        checkIns: [
          checkIn,
          ...(prev.checkIns ?? []).filter(
            (c) =>
              !(
                c.memberId === currentMember.id &&
                c.weekStart === checkIn.weekStart
              )
          ),
        ],
      }));
      showToast("Check-in saved — team can see it now.");
    },
    [currentMember, showToast]
  );

  const updateNorthStar = useCallback(
    (
      fields: Partial<Pick<NorthStar, "statement" | "mission" | "whyItMatters">>
    ) => {
      if (!isAdmin) {
        showToast("Only admins can edit the vision.");
        return;
      }
      setData((prev) => ({
        ...prev,
        northStar: {
          ...prev.northStar,
          ...fields,
          updatedAt: new Date().toISOString(),
        },
      }));
      showToast("Vision updated.");
    },
    [isAdmin, showToast]
  );

  const updateKeyResult = useCallback(
    (krId: string, current: number) => {
      const now = new Date().toISOString();
      setData((prev) => {
        const kr = prev.keyResults.find((k) => k.id === krId);
        const next = {
          ...prev,
          keyResults: prev.keyResults.map((k) =>
            k.id === krId ? { ...k, current, updatedAt: now } : k
          ),
        };

        if (kr) {
          const progressPct = getObjectiveProgress(
            next.projects,
            kr.objectiveId
          );
          setSnapshots((snaps) =>
            appendSnapshot(snaps, next, kr.objectiveId, progressPct)
          );
        }

        return next;
      });
      showToast("Key result updated.");
    },
    [showToast]
  );

  const updateQuarterlyReview = useCallback(
    (
      fields: Partial<Pick<QuarterlyReview, "learnings" | "completedSteps">>
    ) => {
      setData((prev) => ({
        ...prev,
        quarterlyReview: {
          year: prev.quarterlyReview?.year ?? prev.northStar.year,
          quarter: prev.quarterlyReview?.quarter ?? 3,
          learnings: fields.learnings ?? prev.quarterlyReview?.learnings ?? "",
          completedSteps:
            fields.completedSteps ?? prev.quarterlyReview?.completedSteps ?? [],
          updatedAt: new Date().toISOString(),
        },
      }));
    },
    []
  );

  const toggleReviewStep = useCallback((stepId: ReviewStepId) => {
    setData((prev) => {
      const review = prev.quarterlyReview ?? {
        year: prev.northStar.year,
        quarter: 3 as const,
        learnings: "",
        completedSteps: [],
        updatedAt: new Date().toISOString(),
      };
      const steps = new Set(review.completedSteps);
      if (steps.has(stepId)) {
        steps.delete(stepId);
      } else {
        steps.add(stepId);
      }
      return {
        ...prev,
        quarterlyReview: {
          ...review,
          completedSteps: Array.from(steps),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const slugify = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "role";

  const createRoleDef = useCallback(
    (input: RoleDefInput): boolean => {
      if (!isAdmin) {
        showToast("Only admins can create roles.");
        return false;
      }
      const name = input.name.trim();
      if (!name) {
        showToast("Role name is required.");
        return false;
      }
      const responsibilities = input.responsibilities
        .map((s) => s.trim())
        .filter(Boolean);
      const principles = input.principles.map((s) => s.trim()).filter(Boolean);
      if (responsibilities.length === 0 || principles.length === 0) {
        showToast("Add at least one responsibility and one principle.");
        return false;
      }

      const baseSlug = slugify(name);
      const existingSlugs = new Set((data.roleDefs ?? []).map((r) => r.slug));
      let slug = baseSlug;
      let n = 2;
      while (existingSlugs.has(slug)) {
        slug = `${baseSlug}-${n}`;
        n += 1;
      }

      const maxOrder = (data.roleDefs ?? []).reduce(
        (max, r) => Math.max(max, r.sortOrder),
        0
      );

      const role: OsRoleDef = {
        id: generateId("role"),
        slug,
        name,
        summary: input.summary.trim(),
        responsibilities,
        principles,
        sortOrder: maxOrder + 1,
        active: true,
      };

      setData((prev) => ({
        ...prev,
        roleDefs: [...(prev.roleDefs ?? []), role],
      }));
      showToast(`Role created: ${name}`);
      return true;
    },
    [data.roleDefs, isAdmin, showToast]
  );

  const updateRoleDef = useCallback(
    (
      roleId: string,
      input: Partial<RoleDefInput> & { active?: boolean }
    ) => {
      if (!isAdmin) {
        showToast("Only admins can edit roles.");
        return;
      }
      setData((prev) => ({
        ...prev,
        roleDefs: (prev.roleDefs ?? []).map((r) => {
          if (r.id !== roleId) return r;
          return {
            ...r,
            name: input.name?.trim() ?? r.name,
            summary: input.summary?.trim() ?? r.summary,
            responsibilities: input.responsibilities
              ? input.responsibilities.map((s) => s.trim()).filter(Boolean)
              : r.responsibilities,
            principles: input.principles
              ? input.principles.map((s) => s.trim()).filter(Boolean)
              : r.principles,
            active: input.active ?? r.active,
          };
        }),
      }));
      showToast("Role updated.");
    },
    [isAdmin, showToast]
  );

  const archiveRoleDef = useCallback(
    (roleId: string) => {
      if (!isAdmin) {
        showToast("Only admins can archive roles.");
        return;
      }
      const assigned = data.members.some(
        (m) => m.orgRoleId === roleId && m.status !== "disabled"
      );
      if (assigned) {
        showToast("Reassign members before archiving this role.");
        return;
      }
      setData((prev) => ({
        ...prev,
        roleDefs: (prev.roleDefs ?? []).map((r) =>
          r.id === roleId ? { ...r, active: false } : r
        ),
      }));
      showToast("Role archived.");
    },
    [data.members, isAdmin, showToast]
  );

  const assignMemberOrgRole = useCallback(
    (memberId: string, orgRoleId: string) => {
      if (!isAdmin) {
        showToast("Only admins can assign roles.");
        return;
      }
      const role = (data.roleDefs ?? []).find(
        (r) => r.id === orgRoleId && r.active
      );
      if (!role) {
        showToast("Pick an active role.");
        return;
      }
      setData((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m.id === memberId ? { ...m, orgRoleId } : m
        ),
      }));
      showToast("Role assigned.");
    },
    [data.roleDefs, isAdmin, showToast]
  );

  const value = useMemo(
    (): OsDataContextValue => ({
      data,
      snapshots,
      currentMember: currentMember!,
      isAdmin,
      toast,
      dismissToast,
      resetMockData,
      addBacklogProject,
      createProject,
      updateProject,
      deleteProject,
      setFocusProjectIds,
      updatePillar,
      promoteProject,
      promoteProjectWithOverride,
      parkProject,
      declineProject,
      archiveProject,
      markProjectDone,
      updateProjectLinks,
      updateProjectStatus,
      submitCheckIn,
      updateNorthStar,
      updateKeyResult,
      updateQuarterlyReview,
      toggleReviewStep,
      createRoleDef,
      updateRoleDef,
      archiveRoleDef,
      assignMemberOrgRole,
    }),
    [
      data,
      snapshots,
      currentMember,
      isAdmin,
      toast,
      dismissToast,
      resetMockData,
      addBacklogProject,
      createProject,
      updateProject,
      deleteProject,
      setFocusProjectIds,
      updatePillar,
      promoteProject,
      promoteProjectWithOverride,
      parkProject,
      declineProject,
      archiveProject,
      markProjectDone,
      updateProjectLinks,
      updateProjectStatus,
      submitCheckIn,
      updateNorthStar,
      updateKeyResult,
      updateQuarterlyReview,
      toggleReviewStep,
      createRoleDef,
      updateRoleDef,
      archiveRoleDef,
      assignMemberOrgRole,
    ]
  );

  if (!currentMember) return null;

  return (
    <OsDataContext.Provider value={value}>{children}</OsDataContext.Provider>
  );
}

export function useOsData() {
  const ctx = useContext(OsDataContext);
  if (!ctx) {
    throw new Error("useOsData must be used within OsDataProvider");
  }
  return ctx;
}
