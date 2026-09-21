import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { brandHqColorOrder } from "@/content/rdx/brand-hq";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqColorProps = {
  brand: BrandBook;
};

export function BrandHqColor({ brand }: BrandHqColorProps) {
  return (
    <RdxSection id="color" variant="surface" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader
          eyebrow="02"
          title="Color"
          description={brand.colors.source}
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brandHqColorOrder.map((key) => {
            const role = brand.colors.roles[key];
            if (!role) return null;
            return (
              <li key={key} className="border border-rdx-border bg-rdx-paper">
                <div
                  className="h-24 border-b border-rdx-border"
                  style={{ backgroundColor: role.hex }}
                />
                <div className="space-y-1 p-4">
                  <p className="text-sm font-medium capitalize text-rdx-ink">{key}</p>
                  <p className="font-mono text-xs text-rdx-muted">{role.hex}</p>
                  <p className="font-mono text-xs text-rdx-subtle">{role.css}</p>
                  {role.note ? (
                    <p className="text-xs text-rdx-subtle">{role.note}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </RdxContainer>
    </RdxSection>
  );
}
