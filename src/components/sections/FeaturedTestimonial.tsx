import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  company?: string;
}

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
}

export function FeaturedTestimonial({ testimonial }: FeaturedTestimonialProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/3">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={120}
            height={120}
            className="rounded-full mx-auto"
          />
        </div>
        <div className="md:w-2/3">
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
              <p className="text-sm text-gray-600">{testimonial.company}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
