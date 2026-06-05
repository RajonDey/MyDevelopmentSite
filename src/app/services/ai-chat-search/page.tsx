import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail } from "@/content/rdx/services";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { buildServicePageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/rdx/seo/JsonLd";
import { AiChatSearchView } from "@/components/rdx/sections/services/AiChatSearchView";

const slug = "ai-chat-search";

export const metadata: Metadata = {
  title: "AI Chat & Search | RDX Technologies",
  description:
    "AI chat, site search, and custom tools from $3,000 — scoped fixed projects for marketing agencies.",
  openGraph: {
    title: "AI Chat & Search | RDX Technologies",
    url: `${siteMetadata.siteUrl}/services/${slug}`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("service"),
  },
};

export default function AiChatSearchPage() {
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd id="schema-ai-chat-search" data={buildServicePageSchema(service)} />
      <AiChatSearchView service={service} />
    </>
  );
}
