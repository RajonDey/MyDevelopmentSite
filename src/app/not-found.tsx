import Link from "next/link";
import { Metadata } from "next";
import { siteMetadata } from "@/content/rdx/metadata";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";

export const metadata: Metadata = {
  title: `Page not found | ${siteMetadata.siteName}`,
  description: "This page does not exist. Browse services, work, or start a project review.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <RdxSection className="pt-4 md:pt-12 pb-20">
      <RdxContainer className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-rdx-subtle">
          404
        </p>
        <h1 className="mt-3 font-rdx-display text-[length:var(--rdx-text-3xl)] font-normal tracking-tight text-rdx-ink md:text-[length:var(--rdx-text-4xl)]">
          This page is not here
        </h1>
        <p className="mt-4 text-base leading-relaxed text-rdx-muted">
          The link may be outdated or the page moved. Start from home, explore
          our work, or request a free review.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RdxButton href="/">Back to home</RdxButton>
          <RdxButton href="/start" variant="secondary">
            Free review
          </RdxButton>
        </div>
        <p className="mt-8 text-sm text-rdx-subtle">
          <Link href="/services" className="text-rdx-accent hover:text-rdx-accent-hover">
            Services
          </Link>
          {" · "}
          <Link href="/work" className="text-rdx-accent hover:text-rdx-accent-hover">
            Work
          </Link>
          {" · "}
          <Link href="/faq" className="text-rdx-accent hover:text-rdx-accent-hover">
            FAQ
          </Link>
        </p>
      </RdxContainer>
    </RdxSection>
  );
}
