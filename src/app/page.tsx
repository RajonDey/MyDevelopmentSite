import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { homeContent } from "@/content/rdx/home";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { Hero } from "@/components/rdx/sections/Hero";
import { ServicesTeaser } from "@/components/rdx/sections/ServicesTeaser";
import { WorkTeaser } from "@/components/rdx/sections/WorkTeaser";
import { ProcessSnap } from "@/components/rdx/sections/ProcessSnap";
import { AuditCta } from "@/components/rdx/sections/AuditCta";
import {
  LogoIntegrationRow,
  PullQuote,
  StickyCtaBar,
} from "@/components/rdx/sections";

export const metadata: Metadata = {
  title: pageMeta.home.title,
  description: pageMeta.home.description,
  openGraph: {
    title: pageMeta.home.title,
    description: pageMeta.home.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    ...buildOgMeta("default"),
  },
};

export default function HomePage() {
  const { quote } = homeContent;

  return (
    <>
      <Hero />
      <ServicesTeaser />
      <LogoIntegrationRow />
      <WorkTeaser />
      <RdxHomeQuote quote={quote} />
      <ProcessSnap />
      <AuditCta />
      <StickyCtaBar />
    </>
  );
}

function RdxHomeQuote({
  quote,
}: {
  quote: (typeof homeContent)["quote"];
}) {
  return (
    <section className="py-[var(--rdx-space-section-tight)]">
      <PullQuote
        quote={quote.quote}
        attribution={quote.attribution}
        marginalia={quote.marginalia}
      />
    </section>
  );
}
