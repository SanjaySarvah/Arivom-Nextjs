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
   <div className="w-full bg-white px-0 sm:px-8 lg:px-16 ">

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

        <div
  ref={containerRef}
  className="flex-1 flex overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth bg-gray-100 p-2 sm:p-4"
  onScroll={isMobile ? handleScroll : undefined}
>
  {categories.map((cat, index) => (
    <span key={cat} className="flex items-center">
  <Link
  href={`${baseLink}/category/${cat.toLowerCase()}`}
  className={`px-4 sm:px-2 py-2 text-sm font-medium transition-all duration-300 ${
    active === cat
      ? "text-black border-b-2 border-blue-600" // Active tab style
      : "text-gray-600 hover:text-blue-600 hover:border-b-2 border-transparent" // Inactive tab style
  }`}
  onClick={() => setActive(cat)}
>
  {cat}
</Link>

      {/* Add separator except after last item */}
      {index !== categories.length - 1 && (
        <span className="text-gray-400 px-1">|</span>
      )}
    </span>
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

     
      </div>
    </div>
  );
}
