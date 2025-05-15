"use client";

import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

const FiverrProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-0 md:px-0">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Video on left */}
            <div className="rounded-xl overflow-hidden shadow-xl relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover cursor-pointer"
                src="/videos/rd-portfolios-video.mp4"
                onClick={openModal}
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            {/* Text on right */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fiverr Portfolio Highlights
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Ive worked with clients globally to build full-stack web apps,
                responsive frontends, and performance-optimized solutions. Heres
                a glimpse of my Fiverr portfolio in action.
              </p>

              <a
                href="https://www.fiverr.com/users/rajjohin/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
              >
                View Portfolio There <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for enlarged video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl p-4 max-w-4xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-lg"
              src="/videos/rd-portfolios-video.mp4"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FiverrProjects;
