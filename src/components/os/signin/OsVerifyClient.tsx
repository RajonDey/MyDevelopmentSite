"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { OsCard } from "@/components/os/ui/OsCard";

export function OsVerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.osAccess) {
      router.replace("/os");
      return;
    }

    const token = searchParams.get("token");
    if (!token) {
      setError("Missing sign-in link. Request a new one.");
      return;
    }

    let cancelled = false;

    async function verify() {
      const result = await signIn("os-magic", {
        token,
        redirect: false,
        callbackUrl: "/os",
      });

      if (cancelled) return;

      if (result?.error) {
        setError("This link is invalid or expired. Request a new one.");
        return;
      }

      router.replace("/os");
    }

    void verify();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, session?.osAccess, status]);

  return (
    <OsCard raised className="mx-auto max-w-md text-center">
      <p className="font-rdx-display text-2xl text-os-text">RDX OS</p>
      {error ? (
        <>
          <p className="mt-4 text-sm text-os-red">{error}</p>
          <a
            href="/os/signin"
            className="mt-6 inline-block text-sm text-os-accent hover:underline"
          >
            Back to sign in
          </a>
        </>
      ) : (
        <p className="mt-4 text-sm text-os-muted">Verifying your link…</p>
      )}
    </OsCard>
  );
}
