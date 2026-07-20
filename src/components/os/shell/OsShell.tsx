"use client";

import { useState } from "react";
import { OsSidebar } from "@/components/os/shell/OsSidebar";
import { OsTopBar } from "@/components/os/shell/OsTopBar";
import { OsDataProvider } from "@/components/os/context/OsDataContext";
import { OsProjectProvider } from "@/components/os/context/OsProjectContext";
import { ProjectDetailPanel } from "@/components/os/projects/ProjectDetailPanel";
import { OsToast } from "@/components/os/ui/OsToast";
import type { CommandCenterData, OsMember } from "@/types/os";

type OsShellProps = {
  initialData: CommandCenterData;
  currentMember?: OsMember;
  children: React.ReactNode;
};

export function OsShell({ initialData, currentMember, children }: OsShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const member =
    currentMember ??
    initialData.members.find((m) => m.role === "admin") ??
    initialData.members[0];

  if (!member) {
    return null;
  }

  return (
    <OsDataProvider initialData={initialData} currentMemberId={member.id}>
      <OsProjectProvider>
        <div className="flex min-h-screen bg-os-bg text-os-text">
          <OsSidebar
            currentMember={member}
            mobileOpen={mobileOpen}
            onMobileClose={() => setMobileOpen(false)}
          />
          <div className="flex min-h-screen flex-1 flex-col md:pl-[var(--os-sidebar-width)]">
            <OsTopBar onMenuOpen={() => setMobileOpen(true)} />
            <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
          </div>
          <ProjectDetailPanel />
          <OsToast />
        </div>
      </OsProjectProvider>
    </OsDataProvider>
  );
}
