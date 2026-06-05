import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import { RetainerView } from "@/components/rdx/sections/trust/RetainerView";

export const metadata: Metadata = {
  title: pageMeta.retainer.title,
  description: pageMeta.retainer.description,
  openGraph: {
    title: pageMeta.retainer.title,
    description: pageMeta.retainer.description,
    url: `${siteMetadata.siteUrl}/retainer`,
    siteName: siteMetadata.siteName,
  },
};

export default function RetainerPage() {
  return <RetainerView />;
}
