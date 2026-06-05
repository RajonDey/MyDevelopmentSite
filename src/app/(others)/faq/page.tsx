import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import { siteFaq } from "@/content/rdx/seo";
import { buildOgMeta } from "@/content/rdx/og";
import { buildFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/rdx/seo/JsonLd";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { FaqAccordion } from "@/components/rdx/sections/FaqAccordion";

export const metadata: Metadata = {
  title: pageMeta.faq.title,
  description: pageMeta.faq.description,
  openGraph: {
    title: pageMeta.faq.title,
    description: pageMeta.faq.description,
    url: `${siteMetadata.siteUrl}/faq`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("default"),
  },
};

export default function FAQPage() {
  return (
    <>
      <JsonLd id="schema-faq" data={buildFaqSchema(siteFaq)} />

      <RdxSection className="pt-4 md:pt-8">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
            description="Fixed-scope agency websites, CRM automation, and how to start a project with RDX."
            titleAs="h1"
          />
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight" className="pb-20 md:pb-24">
        <RdxContainer className="max-w-3xl">
          <FaqAccordion items={siteFaq} defaultOpenIndex={0} />

          <div className="mt-12 rounded-rdx border border-rdx-border bg-rdx-paper p-8">
            <h2 className="text-lg font-semibold text-rdx-ink">
              Still have questions?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-rdx-muted">
              Request a free review. We reply within 1 business day with 3
              specific fixes for your agency site or lead workflow.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <RdxButton href="/start">Free Website &amp; Workflow Review</RdxButton>
              <RdxButton href="/services" variant="secondary">
                View pricing
              </RdxButton>
            </div>
          </div>
        </RdxContainer>
      </RdxSection>
    </>
  );
}
