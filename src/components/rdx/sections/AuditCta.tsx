import { homeContent } from "@/content/rdx/home";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";

export function AuditCta() {
  const { finalCta } = homeContent;

  return (
    <RdxSection variant="band" className="pb-20 md:pb-24">
      <RdxContainer>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-rdx-display text-[length:var(--rdx-text-2xl)] font-normal leading-[var(--rdx-leading-display)] text-rdx-ink md:text-[length:var(--rdx-text-3xl)]">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rdx-muted">
            {finalCta.subhead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RdxButton href={finalCta.cta.href}>{finalCta.cta.label}</RdxButton>
            <RdxButton href="/services" variant="secondary">
              View services
            </RdxButton>
          </div>
          <p className="mt-6 text-sm text-rdx-subtle">
            {homeContent.priceFloorLabel} · reply within 1 business day
          </p>
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
