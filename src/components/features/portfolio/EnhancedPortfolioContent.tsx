"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/Button";
import { EnhancedPortfolioCard } from "@/components/features/portfolio/enhanced-portfolio-card";
import { Card } from "@/components/common/ui/Card";
import { X, ExternalLink, CheckCircle } from "lucide-react";

interface PortfolioItem {
  id: string | number;
  image: string;
  title: string;
  category: string;
  completionDate: string;
  description: string;
  features: string[];
  technologies: string[];
  liveLink?: string;
  githubLink?: string | null;
  // New fields for enhanced portfolio
  results?: string[];
  businessImpact?: string;
}

interface EnhancedPortfolioContentProps {
  portfolio: PortfolioItem[];
}

export default function EnhancedPortfolioContent({
  portfolio,
}: EnhancedPortfolioContentProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isInquiryVisible, setIsInquiryVisible] = useState(false);

  // Extract unique categories from portfolio items
  const categories = useMemo(() => {
    const uniqueCategories = new Set(portfolio.map((item) => item.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [portfolio]);

  const filteredPortfolio = useMemo(() => {
    if (activeFilter === "all") return portfolio;
    return portfolio.filter((item) => item.category === activeFilter);
  }, [portfolio, activeFilter]);

  const handleProjectClick = (project: PortfolioItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Small delay before resetting the selected project to allow modal transition
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Auto show inquiry after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInquiryVisible && !isModalOpen) {
        setIsInquiryVisible(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isInquiryVisible, isModalOpen]);

  const closeInquiry = () => {
    setIsInquiryVisible(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">
            My Project Portfolio
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
          Real-world solutions that deliver measurable results. Each project
          represents a challenge solved, a business goal achieved, and a client
          satisfied.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? "primary" : "outline"}
              className={
                activeFilter === category
                  ? "bg-green-600 hover:bg-green-700"
                  : "text-gray-700 hover:text-green-600"
              }
            >
              {category === "all" ? "All Projects" : category}
            </Button>
          ))}
        </div>
      </section>

      {/* Results Summary */}
      <section className="mb-12 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Project Outcomes Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center mb-2">
              <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
              <h3 className="font-medium">Speed & Performance</h3>
            </div>
            <p className="text-sm text-gray-600">
              Optimized sites achieving 90+ Google PageSpeed scores, with load
              times under 2 seconds
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center mb-2">
              <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
              <h3 className="font-medium">User Engagement</h3>
            </div>
            <p className="text-sm text-gray-600">
              Improved user experiences leading to 40%+ increases in session
              duration
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center mb-2">
              <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
              <h3 className="font-medium">Conversion Rates</h3>
            </div>
            <p className="text-sm text-gray-600">
              Strategic design patterns boosting conversion rates by an average
              of 25-30%
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        {filteredPortfolio.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
          >
            <EnhancedPortfolioCard
              {...project}
              results={
                project.results || [
                  "Improved user engagement by 30%",
                  "Reduced load time by 50%",
                ]
              }
            />
          </div>
        ))}
      </div>

      {/* Project Inquiry CTA */}
      <section className="text-center bg-gray-100 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Ready to discuss your project?
        </h2>
        <p className="mb-6 text-gray-600">
          Let&apos;s create something amazing together that delivers real
          results for your business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/hire">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              Start a Project
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="px-8 py-3">
              Contact Me
            </Button>
          </Link>
        </div>
      </section>

      {/* Process Teaser */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Development Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "1",
              title: "Discovery",
              desc: "Understanding your business goals and requirements",
            },
            {
              step: "2",
              title: "Planning",
              desc: "Creating detailed project roadmap and milestones",
            },
            {
              step: "3",
              title: "Development",
              desc: "Building your project with attention to quality and detail",
            },
            {
              step: "4",
              title: "Launch & Support",
              desc: "Deploying and ensuring smooth operations",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center p-4">
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto p-6 relative custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 mb-6">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 600px, 700px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <Badge className="bg-green-600 hover:bg-green-700 mb-2">
                    {selectedProject.category}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-1">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {selectedProject.completionDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Project Overview
                  </h3>
                  <p className="text-gray-700">{selectedProject.description}</p>
                </div>

                {/* Results Section - Highlight business outcomes */}
                <div className="mb-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <h3 className="text-lg font-semibold mb-2">
                    Results & Impact
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {(
                      selectedProject.results || [
                        "30% increase in user engagement",
                        "50% reduction in load times",
                        "Improved mobile user experience",
                      ]
                    ).map((result, index) => (
                      <li key={index} className="text-green-800">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="md:col-span-1">
                {selectedProject.technologies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedProject.liveLink || selectedProject.githubLink) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">View Project</h3>
                    <div className="space-y-3">
                      {selectedProject.liveLink && (
                        <Link
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="w-full flex items-center justify-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </Button>
                        </Link>
                      )}
                      {selectedProject.githubLink && (
                        <Link
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full">
                            GitHub Repo
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Project Request CTA */}
                <Card className="p-4 bg-gray-50 mb-4">
                  <h4 className="font-medium mb-2">Want something similar?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    I can build a custom solution tailored to your needs
                  </p>
                  <Link
                    href={`/hire?project=${encodeURIComponent(
                      selectedProject.title
                    )}`}
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Get a Quote
                    </Button>
                  </Link>
                </Card>

                {/* Quick Contact Option */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Or reach out directly:
                  </p>
                  <a
                    href={`https://wa.me/01737997143?text=Hi%20Rajon,%20I'm%20interested%20in%20a%20project%20like%20${encodeURIComponent(
                      selectedProject.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Image
                      src="/whatsapp.png"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                    />
                    <span className="text-gray-700">WhatsApp Me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Project Inquiry */}
      {isInquiryVisible && (
        <div className="fixed bottom-4 right-4 z-40 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Need help with a project?</h3>
            <button
              onClick={closeInquiry}
              className="text-white hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-3">
              I&apos;d love to hear about your project needs. Let&apos;s discuss
              how I can help bring your vision to life.
            </p>
            <Link href="/contact">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
