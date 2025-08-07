"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/common/ui/Button";

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("portfolio");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const portfolioItems = [
    {
      title: "E-Commerce Fashion Store",
      description:
        "A high-converting online store with 5x faster page loads and a 32% increase in mobile sales.",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      category: "e-commerce",
      stats: [
        { label: "Conversion Rate", value: "+210%" },
        { label: "Mobile Traffic", value: "+45%" },
        { label: "Page Load", value: "0.9s" },
      ],
    },
    {
      title: "Professional Services Site",
      description:
        "Lawyer firm website with appointment booking that doubled their qualified leads.",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      category: "service",
      stats: [
        { label: "Leads", value: "+118%" },
        { label: "Organic Traffic", value: "+88%" },
        { label: "Bounce Rate", value: "-34%" },
      ],
    },
    {
      title: "SaaS Dashboard",
      description:
        "Intuitive user interface that increased customer retention by 28% month-over-month.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      category: "saas",
      stats: [
        { label: "User Retention", value: "+28%" },
        { label: "Session Time", value: "+3.5m" },
        { label: "Support Tickets", value: "-64%" },
      ],
    },
  ];

  const filteredItems =
    activeTab === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeTab);

  return (
    <section className="py-24 px-4 bg-gray-50" id="portfolio">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="highlight">Results-Driven</span> Portfolio
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
          Don&apos;t just take my word for it. See how these websites
          transformed businesses like yours.
        </p>

        <div className="flex justify-center mb-10">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "all"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab("all")}
            >
              All Projects
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "e-commerce"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab("e-commerce")}
            >
              E-Commerce
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "service"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab("service")}
            >
              Services
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "saas"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab("saas")}
            >
              SaaS
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transform transition-all duration-700 ease-out opacity-0 translate-y-8",
                isVisible &&
                  `opacity-100 translate-y-0 transition-delay-${
                    (index + 1) * 100
                  }`
              )}
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {item.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 p-2 rounded-md text-center"
                    >
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="font-bold text-primary">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View Case Study
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
