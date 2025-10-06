"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface CategoryTabsProps {
  items: { id: number; title: string; category: string }[];
  baseLink: string;  // e.g., "/news" or "/articles"
  label: string;     // e.g., "NEWS" or "ARTICLES"
}

export default function CategoryTabs({ items, baseLink, label }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Extract unique categories and capitalize first letter
    const cats = Array.from(new Set(items.map(i => i.category)))
      .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase());
    setCategories(cats);
    if (cats.length > 0) setActive(cats[0]);
  }, [items]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white py-4 ">
      <div className="flex items-center gap-4 px-4 sm:px-8 overflow-hidden">
        {/* Label */}
        <span className="text-lg font-bold text-gray-700 whitespace-nowrap">
          {label}
        </span>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow transition"
          aria-label="Scroll left"
        >
          &#10094;
        </button>

        {/* Scrollable Tabs */}
        <div
          ref={containerRef}
          className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`${baseLink}/category/${cat.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow transition"
          aria-label="Scroll right"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
