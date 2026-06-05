import Link from "next/link";
import {
  getCaseStudyHeroVisual,
  getFeaturedCaseStudies,
  getWorkBrowserUrl,
} from "@/content/rdx/case-studies";
import { homeContent } from "@/content/rdx/home";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { CaseStudyFrame } from "@/components/rdx/visuals/CaseStudyFrame";
import type { CaseStudy } from "@/types/rdx/case-study";

function workTeaserFallback(study: CaseStudy) {
  return (
    <div className="flex aspect-[16/10] flex-col justify-between bg-gradient-to-br from-rdx-surface to-rdx-paper p-6">
      <div className="flex flex-wrap gap-2">
        <RdxBadge>{study.industryTag}</RdxBadge>
        <RdxBadge>{study.serviceLabel}</RdxBadge>
      </div>
      <p className="max-w-sm text-sm font-medium leading-relaxed text-rdx-ink">
        {study.outcome}
      </p>
    </div>
  );
}

export function WorkTeaser() {
  const studies = getFeaturedCaseStudies(2);
  const { work } = homeContent;

  return (
    <RdxSection spacing="tight">
      <RdxContainer>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={work.eyebrow}
            title={work.heading}
            description={work.description}
          />
          <Link
            href="/work"
            className="shrink-0 text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
          >
            {work.viewAllLabel} →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {studies.map((study) => (
            <article key={study.slug} className="flex flex-col gap-4">
              <CaseStudyFrame
                visual={getCaseStudyHeroVisual(study)}
                browserUrl={getWorkBrowserUrl(study)}
                fallback={workTeaserFallback(study)}
              />

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-rdx-ink">
                  <Link
                    href={`/work/${study.slug}`}
                    className="transition-colors hover:text-rdx-accent"
                  >
                    {study.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-rdx-muted">
                  {study.summary}
                </p>
                <p className="text-xs text-rdx-subtle">{study.attributionLabel}</p>
                <Link
                  href={`/work/${study.slug}`}
                  className="inline-block text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
                >
                  Read case study →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-rdx-subtle">{work.footnote}</p>
      </RdxContainer>
    </RdxSection>
  );
}
