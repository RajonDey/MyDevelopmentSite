import Link from "next/link";
import { homeContent } from "@/content/rdx/home";
import { serviceOffers } from "@/content/rdx/services";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";

export function ServicesTeaser() {
  const { services } = homeContent;

  return (
    <RdxSection variant="surface" spacing="tight">
      <RdxContainer>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={services.eyebrow}
            title={services.heading}
            description={services.description}
          />
          <Link
            href="/services"
            className="shrink-0 text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
          >
            {services.viewAllLabel} →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {serviceOffers.map((offer, index) => (
            <Link
              key={offer.id}
              href={`/services/${offer.slug}`}
              className="group rounded-rdx border border-rdx-border bg-rdx-paper p-6 transition-colors hover:border-rdx-accent/40 md:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-rdx-ink transition-colors group-hover:text-rdx-accent">
                  {offer.name}
                </h3>
                <span className="rounded-rdx-pill border border-rdx-border bg-rdx-surface px-2.5 py-0.5 text-xs font-medium text-rdx-muted">
                  From ${offer.startingPrice.toLocaleString("en-US")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-rdx-muted">
                {offer.subtitle}
              </p>
              <p className="mt-4 text-sm font-medium text-rdx-accent">
                View tiers →
              </p>
              {index === 0 && (
                <p className="mt-3 text-xs text-rdx-subtle">
                  Standard at $3,000 · most common starting point
                </p>
              )}
            </Link>
          ))}
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
