"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface CategoryTabsProps {
  items: { id: number; title: string; category: string; tname: string }[];
  baseLink: string; // e.g., "/news" or "/articles"
  label: string; // e.g., "NEWS" or "ARTICLES"
}

export default function CategoryTabs({ items, baseLink, label }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<{ category: string; tname: string }[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ Extract unique categories — keep their English name for display
    const uniqueCats = Array.from(
      new Map(
        items.map(i => [i.category, { category: i.category, tname: i.tname }])
      ).values()
    );

    setCategories(uniqueCats);

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const totalPages = Math.ceil(scrollWidth / clientWidth);
      const currentPage = Math.round(scrollLeft / clientWidth);
      setActiveIndex(currentPage >= totalPages ? totalPages - 1 : currentPage);
    }
  };

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
            className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Tabs Container */}
          <div
            ref={containerRef}
            className="flex-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide whitespace-nowrap scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={isMobile ? handleScroll : undefined}
          >
            {categories.map(({ category, tname }, index) => (
              <span key={category} className="flex items-center">
                <Link
                  href={`${baseLink}/category/${category.toLowerCase()}`}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
                >
                  {tname}
                </Link>

                {index !== categories.length - 1 && (
                  <span className="text-gray-300 px-1">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
