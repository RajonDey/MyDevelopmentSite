import Link from "next/link";
import { Metadata } from "next";
import { pageMeta } from "@/content/rdx/pages";
import { salesOpsContent } from "@/content/rdx/sales-ops";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";
import { CalendlyBooking } from "@/components/rdx/sections/CalendlyBooking";

export const metadata: Metadata = {
  title: pageMeta.thankYou.title,
  description: pageMeta.thankYou.description,
  robots: { index: false, follow: false },
};

type ThankYouPageProps = {
  searchParams: Promise<{ type?: string; qualified?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const isQualified = params.qualified === "1";
  const content = isQualified
    ? salesOpsContent.thankYou.qualified
    : salesOpsContent.thankYou.standard;

  return (
    <RdxSection className="pt-4 md:pt-8 pb-16">
      <RdxContainer className={isQualified ? "max-w-2xl" : "max-w-lg"}>
        <div className="text-center">
          <h1 className="font-rdx-display text-[length:var(--rdx-text-3xl)] font-normal tracking-tight text-rdx-ink">
            {content.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-rdx-muted">
            {content.body}
          </p>
          <p className="mt-3 text-sm text-rdx-subtle">
            Reply SLA: {salesOpsContent.replySla}
          </p>
        </div>

        {isQualified && (
          <RdxCard className="mt-10 bg-rdx-surface">
            <p className="mb-6 text-center text-sm font-medium text-rdx-muted">
              {salesOpsContent.thankYou.qualified.calendlyIntro}
            </p>
            <CalendlyBooking />
          </RdxCard>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RdxButton href="/">Back to home</RdxButton>
          <Link
            href="/services"
            className="text-sm font-medium text-rdx-muted transition-colors hover:text-rdx-accent"
          >
            View services
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-rdx-subtle">
          Questions? Email{" "}
          <a
            href="mailto:contact@rajondey.com"
            className="text-rdx-accent hover:text-rdx-accent-hover"
          >
            contact@rajondey.com
          </a>
        </p>
      </RdxContainer>
    </RdxSection>
  );
}
