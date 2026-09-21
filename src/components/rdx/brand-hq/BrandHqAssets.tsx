import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { RdxMark } from "@/components/rdx/brand/RdxMark";
import { brandHqChrome, brandHqDownloadGroups } from "@/content/rdx/brand-hq";
import { siteMetadata } from "@/content/rdx/metadata";
import { cn } from "@/lib/utils";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqAssetsProps = {
  brand: BrandBook;
};

type MarkLayout = "mark" | "horizontal" | "stacked";

function MarkThumb({ layout }: { layout: MarkLayout }) {
  const mark = <RdxMark className="h-7 w-auto" />;
  const word = (
    <span className="font-rdx-display text-sm tracking-tight">
      {siteMetadata.siteName}
    </span>
  );
  if (layout === "horizontal") {
    return <div className="flex items-center gap-1.5">{mark}{word}</div>;
  }
  if (layout === "stacked") {
    return (
      <div className="flex flex-col items-center gap-0.5">
        {mark}
        {word}
      </div>
    );
  }
  return mark;
}

export function BrandHqAssets({ brand }: BrandHqAssetsProps) {
  const ink = brand.colors.roles.ink.hex;
  const paper = brand.colors.roles.paper.hex;

  return (
    <RdxSection id="assets" variant="surface" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader
          eyebrow="06"
          title="Assets"
          description={brandHqChrome.assetsIntro}
        />
        <div className="mt-10 space-y-12">
          {brandHqDownloadGroups.map((group) => {
            const isGrid = "layout" in group && group.layout === "grid";
            return (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rdx-subtle">
                  {group.title}
                </p>
                {"note" in group && group.note ? (
                  <p className="mt-1 text-sm text-rdx-muted">{group.note}</p>
                ) : null}
                {isGrid ? (
                  <ul className="mt-4 grid gap-4 md:grid-cols-2">
                    {group.items.map((item) => {
                      const href = brand.assets[item.key];
                      if (!href) return null;
                      const isCard = item.key.startsWith("card");
                      const preview = isCard
                          ? "aspect-[7/4] w-full object-contain"
                          : item.key.startsWith("social")
                            ? "aspect-square w-full object-cover"
                            : item.key.startsWith("og")
                              ? "aspect-[1200/630] w-full object-cover"
                              : "h-40 w-full object-cover";
                      return (
                        <li
                          key={item.key}
                          className={cn(
                            "border border-rdx-border",
                            isCard ? "bg-rdx-surface p-4" : "overflow-hidden bg-rdx-paper"
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${href}?v=${brand.version}`}
                            alt={item.label}
                            className={preview}
                          />
                          <div className="flex items-center justify-between gap-3 border-t border-rdx-border px-4 py-3">
                            <span className="text-sm text-rdx-ink">{item.label}</span>
                            <a
                              href={href}
                              download
                              className="text-sm text-rdx-accent underline-offset-4 hover:underline"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ul className="mt-4 divide-y divide-rdx-border border-y border-rdx-border">
                    {group.items.map((item) => {
                      const href = brand.assets[item.key];
                      if (!href) return null;
                      const onInk = item.surface === "ink";
                      const markLayout = "mark" in item ? item.mark : undefined;
                      return (
                        <li key={item.key} className="flex items-center gap-4 py-4">
                          <div
                            className={cn(
                              "flex shrink-0 items-center justify-center border border-rdx-border",
                              markLayout === "stacked" ? "h-16 w-28" : "h-14 w-36"
                            )}
                            style={{
                              backgroundColor: onInk ? ink : paper,
                              color: onInk ? paper : ink,
                            }}
                          >
                            {markLayout ? (
                              <MarkThumb layout={markLayout} />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={href}
                                alt=""
                                className="h-8 w-auto max-w-[7rem] object-contain"
                              />
                            )}
                          </div>
                          <span className="min-w-0 flex-1 text-sm text-rdx-ink">
                            {item.label}
                          </span>
                          <a
                            href={href}
                            download
                            className="text-sm text-rdx-accent underline-offset-4 hover:underline"
                          >
                            Download
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
