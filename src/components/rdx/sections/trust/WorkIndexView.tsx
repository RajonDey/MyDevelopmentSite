import Link from "next/link";
import {
  clientCaseStudies,
  priorCaseStudies,
  productCaseStudies,
  workSections,
} from "@/content/rdx/case-studies";
import { workContent } from "@/content/rdx/work";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { CaseStudyCard } from "@/components/rdx/sections/CaseStudyCard";
import { StickyCtaBar } from "@/components/rdx/sections/StickyCtaBar";
import { VerifiedReviewsSection } from "@/components/rdx/sections/trust/VerifiedReviewsSection";

function WorkSection({
  section,
  studies,
}: {
  section: (typeof workSections)[keyof typeof workSections];
  studies: typeof clientCaseStudies;
}) {
  if (studies.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
      />
      <div className="grid gap-8 md:grid-cols-2">
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}

export function WorkIndexView() {
  const { hero, extendedPortfolio, footnote } = workContent;

  return (
    <>
      <RdxSection className="pt-4 md:pt-8" spacing="tight">
        <RdxContainer>
          <SectionHeader
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
            titleAs="h1"
          />
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer className="space-y-16">
          <WorkSection section={workSections.clients} studies={clientCaseStudies} />
          <WorkSection section={workSections.products} studies={productCaseStudies} />
          <WorkSection section={workSections.prior} studies={priorCaseStudies} />
          <p className="text-sm text-rdx-subtle">{footnote}</p>
        </RdxContainer>
      </RdxSection>

      <VerifiedReviewsSection />

      <RdxSection spacing="tight" className="pb-16 md:pb-20">
        <RdxContainer>
          <Link
            href={extendedPortfolio.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
          >
            {extendedPortfolio.label}
          </Link>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}
