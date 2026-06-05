import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail } from "@/content/rdx/services";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { buildServicePageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/rdx/seo/JsonLd";
import { LeadAutomationView } from "@/components/rdx/sections/services/LeadAutomationView";

const slug = "lead-automation";

export const metadata: Metadata = {
  title: "Lead & CRM Automation | RDX Technologies",
  description:
    "Lead and CRM automation tiers from $1,000. Connect forms, CRM, Slack, and follow-ups.",
  openGraph: {
    title: "Lead & CRM Automation | RDX Technologies",
    url: `${siteMetadata.siteUrl}/services/${slug}`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("service"),
  },
};

export default function LeadAutomationPage() {
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd id="schema-lead-automation" data={buildServicePageSchema(service)} />
      <LeadAutomationView service={service} />
    </>
  );
}
