import type { ReactNode } from "react";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { RdxButton } from "@/components/rdx/ui/Button";
import { cn } from "@/lib/utils";

type SplitHeroCta = {
  label: string;
  href: string;
};

type SplitHeroProps = {
  badge?: string;
  headline: string;
  subhead: string;
  primaryCta: SplitHeroCta;
  secondaryCta?: SplitHeroCta;
  visual: ReactNode;
  footnote?: string;
  flip?: boolean;
  className?: string;
};

export function SplitHero({
  badge,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  visual,
  footnote,
  flip = false,
  className,
}: SplitHeroProps) {
  return (
    <RdxSection className={cn("pt-8 md:pt-12", className)}>
      <RdxContainer>
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-14",
            flip && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          <div className="space-y-6">
            {badge && <RdxBadge>{badge}</RdxBadge>}
            <h1 className="max-w-xl font-rdx-display text-[length:var(--rdx-text-4xl)] font-normal leading-[var(--rdx-leading-display)] tracking-tight text-rdx-ink">
              {headline}
            </h1>
            <p className="max-w-[var(--rdx-measure)] text-base leading-[var(--rdx-leading-body)] text-rdx-muted md:text-lg">
              {subhead}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <RdxButton href={primaryCta.href}>{primaryCta.label}</RdxButton>
              {secondaryCta && (
                <RdxButton href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </RdxButton>
              )}
            </div>
            {footnote && (
              <p className="text-sm text-rdx-subtle">{footnote}</p>
            )}
          </div>
          <div className="flex justify-center lg:justify-end">{visual}</div>
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
