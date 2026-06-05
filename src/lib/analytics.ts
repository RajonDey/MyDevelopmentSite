/** GA4 / GTM event helpers — wired on rdx pages from Phase 2+ */

export const RDX_ANALYTICS_EVENTS = {
  startPageView: "rdx_start_page_view",
  startScopeComplete: "rdx_start_scope_complete",
  startFormSubmit: "rdx_start_form_submit",
  auditStart: "rdx_audit_start",
  auditSubmit: "rdx_audit_submit",
  contactSubmit: "rdx_contact_submit",
  estimatorComplete: "rdx_estimator_complete",
  ctaClick: "rdx_cta_click",
  campaignPageView: "rdx_campaign_page_view",
  campaignCtaClick: "rdx_campaign_cta_click",
} as const;

export type RdxAnalyticsEvent =
  (typeof RDX_ANALYTICS_EVENTS)[keyof typeof RDX_ANALYTICS_EVENTS];

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(
  event: RdxAnalyticsEvent,
  params?: EventParams
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...params,
  });
}
