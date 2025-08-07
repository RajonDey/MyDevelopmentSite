import React from "react";

// These are custom styled logos that look like brand logos but are just placeholders
export function ClientLogos() {
  return (
    <div className="py-8">
      <h3 className="text-center text-lg font-medium text-gray-600 mb-6">
        Trusted by innovative businesses
      </h3>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {/* TechCorp */}
        <div className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-2 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <div className="font-bold text-blue-600 text-xl">
              TECH<span className="font-normal text-gray-800">CORP</span>
            </div>
            <div className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">
              Innovations
            </div>
          </div>
        </div>

        {/* DesignStudio */}
        <div className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-2 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <div className="font-light text-gray-800 tracking-wider">
              <span className="text-xl">design</span>
              <span className="text-lg font-bold">STUDIO</span>
            </div>
            <div className="h-px w-16 mx-auto bg-gray-300 my-1"></div>
            <div className="text-[8px] text-gray-400">CREATIVE SOLUTIONS</div>
          </div>
        </div>

        {/* GlobalBrand */}
        <div className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-2 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <div className="text-xl font-bold">
              <span className="text-green-600">GLOBAL</span>
              <span className="text-gray-700">BRAND</span>
            </div>
            <div className="text-[8px] text-gray-400">EST. 2010</div>
          </div>
        </div>

        {/* StartupX */}
        <div className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-2 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-purple-600 mr-1 flex items-center justify-center text-white font-bold text-xs">
              X
            </div>
            <div className="font-bold text-gray-800 text-lg">StartupX</div>
          </div>
        </div>

        {/* InnovateLab */}
        <div className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-2 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <div className="font-mono text-gray-800">
              <span className="text-red-500 font-bold">&lt;</span>
              <span className="font-semibold">innovate</span>
              <span className="font-bold text-red-500">/&gt;</span>
            </div>
            <div className="text-[8px] text-gray-500 uppercase tracking-widest">
              LAB
            </div>
          </div>
        </div>

        {/* CoachPro */}
        <div className="w-32 h-20 bg-white rounded-md flex items-center justify-center p-2 filter grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
          <div className="text-center">
            <div className="font-bold text-xl">
              <span className="text-orange-500">COACH</span>
              <span className="text-gray-800">PRO</span>
            </div>
            <div className="text-[8px] text-gray-400">GROWTH SOLUTIONS</div>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400 mt-6 italic">
        *Placeholder logos - will be replaced with real client logos
      </p>
    </div>
  );
}
