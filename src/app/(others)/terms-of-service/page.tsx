import type { Metadata } from "next";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { termsOfService } from "@/content/rdx/legal";
import { LegalPage } from "@/components/rdx/legal/LegalPage";

const title = `${termsOfService.title} | ${siteMetadata.siteName}`;

export const metadata: Metadata = {
  title,
  description: termsOfService.description,
  alternates: { canonical: `${siteMetadata.siteUrl}/terms-of-service` },
  openGraph: {
    title,
    description: termsOfService.description,
    url: `${siteMetadata.siteUrl}/terms-of-service`,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("default"),
  },
};

export default function TermsOfServicePage() {
  return <LegalPage doc={termsOfService} />;
}
