"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const pathname = usePathname();

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

  // Check scroll position to show/hide arrows
  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    const container = containerRef.current;
    container?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  // Check if a category is active
  const isActive = (category: string) => {
    return pathname === `${baseLink}/category/${category.toLowerCase()}`;
  };

  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 shadow-sm overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative flex items-center gap-3 sm:gap-4 py-4 min-w-0">
          {/* Label */}
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md whitespace-nowrap">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {label}
            </span>
          </div>

          {/* Left Arrow */}
          {showLeftArrow && !isMobile && (
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white text-[#2ecc71] rounded-lg hover:bg-gradient-to-r hover:from-[#2ecc71] hover:to-[#27ae60] hover:text-white border-2 border-[#2ecc71] hover:shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-5 h-5 font-bold" />
            </button>
          )}

          {/* Scrollable Tabs Container */}
          <div className="flex-1 relative min-w-0">
            {/* Gradient Overlays for smooth edge */}
            {showLeftArrow && !isMobile && (
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-emerald-50 to-transparent z-10 pointer-events-none"></div>
            )}
            {showRightArrow && !isMobile && (
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-emerald-50 to-transparent z-10 pointer-events-none"></div>
            )}

            {/* Scrollable Tabs */}
            <div
              ref={containerRef}
              className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth gap-2 sm:gap-3 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* All Categories Link */}
              <Link
                href={baseLink}
                className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap border-2 ${
                  pathname === baseLink
                    ? "bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white border-[#2ecc71] shadow-md transform scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#2ecc71] hover:text-[#2ecc71] hover:bg-emerald-50 hover:shadow-sm"
                }`}
              >
                All
              </Link>

              {categories.map(({ category, tname }) => {
                const active = isActive(category);
                return (
                  <Link
                    key={category}
                    href={`${baseLink}/category/${category.toLowerCase()}`}
                    className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap border-2 ${
                      active
                        ? "bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white border-[#2ecc71] shadow-md transform scale-105"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#2ecc71] hover:text-[#2ecc71] hover:bg-emerald-50 hover:shadow-sm"
                    }`}
                  >
                    {tname || category}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          {showRightArrow && !isMobile && (
            <button
              onClick={scrollRight}
              className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white text-[#2ecc71] rounded-lg hover:bg-gradient-to-r hover:from-[#2ecc71] hover:to-[#27ae60] hover:text-white border-2 border-[#2ecc71] hover:shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-5 h-5 font-bold" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile scroll indicator */}
      {isMobile && (
        <div className="flex justify-center pb-3">
          <div className="flex gap-2">
            <div className={`h-1.5 w-16 rounded-full transition-all duration-300 ${showLeftArrow ? 'bg-[#2ecc71] shadow-sm' : 'bg-emerald-200'}`}></div>
            <div className={`h-1.5 w-16 rounded-full transition-all duration-300 ${showRightArrow ? 'bg-[#2ecc71] shadow-sm' : 'bg-emerald-200'}`}></div>
          </div>
        </div>
      )}
    </div>
  );
}
