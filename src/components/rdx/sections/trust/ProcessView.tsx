import Link from "next/link";
import { processPageContent } from "@/content/rdx/process";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { StickyCtaBar } from "@/components/rdx/sections/StickyCtaBar";

export function ProcessView() {
  const { hero, steps, pricingLink } = processPageContent;

  return (
    <>
      <RdxSection className="pt-4 md:pt-8" spacing="tight">
        <RdxContainer className="max-w-3xl">
          <SectionHeader
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
            titleAs="h1"
          />
          <Link
            href={pricingLink.href}
            className="mt-4 inline-block text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
          >
            {pricingLink.label} →
          </Link>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight">
        <RdxContainer className="max-w-4xl">
          <ol className="space-y-8">
            {steps.map((step) => (
              <li key={step.step}>
                <RdxCard className="bg-rdx-paper">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-rdx-display text-[length:var(--rdx-text-xl)] text-rdx-accent">
                      Step {step.step}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-rdx-subtle">
                      {step.timeline}
                    </span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-rdx-ink">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm text-rdx-muted">{step.description}</p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-rdx-ink">You</h3>
                      <ul className="mt-2 space-y-2">
                        {step.youDo.map((item) => (
                          <li
                            key={item}
                            className="text-sm leading-relaxed text-rdx-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-rdx-ink">RDX</h3>
                      <ul className="mt-2 space-y-2">
                        {step.weDo.map((item) => (
                          <li
                            key={item}
                            className="text-sm leading-relaxed text-rdx-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-rdx-border pt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-rdx-subtle">
                      Deliverables
                    </h3>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {step.deliverables.map((item) => (
                        <li key={item} className="text-sm text-rdx-muted">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RdxCard>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <RdxButton href="/start">Free Website & Workflow Review</RdxButton>
            <RdxButton href="/services" variant="secondary">
              View services
            </RdxButton>
          </div>
        </RdxContainer>
      </RdxSection>

      <StickyCtaBar />
    </>
  );
}
