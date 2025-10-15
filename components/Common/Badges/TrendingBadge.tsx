"use client";

import { FaChartLine } from "react-icons/fa";
import { FiTrendingUp, FiChevronRight } from "react-icons/fi";
import React from "react";

interface TrendingTagProps {
  label?: string;
  icon?: React.ReactElement;
  bgColor?: string;
  textColor?: string;
  pulse?: boolean;
}

const TrendingTag: React.FC<TrendingTagProps> = ({
  label = "Trending",
  icon = <FiTrendingUp />,
  bgColor = "#6f42c2",
  textColor = "#FFFFFF",
  pulse = true,
}) => {
  const iconWithClass = React.cloneElement(icon, {
    className: `${icon.props?.className || ""} ${
      pulse ? "animate-pulse" : ""
    } text-sm sm:text-base`,
  });

  return (
    <div
      className="group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer transition-all duration-300 hover:w-[90px] sm:hover:w-[110px] shadow-md overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Icon - moves to left on hover */}
      <span className="flex items-center justify-center transition-all duration-300 group-hover:absolute group-hover:left-2">
        {iconWithClass}
      </span>

      {/* Label - appears on right side on hover */}
      <span
        className="absolute opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap left-8 sm:left-9"
        style={{ color: textColor }}
      >
        {label}
      </span>
    </div>
  );
};

export default TrendingTag;