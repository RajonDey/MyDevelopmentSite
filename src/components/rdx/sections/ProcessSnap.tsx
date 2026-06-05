import { homeContent, processSteps } from "@/content/rdx/home";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";

export function ProcessSnap() {
  const { process } = homeContent;

  return (
    <RdxSection variant="surface" spacing="tight">
      <RdxContainer>
        <SectionHeader
          className="mb-10"
          eyebrow={process.eyebrow}
          title={process.heading}
          description={process.description}
        />

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li
              key={step.step}
              className="relative border-t border-rdx-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <span className="font-rdx-display text-[length:var(--rdx-text-xl)] text-rdx-accent">
                  {step.step}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-rdx-subtle">
                  {step.timeline}
                </span>
              </div>
              <h3 className="text-base font-semibold text-rdx-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-rdx-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </RdxContainer>
    </RdxSection>
  );
}
