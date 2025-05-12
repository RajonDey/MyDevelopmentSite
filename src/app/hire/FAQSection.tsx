"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("faq");
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

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer:
        "Most projects are completed within 3-4 weeks from start to finish. Simple websites may be faster, while more complex projects with custom functionality could take 6-8 weeks. We'll provide a clear timeline during our initial consultation.",
    },
    {
      question: "What do I need to provide to get started?",
      answer:
        "To get started, I'll need your brand assets (logo, colors, fonts), content (text and images), and any specific design preferences. Don't worry if you don't have everything ready - I can guide you through this process and even help with content creation if needed.",
    },
    {
      question: "Will my website be mobile-friendly?",
      answer:
        "Absolutely! All websites are built with a mobile-first approach, ensuring they look and function perfectly on all devices - from smartphones and tablets to desktop computers.",
    },
    {
      question: "Do you offer website maintenance?",
      answer:
        "Yes, I offer ongoing maintenance packages to keep your website secure, updated, and performing optimally. This includes regular backups, security monitoring, WordPress updates, and technical support when you need it.",
    },
    {
      question: "Can you help optimize my website for search engines (SEO)?",
      answer:
        "Yes! SEO is integrated into the development process. All websites are built with clean code, fast loading times, and proper structure that search engines love. I also implement basic on-page SEO for your key pages.",
    },
    {
      question: "What if I need changes after the website is launched?",
      answer:
        "I offer a 14-day period after launch for small tweaks and adjustments at no additional cost. For ongoing updates or larger changes, we can discuss either a maintenance package or a per-project quote based on your needs.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50" id="faq">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Frequently <span className="highlight">Asked</span> Questions
        </h2>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto text-center">
          Everything you need to know about working together
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transform opacity-0 translate-y-8 transition-all duration-500 ease-out",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={cn(
                    "w-5 h-5 transform transition-transform",
                    activeIndex === index ? "rotate-180" : ""
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={cn(
                  "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                  activeIndex === index ? "max-h-96 pb-6" : "max-h-0"
                )}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-12 text-center transform opacity-0 translate-y-8 transition-all duration-700 ease-out delay-700",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          <p className="text-xl mb-2">Still have questions?</p>
          <a
            href="#contact"
            className="text-primary font-medium hover:underline inline-flex items-center"
          >
            Let&apos;s talk
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
