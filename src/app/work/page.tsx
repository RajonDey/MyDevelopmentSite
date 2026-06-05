import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { WorkIndexView } from "@/components/rdx/sections/trust/WorkIndexView";

export const metadata: Metadata = {
  title: pageMeta.work.title,
  description: pageMeta.work.description,
  openGraph: {
    title: pageMeta.work.title,
    description: pageMeta.work.description,
    url: `${siteMetadata.siteUrl}/work`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("work"),
  },
};

export default function WorkPage() {
  return <WorkIndexView />;
}
