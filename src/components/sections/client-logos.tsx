"use client";

import React from "react";
import Image from "next/image";

export function ClientLogos() {
  const clients = [
    {
      name: "BSAK",
      logo: "/client-logos/bsak-logo.png",
      alt: "BSAK Logo",
    },
    {
      name: "Debtify",
      logo: "/client-logos/debtify-logo.png",
      alt: "Debtify Logo",
    },
    {
      name: "Favor Investment",
      logo: "/client-logos/favor-investment-logo.png",
      alt: "Favor Investment Logo",
    },
    {
      name: "HypoHosting",
      logo: "/client-logos/hypohosting-logo.svg",
      alt: "HypoHosting Logo",
    },
    {
      name: "iVon",
      logo: "/client-logos/iVon-logo.webp",
      alt: "iVon Logo",
    },
    {
      name: "Mercy Pharmacy",
      logo: "/client-logos/mercy-pharmacy-logo.png",
      alt: "Mercy Pharmacy Logo",
    },
    {
      name: "US Bankruptcy Court",
      logo: "/client-logos/us-bankruptcy-court-logo.png",
      alt: "US Bankruptcy Court Logo",
    },
  ];

  return (
    <div className="py-8">
      <h3 className="text-center text-lg font-medium text-gray-600 mb-6">
        Trusted by innovative businesses
      </h3>

      <div className="overflow-hidden relative">
        <div className="flex animate-scroll gap-8">
          {/* First set of logos */}
          {clients.map((client, index) => (
            <div
              key={index}
              className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-4 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300 flex-shrink-0"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={120}
                height={60}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`duplicate-${index}`}
              className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-4 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300 flex-shrink-0"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={120}
                height={60}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
