"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OsCard } from "@/components/os/ui/OsCard";
import { mockCommandCenter } from "@/content/os/mock-data";
import { findCoreMemberByEmail } from "@/lib/os/team-allowlist";
import {
  readOsMockSession,
  writeOsMockSession,
} from "@/lib/os/mock-session";

export function OsSignInForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.osAccess && session.user?.email) {
      if (findCoreMemberByEmail(session.user.email, mockCommandCenter.members)) {
        router.replace("/os");
        return;
      }
    }
    const mock = readOsMockSession();
    if (
      mock?.email &&
      findCoreMemberByEmail(mock.email, mockCommandCenter.members)
    ) {
      router.replace("/os");
    }
  }, [router, session, status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDevVerifyUrl(null);
    setPending(true);

    try {
      const res = await fetch("/api/os/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        devVerifyUrl?: string;
      };

      setSent(true);
      if (data.devVerifyUrl) {
        setDevVerifyUrl(data.devVerifyUrl);
        return;
      }

      // Dev without Resend and without fallback URL: keep mock gate usable
      if (process.env.NODE_ENV === "development") {
        const member = findCoreMemberByEmail(email, mockCommandCenter.members);
        if (member && !data.devVerifyUrl) {
          // requestOsMagicLink still returns devVerifyUrl in development
          // when Resend is missing — if we got here without it, use mock
          writeOsMockSession(member.email);
          router.replace("/os");
        }
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <OsCard raised className="mx-auto max-w-md">
        <div className="text-center">
          <p className="font-rdx-display text-2xl text-os-text">Check your inbox</p>
          <p className="mt-2 text-sm text-os-muted">
            If you&apos;re on the RDX Core list, we sent a sign-in link. It
            expires in 20 minutes.
          </p>
          {devVerifyUrl ? (
            <p className="mt-4 text-left text-xs text-os-muted">
              Dev (no Resend):{" "}
              <a href={devVerifyUrl} className="text-os-accent underline">
                Open magic link
              </a>
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setEmail("");
            }}
            className="mt-6 text-sm text-os-muted hover:text-os-text"
          >
            Use a different email
          </button>
        </div>
      </OsCard>
    );
  }

  return (
    <OsCard raised className="mx-auto max-w-md">
      <div className="text-center">
        <p className="font-rdx-display text-2xl text-os-text">RDX OS</p>
        <p className="mt-2 text-sm text-os-muted">
          RDX Core only — we&apos;ll email a magic link to your allowlisted
          address
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-os-border bg-os-surface-raised px-3 py-2 text-sm text-os-text placeholder:text-os-muted/60"
          />
        </div>
        {error ? <p className="text-sm text-os-red">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-os-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Email me a link"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-os-muted">
        Lead Desk password login does not open OS. Sign out from the top bar on
        shared computers.
      </p>
    </OsCard>
  );
}
