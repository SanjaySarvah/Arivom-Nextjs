"use client";

import { FC, ReactNode } from "react";

interface CategoryBadgeProps {
  category: string;
  icon?: ReactNode;
  className?: string;
  bgColor?: string;
}

const CategoryBadge: FC<CategoryBadgeProps> = ({
  category,
  icon,
  className = "",
  bgColor = "var(--tertiary)",
}) => {
  // Truncate to first 6 characters for mobile view
  const shortCategory =
    category.length > 15 ? category.slice(0, 6) + "…" : category;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full 
      text-[10px] md:text-xs font-semibold uppercase tracking-wide text-white 
      ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}

      {/* Mobile: truncated + smaller font | Desktop: full text */}
      <span className="block md:hidden">{shortCategory}</span>
      <span className="hidden md:block">{category}</span>
    </span>
  );
};

export default CategoryBadge;
