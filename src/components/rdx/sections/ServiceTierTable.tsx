import type { ServiceOfferDetail } from "@/types/rdx";
import { RdxCard } from "@/components/rdx/ui/Card";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { cn } from "@/lib/utils";

type ServiceTierTableProps = {
  service: ServiceOfferDetail;
};

export function ServiceTierTable({ service }: ServiceTierTableProps) {
  const gridClass =
    service.tiers.length === 3
      ? "md:grid-cols-2 lg:grid-cols-3"
      : "md:grid-cols-2 xl:grid-cols-4";

  return (
    <div className={cn("grid gap-4", gridClass)}>
      {service.tiers.map((tier) => (
        <RdxCard
          key={tier.id}
          className={cn(
            "flex flex-col",
            tier.recommended && "border-rdx-accent ring-1 ring-rdx-accent/30"
          )}
        >
          <div className="mb-4 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-rdx-ink">{tier.label}</h3>
              {tier.recommended && <RdxBadge>Recommended</RdxBadge>}
            </div>
            <p className="text-2xl font-semibold tracking-tight text-rdx-ink">
              {tier.priceLabel}
            </p>
          </div>

          <ul className="mb-6 flex-1 space-y-2">
            {tier.highlights.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-rdx-muted">
                <span className="text-rdx-accent" aria-hidden>
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </RdxCard>
      ))}
    </div>
  );
}
