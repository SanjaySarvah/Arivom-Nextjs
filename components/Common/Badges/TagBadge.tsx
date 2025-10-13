"use client";

import { FiZap } from "react-icons/fi";
import React from "react";

interface TagBadgeProps {
  label: string;
  icon?: React.ReactElement; // must be a React element (not just any node)
  bgColor?: string;
  textColor?: string;
  pulse?: boolean;
}

const TagBadge: React.FC<TagBadgeProps> = ({
  label,
  icon = <FiZap className="text-yellow-300" />,
  bgColor = "var(--primary)",
  textColor = "white",
  pulse = true,
}) => {
  // Safely clone icon with optional pulse class
  const iconWithClass = icon
    ? React.cloneElement(icon, {
        className: `${icon.props?.className || ""} ${
          pulse ? "animate-pulse" : ""
        } text-sm sm:text-base`,
      })
    : null;

  return (
    <span
      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg backdrop-blur-sm"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {iconWithClass}
      {label}
    </span>
  );
};

export default TagBadge;
