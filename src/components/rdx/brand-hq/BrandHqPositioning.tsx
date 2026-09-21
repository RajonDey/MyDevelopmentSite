import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { brandHqChrome } from "@/content/rdx/brand-hq";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqPositioningProps = {
  brand: BrandBook;
};

export function BrandHqPositioning({ brand }: BrandHqPositioningProps) {
  const rows = [
    { label: "Company", value: brand.positioning.company },
    { label: "Market", value: brand.positioning.market },
    { label: "ICP", value: brand.positioning.icp },
    { label: "Location", value: brand.positioning.location },
    { label: "Legal", value: brand.legal },
  ];

  return (
    <RdxSection id="brand" variant="surface" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader eyebrow="04" title="Brand" description={brand.tagline} />
        <dl className="mt-10 max-w-3xl divide-y divide-rdx-border border-y border-rdx-border">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-2 py-5 md:grid-cols-[8rem_1fr]">
              <dt className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
                {row.label}
              </dt>
              <dd className="text-base leading-[var(--rdx-leading-body)] text-rdx-ink">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-rdx-subtle">{brandHqChrome.missionHidden}</p>
      </RdxContainer>
    </RdxSection>
  );
}
