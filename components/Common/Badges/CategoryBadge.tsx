// components/Common/CategoryBadge.tsx
"use client";

import { FC, ReactNode } from "react";

interface CategoryBadgeProps {
  category: string;
  icon?: ReactNode; // optional icon component
  className?: string;
  bgColor?: string; // optional background color
}

const CategoryBadge: FC<CategoryBadgeProps> = ({ category, icon, className = "", bgColor = "var(--tertiary)" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      {category}
    </span>
  );
};

export default CategoryBadge;
