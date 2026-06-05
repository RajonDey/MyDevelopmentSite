import type { ServiceOfferDetail } from "@/types/rdx";
import { agencyWebsiteContent } from "@/content/rdx/services-pages";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { SplitHero } from "@/components/rdx/sections/SplitHero";
import { SystemDiagram } from "@/components/rdx/visuals/system-diagram";
import {
  ServiceBackLink,
  ServiceCallout,
  ServiceDetailExtras,
} from "./ServiceDetailExtras";

type AgencyWebsiteViewProps = {
  service: ServiceOfferDetail;
};

export function AgencyWebsiteView({ service }: AgencyWebsiteViewProps) {
  const { hero, deliverables, connectionsNote } = agencyWebsiteContent;

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
        visual={<SystemDiagram className="w-full max-w-lg" />}
      />

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            eyebrow="Deliverables"
            title="What you get"
            description="Every tier includes a fixed page count, timeline, and support window. Details in the tier table below."
          />
          <ul className="space-y-3">
            {deliverables.map((item) => (
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
        </RdxContainer>
      </RdxSection>

      <RdxSection spacing="tight">
        <RdxContainer className="max-w-2xl">
          <ServiceCallout title="Connections" body={connectionsNote} />
        </RdxContainer>
      </RdxSection>

      <ServiceDetailExtras service={service} startHref="/start?need=website" />
    </>
  );
}
