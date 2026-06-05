import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { buildFaqSchema } from "@/lib/seo/schema";
import { servicesOverviewContent } from "@/content/rdx/services-pages";
import { JsonLd } from "@/components/rdx/seo/JsonLd";
import { ServicesOverviewView } from "@/components/rdx/sections/services/ServicesOverviewView";

export const metadata: Metadata = {
  title: pageMeta.services.title,
  description: pageMeta.services.description,
  openGraph: {
    title: pageMeta.services.title,
    description: pageMeta.services.description,
    url: `${siteMetadata.siteUrl}/services`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("service"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        id="schema-services-faq"
        data={buildFaqSchema(servicesOverviewContent.faq)}
      />
      <ServicesOverviewView />
    </>
  );
}
