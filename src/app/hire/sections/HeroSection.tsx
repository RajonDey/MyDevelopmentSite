"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-background)] to-[var(--color-primary)]/10 opacity-80" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Limited time offer badge */}
        <div
          className={`flex justify-center mb-8 transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Badge className="py-1.5 px-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
            <Sparkles size={14} className="mr-1" />
            <span>
              Limited Time Offer: Free 30-min website strategy session
            </span>
          </Badge>
        </div>

        {/* Main heading */}
        <h1
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-6 max-w-4xl mx-auto leading-tight opacity-0",
            isLoaded && "animate-fade-in"
          )}
        >
          Lets Build You a Website That <span className="highlight">Works</span>
          —<span className="gradient-text">Beautifully & Strategically</span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg md:text-xl text-muted-foreground text-center mb-10 max-w-2xl mx-auto ${
            isLoaded ? "animate-fade-in-delay-1" : "opacity-0"
          }`}
        >
          I create scalable, SEO-ready, lightning-fast websites tailored to your
          brand, not templates.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 ${
            isLoaded ? "animate-fade-in-delay-2" : "opacity-0"
          }`}
        >
          <a
            href="https://calendly.com/rajondey"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-[var(--color-primary)]/25 transition-all group flex items-center justify-center">
              Book a Free Discovery Call
              <ExternalLink
                size={16}
                className="ml-2 group-hover:translate-x-0.5 transition-transform"
              />
            </Button>
          </a>
          <Link href="#contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-[var(--border)] hover:bg-gray-100 px-8 py-3 rounded-lg shadow-sm transition-all group flex items-center justify-center"
            >
              Let’s Build Your Website
              <ExternalLink
                size={16}
                className="ml-2 group-hover:translate-x-0.5 transition-transform"
              />
            </Button>
          </Link>
        </div>

        {/* Image with browser frame */}
        <div
          className={`relative max-w-4xl mx-auto mt-12 ${
            isLoaded ? "animate-fade-in-delay-3" : "opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-2xl p-3 sm:p-4 border border-[var(--border)] overflow-hidden">
            {/* Browser-like top bar */}
            <div className="flex items-center pb-2 border-b border-[var(--border)] mb-3">
              <div className="flex space-x-1.5 ml-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto bg-gray-100 rounded-full text-xs py-1 px-3 text-gray-500 text-center -ml-8">
                yourwebsite.com
              </div>
            </div>

            <div className="relative rounded-md overflow-hidden">
              <video
                src="/videos/rd-website-preview.mp4"
                width={800}
                height={200}
                className="w-full h-auto object-cover rounded-md transition-transform duration-300 hover:scale-[1.02]"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        {/* Client logos */}
        <div
          className={cn(
            "mt-16 opacity-0",
            isLoaded && "animate-fade-in-delay-3"
          )}
        >
          <p className="text-center text-sm text-muted-foreground mb-6">
            Trusted by innovative brands
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap max-w-3xl mx-auto">
            <div className="h-8 w-auto opacity-70 grayscale hover:grayscale-0 transition-all hover:opacity-100">
              <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-auto opacity-70 grayscale hover:grayscale-0 transition-all hover:opacity-100">
              <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-auto opacity-70 grayscale hover:grayscale-0 transition-all hover:opacity-100">
              <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-auto opacity-70 grayscale hover:grayscale-0 transition-all hover:opacity-100">
              <div className="w-28 h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Testimonial preview */}
        <div
          className={cn(
            "mt-12 max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6 opacity-0",
            isLoaded && "animate-fade-in-delay-3"
          )}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="ml-4">
              <p className="font-medium">John Smith</p>
              <p className="text-sm text-muted-foreground">CEO, TechStartup</p>
            </div>
            <div className="ml-auto flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
          </div>
          <p className="text-sm">
            &quot;Working with this team transformed our online presence. Our
            conversion rate increased by 200% in just two months!&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
