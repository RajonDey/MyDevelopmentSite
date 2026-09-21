import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { brandHqChrome } from "@/content/rdx/brand-hq";
import type { BrandBook } from "@/types/rdx/brand-book";
import { BrandHqHexField } from "./BrandHqHexField";

type BrandHqHeroProps = {
  brand: BrandBook;
};

export function BrandHqHero({ brand }: BrandHqHeroProps) {
  return (
    <RdxSection spacing="tight" className="pt-10 md:pt-14">
      <RdxContainer>
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rdx-subtle">
              {brandHqChrome.eyebrow}
            </p>
            <h1 className="mt-4 font-rdx-display text-[length:var(--rdx-text-4xl)] leading-[var(--rdx-leading-display)] tracking-tight text-rdx-ink">
              {brand.name}
            </h1>
            <p className="mt-4 font-rdx-display text-[length:var(--rdx-text-2xl)] italic text-rdx-ink">
              {brand.tagline}
            </p>
            <p className="mt-6 max-w-[var(--rdx-measure)] text-base leading-[var(--rdx-leading-body)] text-rdx-muted">
              {brand.positioning.company}
            </p>
            <p className="mt-4 text-sm text-rdx-subtle">{brandHqChrome.sourceNote}</p>
          </div>
          <BrandHqHexField brand={brand} />
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
