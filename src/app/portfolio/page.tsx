import { portfolio, staticPages } from "@/data/mock-data";
import { SEO } from "@/components/seo";
import PortfolioContent from "@/components/PortfolioContent"; // New client component
import { Metadata } from "next";

export const metadata: Metadata = {
  title: staticPages.portfolio.metaTitle,
  description: staticPages.portfolio.metaDescription,
  openGraph: {
    ...staticPages.portfolio,
    url: "https://development.rajondey.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <SEO
        title={staticPages.portfolio.metaTitle}
        description={staticPages.portfolio.metaDescription}
        url="/portfolio"
      />
      <PortfolioContent portfolio={portfolio} />
    </>
  );
}