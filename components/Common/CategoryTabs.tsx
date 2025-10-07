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
  const [active, setActive] = useState<string>("");
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
    if (uniqueCats.length > 0) setActive(uniqueCats[0].category);

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
    <div className="w-full bg-white px-0 sm:px-8 lg:px-16">
      <div className="flex flex-col items-center gap-3 px-0 sm:px-8 overflow-hidden">
        <div className="flex items-center w-full">
 
          <span className="hidden sm:inline text-lg font-bold text-gray-700 whitespace-nowrap">
            {label}
          </span>

          {!isMobile && (
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 m-2 md:m-5 bg-gray-100 hover:bg-gray-200 rounded-full p-3 shadow-md transition-all hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              &#10094;
            </button>
          )}

          <div
            ref={containerRef}
            className="flex-1 flex overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth bg-gray-100 py-2 sm:py-4"
            onScroll={isMobile ? handleScroll : undefined}
          >
            {categories.map(({ category, tname }, index) => (
              <span key={category} className="flex items-center">
                <Link
                  href={`${baseLink}/category/${category.toLowerCase()}`}
                  className={`px-2 sm:px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active === category
                      ? "text-black px-4 hover:text-blue-600 hover:border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:border-b-2 border-blue-600 "
                  }`}
                  onClick={() => setActive(category)}
                >
                  {tname}
                </Link>

                {index !== categories.length - 1 && (
                  <span className="text-gray-400 px-1">|</span>
                )}
              </span>
            ))}
          </div>

          {!isMobile && (
            <button
              onClick={scrollRight}
              className="flex-shrink-0 m-2 md:m-5 bg-gray-100 hover:bg-gray-200 rounded-full p-3 shadow-md transition-all hidden md:flex items-center justify-center"
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
