import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/badge";
import { ExternalLink, Star, Clock, Users, Award } from "lucide-react";
import { staticPages, services, portfolio, reviews } from "@/data/mock-data";
import { Metadata } from "next";
import { ServiceCard } from "@/components/features/services/service-card";
import { PortfolioCard } from "@/components/features/portfolio/portfolio-card";
import { BlogCard } from "@/components/features/blog/BlogCard";
import { ReviewCard } from "@/components/sections/review-card";
import { ClientLogos } from "@/components/sections/client-logos";
import { FeaturedTestimonial } from "@/components/sections/FeaturedTestimonial";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { WorkProcess } from "@/components/sections/WorkProcess";
import { EnhancedCTA } from "@/components/sections/EnhancedCTA";
import { SEO } from "@/components/seo";
import BeehiivSubscribe from "@/components/BeehiivSubscribe";
import { fetchPosts } from "@/lib/wp-api"; // Import from lib
import { WPPost } from "@/types/post"; // Import type from types folder
import he from "he";

export const metadata: Metadata = {
  title: staticPages.home.metaTitle,
  description: staticPages.home.metaDescription,
  openGraph: {
    ...staticPages.home,
    url: "https://development.rajondey.com/",
  },
};

export default async function AboutPage() {
  // Add async here
  const posts: WPPost[] = await fetchPosts(); // Await is now valid

  return (
    <>
      <SEO
        title={staticPages.home.metaTitle}
        description={staticPages.home.metaDescription}
        url="/"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <Image
                src="/profile-pic.png"
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">Rajon Dey</h1>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-primary" />
                  <span className="font-medium">4.9</span>
                  <span className="text-muted-foreground">(150)</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge>Sylhet</Badge>
                  <Badge>Bangladesh</Badge>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">About me</h2>
              <p className="text-muted-foreground">
                👨‍💻 A Software Developer with expertise in React, Next.js,
                Node.js, and Three.js. I specialize in creating scalable,
                efficient, and user-friendly web applications. My passion lies
                in transforming ideas into reality by leveraging modern
                technologies and collaborative problem-solving. I&apos;m also
                experienced in building websites using Headless CMS and
                platforms like WordPress, Shopify, Wix, and Squarespace.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Next.js expert</Badge>
              <Badge>React developer</Badge>
              <Badge>Full stack</Badge>
              <Badge>WordPress</Badge>
              <Badge>UI/UX</Badge>
            </div>
          </div>

          <div className="w-full md:w-72">
            <Card className="p-4">
              <a href="/order">
                <Button className="w-full mb-4">Order Services</Button>
              </a>
              <a
                href="https://calendly.com/rajondey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" className="w-full">
                  Book a consultation
                </Button>
              </a>
              <p className="text-sm text-center text-muted-foreground mt-4">
                Average response time: 1 hour
              </p>
            </Card>
          </div>
        </div>

        {/* Problem/Solution Statement - NEW */}
        <ProblemSolution />

        {/* Social Proof Section */}
        <section className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Trusted by 50+ Clients Worldwide
            </h2>
            <p className="text-muted-foreground">
              Delivering results that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg">4.9/5 Rating</h3>
              <p className="text-sm text-muted-foreground">
                Across all platforms
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg">24-48 Hours</h3>
              <p className="text-sm text-muted-foreground">
                Average delivery time
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">100% Satisfaction</h3>
              <p className="text-sm text-muted-foreground">
                Guaranteed results
              </p>
            </div>
          </div>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-lg text-center">
            <p className="font-semibold">
              🎉 Limited Time: Free Website Audit + Strategy Session
            </p>
            <p className="text-sm opacity-90">
              Book your slot before it&apos;s gone!
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">My Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <Link href="/services">
            <Button variant="secondary">View All</Button>
          </Link>
        </section>

        {/* Work Process Section - NEW */}
        <WorkProcess />

        {/* Portfolio Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
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
          <Link href="/portfolio">
            <Button variant="secondary">View All</Button>
          </Link>
        </section>

        {/* Client Logos Section - MOVED UP */}
        <section className="mb-16 py-8 border-y border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Trusted By</h2>
          <div className="overflow-hidden">
            <div className="py-4">
              <ClientLogos />
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {posts.length > 0 ? (
              posts.slice(0, 2).map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title.rendered}
                  excerpt={
                    he
                      .decode(
                        post.excerpt.rendered
                          .replace(/<[^>]+>/g, "") // Remove HTML tags
                          .replace(/\[\s*\.{3}\s*\]/g, "") // Remove "[…]" or similar "read more" indicators
                      )
                      .trim() // Remove leading/trailing whitespace
                      .slice(0, 100) + // Optional: Limit to 150 characters for consistency
                    (post.excerpt.rendered.replace(/<[^>]+>/g, "").length > 100
                      ? "..."
                      : "") // Add ellipsis if truncated
                  }
                  date={new Date(post.date).toLocaleDateString()}
                  slug={post.slug}
                  image={post.image || "/development-blog-placeholder.png"}
                  isDetailed={true}
                />
              ))
            ) : (
              <p>No blog posts available at the moment.</p>
            )}
          </div>
          <Link href="/blog">
            <Button variant="secondary">View All</Button>
          </Link>
        </section>

        {/* Enhanced Reviews Section */}
        <section className="mb-16">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Client Success Stories</h2>
            <div className="flex gap-2">
              <a
                href="https://www.fiverr.com/rajjohin#Reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline flex items-center gap-1"
              >
                <span>All Reviews</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Featured Testimonial */}
          <div className="mb-8">
            <FeaturedTestimonial testimonial={reviews[0]} />
          </div>

          {/* Stats section showing numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-green-600">50+</p>
              <p className="text-sm text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-green-600">100+</p>
              <p className="text-sm text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-green-600">4.9</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-green-600">95%</p>
              <p className="text-sm text-gray-600">Repeat Clients</p>
            </div>
          </div>

          {/* Individual testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="https://g.page/r/CXGw54VFb9QEEAE/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="flex gap-1 justify-center items-center"
              >
                Leave a Google Review <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* Enhanced CTA - NEW */}
        <EnhancedCTA />

        {/* Newsletter Section */}
        <section className="mb-2">
          <BeehiivSubscribe />
        </section>
      </div>
    </>
  );
}
