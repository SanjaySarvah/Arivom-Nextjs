"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryItem {
  category: string;
  tname?: string; // optional Tamil name
}

interface CategoryTabsProps {
  items: { id: number; title: string; category: string; tname?: string }[];
  baseLink: string; // e.g., "/news" or "/articles"
  label: string; // e.g., "NEWS" or "ARTICLES"
}

export default function CategoryTabs({ items, baseLink, label }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Extract unique categories
    const uniqueCats = Array.from(
      new Map(
        items.map((i) => [i.category, { category: i.category, tname: i.tname }])
      ).values()
    );
    setCategories(uniqueCats);

    // Responsive state
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Detect scroll for sticky class
    const handleScroll = () => {
      if (window.scrollY > 80) setIsSticky(true);
      else setIsSticky(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  return (
    <div
      className={`w-full transition-all duration-300 ${isSticky
          ? "bg-white/95 backdrop-blur-md"
          : "bg-gray-50"
        }`}
    >
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center gap-3 h-12">
          {/* Label */}
          <span className="text-green-500 font-bold text-sm whitespace-nowrap
                px-3 py-1 rounded-lg 
                bg-gradient-to-r from-green-500/10 to-emerald-500/10
                border border-green-500/20
                hover:from-green-500/20 hover:to-emerald-500/20
                hover:border-green-500/40
                hover:scale-105 hover:shadow-lg hover:shadow-green-500/25
                transition-all duration-300 ease-in-out
                cursor-pointer">
            {label}
          </span>

          {/* Left Arrow */}
          {!isMobile && (
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
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
          )}

          {/* Scrollable Category Tabs */}
          <div
            ref={containerRef}
            className="flex-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide whitespace-nowrap scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map(({ category, tname }) => {
              const isActive = pathname.toLowerCase().includes(category.toLowerCase());
              return (
                <Link
                  key={category}
                  href={`${baseLink}/category/${category.toLowerCase()}`}
                  className={`relative px-4 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                      ? "text-[#2ecc71] border-b-2 border-[#2ecc71]"
                      : "text-gray-700 hover:text-[#2ecc71]"
                    }`}
                >
                  {tname || category}
                </Link>
              );
            })}
          </div>

          {/* Right Arrow */}
          {!isMobile && (
            <button
              onClick={scrollRight}
              className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
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
          )}
        </div>
      </div>
    </div>
  );
}
