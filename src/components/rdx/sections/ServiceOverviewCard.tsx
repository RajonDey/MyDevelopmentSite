import Link from "next/link";
import type { ServiceOffer } from "@/types/rdx";
import { RdxCard } from "@/components/rdx/ui/Card";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { RdxButton } from "@/components/rdx/ui/Button";

type ServiceOverviewCardProps = {
  service: ServiceOffer;
};

export function ServiceOverviewCard({ service }: ServiceOverviewCardProps) {
  const recommendedTier = service.tiers.find((tier) => tier.recommended);

  return (
    <RdxCard className="flex h-full flex-col">
      <div className="mb-4 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold text-rdx-ink">{service.name}</h2>
          <RdxBadge>
            From ${service.startingPrice.toLocaleString("en-US")}
          </RdxBadge>
        </div>
        <p className="text-sm leading-relaxed text-rdx-muted">{service.subtitle}</p>
      </div>

      {recommendedTier && (
        <p className="mb-6 text-sm text-rdx-subtle">
          Most agencies start at{" "}
          <span className="font-medium text-rdx-ink">
            {recommendedTier.priceLabel}
          </span>{" "}
          ({recommendedTier.label})
        </p>
      )}

      <div className="mt-auto flex flex-col gap-3 sm:flex-row">
        <RdxButton href={`/services/${service.slug}`}>View tiers</RdxButton>
        <Link
          href="/start"
          className="inline-flex items-center justify-center text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
        >
          Free review
        </Link>
      </div>
    </RdxCard>
  );
}
