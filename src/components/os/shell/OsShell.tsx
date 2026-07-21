"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { OsSidebar } from "@/components/os/shell/OsSidebar";
import { OsTopBar } from "@/components/os/shell/OsTopBar";
import { OsDataProvider } from "@/components/os/context/OsDataContext";
import { OsProjectProvider } from "@/components/os/context/OsProjectContext";
import { ProjectDetailPanel } from "@/components/os/projects/ProjectDetailPanel";
import { OsToast } from "@/components/os/ui/OsToast";
import { findCoreMemberByEmail } from "@/lib/os/team-allowlist";
import {
  clearOsMockSession,
  readOsMockSession,
} from "@/lib/os/mock-session";
import type { CommandCenterData, OsMember } from "@/types/os";

type OsShellProps = {
  initialData: CommandCenterData;
  currentMember?: OsMember;
  children: React.ReactNode;
};

export function OsShell({ initialData, currentMember, children }: OsShellProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [member, setMember] = useState<OsMember | null>(currentMember ?? null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const sessionEmail =
      session?.osAccess && session.user?.email
        ? session.user.email
        : undefined;

    const mockEmail = readOsMockSession()?.email;
    const email = sessionEmail ?? mockEmail;

    if (!email) {
      router.replace("/os/signin");
      return;
    }

    // Desk-only session must not open OS
    if (session && session.deskAccess && !session.osAccess && !mockEmail) {
      router.replace("/os/signin");
      return;
    }

    const matched =
      findCoreMemberByEmail(email, initialData.members) ??
      (currentMember &&
      findCoreMemberByEmail(currentMember.email, initialData.members)
        ? currentMember
        : undefined);

    if (!matched) {
      clearOsMockSession();
      if (session?.osAccess) {
        void signOut({ redirect: false });
      }
      router.replace("/os/signin");
      return;
    }

    setMember(matched);
    setReady(true);
  }, [currentMember, initialData.members, router, session, status]);

  async function handleSignOut() {
    clearOsMockSession();
    if (session?.osAccess) {
      await signOut({ redirect: false });
    }
    router.replace("/os/signin");
  }

  if (!ready || !member) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-os-bg text-sm text-os-muted">
        Checking core access…
      </div>
    );
  }

  return (
    <OsDataProvider initialData={initialData} currentMemberId={member.id}>
      <OsProjectProvider>
        <div className="flex min-h-screen bg-os-bg text-os-text">
          <OsSidebar
            currentMember={member}
            mobileOpen={mobileOpen}
            onMobileClose={() => setMobileOpen(false)}
            onSignOut={handleSignOut}
          />
          <div className="flex min-h-screen flex-1 flex-col md:pl-[var(--os-sidebar-width)]">
            <OsTopBar
              onMenuOpen={() => setMobileOpen(true)}
              onSignOut={handleSignOut}
            />
            <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
          </div>
          <ProjectDetailPanel />
          <OsToast />
        </div>
      </OsProjectProvider>
    </OsDataProvider>
  );
}
