import { mockCommandCenter } from "@/content/os/mock-data";
import type { CommandCenterData } from "@/types/os";

export async function getCommandCenter(): Promise<CommandCenterData> {
  return mockCommandCenter;
}
