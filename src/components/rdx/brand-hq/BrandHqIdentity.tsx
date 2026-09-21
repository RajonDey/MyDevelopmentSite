import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { RdxMark } from "@/components/rdx/brand/RdxMark";
import { brandHqSpecimens } from "@/content/rdx/brand-hq";
import { siteMetadata } from "@/content/rdx/metadata";
import { cn } from "@/lib/utils";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqIdentityProps = {
  brand: BrandBook;
};

export function BrandHqIdentity({ brand }: BrandHqIdentityProps) {
  const ink = brand.colors.roles.ink.hex;
  const paper = brand.colors.roles.paper.hex;

  return (
    <RdxSection id="identity" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader
          eyebrow="01"
          title="Identity"
          description={brand.logo.rules}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {brandHqSpecimens.map((item) => {
            const onInk = item.surface === "ink";
            const color = onInk ? paper : ink;
            return (
              <figure
                key={item.id}
                className="border border-rdx-border p-8"
                style={{ backgroundColor: onInk ? ink : paper, color }}
              >
                <div
                  className={cn(
                    "flex min-h-28 items-center justify-center",
                    item.layout === "stacked" && "flex-col gap-3",
                    item.layout === "horizontal" && "flex-row gap-3"
                  )}
                >
                  <RdxMark
                    className={
                      item.layout === "mark" ? "h-28 w-auto" : "h-16 w-auto"
                    }
                  />
                  {item.layout !== "mark" ? (
                    <span className="font-rdx-display text-[length:var(--rdx-text-2xl)] tracking-tight">
                      {siteMetadata.siteName}
                    </span>
                  ) : null}
                </div>
                <figcaption
                  className="mt-6 text-xs uppercase tracking-[0.12em]"
                  style={{ color }}
                >
                  {item.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
        <p className="mt-8 max-w-[var(--rdx-measure)] text-sm text-rdx-muted">
          Every H on this page is the original vector — the same mark as the header.
          Clear space {brand.logo.clearSpace}. Symbol min {brand.logo.minSize.symbolUiPx}
          px in UI, {brand.logo.minSize.faviconPx}px favicon.
        </p>
      </RdxContainer>
    </RdxSection>
  );
}
