import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function ProblemSolution() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 mb-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Transforming <span className="text-green-600">Ideas</span> into
          <span className="text-blue-600"> Digital Success</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem Statement */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Struggling with...
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✖</span>
                <span>
                  Websites that don&apos;t convert visitors into customers
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✖</span>
                <span>Poor performance and slow loading speeds</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✖</span>
                <span>
                  Outdated design that doesn&apos;t represent your brand
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✖</span>
                <span>Low search engine visibility and traffic</span>
              </li>
            </ul>
          </div>

          {/* Solution Statement */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              I deliver...
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check
                  className="text-green-500 mr-2 mt-0.5 shrink-0"
                  size={18}
                />
                <span>
                  Conversion-focused websites that turn visitors into customers
                </span>
              </li>
              <li className="flex items-start">
                <Check
                  className="text-green-500 mr-2 mt-0.5 shrink-0"
                  size={18}
                />
                <span>Lightning-fast performance with modern tech stack</span>
              </li>
              <li className="flex items-start">
                <Check
                  className="text-green-500 mr-2 mt-0.5 shrink-0"
                  size={18}
                />
                <span>
                  Stunning, on-brand design that engages your audience
                </span>
              </li>
              <li className="flex items-start">
                <Check
                  className="text-green-500 mr-2 mt-0.5 shrink-0"
                  size={18}
                />
                <span>SEO-optimized code for better search visibility</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
          >
            See how I can help you <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
