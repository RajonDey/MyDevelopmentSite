"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("testimonials");
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote:
        "Working with this team transformed our online presence. Our conversion rate increased by 200% in just two months!",
      author: "Sarah Johnson",
      position: "CEO, Fashion Retailer",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      quote:
        "The SEO optimization was amazing. We went from page 5 to the top of page 1 for our main keywords in just 6 weeks.",
      author: "Michael Chen",
      position: "Marketing Director, SaaS Company",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      quote:
        "Finally, a website that doesn't just look good but actually generates leads! Our inquiry rate has tripled since launch.",
      author: "Jessica Miller",
      position: "Founder, Professional Services",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
    },
  ];

  return (
    <section className="py-24 px-4" id="testimonials">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Trusted by <span className="highlight">Successful</span> Businesses
        </h2>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto text-center">
          Don&apos;t just take my word for it. Here&apos;s what clients are
          saying about their results.
        </p>

        <div
          className={cn(
            "relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 ease-out opacity-0 transform translate-y-8",
            isVisible && "opacity-100 transform-none"
          )}
          style={{ minHeight: "300px" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "transition-all duration-700 absolute inset-0 flex flex-col md:flex-row items-center p-8 md:p-12",
                activeTestimonial === index
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
              )}
            >
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                      width={128}
                      height={128}
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-10">
                <svg
                  className="w-10 h-10 text-primary/20 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-2.209 0-4 1.791-4 4v10h10V12h-6c0-1.105 0.895-2 2-2v-2zM22 8c-2.209 0-4 1.791-4 4v10h10V12h-6c0-1.105 0.895-2 2-2v-2z"></path>
                </svg>
                <blockquote className="text-xl md:text-2xl font-medium mb-6">
                  {testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center mt-8 z-20">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full mx-1 transition-all",
                  activeTestimonial === index
                    ? "bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}
