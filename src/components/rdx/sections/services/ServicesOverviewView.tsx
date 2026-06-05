import {
  bundleOffer,
  serviceOffers,
  servicesOverview,
} from "@/content/rdx/services";
import {
  serviceOutcomeBySlug,
  servicesOverviewContent,
} from "@/content/rdx/services-pages";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import {
  FaqAccordion,
  SplitHero,
  StickyCtaBar,
} from "@/components/rdx/sections";
import Link from "next/link";

export function ServicesOverviewView() {
  const { hero, standardHint, faq } = servicesOverviewContent;

  return (
    <>
      <SplitHero
        badge={hero.badge}
        headline={hero.headline}
        subhead={hero.subhead}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        footnote={hero.footnote}
        visual={
          <div className="w-full max-w-md space-y-4 rounded-rdx border border-rdx-border bg-rdx-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rdx-subtle">
              {servicesOverview.title}
            </p>
            <p className="text-sm leading-relaxed text-rdx-muted">
              {servicesOverview.intro}
            </p>
            <p className="text-sm font-medium text-rdx-ink">{standardHint}</p>
          </div>
        }
      />

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer>
          <SectionHeader
            className="mb-8"
            eyebrow="Offers"
            title="Two core services + AI"
            description={standardHint}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {serviceOffers.map((service) => {
              const outcome =
                serviceOutcomeBySlug[
                  service.slug as keyof typeof serviceOutcomeBySlug
                ];
              const recommended = service.tiers.find((t) => t.recommended);

              return (
                <RdxCard key={service.id} className="flex h-full flex-col">
                  <div className="mb-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-rdx-ink">
                        {service.name}
                      </h2>
                      <RdxBadge>
                        From ${service.startingPrice.toLocaleString("en-US")}
                      </RdxBadge>
                    </div>
                    <p className="text-sm leading-relaxed text-rdx-muted">
                      {service.subtitle}
                    </p>
                    <p className="text-sm font-medium text-rdx-ink">{outcome}</p>
                    {recommended && (
                      <p className="text-xs text-rdx-subtle">
                        Standard · {recommended.priceLabel}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <RdxButton href={`/services/${service.slug}`}>
                      View tiers
                    </RdxButton>
                    <Link
                      href="/start"
                      className="text-center text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
                    >
                      Free review
                    </Link>
                  </div>
                </RdxCard>
              );
            })}
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection spacing="tight">
        <RdxContainer>
          <RdxCard className="border-rdx-accent/20 bg-rdx-surface">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-rdx-ink">
                  {bundleOffer.name}
                </h2>
                <p className="text-sm text-rdx-muted">{bundleOffer.summary}</p>
                <p className="font-rdx-display text-2xl text-rdx-ink">
                  {bundleOffer.priceLabel}
                </p>
              </div>
              <RdxButton href="/start?need=both">Discuss bundle on review call</RdxButton>
            </div>
          </RdxCard>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
            description="Fixed tiers, bundle pricing, and what's in scope."
          />
          <FaqAccordion items={faq} defaultOpenIndex={0} />
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="band" className="pb-20 md:pb-24">
        <RdxContainer className="text-center">
          <h2 className="font-rdx-display text-[length:var(--rdx-text-2xl)] text-rdx-ink">
            Not sure which offer fits?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-rdx-muted">
            Start with the scope tool — then book a free review call to confirm tier and timeline.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RdxButton href="/start">Free Website & Workflow Review</RdxButton>
            <RdxButton href="/start?step=scope" variant="secondary">
              Estimate scope
            </RdxButton>
          </div>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}
