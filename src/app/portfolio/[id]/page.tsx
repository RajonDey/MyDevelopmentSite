// app/portfolio/[id]/page.tsx
import { notFound } from "next/navigation";
import { portfolio } from "@/data/mock-data";
import Image from "next/image";

// Define the params interface
interface PortfolioParams {
  id: string;
}

// Update the page component to handle Promise params
export default async function PortfolioDetailsPage({
  params,
}: {
  params: Promise<PortfolioParams>;
}) {
  // Await the params since they're a Promise in Next.js 15
  const resolvedParams = await params;

  // Find the portfolio project by ID in the mock data
  const project = portfolio.find((p) => p.id === parseInt(resolvedParams.id));

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

// Optional: Add static params generation if you want static builds
export async function generateStaticParams(): Promise<PortfolioParams[]> {
  return portfolio.map((project) => ({
    id: project.id.toString(), // Convert to string since params expects strings
  }));
}
