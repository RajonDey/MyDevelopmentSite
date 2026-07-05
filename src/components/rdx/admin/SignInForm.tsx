"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { FormField, rdxInputClassName } from "@/components/rdx/forms/FormField";

export function SignInForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await signIn("credentials", {
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Incorrect password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <RdxCard className="mx-auto max-w-md">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-rdx-ink">
          RDX leads
        </h1>
        <p className="text-sm text-rdx-muted">Admin access only.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Password" htmlFor="password" required>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={rdxInputClassName}
            placeholder="Enter admin password"
          />
        </FormField>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <RdxButton type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </RdxButton>
      </form>
    </RdxCard>
  );
}
