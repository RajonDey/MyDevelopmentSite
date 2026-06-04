import Link from "next/link";
import {
  reviewPlatforms,
  reviewsContent,
  verifiedReviews,
} from "@/content/rdx/reviews";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import { RdxCard } from "@/components/rdx/ui/Card";

export function VerifiedReviewsSection() {
  const { eyebrow, title, description, emptyHint } = reviewsContent;
  const hasQuotes = verifiedReviews.length > 0;

  return (
    <RdxSection id="reviews" variant="surface" spacing="tight">
      <RdxContainer className="max-w-4xl">
        <SectionHeader
          className="mb-8"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {hasQuotes ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {verifiedReviews.map((review) => (
              <RdxCard key={review.id} className="bg-rdx-paper">
                <blockquote className="text-sm leading-relaxed text-rdx-muted">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <footer className="mt-4 space-y-1">
                  <p className="text-sm font-semibold text-rdx-ink">
                    {review.author}
                    {review.role ? ` · ${review.role}` : ""}
                  </p>
                  <Link
                    href={review.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-rdx-accent hover:text-rdx-accent-hover"
                  >
                    Verified on {review.platform} →
                  </Link>
                </footer>
              </RdxCard>
            ))}
          </div>
        ) : (
          <p className="mb-6 text-sm text-rdx-subtle">{emptyHint}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-4">
          {Object.values(reviewPlatforms).map((platform) => (
            <Link
              key={platform.label}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-rdx border border-rdx-border bg-rdx-paper px-4 py-2 text-sm font-medium text-rdx-ink transition-colors hover:border-rdx-accent hover:text-rdx-accent"
            >
              {platform.label} reviews →
            </Link>
          ))}
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
