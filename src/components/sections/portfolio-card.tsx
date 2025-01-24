// components/sections/portfolio-card.tsx
import Link from "next/link";
import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
}

export function PortfolioCard({
  title,
  description,
  image,
}: PortfolioCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <Link
          href="#"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          View Project
        </Link>
      </div>
    </div>
  );
}
