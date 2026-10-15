import type { Metadata } from "next";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { refundPolicy } from "@/content/rdx/legal";
import { LegalPage } from "@/components/rdx/legal/LegalPage";

const title = `${refundPolicy.title} | ${siteMetadata.siteName}`;

export const metadata: Metadata = {
  title,
  description: refundPolicy.description,
  alternates: { canonical: `${siteMetadata.siteUrl}/refund-policy` },
  openGraph: {
    title,
    description: refundPolicy.description,
    url: `${siteMetadata.siteUrl}/refund-policy`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("default"),
  },
};

export default function RefundPolicyPage() {
  return <LegalPage doc={refundPolicy} />;
}
