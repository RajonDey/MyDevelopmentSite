"use client";

import Link from "next/link";
import { useState } from "react";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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
}

interface PortfolioContentProps {
  portfolio: PortfolioItem[];
}

export default function PortfolioContent({ portfolio }: PortfolioContentProps) {
  const [selectedProject, setSelectedProject] = useState<
    (typeof portfolio)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: (typeof portfolio)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore my recent projects showcasing expertise in web development,
          design, and more.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {portfolio.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="cursor-pointer"
          >
            <PortfolioCard {...project} isDetailed={true} />
          </div>
        ))}
      </div>

      {selectedProject && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto p-6 relative custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-96 mb-6">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge>{selectedProject.category}</Badge>
              <span className="text-sm text-gray-500">
                {selectedProject.completionDate}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{selectedProject.description}</p>

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
                <h3 className="text-lg font-semibold mb-2">Check It Out</h3>
                <div className="flex gap-4">
                  {selectedProject.liveLink && (
                    <Link
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">Live Demo</Button>
                    </Link>
                  )}
                  {selectedProject.githubLink && (
                    <Link
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">GitHub Repo</Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                Want a similar project?
              </p>
              <a
                href={`https://wa.me/01737997143?text=Hi%20Rajon,%20I’m%20interested%20in%20a%20project%20like%20${encodeURIComponent(
                  selectedProject.title
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Contact Me
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
