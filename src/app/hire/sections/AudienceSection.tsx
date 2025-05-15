"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AudienceSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("audience");
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

  const audiences = [
    {
      title: "Entrepreneurs",
      description: "Launching new businesses",
      icon: (
        <svg
          className="w-10 h-10 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
    },
    {
      title: "Coaches & Creators",
      description: "Needing a digital home",
      icon: (
        <svg
          className="w-10 h-10 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      ),
    },
    {
      title: "Startups",
      description: "Needing fast, flexible solutions",
      icon: (
        <svg
          className="w-10 h-10 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 17.5V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12.5"></path>
          <ellipse cx="12" cy="14.5" rx="10" ry="3"></ellipse>
          <path d="M12 14.5V17"></path>
          <path d="M10 9a2 2 0 1 1 4 0c0 1.5-2 2-2 2"></path>
          <path d="M12 13.5V14"></path>
        </svg>
      ),
    },
    {
      title: "Frustrated Owners",
      description: "With slow or outdated websites",
      icon: (
        <svg
          className="w-10 h-10 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          <path d="m14.5 9-5 5"></path>
          <path d="m9.5 9 5 5"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50" id="audience">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Who <span className="highlight">This Is For</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto text-center">
          Custom websites designed for specific business needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={cn(
                "bg-white p-8 rounded-xl shadow-md border border-gray-200 transform transition-all duration-700 ease-out flex flex-col items-center text-center opacity-0 translate-y-8",
                isVisible &&
                  "opacity-100 translate-y-0 transition-delay-" + index * 200
              )}
              style={{
                transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              <div className="mb-6 bg-primary/10 p-4 rounded-full">
                {audience.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{audience.title}</h3>
              <p className="text-gray-600">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
