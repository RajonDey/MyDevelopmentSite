import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { staticPages, services, portfolio, reviews } from "@/data/mock-data";
import { Metadata } from "next";
import { ServiceCard } from "@/components/sections/service-card";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { BlogCard } from "@/components/sections/blog-card";
import { ReviewCard } from "@/components/sections/review-card";
import { SEO } from "@/components/seo";
import BeehiivSubscribe from "@/components/BeehiivSubscribe";
import { fetchPosts } from "@/lib/wp-api"; // Import from lib
import { WPPost } from "@/types/post"; // Import type from types folder

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
                src="/placeholder.svg?height=100&width=100"
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
                  <Badge>Bangladesh</Badge>
                  <Badge>English</Badge>
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
                technologies and collaborative problem-solving. I’m also
                experienced in building websites using Headless CMS and
                platforms like WordPress, Shopify, Wix, and Squarespace.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Next.js expert</Badge>
              <Badge>React developer</Badge>
              <Badge>Full stack development</Badge>
              <Badge>UI/UX</Badge>
            </div>
          </div>

          <div className="w-full md:w-72">
            <Card className="p-4">
              <a
                href={`https://wa.me/01737997143?text=Hi%20there,%20I%20am%20interested%20in%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full mb-4">Contact me</Button>
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

        {/* Portfolio Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {portfolio.map((item) => (
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

        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {posts.slice(0, 2).map((post) => (
              <BlogCard
                key={post.id}
                title={post.title.rendered}
                excerpt={post.excerpt.rendered.replace(/<[^>]+>/g, "")}
                date={new Date(post.date).toLocaleDateString()}
                slug={post.slug}
                image={post.image || "/placeholder.svg"} 
              />
            ))}
          </div>
          <Link href="/blog">
            <Button variant="secondary">View All</Button>
          </Link>
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-16">
          <BeehiivSubscribe />
        </section>
      </div>
    </>
  );
}