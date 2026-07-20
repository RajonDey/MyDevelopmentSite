"use client";

import Link from "next/link";
import { OsCard } from "@/components/os/ui/OsCard";

export function OsSignInForm() {
  return (
    <OsCard raised className="mx-auto max-w-md">
      <div className="text-center">
        <p className="font-rdx-display text-2xl text-os-text">RDX OS</p>
        <p className="mt-2 text-sm text-os-muted">
          Team command center — sign in with your work email
        </p>
      </div>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label
            htmlFor="os-email"
            className="block text-sm font-medium text-os-text"
          >
            Email
          </label>
          <input
            id="os-email"
            type="email"
            placeholder="you@rajondey.com"
            disabled
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-surface-raised px-3 py-2 text-sm text-os-text placeholder:text-os-muted/60"
          />
        </div>
        <button
          type="submit"
          disabled
          className="w-full rounded-md bg-os-accent/50 px-4 py-2.5 text-sm font-medium text-os-text/70"
        >
          Send magic link
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-os-muted">
        Magic link auth — Phase 1. For now,{" "}
        <Link href="/os" className="text-os-accent hover:underline">
          view the demo dashboard
        </Link>
        .
      </p>
    </OsCard>
  );
}
