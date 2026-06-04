import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudy,
} from "@/content/rdx/case-studies";
import { siteMetadata } from "@/content/rdx/metadata";
import { buildOgMeta } from "@/content/rdx/og";
import { CaseStudyDetail } from "@/components/rdx/sections/CaseStudyDetail";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case study not found" };
  }

  return {
    title: `${study.title} | RDX Technologies`,
    description: study.summary,
    openGraph: {
      title: `${study.title} | RDX Technologies`,
      description: study.summary,
      url: `${siteMetadata.siteUrl}/work/${study.slug}`,
      siteName: siteMetadata.siteName,
      ...buildOgMeta("work"),
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetail study={study} />;
}
