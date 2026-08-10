import { Metadata } from "next";
import { ProjectsWorkspace } from "@/components/os/projects/ProjectsWorkspace";

export const metadata: Metadata = {
  title: "Projects · RDXHIVE OS",
  robots: { index: false, follow: false },
};

export default function OsProjectsPage() {
  return <ProjectsWorkspace />;
}
