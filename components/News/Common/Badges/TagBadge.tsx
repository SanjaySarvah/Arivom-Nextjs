"use client";

import { FaExclamationCircle } from "react-icons/fa";
import React from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { FiZap } from "react-icons/fi";

interface BreakingNewsTagProps {
  label?: string;
  icon?: React.ReactElement;
  bgColor?: string;
  textColor?: string;
  pulse?: boolean;
}

const BreakingNewsTag: React.FC<BreakingNewsTagProps> = ({
  label = "Breaking",
  icon = < FiZap/>,
  bgColor = "#017BFF", // bright red for breaking news
  textColor = "#FFFFFF",
  pulse = true,
}) => {
  const iconWithClass = React.cloneElement(icon, {
    className: `${icon.props?.className || ""} ${
      pulse ? "animate-pulse" : ""
    } text-sm sm:text-base text-white`,
  });

  return (
    <div
      className="group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer transition-all duration-300 hover:w-[110px] sm:hover:w-[170px] shadow-lg overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Icon - moves to left on hover */}
      <span className="flex items-center justify-center transition-all duration-300 group-hover:absolute group-hover:left-2">
        {iconWithClass}
      </span>

      {/* Label - appears on right side on hover */}
      <span
        className="absolute opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-xs sm:text-sm font-bold uppercase transition-all duration-300 whitespace-nowrap left-8 sm:left-10"
        style={{ color: textColor }}
      >
        {label}
      </span>
    </div>
  );
};

export default BreakingNewsTag;
