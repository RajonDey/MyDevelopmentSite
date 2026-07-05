import type { ProjectStatus } from "@/types/rdx/project";

export const projectStatusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

export const projectStatusOptions: ProjectStatus[] = [
  "active",
  "completed",
  "archived",
];

export const projectLinkFields = [
  { key: "repo", label: "Repository" },
  { key: "staging", label: "Staging" },
  { key: "figma", label: "Figma" },
  { key: "drive", label: "Drive / docs" },
] as const;
