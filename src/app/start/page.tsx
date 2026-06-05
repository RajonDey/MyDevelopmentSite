import { Metadata } from "next";
import { Suspense } from "react";
import { pageMeta } from "@/content/rdx/pages";
import { startFormContent } from "@/content/rdx/forms";
import { siteMetadata } from "@/content/rdx/metadata";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { UnifiedStartForm } from "@/components/rdx/forms/UnifiedStartForm";

export const metadata: Metadata = {
  title: pageMeta.start.title,
  description: pageMeta.start.description,
  openGraph: {
    title: pageMeta.start.title,
    description: pageMeta.start.description,
    url: `${siteMetadata.siteUrl}/start`,
    siteName: siteMetadata.siteName,
  },
};

export default function StartPage() {
  return (
    <RdxSection className="pt-4 md:pt-8">
      <RdxContainer className="max-w-2xl">
        <div className="mb-8 space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-rdx-ink md:text-4xl">
            {startFormContent.title}
          </h1>
          <p className="text-base leading-relaxed text-rdx-muted">
            {startFormContent.intro}
          </p>
        </div>
        <Suspense fallback={null}>
          <UnifiedStartForm />
        </Suspense>
      </RdxContainer>
    </RdxSection>
  );
}
