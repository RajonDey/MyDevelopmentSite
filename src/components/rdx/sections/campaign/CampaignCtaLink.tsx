"use client";

import Link from "next/link";
import {
  RDX_ANALYTICS_EVENTS,
  trackEvent,
} from "@/lib/analytics";

type CampaignCtaLinkProps = {
  href: string;
  slug: string;
  source: string;
  variant?: string;
  className?: string;
  children: React.ReactNode;
};

export function CampaignCtaLink({
  href,
  slug,
  source,
  variant,
  className,
  children,
}: CampaignCtaLinkProps) {
  function handleClick() {
    trackEvent(RDX_ANALYTICS_EVENTS.campaignCtaClick, {
      campaign_slug: slug,
      lead_source: source,
      ...(variant ? { copy_variant: variant } : {}),
    });
    trackEvent(RDX_ANALYTICS_EVENTS.ctaClick, {
      label: "campaign_start",
      href,
    });
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
