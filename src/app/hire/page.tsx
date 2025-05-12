import { Metadata } from "next";
import { SEO } from "@/components/seo";


import HeroSection from "./HeroSection";
import StorySection from "./StorySection";
import AudienceSection from "./AudienceSection";
import FeaturesSection from "./FeatureSection";
import PortfolioSection from "./PortfolioSection";
import TestimonialsSection from "./TestimonialSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import PricingSection from "./PricingSection";


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
        <PortfolioSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

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
