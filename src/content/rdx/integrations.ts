/** Integration names for logo row — typographic treatment, no third-party assets */

export const rdxIntegrations = [
  { id: "hubspot", label: "HubSpot" },
  { id: "slack", label: "Slack" },
  { id: "calendly", label: "Calendly" },
  { id: "ga4", label: "GA4" },
  { id: "n8n", label: "n8n" },
  { id: "wordpress", label: "WordPress" },
] as const;

export type RdxIntegration = (typeof rdxIntegrations)[number];
