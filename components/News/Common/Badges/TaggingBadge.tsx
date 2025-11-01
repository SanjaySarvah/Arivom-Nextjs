"use client";

import { FC, ReactNode } from "react";
import { FaTag } from "react-icons/fa"; // Default tag icon

interface TaggingBadgeProps {
  tag: string;
  icon?: ReactNode;
  className?: string;
  bgColor?: string;
}

const TaggingBadge: FC<TaggingBadgeProps> = ({
  tag,
  icon,
  className = "",
  bgColor = "#6f42c2", // purple tone for tags (secondary color)
}) => {
  // Truncate for mobile view
  const shortTag = tag.length > 15 ? tag.slice(0, 15) + "…" : tag;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full 
      text-[10px] md:text-xs font-semibold uppercase tracking-wide text-white
      transition-colors ${className}`}
      style={{ backgroundColor: bgColor }}
      title={tag} // Tooltip for accessibility
    >
      {/* Use default tag icon if none provided */}
      <span className="w-3 h-3 flex items-center justify-center">
        {icon || <FaTag className="text-[10px] md:text-xs" />}
      </span>

      {/* Truncate on mobile, full on desktop */}
      <span className="block md:hidden">{shortTag}</span>
      <span className="hidden md:block">{tag}</span>
    </span>
  );
};

export default TaggingBadge;
