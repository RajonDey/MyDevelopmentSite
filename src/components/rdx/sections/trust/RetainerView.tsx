import { retainerContent } from "@/content/rdx/retainer";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { RdxBadge } from "@/components/rdx/ui/Badge";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { StickyCtaBar } from "@/components/rdx/sections/StickyCtaBar";
import { cn } from "@/lib/utils";

export function RetainerView() {
  const { hero, whenToBuy, plans, notIncluded, cta } = retainerContent;

  return (
    <>
      <RdxSection className="pt-4 md:pt-8" spacing="tight">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
          />
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer>
          <SectionHeader
            className="mb-6"
            eyebrow="When to buy"
            title={whenToBuy.title}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <RdxCard>
              <h3 className="text-lg font-semibold text-rdx-ink">
                {whenToBuy.project.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {whenToBuy.project.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-rdx-muted"
                  >
                    <span className="text-rdx-accent" aria-hidden>
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <RdxButton href={whenToBuy.project.cta.href} className="mt-6">
                {whenToBuy.project.cta.label}
              </RdxButton>
            </RdxCard>
            <RdxCard className="border-rdx-accent/20 bg-rdx-surface">
              <h3 className="text-lg font-semibold text-rdx-ink">
                {whenToBuy.care.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {whenToBuy.care.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-rdx-muted"
                  >
                    <span className="text-rdx-accent" aria-hidden>
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <RdxButton
                href={whenToBuy.care.cta.href}
                variant="secondary"
                className="mt-6"
              >
                {whenToBuy.care.cta.label}
              </RdxButton>
            </RdxCard>
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection spacing="tight">
        <RdxContainer>
          <SectionHeader
            className="mb-6"
            eyebrow="Plans"
            title="Care plan tiers"
            description="Maintain $500/mo · Grow $1,000/mo — optional after project handoff"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <RdxCard
                key={plan.id}
                className={cn(
                  plan.recommended && "border-rdx-accent ring-1 ring-rdx-accent/30"
                )}
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-rdx-ink">{plan.name}</h2>
                  {plan.recommended && <RdxBadge>Recommended</RdxBadge>}
                </div>
                <p className="font-rdx-display text-2xl text-rdx-ink">
                  {plan.priceLabel}
                </p>
                <p className="mt-2 text-sm text-rdx-muted">{plan.summary}</p>
                <ul className="mt-4 space-y-2">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-rdx-muted"
                    >
                      <span className="text-rdx-accent" aria-hidden>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </RdxCard>
            ))}
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="band" className="pb-20 md:pb-24">
        <RdxContainer className="max-w-3xl">
          <h2 className="text-lg font-semibold text-rdx-ink">Not included</h2>
          <ul className="mt-3 space-y-2">
            {notIncluded.map((item) => (
              <li key={item} className="text-sm text-rdx-muted">
                {item}
              </li>
            ))}
          </ul>
          <RdxButton href={cta.href} className="mt-8">
            {cta.label}
          </RdxButton>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}
