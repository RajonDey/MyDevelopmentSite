import type { ServiceOfferDetail } from "@/types/rdx";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { ServiceTierTable } from "@/components/rdx/sections/ServiceTierTable";
import { cn } from "@/lib/utils";

type ComparisonTableProps = {
  service: ServiceOfferDetail;
  className?: string;
};

export function ComparisonTable({ service, className }: ComparisonTableProps) {
  const allHighlights = [
    ...new Set(service.tiers.flatMap((tier) => tier.highlights)),
  ];

  return (
    <div className={className}>
      <div className="md:hidden">
        <ServiceTierTable service={service} />
      </div>

      <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">{service.name} pricing comparison</caption>
        <thead>
          <tr className="border-b border-rdx-border">
            <th scope="col" className="pb-4 pr-4 text-sm font-medium text-rdx-subtle">
              Tier
            </th>
            {service.tiers.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                className={cn(
                  "pb-4 px-4 align-bottom",
                  tier.recommended && "bg-rdx-surface"
                )}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-rdx-ink">
                      {tier.label}
                    </span>
                    {tier.recommended && <RdxBadge>Recommended</RdxBadge>}
                  </div>
                  <p className="font-rdx-display text-[length:var(--rdx-text-xl)] font-normal text-rdx-ink">
                    {tier.priceLabel}
                  </p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allHighlights.map((highlight, rowIndex) => (
            <tr
              key={highlight}
              className={cn(
                "border-b border-rdx-border",
                rowIndex % 2 === 1 && "bg-rdx-surface/60"
              )}
            >
              <th
                scope="row"
                className="py-3 pr-4 text-sm font-normal text-rdx-muted"
              >
                {highlight}
              </th>
              {service.tiers.map((tier) => {
                const included = tier.highlights.includes(highlight);
                return (
                  <td
                    key={`${tier.id}-${highlight}`}
                    className={cn(
                      "px-4 py-3 text-center text-sm",
                      tier.recommended && "bg-rdx-surface"
                    )}
                  >
                    {included ? (
                      <span className="font-medium text-rdx-accent" aria-label="Included">
                        ✓
                      </span>
                    ) : (
                      <span className="text-rdx-subtle" aria-label="Not included">
                        —
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
