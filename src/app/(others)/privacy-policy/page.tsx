import type { Metadata } from "next";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { privacyPolicy } from "@/content/rdx/legal";
import { LegalPage } from "@/components/rdx/legal/LegalPage";

const title = `${privacyPolicy.title} | ${siteMetadata.siteName}`;

export const metadata: Metadata = {
  title,
  description: privacyPolicy.description,
  alternates: { canonical: `${siteMetadata.siteUrl}/privacy-policy` },
  openGraph: {
    title,
    description: privacyPolicy.description,
    url: `${siteMetadata.siteUrl}/privacy-policy`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("default"),
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
