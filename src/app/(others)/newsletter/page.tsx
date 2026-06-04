import { Metadata } from "next";
import { newsletterContent } from "@/content/rdx/newsletter";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import BeehiivSubscribe from "@/components/BeehiivSubscribe";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";

export const metadata: Metadata = {
  title: pageMeta.newsletter.title,
  description: pageMeta.newsletter.description,
  openGraph: {
    title: pageMeta.newsletter.title,
    description: pageMeta.newsletter.description,
    url: `${siteMetadata.siteUrl}/newsletter`,
    siteName: siteMetadata.siteName,
  },
};

export default function NewsletterPage() {
  return (
    <RdxSection className="pt-4 md:pt-8">
      <RdxContainer className="max-w-2xl">
        <div className="mb-8 space-y-3 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-rdx-ink md:text-4xl">
            {newsletterContent.headline}
          </h1>
          <p className="text-base leading-relaxed text-rdx-muted">
            {newsletterContent.subhead}
          </p>
        </div>
        <BeehiivSubscribe />
      </RdxContainer>
    </RdxSection>
  );
}
