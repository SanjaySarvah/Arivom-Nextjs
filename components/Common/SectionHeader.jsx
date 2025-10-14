// components/SectionHeader.jsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SectionHeader = ({
  subtitle = "News",
  title = "dvjvdcuig",
  showButton = false,
  buttonText = "View All",
  buttonUrl = "/news",
}) => {
  return (
    <div className="mb-8 text-left">
      <div className="flex items-center gap-4">
        {/* Heading Section */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600 shadow-lg"></div>
          <div className="flex flex-col">
         <span className="text-xs md:text-sm font-semibold text-green-600 uppercase tracking-wider">
  {subtitle}
</span>
<h2 className="text-lg sm:text-2xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
  {title}
</h2>


          </div>
        </div>

        {/* Divider Line */}
        <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-4"></div>

{showButton && (
  <Link
    href={buttonUrl}
    className="relative px-2 py-1 sm:px-5 sm:py-2 text-[10px] sm:text-base font-semibold rounded-md border border-green-500 text-green-600 overflow-hidden transition-all duration-300 group flex items-center gap-1 sm:gap-2"
    aria-label={buttonText}
  >
    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
      {buttonText}
    </span>

    <ArrowRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-300 group-hover:text-white" />

    <span className="absolute inset-0 bg-green-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
  </Link>
)}


      </div>
    </div>
  );
};

export default SectionHeader;
