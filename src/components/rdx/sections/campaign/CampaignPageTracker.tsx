"use client";

import { useEffect } from "react";
import {
  RDX_ANALYTICS_EVENTS,
  trackEvent,
} from "@/lib/analytics";

type CampaignPageTrackerProps = {
  slug: string;
  source: string;
  variant?: string;
};

export function CampaignPageTracker({
  slug,
  source,
  variant,
}: CampaignPageTrackerProps) {
  useEffect(() => {
    trackEvent(RDX_ANALYTICS_EVENTS.campaignPageView, {
      campaign_slug: slug,
      lead_source: source,
      ...(variant ? { copy_variant: variant } : {}),
    });
  }, [slug, source, variant]);

  return null;
}
