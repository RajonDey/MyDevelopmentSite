import { RdxContainer } from "@/components/rdx/layout/Container";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqCloseProps = {
  brand: BrandBook;
};

export function BrandHqClose({ brand }: BrandHqCloseProps) {
  const ink = brand.colors.roles.hexInk.hex;
  const paper = brand.colors.roles.paper.hex;
  const lockup = brand.assets.lockupHorizontalOnDark;

  return (
    <section aria-label="Brand close" className="pb-[var(--rdx-space-section)]">
      <RdxContainer>
        <div
          className="flex flex-col items-start justify-between gap-8 px-6 py-14 sm:px-8 md:flex-row md:items-center md:px-10 md:py-16"
          style={{ backgroundColor: ink, color: paper }}
        >
          {lockup ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lockup}
              alt=""
              className="h-10 w-auto max-w-[min(100%,20rem)] object-contain md:h-12"
            />
          ) : null}
          <p className="font-rdx-display text-[length:var(--rdx-text-xl)]">{brand.tagline}</p>
        </div>
      </RdxContainer>
    </section>
  );
}
