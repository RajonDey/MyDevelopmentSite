import type { ServiceOfferDetail } from "@/types/rdx";
import { aiChatSearchContent } from "@/content/rdx/services-pages";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { SplitHero } from "@/components/rdx/sections/SplitHero";
import {
  ServiceBackLink,
  ServiceCallout,
  ServiceDetailExtras,
} from "./ServiceDetailExtras";

type AiChatSearchViewProps = {
  service: ServiceOfferDetail;
};

export function AiChatSearchView({ service }: AiChatSearchViewProps) {
  const { hero, advancedNote, apiCallout } = aiChatSearchContent;

  return (
    <>
      <RdxSection className="pt-4 md:pt-6" spacing="tight">
        <RdxContainer>
          <ServiceBackLink />
        </RdxContainer>
      </RdxSection>

      <SplitHero
        className="!pt-0"
        badge={hero.badge}
        headline={hero.headline}
        subhead={hero.subhead}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        visual={
          <div className="w-full max-w-md rounded-rdx border border-rdx-border bg-rdx-surface p-6">
            <RdxBadge>Advanced offer</RdxBadge>
            <p className="mt-4 text-sm leading-relaxed text-rdx-muted">
              {advancedNote}
            </p>
            <div className="mt-6 space-y-2 border-t border-rdx-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-rdx-subtle">
                Tiers
              </p>
              {service.tiers.map((tier) => (
                <p key={tier.id} className="text-sm text-rdx-ink">
                  {tier.label} · {tier.priceLabel}
                </p>
              ))}
            </div>
          </div>
        }
      />

      <RdxSection spacing="tight">
        <RdxContainer className="max-w-2xl space-y-4">
          <ServiceCallout title="API costs" body={apiCallout} />
          <ServiceCallout
            title="When to start here"
            body="Most agencies begin with Agency Website or Lead Automation. AI chat and search is scoped when your core site and lead flow are stable."
          />
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer>
          <SectionHeader
            eyebrow="Scope"
            title="What's included per tier"
            description="Fixed delivery window. Guardrails and knowledge sources scoped on the review call."
          />
        </RdxContainer>
      </RdxSection>

      <ServiceDetailExtras service={service} startHref="/start?interest=ai" />
    </>
  );
}
