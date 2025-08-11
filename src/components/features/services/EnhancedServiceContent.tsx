"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/ui/Button";
import { EnhancedServiceCard } from "@/components/features/services/enhanced-service-card";
import { Badge } from "@/components/common/ui/badge";
import { Card } from "@/components/common/ui/Card";
import {
  ChevronRight,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  MessageCircle,
} from "lucide-react";
import { WorkProcess } from "@/components/sections/WorkProcess";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  platforms: string[];
  technologies: string[];
  image: string;
  iconName?: string;
  isRecommended?: boolean;
  benefits?: string[];
  expectedOutcome?: string;
}

interface EnhancedServiceContentProps {
  services: Service[];
}

export default function EnhancedServiceContent({
  services,
}: EnhancedServiceContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = selectedCategory
    ? services.filter((service) =>
        service.title.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : services;

  // Get a featured testimonial for services page
  const featuredTestimonial = {
    name: "Sarah Johnson",
    rating: 5,
    platform: "Direct Client",
    comment:
      "Rajon's approach to our e-commerce site redesign was exceptional. He didn't just deliver a visually appealing site - he created a complete solution that actually increased our sales by 32% in the first month after launch!",
    avatar:
      "https://randomuser.me/api/portraits/women/8.jpg?height=60&width=60",
    company: "Owner, Boutique Shop",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section with Problem-Solution Framing */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-12 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">
              Professional Web Development Services
            </span>
          </h1>

          <p className="text-gray-700 text-lg mb-8 text-center">
            Stop losing potential clients with outdated, slow-loading websites
            that don&apos;t convert. I create custom digital solutions that turn
            visitors into customers.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <Zap className="text-yellow-500 mr-2 w-6 h-6" />
                <h3 className="font-semibold">Performance-Focused</h3>
              </div>
              <p className="text-sm text-gray-600">
                Fast-loading websites with 90+ PageSpeed scores for better user
                experience and SEO rankings
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <Shield className="text-blue-500 mr-2 w-6 h-6" />
                <h3 className="font-semibold">Conversion-Optimized</h3>
              </div>
              <p className="text-sm text-gray-600">
                Strategic layouts and CTAs designed to guide visitors toward
                becoming paying clients
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <MessageCircle className="text-green-500 mr-2 w-6 h-6" />
                <h3 className="font-semibold">Ongoing Support</h3>
              </div>
              <p className="text-sm text-gray-600">
                Reliable maintenance and updates to keep your digital presence
                running smoothly
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/order">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3">
                Order Services
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" className="px-8 py-3">
                View My Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Category Selection */}
      <section className="mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "primary" : "outline"}
            className={
              selectedCategory === null ? "bg-green-600 hover:bg-green-700" : ""
            }
          >
            All Services
          </Button>
          <Button
            onClick={() => setSelectedCategory("Web")}
            variant={selectedCategory === "Web" ? "primary" : "outline"}
            className={
              selectedCategory === "Web"
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            Web Development
          </Button>
          <Button
            onClick={() => setSelectedCategory("E-Commerce")}
            variant={selectedCategory === "E-Commerce" ? "primary" : "outline"}
            className={
              selectedCategory === "E-Commerce"
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            E-Commerce
          </Button>
          <Button
            onClick={() => setSelectedCategory("WordPress")}
            variant={selectedCategory === "WordPress" ? "primary" : "outline"}
            className={
              selectedCategory === "WordPress"
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            WordPress
          </Button>
          <Button
            onClick={() => setSelectedCategory("Workflow")}
            variant={selectedCategory === "Workflow" ? "primary" : "outline"}
            className={
              selectedCategory === "Workflow"
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            Workflow Automation
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="flex h-full">
              <EnhancedServiceCard {...service} />
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <WorkProcess />

      {/* Testimonial */}
      <section className="mb-16">
        <div className="bg-gray-50 rounded-2xl p-8 relative">
          <svg
            className="absolute text-gray-200 transform -translate-y-6 left-8"
            width="80"
            height="60"
            viewBox="0 0 80 60"
            fill="currentColor"
          >
            <path d="M30.5,16.6c-2.3,1.6-4.2,3.6-5.7,6c-1.5,2.4-2.3,5.2-2.3,8.3c0,1.9,0.4,3.6,1.2,5c0.8,1.4,1.9,2.5,3.3,3.2 c1.4,0.8,3,1.1,4.8,1.1c1.7,0,3.2-0.4,4.7-1.3c1.5-0.8,2.6-2,3.5-3.5c0.8-1.5,1.3-3.2,1.3-5c0-1.7-0.4-3.3-1.2-4.8 c-0.8-1.5-1.9-2.6-3.3-3.4c-1.4-0.8-2.9-1.3-4.6-1.3c0.8-1.4,2-2.5,3.5-3.5c1.5-0.9,3.2-1.6,5.1-2.1l-1.7-3.6 C35.3,14.6,32.7,15.4,30.5,16.6z M63.5,16.6c-2.3,1.6-4.2,3.6-5.7,6c-1.5,2.4-2.3,5.2-2.3,8.3c0,1.9,0.4,3.6,1.2,5 c0.8,1.4,1.9,2.5,3.3,3.2c1.4,0.8,3,1.1,4.8,1.1c1.7,0,3.2-0.4,4.7-1.3c1.5-0.8,2.6-2,3.5-3.5c0.8-1.5,1.3-3.2,1.3-5 c0-1.7-0.4-3.3-1.2-4.8c-0.8-1.5-1.9-2.6-3.3-3.4c-1.4-0.8-2.9-1.3-4.6-1.3c0.8-1.4,2-2.5,3.5-3.5c1.5-0.9,3.2-1.6,5.1-2.1 l-1.7-3.6C68.3,14.6,65.8,15.4,63.5,16.6z"></path>
          </svg>

          <div className="text-center max-w-3xl mx-auto pt-6">
            <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6">
              &ldquo;{featuredTestimonial.comment}&rdquo;
            </p>
            <div className="flex items-center justify-center">
              <Image
                src={featuredTestimonial.avatar}
                alt={featuredTestimonial.name}
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {featuredTestimonial.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {featuredTestimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <Badge className="mb-2 bg-gray-100 border border-gray-200 font-medium">
            Why Choose Me
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            The Right Partner for Your Project
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            When you work with me, you get more than just a developer - you get
            a committed partner focused on your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 h-full">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Quality Focus</h3>
                <p className="text-gray-600 text-sm">
                  Clean, well-structured code that&apos;s easy to maintain and
                  built to last
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 h-full">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Timely Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Projects completed on schedule with clear communication
                  throughout
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 h-full">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Ongoing Support</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive support after launch to ensure continued success
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <div className="text-center mb-8">
          <Badge className="mb-2 bg-gray-100 border border-gray-200 font-medium">
            FAQ
          </Badge>
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">
              How long does a typical project take?
            </h3>
            <p className="text-gray-600">
              Project timelines vary based on complexity. Simple websites take
              1-2 weeks, while custom web applications might require 4-8 weeks.
              I&apos;ll provide a detailed timeline in our project plan.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">
              Do you offer ongoing maintenance?
            </h3>
            <p className="text-gray-600">
              Yes, I offer maintenance packages to keep your site secure,
              updated, and performing optimally. This includes regular updates,
              security monitoring, and performance optimization.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/faq">
            <Button variant="outline" className="flex items-center">
              View All FAQs
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-2xl p-10 mb-12 shadow-lg">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-white mb-8 opacity-90">
            Let&apos;s discuss your project and create a solution that drives
            real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/order">
              <Button className="bg-white hover:bg-gray-100 text-green-700 font-medium px-8 py-3">
                Order Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3"
              >
                Contact Me
              </Button>
            </Link>
          </div>
          <p className="text-sm text-white opacity-80 mt-6">
            Or book a free 30-minute consultation to discuss your requirements
          </p>
          <a
            href="https://calendly.com/rajondey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-white font-medium hover:underline"
          >
            Schedule Now
          </a>
        </div>
      </section>
    </div>
  );
}
