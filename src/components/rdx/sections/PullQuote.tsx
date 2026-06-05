import { RdxContainer } from "@/components/rdx/layout/Container";
import { cn } from "@/lib/utils";

type PullQuoteProps = {
  quote: string;
  attribution?: string;
  marginalia?: string;
  className?: string;
};

export function PullQuote({
  quote,
  attribution,
  marginalia,
  className,
}: PullQuoteProps) {
  return (
    <RdxContainer className={cn("max-w-4xl", className)}>
      <figure className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        <blockquote className="border-l-2 border-rdx-accent pl-6">
          <p className="font-rdx-display text-[length:var(--rdx-text-2xl)] font-normal italic leading-[var(--rdx-leading-display)] text-rdx-ink">
            &ldquo;{quote}&rdquo;
          </p>
          {attribution && (
            <figcaption className="mt-4 text-sm font-medium text-rdx-muted">
              — {attribution}
            </figcaption>
          )}
        </blockquote>
        {marginalia && (
          <aside className="max-w-[12rem] text-xs leading-relaxed text-rdx-subtle md:pt-2">
            {marginalia}
          </aside>
        )}
      </figure>
    </RdxContainer>
  );
}
