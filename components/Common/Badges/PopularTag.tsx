"use client";

import { FaFire } from "react-icons/fa";
import React from "react";

interface PopularTagProps {
  label: string;
  icon?: React.ReactElement; // must be a React element
  bgColor?: string;
  textColor?: string;
  pulse?: boolean;
}

const PopularTag: React.FC<PopularTagProps> = ({
  label,
  icon = <FaFire className="text-white-500" />,
  bgColor = "#017BFF", // light red/orange bg
  textColor = "#ffffffff", // dark red text
  pulse = true,
}) => {
  const iconWithClass = icon
    ? React.cloneElement(icon, {
        className: `${icon.props?.className || ""} ${
          pulse ? "animate-pulse" : ""
        } text-sm sm:text-base`,
      })
    : null;

  return (
    <span
      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold rounded-full px-2.5 sm:px-3 py-1 sm:py-1 shadow-md backdrop-blur-sm"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {iconWithClass}
      {label}
    </span>
  );
};

export default PopularTag;
