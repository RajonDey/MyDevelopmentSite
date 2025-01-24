// app/portfolio/[id]/page.tsx
import { notFound } from "next/navigation";
import { portfolio } from "@/data/mock-data";
import Image from "next/image";

interface PortfolioDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PortfolioDetailsPage({
  params,
}: PortfolioDetailsPageProps) {
  // Find the portfolio project by ID in the mock data
  const project = portfolio.find((p) => p.id === parseInt(params.id));

  if (!project) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="relative h-96 mb-8">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-600 mb-8">{project.description}</p>
      <div className="prose">
        <h2>Project Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
          purus at sapien tincidunt tincidunt. Integer nec nisi vitae nisl
          tincidunt tincidunt.
        </p>
        <h2>Technologies Used</h2>
        <ul>
          <li>Next.js</li>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>TypeScript</li>
        </ul>
      </div>
    </div>
  );
}
