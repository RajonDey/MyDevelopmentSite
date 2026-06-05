import Link from "next/link";
import type { CampaignLanderContent } from "@/content/rdx/campaigns";
import { buildStartUrl } from "@/lib/campaign-attribution";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { PullQuote } from "@/components/rdx/sections/PullQuote";
import { CampaignPageTracker } from "@/components/rdx/sections/campaign/CampaignPageTracker";
import { CampaignCtaLink } from "@/components/rdx/sections/campaign/CampaignCtaLink";

type CampaignLanderViewProps = {
  campaign: CampaignLanderContent;
  variant: CampaignLanderContent["variants"]["a"];
  variantKey?: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
};

export function CampaignLanderView({
  campaign,
  variant,
  variantKey,
  utm,
}: CampaignLanderViewProps) {
  const startHref = buildStartUrl(
    { need: campaign.defaultNeed, source: campaign.source },
    { ...utm, v: variantKey }
  );

  return (
    <>
      <CampaignPageTracker
        slug={campaign.slug}
        source={campaign.source}
        variant={variantKey}
      />

      <RdxSection className="pt-4 md:pt-10" spacing="tight">
        <RdxContainer className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rdx-subtle">
            {variant.eyebrow}
          </p>
          <h1 className="mt-4 font-rdx-display text-[length:var(--rdx-text-3xl)] font-normal leading-[var(--rdx-leading-display)] tracking-tight text-rdx-ink md:text-[length:var(--rdx-text-4xl)]">
            {variant.headline}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-rdx-muted">
            {variant.intro}
          </p>

          <ul className="mt-8 space-y-4 border-t border-rdx-border pt-8">
            {variant.bullets.map((bullet) => (
              <li
                key={bullet.slice(0, 32)}
                className="flex gap-3 text-sm leading-relaxed text-rdx-muted"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rdx-accent"
                  aria-hidden
                />
                {bullet}
              </li>
            ))}
          </ul>
        </RdxContainer>
      </RdxSection>

      <RdxSection variant="surface" spacing="tight">
        <PullQuote
          quote={campaign.caseSnippet.quote}
          attribution={campaign.caseSnippet.attribution}
          marginalia={campaign.caseSnippet.marginalia}
        />
        <RdxContainer className="max-w-2xl">
          <Link
            href={campaign.caseSnippet.href}
            className="mt-2 inline-block text-sm font-medium text-rdx-accent transition-colors hover:text-rdx-accent-hover"
          >
            Read the case study →
          </Link>
        </RdxContainer>
      </RdxSection>

      <RdxSection className="pb-20 md:pb-24" spacing="tight">
        <RdxContainer className="max-w-2xl">
          <div className="rounded-rdx border border-rdx-border bg-rdx-paper p-8 md:p-10">
            <p className="font-rdx-display text-[length:var(--rdx-text-xl)] font-normal text-rdx-ink">
              Request a free review
            </p>
            <p className="mt-3 text-sm leading-relaxed text-rdx-muted">
              Tell us how your site and lead process work today — we&apos;ll send
              3 specific fixes within 1 business day.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CampaignCtaLink
                href={startHref}
                slug={campaign.slug}
                source={campaign.source}
                variant={variantKey}
                className="inline-flex w-full items-center justify-center rounded-rdx bg-rdx-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rdx-accent-hover sm:w-auto"
              >
                {campaign.cta.label}
              </CampaignCtaLink>
              <RdxButton href="/services" variant="secondary">
                View pricing
              </RdxButton>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-rdx-subtle">
            {campaign.footerNote}
          </p>
        </RdxContainer>
      </RdxSection>
    </>
  );
}
