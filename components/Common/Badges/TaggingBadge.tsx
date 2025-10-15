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
  icon , // default tag icon
  className = "",
  bgColor = "#9C27B0", // purple tone for tag look
}) => {
  // Truncate to first 6 characters for mobile
  const shortTag = tag.length > 6 ? tag.slice(0, 6) + "…" : tag;

  return (
<span
  className={`inline-flex items-center gap-1 px-2.5 py-[3px] rounded-full 
  text-[7px] md:text-[10px] font-semibold uppercase tracking-wide text-white 
  ${className}`}
  style={{ backgroundColor: bgColor }}
>

      {icon && <span className="w-3 h-3 flex items-center justify-center">{icon}</span>}

      {/* Mobile: truncated + smaller font | Desktop: full text */}
      <span className="block md:hidden">{shortTag}</span>
      <span className="hidden md:block">{tag}</span>
    </span>
  );
};

export default TaggingBadge;
