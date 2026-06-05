import { notFound } from "next/navigation";
import { getServiceDetail } from "@/content/rdx/services";
import {
  sampleBentoItems,
  sampleFaqItems,
  sampleStats,
} from "@/content/rdx/design-system-demos";
import { homeContent } from "@/content/rdx/home";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { HairlineRule } from "@/components/rdx/ui/HairlineRule";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import {
  BentoFeatureGrid,
  ComparisonTable,
  FaqAccordion,
  LogoIntegrationRow,
  PullQuote,
  SplitHero,
  StatStrip,
  StickyCtaBar,
} from "@/components/rdx/sections";
import { BrowserFrame } from "@/components/rdx/visuals/BrowserFrame";
import { SystemDiagram } from "@/components/rdx/visuals/system-diagram";

export const metadata = {
  title: "RDX Design System",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const agencyWebsite = getServiceDetail("agency-website");

  return (
    <>
      <RdxSection className="pt-4 md:pt-8">
        <RdxContainer>
          <RdxBadge>Dev only</RdxBadge>
          <h1 className="mt-4 font-rdx-display text-[length:var(--rdx-text-4xl)] text-rdx-ink">
            RDX section library
          </h1>
          <p className="mt-3 max-w-[var(--rdx-measure)] text-rdx-muted">
            Phase 9 components — preview before applying to pages in Phase 10+.
          </p>
        </RdxContainer>
      </RdxSection>

      <HairlineRule />

      <SplitHero
        badge={homeContent.priceFloorLabel}
        headline="SplitHero"
        subhead="Display + body pairing, dual CTAs, optional visual slot."
        primaryCta={{ label: "Primary CTA", href: "/start" }}
        secondaryCta={{ label: "Secondary", href: "/services" }}
        footnote="Global remote team"
        visual={<SystemDiagram />}
      />

      <StatStrip stats={sampleStats} />

      <LogoIntegrationRow />

      <RdxSection variant="surface">
        <RdxContainer className="space-y-8">
          <SectionHeader
            eyebrow="BentoFeatureGrid"
            title="Feature grid"
            description="Asymmetric cards for service outcomes."
          />
          <BentoFeatureGrid items={sampleBentoItems} />
        </RdxContainer>
      </RdxSection>

      <RdxSection>
        <RdxContainer>
          <PullQuote
            quote="We stopped losing leads between the contact form and HubSpot."
            attribution="Marketing agency owner, US"
            marginalia="Honest client feedback — no invented metrics."
          />
        </RdxContainer>
      </RdxSection>

      {agencyWebsite && (
        <RdxSection variant="surface">
          <RdxContainer className="space-y-6">
            <SectionHeader
              eyebrow="ComparisonTable"
              title="Tier comparison"
              description="Upgrade from card grid — used on service pages in Phase 11."
            />
            <ComparisonTable service={agencyWebsite} />
          </RdxContainer>
        </RdxSection>
      )}

      <RdxSection>
        <RdxContainer className="grid gap-10 lg:grid-cols-2">
          <SectionHeader
            eyebrow="FaqAccordion"
            title="Common questions"
            description="Collapsible FAQ for services and /start sidebar."
          />
          <FaqAccordion items={sampleFaqItems} />
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface">
        <RdxContainer className="space-y-6">
          <SectionHeader
            eyebrow="BrowserFrame"
            title="Imagery kit"
            description="Screenshot frame for case studies."
          />
          <div className="max-w-xl">
            <BrowserFrame url="agency.example.com" caption="Case study screenshot placeholder">
              <div className="flex aspect-[16/10] items-center justify-center bg-rdx-surface p-8 text-sm text-rdx-muted">
                Screenshot or mockup content
              </div>
            </BrowserFrame>
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection>
        <RdxContainer className="space-y-6">
          <SectionHeader eyebrow="UI primitives" title="Tokens in use" />
          <div className="grid gap-4 md:grid-cols-3">
            <RdxCard>
              <p className="text-xs uppercase tracking-wide text-rdx-subtle">Display</p>
              <p className="mt-2 font-rdx-display text-2xl text-rdx-ink">Instrument Serif</p>
            </RdxCard>
            <RdxCard>
              <p className="text-xs uppercase tracking-wide text-rdx-subtle">Body</p>
              <p className="mt-2 text-rdx-ink">Source Sans 3 — UI and prose</p>
            </RdxCard>
            <RdxCard>
              <p className="text-xs uppercase tracking-wide text-rdx-subtle">Accent</p>
              <p className="mt-2 text-rdx-accent">Teal accent · hairline borders</p>
            </RdxCard>
          </div>
          <div className="flex flex-wrap gap-3">
            <RdxButton href="/start">Primary button</RdxButton>
            <RdxButton href="/services" variant="secondary">
              Secondary button
            </RdxButton>
          </div>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}
