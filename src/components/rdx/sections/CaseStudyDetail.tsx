import Link from "next/link";
import type { CaseStudy } from "@/types/rdx/case-study";
import { getServicePath, getWorkBrowserUrl } from "@/content/rdx/case-studies";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { RdxButton } from "@/components/rdx/ui/Button";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { PullQuote } from "@/components/rdx/sections/PullQuote";
import { StickyCtaBar } from "@/components/rdx/sections/StickyCtaBar";
import { CaseStudyVisualGallery } from "@/components/rdx/sections/CaseStudyVisualGallery";
import { workStatusLabel } from "@/lib/rdx/work-status";

type CaseStudyDetailProps = {
  study: CaseStudy;
};

export function CaseStudyDetail({ study }: CaseStudyDetailProps) {
  const status = workStatusLabel(study.status);
  const browserUrl = getWorkBrowserUrl(study);

  return (
    <>
      <RdxSection className="pt-4 md:pt-8" spacing="tight">
        <RdxContainer className="max-w-3xl">
          <Link
            href="/work"
            className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
          >
            ← All work
          </Link>
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <RdxBadge>{study.industryTag}</RdxBadge>
              <RdxBadge>{study.serviceLabel}</RdxBadge>
              {status && <RdxBadge>{status}</RdxBadge>}
              <RdxBadge>{study.clientType}</RdxBadge>
            </div>
            <h1 className="font-rdx-display text-[length:var(--rdx-text-3xl)] font-normal leading-[var(--rdx-leading-display)] tracking-tight text-rdx-ink md:text-[length:var(--rdx-text-4xl)]">
              {study.title}
            </h1>
            <p className="text-base leading-relaxed text-rdx-muted">
              {study.summary}
            </p>
            <p className="text-sm text-rdx-subtle">{study.attributionLabel}</p>
            <div className="flex flex-col gap-2">
              {study.liveUrl && (
                <p>
                  <Link
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
                  >
                    Visit live site →
                  </Link>
                </p>
              )}
              {study.relatedLinks?.map((link) => (
                <p key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
                  >
                    {link.label} →
                  </Link>
                </p>
              ))}
              {study.slug === "harlig-stad" && (
                <p>
                  <Link
                    href="/work#reviews"
                    className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
                  >
                    Read Google reviews for this project →
                  </Link>
                </p>
              )}
            </div>
          </div>
        </RdxContainer>
      </RdxSection>

      {(study.visuals.length > 0 || study.heroVisual) && (
        <RdxSection variant="surface" spacing="tight">
          <RdxContainer>
            <CaseStudyVisualGallery study={study} browserUrl={browserUrl} />
          </RdxContainer>
        </RdxSection>
      )}

      <RdxSection spacing="tight">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            className="mb-4"
            eyebrow="Stack"
            title="Tools involved"
          />
          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <RdxBadge key={tech}>{tech}</RdxBadge>
            ))}
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection spacing="tight">
        <PullQuote
          quote={study.outcome}
          attribution={study.clientType}
          marginalia={study.attributionLabel}
        />
      </RdxSection>

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer className="max-w-3xl space-y-10">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-rdx-ink">Challenge</h2>
            <p className="text-sm leading-relaxed text-rdx-muted">
              {study.challenge}
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-rdx-ink">Approach</h2>
            <p className="text-sm leading-relaxed text-rdx-muted">
              {study.approach}
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-rdx-ink">Deliverables</h2>
            <ul className="space-y-2">
              {study.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-rdx-muted"
                >
                  <span className="text-rdx-accent" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="band" className="pb-20 md:pb-24">
        <RdxContainer className="max-w-3xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RdxButton href="/start">Free Website & Workflow Review</RdxButton>
            {study.liveUrl && (
              <RdxButton href={study.liveUrl} variant="secondary">
                Visit live
              </RdxButton>
            )}
            {study.category === "client" && (
              <RdxButton href={getServicePath(study.service)} variant="secondary">
                View services
              </RdxButton>
            )}
          </div>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}
