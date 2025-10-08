"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface CategoryItem {
  category: string;
  tname?: string; // optional (for translated or English name)
}

interface CategoryTabsProps {
  items: { id: number; title: string; category: string; tname?: string }[];
  baseLink: string; // e.g., "/news" or "/articles"
  label: string;    // e.g., "NEWS" or "ARTICLES"
}

export default function CategoryTabs({ items, baseLink, label }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Extract unique categories
    const uniqueCats = Array.from(
      new Map(
        items.map((i) => [i.category, { category: i.category, tname: i.tname }])
      ).values()
    );
    setCategories(uniqueCats);

    // Responsive flag
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 h-12">
          {/* Label */}
          <span className="text-red-600 font-bold text-sm whitespace-nowrap">
            {label}
          </span>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors hidden sm:flex"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Scrollable Tabs */}
          <div
            ref={containerRef}
            className="flex-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide whitespace-nowrap scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map(({ category, tname }) => (
              <Link
                key={category}
                href={`${baseLink}/category/${category.toLowerCase()}`}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 whitespace-nowrap"
              >
                {tname || category} {/* ✅ fallback to category if tname missing */}
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors hidden sm:flex"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
