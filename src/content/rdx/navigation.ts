/** Site navigation */

export const rdxPrimaryNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

export const rdxNavCta = {
  label: "Free Review",
  href: "/start",
} as const;

export const rdxFooterLinks = {
  services: [
    { label: "Agency Website", href: "/services/agency-website" },
    { label: "Lead & CRM Automation", href: "/services/lead-automation" },
    { label: "AI Chat & Search", href: "/services/ai-chat-search" },
    { label: "Care plans", href: "/retainer" },
  ],
  company: [
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Start a project", href: "/start" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;
