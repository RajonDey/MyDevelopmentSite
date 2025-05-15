"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function StorySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="story">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-50/30 to-transparent opacity-60" />
      <div className="absolute right-0 top-1/3 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute left-0 top-2/3 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-5xl relative">
        {/* Problem Statement */}
        <div
          className={cn(
            "mb-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out",
            isVisible && "opacity-100 transform-none"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            The <span className="highlight">Problem</span> with Most Websites
            Today
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <p className="text-lg text-gray-700 mb-4">
              You&apos;ve likely experienced it yourself: websites that look
              pretty but fail to deliver results. They might have flashy
              animations and trendy designs, but they:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-red-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Load slowly, causing visitors to bounce before they even see
                  your content
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-red-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Get buried in search results because they&apos;re not
                  optimized for SEO
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-red-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Look broken on mobile devices, where most of your customers
                  are browsing
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-red-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Fail to convert visitors into customers because they&apos;re
                  not strategically designed
                </span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 mt-4">
              The result? You invest thousands in a website that looks nice but
              doesn&apos;t actually grow your business.
            </p>
          </div>
        </div>

        {/* Solution Statement */}
        <div
          className={cn(
            "opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-300",
            isVisible && "opacity-100 transform-none"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            The <span className="highlight">Solution</span> Your Business
            Deserves
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <p className="text-lg text-gray-700 mb-4">
              What if your website could be both beautiful <em>and</em>{" "}
              effective? A website that:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Loads lightning-fast, keeping visitors engaged from the first
                  second
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Ranks higher in search results, bringing your ideal customers
                  to you
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Looks perfect on every device, from phones to desktops
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Actually converts visitors into leads and customers with
                  strategic design
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1 mr-3 mt-1">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Grows with your business without needing a complete redesign
                  every year
                </span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 mt-4">
              That&apos;s exactly the kind of website I build for
              forward-thinking businesses like yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
