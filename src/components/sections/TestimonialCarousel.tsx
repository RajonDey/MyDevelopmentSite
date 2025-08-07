"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  company?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-6">
      <div
        className="transition-all duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex flex-col md:flex-row gap-6 items-center"
              style={{ minWidth: "100%" }}
            >
              <div className="md:w-1/4 flex justify-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="md:w-3/4">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg italic mb-4">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  {testimonial.company && (
                    <p className="text-sm text-gray-600">
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-green-600 w-6" : "bg-gray-300"
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
