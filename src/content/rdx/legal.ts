/** Legal entity + policy copy for /privacy-policy, /terms-of-service, /refund-policy. */

import type { LegalDocument } from "@/types/rdx";
import { contactEmails } from "@/content/rdx/contact";

/**
 * Fill `registeredName` and `registeredAddress` only after the Wyoming LLC filing
 * is accepted — they must match the payment-processor account exactly.
 * Until then the pages show the current operator.
 */
const registration = {
  registeredName: null as string | null,
  registeredAddress: null as string | null,
};

const isRegistered = registration.registeredName !== null;

export const legalEntity = {
  brandName: "RDXHIVE",
  legalName: registration.registeredName ?? "Rajon Dey, trading as RDXHIVE",
  address: registration.registeredAddress ?? "Sylhet, Bangladesh",
  operatingNote: isRegistered
    ? "RDXHIVE is a US-registered entity operating with a global remote product team."
    : "RDXHIVE operates with a global remote product team.",
  governingLaw: isRegistered
    ? "the State of Wyoming, United States"
    : "Bangladesh",
  supportEmail: contactEmails.support,
  generalEmail: contactEmails.hello,
  contactPath: "/start",
  effectiveDate: "October 15, 2026",
} as const;

const { brandName, legalName, supportEmail, governingLaw } = legalEntity;

export const cookieConsentContent = {
  message:
    "We use cookies to analyze site traffic and improve your experience.",
  accept: "Accept",
  decline: "Decline",
  policyLabel: "Privacy Policy",
  settingsLabel: "Cookie settings",
} as const;

export const formPrivacyNotice = {
  lead: "By submitting this form, you agree to our",
  termsLabel: "Terms of Service",
  joiner: "and",
  privacyLabel: "Privacy Policy",
} as const;

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: `How ${brandName} collects, uses, and protects personal information on rdxhive.com and in our products.`,
  intro: [
    `This Privacy Policy explains how ${legalName} ("${brandName}", "we", "us") collects, uses, and protects personal information when you visit rdxhive.com, submit a form, buy a service, or use one of our software products.`,
    "We collect only what we need to run the website, respond to you, deliver work, and process payments. We do not sell personal information.",
  ],
  sections: [
    {
      heading: "1. Information we collect",
      items: [
        "Contact and project details you submit through our forms (for example name, email, agency name, team size, website URL, timeline, budget range, and project notes).",
        "Account and billing details when you buy a service or subscribe to a product (name, email, billing address, and transaction records). Card numbers are entered directly with our payment processor and are never stored on our servers.",
        "Communications you send us by email, booking tools, or chat.",
        "Usage data collected automatically: IP address, browser and device type, pages visited, referring URL, and campaign parameters (UTM tags).",
      ],
    },
    {
      heading: "2. How we use information",
      items: [
        "Reply to inquiries and review requests, and prepare proposals.",
        "Deliver contracted services and provide customer support.",
        "Process payments, send invoices and receipts, and prevent fraud.",
        "Send newsletters only if you subscribed. Every email includes an unsubscribe link.",
        "Understand how the site is used so we can improve it.",
        "Meet legal, tax, and accounting obligations.",
      ],
    },
    {
      heading: "3. Form submissions",
      paragraphs: [
        "When you submit a form on rdxhive.com, the details are sent to our business email and, when enabled, stored in a secure database used for sales follow-up. Campaign parameters (UTM tags) are stored with the submission so we know which page brought you to us.",
        "Submitting a form does not create a contract. Scope and price are confirmed in a written proposal.",
      ],
    },
    {
      heading: "4. Cookies and analytics",
      paragraphs: [
        "We use cookies and similar technologies to keep the site working and to measure traffic. On your first visit, a banner asks whether you accept analytics cookies. Until you accept, Google analytics cookies are not set (Google Consent Mode). You can change your choice at any time with the \"Cookie settings\" link in the footer.",
      ],
      items: [
        "Google Tag Manager, which may load Google Analytics 4. These tools set cookies to count visits and measure page performance, and only do so after you accept.",
        "Umami, a privacy-focused analytics tool that does not use cookies or collect personal information.",
        "Embedded booking and newsletter tools (Calendly, Beehiiv) may set their own cookies when you use them.",
        "You can block or delete cookies in your browser settings. You can also opt out of Google Analytics with Google's browser add-on. Some features may not work without cookies.",
      ],
    },
    {
      heading: "5. Third-party services",
      paragraphs: [
        "We use trusted providers to run the business. Each one processes data under its own privacy policy and only for the purpose we use it for:",
      ],
      items: [
        "Vercel: website hosting (United States).",
        "Google (Tag Manager, Analytics): site analytics.",
        "Umami: cookieless site analytics.",
        "Resend and Formspree: delivery of form submissions and notification emails.",
        "Supabase: secure database for form submissions and client project records.",
        "Calendly: booking calls.",
        "Beehiiv: newsletter delivery.",
        "WordPress: blog content.",
        "Our payment processor (for example Stripe): card payments, subscriptions, and fraud prevention.",
        "Client systems: when we build integrations for clients (for example HubSpot, Slack, or other CRMs), we access those systems only under the client's instructions and agreement.",
      ],
    },
    {
      heading: "6. Data sharing",
      paragraphs: [
        "We share personal information only with the providers listed above to operate our services, with professional advisers under confidentiality, or when required by law (for example a court order). If the business is reorganised or transferred, information may move to the successor under this same policy.",
      ],
    },
    {
      heading: "7. Data retention",
      items: [
        "Inquiries: until the inquiry is closed, or sooner if you ask us to delete it.",
        "Client and billing records: as long as needed for the engagement and for tax and accounting law.",
        "Newsletter: until you unsubscribe.",
        "Analytics: according to each analytics provider's retention settings.",
      ],
    },
    {
      heading: "8. Security",
      paragraphs: [
        "The site is served over HTTPS. Access to personal data is limited to people who need it to do their job. Payment data is handled by a PCI-DSS compliant processor. No online system is perfectly secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "9. Your rights",
      paragraphs: [
        "Depending on where you live (including the EU/UK under GDPR and California under CCPA/CPRA), you may have the right to access, correct, delete, or export your personal information, and to object to or limit certain processing. We do not sell or share personal information for cross-context behavioral advertising.",
        `To make a request, email ${supportEmail}. We will verify the request and respond within the time required by law.`,
      ],
    },
    {
      heading: "10. International transfers",
      paragraphs: [
        "Our team works remotely across countries, and our providers may store data in the United States or other regions. By using the site, you understand your information may be processed outside your country, with reasonable safeguards in place.",
      ],
    },
    {
      heading: "11. Children",
      paragraphs: [
        "Our website and agency services are for businesses and are not directed to children under 13. We do not knowingly collect personal information from children.",
      ],
    },
    {
      heading: "12. Changes to this policy",
      paragraphs: [
        "We may update this policy. The effective date at the top shows the latest version. If a change is material, we will notify active clients and subscribers by email.",
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  slug: "terms-of-service",
  title: "Terms of Service",
  description: `Terms for using rdxhive.com and buying ${brandName} services and software products.`,
  intro: [
    `These Terms of Service ("Terms") are an agreement between you and ${legalName} ("${brandName}", "we", "us"). They cover your use of rdxhive.com and any services or software products you buy from us.`,
    "By using the site, signing a proposal, or paying an invoice, you agree to these Terms. If a signed proposal or statement of work conflicts with these Terms, the signed document wins for that project.",
  ],
  sections: [
    {
      heading: "1. What we provide",
      paragraphs: [
        `${brandName} provides web development, CRM and workflow automation, and software products. This includes:`,
      ],
      items: [
        "Agency website design and development.",
        "Lead capture, CRM integration, and workflow automation (for example HubSpot, Slack, and Calendly).",
        "AI chat and search features for websites.",
        "Care plans: ongoing maintenance and support after launch.",
        "Software products offered on a one-time or subscription basis.",
      ],
    },
    {
      heading: "2. Scope and delivery",
      items: [
        "Every project starts with a written proposal or statement of work. It lists deliverables, timeline, price, and payment schedule.",
        "Work outside the agreed scope is quoted separately and needs your written approval before it starts.",
        "Timelines are estimates. They depend on you supplying content, feedback, and access on time.",
        "A deliverable counts as accepted when you approve it in writing, or 10 business days after delivery if you have not reported a defect.",
      ],
    },
    {
      heading: "3. Your responsibilities",
      items: [
        "Give accurate information and the content, credentials, and approvals the project needs.",
        "Make sure you have the rights to any text, images, trademarks, or data you give us.",
        "Keep your account credentials secure, and tell us promptly about any unauthorized use.",
        "Do not use our services or products for unlawful, harmful, or infringing activity, or to send spam.",
        "Keep your third-party subscriptions current (hosting, CRM, domains, and similar) unless we have agreed to manage them.",
      ],
    },
    {
      heading: "4. Fees and payment",
      items: [
        "Prices are in US dollars and are set out in the proposal, invoice, or product checkout page.",
        "Unless the proposal says otherwise, fixed-scope projects are billed 50% upfront to start and 50% on delivery.",
        "We accept card payments through our payment processor and international bank transfer.",
        "Invoices are due on the date shown. We may pause work on overdue accounts after written notice.",
        "You are responsible for any taxes that apply to your purchase, other than taxes on our income.",
      ],
    },
    {
      heading: "5. Software products and subscriptions",
      items: [
        "Subscriptions renew automatically at the end of each billing period until you cancel.",
        "You can cancel at any time from your account or by emailing support. You keep access until the end of the period you have paid for.",
        "We may change subscription prices with at least 30 days' notice before your next renewal.",
        "We may suspend accounts that break these Terms or have failed payments.",
      ],
    },
    {
      heading: "6. Refunds and cancellation",
      paragraphs: [
        "Refunds and project cancellations follow our Refund & Cancellation Policy at rdxhive.com/refund-policy, which is part of these Terms.",
      ],
    },
    {
      heading: "7. Intellectual property",
      items: [
        "When a project is paid in full, you own the custom code, designs, and content we created specifically for you.",
        "We keep ownership of our pre-existing tools, libraries, templates, and know-how. You get a perpetual, non-exclusive license to use them as part of your deliverables.",
        "Third-party software, fonts, plugins, and services stay under their own licenses.",
        "Software products are licensed, not sold. You may not resell, copy, or reverse-engineer them.",
        "Unless you ask us not to in writing, we may list your project in our portfolio. We never show confidential information.",
      ],
    },
    {
      heading: "8. Confidentiality",
      paragraphs: [
        "Each side will keep the other's non-public business information confidential and use it only to perform the engagement.",
      ],
    },
    {
      heading: "9. Warranties and disclaimers",
      paragraphs: [
        "We perform services with reasonable skill and care. We will fix defects you report within 30 days of acceptance at no charge, as long as they are not caused by changes made by you or a third party.",
        "Apart from that, our services and products are provided \"as is\". We do not guarantee specific business results such as traffic, leads, or revenue.",
      ],
    },
    {
      heading: "10. Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, or data.",
        "Our total liability for any claim connected to a service or product is capped at the amount you paid us for that specific service or product in the 12 months before the claim.",
        "These limits do not apply where the law does not allow them.",
      ],
    },
    {
      heading: "11. Indemnity",
      paragraphs: [
        "You agree to defend and indemnify us against third-party claims caused by content or materials you provided, or by your misuse of our services or products.",
      ],
    },
    {
      heading: "12. Termination",
      paragraphs: [
        "Either party may end an engagement with written notice if the other party materially breaches these Terms and does not fix the breach within 14 days. You pay for work completed up to the termination date.",
      ],
    },
    {
      heading: "13. Force majeure",
      paragraphs: [
        "Neither party is liable for delays caused by events beyond its reasonable control, such as outages of third-party platforms, natural disasters, or government action.",
      ],
    },
    {
      heading: "14. Governing law and disputes",
      paragraphs: [
        `These Terms are governed by the laws of ${governingLaw}. Before filing any claim, both parties will try in good faith to resolve the dispute by email for at least 30 days.`,
      ],
    },
    {
      heading: "15. Changes",
      paragraphs: [
        "We may update these Terms. The effective date at the top shows the latest version. Changes do not affect signed proposals already in progress.",
      ],
    },
  ],
};

export const refundPolicy: LegalDocument = {
  slug: "refund-policy",
  title: "Refund & Cancellation Policy",
  description: `How ${brandName} handles refunds and cancellations for custom services, digital products, and subscriptions.`,
  intro: [
    "Software development services and digital products are custom work, so refund requests are reviewed case by case. You must send a request within 14 days of scope agreement or delivery, as described below. We aim to be fair and clear before you pay.",
    `To request a refund or cancel, email ${supportEmail} with your name, invoice or order number, and the reason. We reply within 1 business day.`,
  ],
  sections: [
    {
      heading: "1. Custom services (websites, automation, development)",
      items: [
        "Cancellation before work starts: full refund of any deposit.",
        "Cancellation within 14 days of scope agreement (proposal signed or deposit paid): refund of the deposit, minus work already completed and any third-party costs bought for your project.",
        "After delivery: you may request a refund within 14 days of delivery if a deliverable does not match the agreed scope. First, we will try to fix the issue at no extra cost. If we cannot, we will refund the affected part of the fee.",
        "No refunds for work that has been delivered and accepted, or for changes in requirements after scope agreement.",
      ],
    },
    {
      heading: "2. Care plans and retainers",
      items: [
        "Care plans are billed monthly in advance. You can cancel at any time; cancellation takes effect at the end of the current billing month.",
        "Partial months are not refunded. Hours or tasks that have not been used do not carry over after cancellation.",
      ],
    },
    {
      heading: "3. Digital products and software subscriptions",
      items: [
        "One-time digital purchases: you may request a refund within 14 days of purchase if the product does not work as described and we cannot fix it.",
        "Subscriptions: you can cancel at any time and keep access until the end of the paid period. Renewal charges are not refunded, except when you ask within 14 days of a renewal you did not use.",
        "Refunds may be refused if the product was heavily used, downloaded in full, or bought with abuse or fraud.",
      ],
    },
    {
      heading: "4. How refunds are paid",
      items: [
        "Approved refunds go back to the original payment method within 5–10 business days. Your bank or card issuer may take longer to show the credit.",
        "We do not refund payment-processor or bank transfer fees charged by third parties, unless the law requires it.",
      ],
    },
    {
      heading: "5. Disputes and chargebacks",
      paragraphs: [
        "Please contact us before opening a chargeback. Most issues can be solved directly and faster. If a chargeback is opened, we will share the project or order records with the payment processor.",
      ],
    },
    {
      heading: "6. Your legal rights",
      paragraphs: [
        "Nothing in this policy limits the consumer rights you have under the law where you live.",
      ],
    },
  ],
};
