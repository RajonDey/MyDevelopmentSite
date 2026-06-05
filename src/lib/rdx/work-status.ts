import type { WorkStatus } from "@/types/rdx/case-study";

export function workStatusLabel(status: WorkStatus | undefined): string | null {
  if (status === "beta") return "Beta";
  if (status === "preview") return "Preview";
  if (status === "live") return "Live";
  return null;
}
