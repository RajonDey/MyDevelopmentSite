import { Suspense } from "react";
import type { Metadata } from "next";
import { OsVerifyClient } from "@/components/os/signin/OsVerifyClient";

export const metadata: Metadata = {
  title: "Verifying — RDX OS",
  robots: { index: false, follow: false },
};

export default function OsVerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-os-bg px-4 py-16">
      <Suspense
        fallback={
          <p className="text-sm text-os-muted">Verifying your link…</p>
        }
      >
        <OsVerifyClient />
      </Suspense>
    </main>
  );
}
