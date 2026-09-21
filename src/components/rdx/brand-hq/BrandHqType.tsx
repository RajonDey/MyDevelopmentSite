import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqTypeProps = {
  brand: BrandBook;
};

export function BrandHqType({ brand }: BrandHqTypeProps) {
  return (
    <RdxSection id="typography" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader
          eyebrow="03"
          title="Typography"
          description={brand.typography.italic}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
              Display · {brand.typography.display}
            </p>
            <p className="mt-4 font-rdx-display text-[length:var(--rdx-text-4xl)] leading-[var(--rdx-leading-display)] text-rdx-ink">
              {brand.name}
            </p>
            <p className="mt-3 font-rdx-display text-[length:var(--rdx-text-2xl)] italic text-rdx-ink">
              {brand.tagline}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
              Body · {brand.typography.body}
            </p>
            <p className="mt-4 max-w-[var(--rdx-measure)] text-base leading-[var(--rdx-leading-body)] text-rdx-muted">
              {brand.positioning.company}
            </p>
            <p className="mt-3 font-mono text-xs text-rdx-subtle">
              {brand.typography.displayCss} · {brand.typography.bodyCss}
            </p>
          </div>
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
