import Link from "next/link";
import type { ServiceOfferDetail } from "@/types/rdx";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { ComparisonTable } from "@/components/rdx/sections/ComparisonTable";
import { StickyCtaBar } from "@/components/rdx/sections/StickyCtaBar";

type ServiceDetailExtrasProps = {
  service: ServiceOfferDetail;
  startHref?: string;
};

export function ServiceDetailExtras({
  service,
  startHref = "/start",
}: ServiceDetailExtrasProps) {
  return (
    <>
      <RdxSection variant="surface" spacing="tight">
        <RdxContainer>
          <SectionHeader
            className="mb-6"
            eyebrow="Pricing"
            title="Compare tiers"
            description="Round-number pricing. Exact scope confirmed on your free review call."
          />
          <ComparisonTable service={service} />
        </RdxContainer>
      </RdxSection>

      <RdxSection spacing="tight">
        <RdxContainer>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-rdx-ink">Not included</h2>
              <ul className="space-y-2">
                {service.notIncluded.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-rdx-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-rdx-ink">Add-ons</h2>
              <ul className="space-y-2">
                {service.addOns.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-rdx-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="band" className="pb-20 md:pb-24">
        <RdxContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-rdx-display text-[length:var(--rdx-text-2xl)] text-rdx-ink">
              Ready to scope your project?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-rdx-muted">
              Free review call. We&apos;ll send 3 specific fixes whether you hire us or not.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <RdxButton href={startHref}>Free Website & Workflow Review</RdxButton>
              <RdxButton href="/start?step=scope" variant="secondary">
                Estimate scope
              </RdxButton>
            </div>
          </div>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}

type ServiceBackLinkProps = {
  className?: string;
};

export function ServiceBackLink({ className }: ServiceBackLinkProps) {
  return (
    <Link
      href="/services"
      className={
        className ??
        "text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
      }
    >
      ← All services
    </Link>
  );
}

export function ServiceCallout({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <RdxCard className="border-rdx-accent/20 bg-rdx-surface">
      <p className="text-sm font-semibold text-rdx-ink">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-rdx-muted">{body}</p>
    </RdxCard>
  );
}
