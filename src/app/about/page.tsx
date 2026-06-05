import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import { AboutView } from "@/components/rdx/sections/trust/AboutView";

export const metadata: Metadata = {
  title: pageMeta.about.title,
  description: pageMeta.about.description,
  openGraph: {
    title: pageMeta.about.title,
    description: pageMeta.about.description,
    url: `${siteMetadata.siteUrl}/about`,
    siteName: siteMetadata.siteName,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
