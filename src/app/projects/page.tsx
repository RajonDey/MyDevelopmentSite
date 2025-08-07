import { Metadata } from "next";
import { SEO } from "@/components/seo";
import Link from "next/link";

import HeroSection from "../hire/sections/HeroSection";
import StorySection from "../hire/sections/StorySection";
import AudienceSection from "../hire/sections/AudienceSection";
import FeaturesSection from "../hire/sections/FeatureSection";
import TestimonialsSection from "../hire/sections/TestimonialSection";
import FAQSection from "../hire/sections/FAQSection";
import ContactSection from "../hire/sections/ContactSection";
import PricingSection from "../hire/sections/PricingSection";
import FiverrProjects from "../hire/sections/FiverrProjects";

import { portfolio } from "@/data/mock-data";
import { PortfolioCard } from "@/components/features/portfolio/portfolio-card";

export const metadata: Metadata = {
  title: "Development Projects by Rajon Dey - For Coaches, Creators & Startups",
  description:
    "Explore professional web development projects designed specifically for coaches, creators, and startups. Fast, modern websites with focus on performance and conversions.",
  keywords: [
    "web development projects",
    "professional websites for coaches",
    "startup website development",
    "creator platform development",
    "SEO-friendly website projects",
    "modern web development portfolio",
  ],
  openGraph: {
    title:
      "Development Projects by Rajon Dey - For Coaches, Creators & Startups",
    description:
      "Explore professional web development projects designed specifically for coaches, creators, and startups. Fast, modern websites with focus on performance and conversions.",
    url: "https://development.rajondey.com/projects",
    type: "website",
    images: [
      {
        url: "/og-image-hire.jpg",
        width: 1200,
        height: 630,
        alt: "Web Development Projects - Rajon Dey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Development Projects by Rajon Dey - For Coaches, Creators & Startups",
    description:
      "Explore professional web development projects designed specifically for coaches, creators, and startups.",
    images: ["/og-image-hire.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Development Projects by Rajon Dey - For Coaches, Creators & Startups"
        description="Explore professional web development projects designed specifically for coaches, creators, and startups. Fast, modern websites with focus on performance and conversions."
        url="/projects"
      />
      <div className="min-h-screen">
        {/* Hero Section - Modified with Projects Focus */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Web Development <span className="text-green-600">Projects</span>
              <br />
              For Modern Businesses
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mb-8">
              Custom web development projects designed specifically for coaches,
              creators, startups, and small businesses focused on performance
              and conversions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/order">
                <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 text-lg shadow-lg">
                  Start Your Project
                </button>
              </Link>
              <a
                href="https://calendly.com/rajondey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors duration-300 text-lg">
                  Book Free Consultation
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Project Types Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Project Types & Solutions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-3">
                  Coach & Creator Websites
                </h3>
                <p className="text-gray-700 mb-4">
                  Personal branding websites with lead generation, course
                  platforms, and membership capabilities.
                </p>
                <Link href="/order?project=coach">
                  <span className="text-green-600 font-medium hover:text-green-700">
                    Learn More →
                  </span>
                </Link>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-3">
                  E-Commerce Solutions
                </h3>
                <p className="text-gray-700 mb-4">
                  Custom shopping experiences with Shopify, WooCommerce or
                  custom Next.js stores for physical or digital products.
                </p>
                <Link href="/order?project=ecommerce">
                  <span className="text-green-600 font-medium hover:text-green-700">
                    Learn More →
                  </span>
                </Link>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-3">
                  SaaS & Web Applications
                </h3>
                <p className="text-gray-700 mb-4">
                  Custom web applications with user authentication, dashboards,
                  and complex functionality for businesses.
                </p>
                <Link href="/order?project=webapp">
                  <span className="text-green-600 font-medium hover:text-green-700">
                    Learn More →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              A selection of my recent work for clients across different
              industries
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.slice(0, 6).map((project) => (
                <div key={project.id} className="cursor-pointer">
                  <PortfolioCard {...project} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/portfolio">
                <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors duration-300">
                  View All Projects
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <ContactSection />
      </div>
    </>
  );
}
