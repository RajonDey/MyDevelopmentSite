// app/portfolio/page.tsx
"use client"; // Add this directive since we're using client-side state

import { useState } from "react";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { portfolio } from "@/data/mock-data";
import { Modal } from "@/components/ui/Modal";
import Image from "next/image";

export default function PortfolioPage() {
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
      <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((project, index) => (
          <div
            key={index}
            onClick={() => handleProjectClick(project)}
            className="cursor-pointer"
          >
            <PortfolioCard {...project} />
          </div>
        ))}
      </div>

      {/* Modal for Portfolio Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProject && (
          <div>
            <div className="relative h-96 mb-8">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>
            <p className="text-gray-600 mb-8">{selectedProject.description}</p>
            <div className="prose">
              <h2>Project Details</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vel purus at sapien tincidunt tincidunt. Integer nec nisi vitae
                nisl tincidunt tincidunt.
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
        )}
      </Modal>
    </div>
  );
}
