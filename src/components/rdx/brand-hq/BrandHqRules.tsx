import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { brandHqChrome } from "@/content/rdx/brand-hq";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqRulesProps = {
  brand: BrandBook;
};

export function BrandHqRules({ brand }: BrandHqRulesProps) {
  return (
    <RdxSection id="rules" variant="surface" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader eyebrow="08" title="Rules" description={brand.logo.rules} />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">Do</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-rdx-ink">
              {brand.logo.do.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
              Do not
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-rdx-ink">
              {brand.logo.doNot.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-sm text-rdx-subtle">
          Source of truth: {brandHqChrome.repoBook} · {brandHqChrome.repoJson}
        </p>
      </RdxContainer>
    </RdxSection>
  );
}
