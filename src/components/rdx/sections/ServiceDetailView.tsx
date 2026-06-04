import Link from "next/link";
import type { ServiceOfferDetail } from "@/types/rdx";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { ServiceTierTable } from "@/components/rdx/sections/ServiceTierTable";

type ServiceDetailViewProps = {
  service: ServiceOfferDetail;
};

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <>
      <RdxSection className="pt-4 md:pt-8">
        <RdxContainer>
          <Link
            href="/services"
            className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
          >
            ← All services
          </Link>
          <div className="mt-6 max-w-3xl space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-rdx-ink md:text-4xl">
              {service.name}
            </h1>
            <p className="text-base leading-relaxed text-rdx-muted">
              {service.subtitle}
            </p>
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection className="bg-rdx-surface pt-0">
        <RdxContainer>
          <h2 className="mb-6 text-xl font-semibold text-rdx-ink">Pricing tiers</h2>
          <ServiceTierTable service={service} />
        </RdxContainer>
      </RdxSection>

      <RdxSection className="pt-0">
        <RdxContainer>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-rdx-ink">
                Not included
              </h2>
              <ul className="space-y-2">
                {service.notIncluded.map((item) => (
                  <li key={item} className="text-sm text-rdx-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-rdx-ink">Add-ons</h2>
              <ul className="space-y-2">
                {service.addOns.map((item) => (
                  <li key={item} className="text-sm text-rdx-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RdxButton href="/start">Free Website & Workflow Review</RdxButton>
            <RdxButton href="/start?step=scope" variant="secondary">
              Adjust scope
            </RdxButton>
          </div>
        </RdxContainer>
      </RdxSection>
    </>
  );
}
