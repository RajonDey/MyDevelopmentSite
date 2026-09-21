import { RdxContainer } from "@/components/rdx/layout/Container";
import { brandHqSections } from "@/content/rdx/brand-hq";

export function BrandHqNav() {
  return (
    <nav
      aria-label="Brand sections"
      className="sticky top-16 z-40 border-b border-rdx-border bg-rdx-paper/95 backdrop-blur-sm"
    >
      <RdxContainer className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-3">
        {brandHqSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-xs font-medium uppercase tracking-[0.12em] text-rdx-muted transition-colors hover:text-rdx-ink"
          >
            {section.label}
          </a>
        ))}
      </RdxContainer>
    </nav>
  );
}
