"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface CategoryTabsProps {
  items: { id: number; title: string; category: string }[];
  baseLink: string; // e.g., "/news" or "/articles"
  label: string; // e.g., "NEWS" or "ARTICLES"
}

export default function CategoryTabs({ items, baseLink, label }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Extract unique categories and capitalize
    const cats = Array.from(new Set(items.map((i) => i.category)))
      .map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase());
    setCategories(cats);
    if (cats.length > 0) setActive(cats[0]);

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  // Track scroll position for mobile dots
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const totalPages = Math.ceil(scrollWidth / clientWidth);
      const currentPage = Math.round(scrollLeft / clientWidth);
      setActiveIndex(currentPage >= totalPages ? totalPages - 1 : currentPage);
    }
  };

  return (
    <div className="w-full bg-white ">
      {/* Main Wrapper - remove extra padding on mobile */}
      <div className="flex flex-col items-center gap-3 px-0 sm:px-8 overflow-hidden">
        {/* Top Row */}
        <div className="flex items-center gap-4 w-full">
          {/* Label — hidden on mobile */}
          <span className="hidden sm:inline text-lg font-bold text-gray-700 whitespace-nowrap">
            {label}
          </span>

          {/* Left Arrow (hidden on mobile) */}
          {!isMobile && (
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow transition"
              aria-label="Scroll left"
            >
              &#10094;
            </button>
          )}

          {/* Category Container */}
          <div
            ref={containerRef}
            className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth bg-gray-100 rounded-lg p-2 sm:p-4"
            onScroll={isMobile ? handleScroll : undefined}
          >
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`${baseLink}/category/${cat.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  active === cat
                    ? "text-black border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:border-b-2 border-transparent"
                }`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Right Arrow (hidden on mobile) */}
          {!isMobile && (
            <button
              onClick={scrollRight}
              className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow transition"
              aria-label="Scroll right"
            >
              &#10095;
            </button>
          )}
        </div>

        {/* Dots for Mobile */}
        {isMobile && (
          <div className="flex justify-center items-center gap-2 mt-1">
            {Array.from({
              length: Math.ceil(
                (containerRef.current?.scrollWidth || 1) /
                  (containerRef.current?.clientWidth || 1)
              ),
            }).map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeIndex ? "bg-blue-600 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
