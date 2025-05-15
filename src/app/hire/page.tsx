import { Metadata } from "next";
import { SEO } from "@/components/seo";
import Link from "next/link";


import HeroSection from "./sections/HeroSection";
import StorySection from "./sections/StorySection";
import AudienceSection from "./sections/AudienceSection";
import FeaturesSection from "./sections/FeatureSection";
import TestimonialsSection from "./sections/TestimonialSection";
import FAQSection from "./sections/FAQSection";
import ContactSection from "./sections/ContactSection";
import PricingSection from "./sections/PricingSection";
import FiverrProjects from "./sections/FiverrProjects";

import { portfolio } from "@/data/mock-data";
import { PortfolioCard } from "@/components/sections/portfolio-card";


export const metadata: Metadata = {
  title: "Hire Rajon Dey - Web Developer for Coaches, Creators & Startups",
  description:
    "Hire a freelance web developer to build SEO-friendly, fast, and modern websites for small businesses, coaches, and startups. Book a free discovery call today!",
  keywords: [
    "web developer for coaches",
    "web developer for creators",
    "web developer for startups",
    "hire freelance web developer Bangladesh",
    "SEO-friendly website design service",
    "modern fast website for small business",
  ],
  openGraph: {
    title: "Hire Rajon Dey - Web Developer for Coaches, Creators & Startups",
    description:
      "Hire a freelance web developer to build SEO-friendly, fast, and modern websites for small businesses, coaches, and startups. Book a free discovery call today!",
    url: "https://development.rajondey.com/hire",
    type: "website",
    images: [
      {
        url: "/og-image-hire.jpg",
        width: 1200,
        height: 630,
        alt: "Hire Rajon Dey - Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Rajon Dey - Web Developer for Coaches, Creators & Startups",
    description:
      "Hire a freelance web developer to build SEO-friendly, fast, and modern websites. Book a free discovery call!",
    images: ["/og-image-hire.jpg"],
  },
};

export default function HirePage() {
  return (
    <>
      <SEO
        title="Hire Rajon Dey - Web Developer for Coaches, Creators & Startups"
        description="Hire a freelance web developer to build SEO-friendly, fast, and modern websites for small businesses, coaches, and startups. Book a free discovery call today!"
        url="/hire"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Your Story Section */}
        <StorySection />

        {/* Who This Is For Section */}
        <AudienceSection />

        {/* What You Get Section */}
        <FeaturesSection />

        {/* Portfolio Section */}
        <section className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="highlight">Results-Driven</span> Portfolio
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
            Don&apos;t just take my word for it. See how these websites
            transformed businesses like yours.
            <Link href="/portfolio">
              <span className="highlight">View All</span>
            </Link>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {portfolio.slice(0, 2).map((item) => (
              <PortfolioCard
                key={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Fiverr Projects Section */}
        <FiverrProjects />

        {/* FAQ Section */}
        <FAQSection />

        {/* Packages Section (Optional) */}
        <PricingSection />

        {/* Final CTA Section */}
        <ContactSection />
      </div>
    </>
  );
}
