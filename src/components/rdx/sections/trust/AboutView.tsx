import Link from "next/link";
import { aboutContent } from "@/content/rdx/about";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { RdxCard } from "@/components/rdx/ui/Card";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { StatStrip } from "@/components/rdx/sections/StatStrip";
import { StickyCtaBar } from "@/components/rdx/sections/StickyCtaBar";
import { VerifiedReviewsSection } from "@/components/rdx/sections/trust/VerifiedReviewsSection";

const aboutStats = [
  { value: "Remote", label: "Global team" },
  { value: "From $1K", label: "Project floor" },
  { value: "Fixed", label: "Scoped tiers" },
  { value: "US agencies", label: "Primary ICP" },
] as const;

export function AboutView() {
  const { hero, story, founder, communication, extendedPortfolio, productProof, locationLine, priceLine } =
    aboutContent;

  return (
    <>
      <RdxSection className="pt-4 md:pt-8" spacing="tight">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
            titleAs="h1"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <RdxBadge>{locationLine}</RdxBadge>
            <RdxBadge>{priceLine}</RdxBadge>
          </div>
        </RdxContainer>
      </RdxSection>

      <StatStrip stats={aboutStats} />

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer className="max-w-3xl space-y-6">
          {story.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-rdx-muted">
              {paragraph}
            </p>
          ))}
          <p className="text-sm leading-relaxed text-rdx-subtle">{founder}</p>
        </RdxContainer>
      </RdxSection>

      <RdxSection spacing="tight">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            className="mb-4"
            eyebrow={productProof.eyebrow}
            title={productProof.title}
            description={productProof.description}
          />
          <Link
            href={productProof.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
          >
            {productProof.cta.label} →
          </Link>
        </RdxContainer>
      </RdxSection>

      <VerifiedReviewsSection />

      <RdxSection spacing="tight">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            className="mb-6"
            eyebrow="Communication"
            title={communication.title}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {communication.items.map((item) => (
              <RdxCard key={item.label} className="bg-rdx-surface">
                <h3 className="text-sm font-semibold text-rdx-ink">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-rdx-muted">
                  {item.detail}
                </p>
              </RdxCard>
            ))}
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="band" className="pb-20 md:pb-24">
        <RdxContainer className="max-w-3xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <RdxButton href="/start">Free Website & Workflow Review</RdxButton>
            <RdxButton href="/work" variant="secondary">
              View work
            </RdxButton>
          </div>
          <Link
            href={extendedPortfolio.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
          >
            {extendedPortfolio.label}
          </Link>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}
