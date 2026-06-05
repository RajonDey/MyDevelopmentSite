"use client";

import { useEffect } from "react";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <RdxSection className="pt-4 md:pt-12 pb-20">
      <RdxContainer className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-rdx-subtle">
          Something went wrong
        </p>
        <h1 className="mt-3 font-rdx-display text-[length:var(--rdx-text-3xl)] font-normal tracking-tight text-rdx-ink">
          We hit a snag
        </h1>
        <p className="mt-4 text-base leading-relaxed text-rdx-muted">
          Try again, or email us if the problem continues.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RdxButton type="button" onClick={reset}>
            Try again
          </RdxButton>
          <RdxButton href="/" variant="secondary">
            Back to home
          </RdxButton>
        </div>
        <p className="mt-8 text-sm text-rdx-subtle">
          <a
            href="mailto:contact@rajondey.com"
            className="text-rdx-accent hover:text-rdx-accent-hover"
          >
            contact@rajondey.com
          </a>
        </p>
      </RdxContainer>
    </RdxSection>
  );
}
