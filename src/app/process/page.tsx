import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import { ProcessView } from "@/components/rdx/sections/trust/ProcessView";

export const metadata: Metadata = {
  title: pageMeta.process.title,
  description: pageMeta.process.description,
  openGraph: {
    title: pageMeta.process.title,
    description: pageMeta.process.description,
    url: `${siteMetadata.siteUrl}/process`,
    siteName: siteMetadata.siteName,
  },
};

export default function ProcessPage() {
  return <ProcessView />;
}
