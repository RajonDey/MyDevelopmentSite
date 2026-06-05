import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail } from "@/content/rdx/services";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { buildServicePageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/rdx/seo/JsonLd";
import { AgencyWebsiteView } from "@/components/rdx/sections/services/AgencyWebsiteView";

const slug = "agency-website";

export const metadata: Metadata = {
  title: "Agency Website | RDX Technologies",
  description:
    "Agency website tiers from $1,000. Forms connected to HubSpot, Slack, Calendly, or email.",
  openGraph: {
    title: "Agency Website | RDX Technologies",
    url: `${siteMetadata.siteUrl}/services/${slug}`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("service"),
  },
};

export default function AgencyWebsitePage() {
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd id="schema-agency-website" data={buildServicePageSchema(service)} />
      <AgencyWebsiteView service={service} />
    </>
  );
}
