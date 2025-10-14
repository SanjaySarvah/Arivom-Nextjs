// components/SectionHeader.jsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SectionHeader = ({
  subtitle = "News",
  title = "",
  showButton = false,
  buttonText = "View All",
  buttonUrl = "/news",
  size = "medium", // "small", "medium", "large", "xlarge"
  variant = "default", // "default", "minimal", "gradient", "bordered"
  align = "left", // "left", "center", "right"
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      subtitle: "text-xs",
      title: "text-lg sm:text-xl",
      button: "text-xs px-3 py-1.5",
      icon: "w-3 h-3",
      gap: "gap-2",
      accentHeight: "h-8",
    },
    medium: {
      subtitle: "text-xs md:text-sm",
      title: "text-xl sm:text-2xl md:text-3xl",
      button: "text-sm px-4 py-2",
      icon: "w-3.5 h-3.5",
      gap: "gap-3",
      accentHeight: "h-10",
    },
    large: {
      subtitle: "text-sm md:text-base",
      title: "text-2xl sm:text-3xl md:text-4xl",
      button: "text-base px-5 py-2.5",
      icon: "w-4 h-4",
      gap: "gap-4",
      accentHeight: "h-12",
    },
    xlarge: {
      subtitle: "text-base md:text-lg",
      title: "text-3xl sm:text-4xl md:text-5xl",
      button: "text-lg px-6 py-3",
      icon: "w-5 h-5",
      gap: "gap-5",
      accentHeight: "h-14",
    },
  };

  // Variant configurations
  const variantConfig = {
    default: {
      accent: "bg-gradient-to-b from-green-500 to-green-600 shadow-lg",
      subtitle: "text-green-600",
      title: "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent",
      divider: "bg-gradient-to-r from-green-500 to-transparent",
      button: "border-green-500 text-green-600 hover:bg-green-500 hover:text-white",
    },
    minimal: {
      accent: "bg-gray-400",
      subtitle: "text-gray-600",
      title: "text-gray-800",
      divider: "bg-gray-300",
      button: "border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white",
    },
    gradient: {
      accent: "bg-gradient-to-b from-blue-500 to-purple-600 shadow-lg",
      subtitle: "text-blue-600",
      title: "bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent",
      divider: "bg-gradient-to-r from-blue-500 to-purple-500",
      button: "border-blue-500 text-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white",
    },
    bordered: {
      accent: "bg-gradient-to-b from-amber-500 to-amber-600 shadow-md",
      subtitle: "text-amber-700",
      title: "text-gray-800 border-b-2 border-amber-500 pb-1",
      divider: "bg-gradient-to-r from-amber-500 to-transparent",
      button: "border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white",
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;
  const currentVariant = variantConfig[variant] || variantConfig.default;

  // Alignment classes
  const alignmentClasses = {
    left: "text-left",
    center: "text-center flex-col",
    right: "text-right flex-row-reverse",
  };

  return (
    <div className={`mb-8 ${alignmentClasses[align]}`}>
      <div className={`flex items-center ${currentSize.gap} ${alignmentClasses[align] === "flex-col" ? "flex-col" : ""}`}>
        {/* Heading Section */}
        <div className={`flex items-center ${currentSize.gap} ${alignmentClasses[align] === "flex-col" ? "flex-col text-center" : ""}`}>
          <div className={`w-2 ${currentSize.accentHeight} rounded-full ${currentVariant.accent}`}></div>
          <div className={`flex flex-col ${alignmentClasses[align] === "flex-col" ? "items-center" : ""}`}>
            <span className={`${currentSize.subtitle} font-semibold ${currentVariant.subtitle} uppercase tracking-wider`}>
              {subtitle}
            </span>
            <h2 className={`${currentSize.title} font-bold ${currentVariant.title}`}>
              {title}
            </h2>
          </div>
        </div>

        {/* Divider Line - Only show for left/right alignments */}
        {align !== "center" && (
          <div className={`flex-1 h-px ${currentVariant.divider} ${align === "right" ? "mr-4" : "ml-4"}`}></div>
        )}

        {/* Button */}
        {showButton && (
          <Link
            href={buttonUrl}
            className={`relative ${currentSize.button} font-semibold rounded-md border ${currentVariant.button} overflow-hidden transition-all duration-300 group flex items-center gap-2`}
            aria-label={buttonText}
          >
            <span className="relative z-10 transition-colors duration-300">
              {buttonText}
            </span>
            <ArrowRight className={`relative z-10 ${currentSize.icon} transition-colors duration-300`} />
            <span className="absolute inset-0 bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
          </Link>
        )}
      </div>
      
      {/* Center alignment divider */}
      {align === "center" && (
        <div className={`w-24 h-1 mx-auto mt-4 rounded-full ${currentVariant.divider}`}></div>
      )}
    </div>
  );
};

export default SectionHeader;