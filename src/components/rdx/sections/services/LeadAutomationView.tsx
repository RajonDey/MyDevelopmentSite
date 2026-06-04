import type { ServiceOfferDetail } from "@/types/rdx";
import { leadAutomationContent } from "@/content/rdx/services-pages";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { RdxCard } from "@/components/rdx/ui/Card";
import { SplitHero } from "@/components/rdx/sections/SplitHero";
import { LogoIntegrationRow } from "@/components/rdx/sections/LogoIntegrationRow";
import { WorkflowDiagram } from "@/components/rdx/visuals/workflow-diagram";
import {
  ServiceBackLink,
  ServiceDetailExtras,
} from "./ServiceDetailExtras";

type LeadAutomationViewProps = {
  service: ServiceOfferDetail;
};

export function LeadAutomationView({ service }: LeadAutomationViewProps) {
  const { hero, before, after, standardExample } = leadAutomationContent;

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
          <WorkflowDiagram before={before} after={after} className="w-full" />
        }
      />

      <LogoIntegrationRow label="Typical stack we connect" />

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer>
          <SectionHeader
            className="mb-8"
            eyebrow="Workflow"
            title="Before vs after"
            description="Standard tier replaces three manual handoffs with live automations."
          />
          <WorkflowDiagram before={before} after={after} />
        </RdxContainer>
      </RdxSection>

      <RdxSection spacing="tight">
        <RdxContainer className="max-w-2xl">
          <RdxCard className="bg-rdx-surface">
            <h2 className="text-lg font-semibold text-rdx-ink">
              {standardExample.title}
            </h2>
            <ul className="mt-4 space-y-2">
              {standardExample.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-rdx-muted"
                >
                  <span className="text-rdx-accent" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </RdxCard>
        </RdxContainer>
      </RdxSection>

      <ServiceDetailExtras service={service} startHref="/start?need=automation" />
    </>
  );
}
