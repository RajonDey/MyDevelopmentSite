"use client";

import { signOut } from "next-auth/react";
import { RdxButton } from "@/components/rdx/ui/Button";

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-rdx-ink">
            Client desk
          </h1>
          <p className="text-sm text-rdx-muted">
            Pipeline, projects, and billing — replaces Notion.
          </p>
        </div>
        <RdxButton
          type="button"
          variant="secondary"
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          Sign out
        </RdxButton>
      </div>
      {children}
    </div>
  );
}
