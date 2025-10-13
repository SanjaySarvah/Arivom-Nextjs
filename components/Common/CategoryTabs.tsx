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

const TRUNCATE_BY_CHARS = false; // set true to truncate by characters
const MAX_WORDS = 8;
const MAX_CHARS = 8;

export default function CategoryTabs({ items, baseLink, label }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathnameRaw = usePathname();
  const pathname = (pathnameRaw ?? "").toLowerCase();

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // initial guard for SSR
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 639px)").matches; // <640px same as sm breakpoint
  });
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Extract unique categories preserving order
    const unique = Array.from(
      new Map(items.map((i) => [i.category, { category: i.category, tname: i.tname }]))
        .values()
    );
    setCategories(unique);
  }, [items]);

  useEffect(() => {
    // matchMedia for mobile changes (more robust & immediate)
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 639px)");
    const onMqChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(Boolean(e.matches));
    // older browsers use addListener, newer have addEventListener — handle both:
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onMqChange as EventListener);
    } else {
      // @ts-ignore
      mq.addListener(onMqChange);
    }
    // set initial
    setIsMobile(mq.matches);

    // sticky scroll detection
    const onScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", onMqChange as EventListener);
      } else {
        // @ts-ignore
        mq.removeListener(onMqChange);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  // helpers for truncation
  const truncateByWords = (s: string) => {
    const words = s.trim().split(/\s+/);
    if (words.length <= MAX_WORDS) return s;
    return words.slice(0, MAX_WORDS).join(" ") + "...";
  };

  const truncateByChars = (s: string) => {
    if (s.length <= MAX_CHARS) return s;
    return s.slice(0, MAX_CHARS) + "...";
  };

  const formatDisplayName = (fullName: string) => {
    if (!isMobile) return fullName;
    if (TRUNCATE_BY_CHARS) return truncateByChars(fullName);
    return truncateByWords(fullName);
  };

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isSticky ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-12">
          {/* Label */}
          <span
            className="text-[#017BFF] font-bold text-sm whitespace-nowrap
            px-3 py-1 rounded-lg 
            bg-gradient-to-r from-[#017BFF]/10 to-[#017BFF]/10
            border border-[#017BFF]/20
            hover:from-[#017BFF]/20 hover:to-[#017BFF]/20
            hover:border-[#017BFF]/40
            hover:scale-105 hover:shadow-lg hover:shadow-[#017BFF]/25
            transition-all duration-300 ease-in-out
            cursor-pointer"
          >
            {label}
          </span>

          {/* Left Arrow (hidden on mobile) */}
          {!isMobile && (
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scrollable Category Tabs */}
          <div
            ref={containerRef}
            className="flex-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide whitespace-nowrap scroll-smooth gap-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map(({ category, tname }) => {
              const fullName = (tname || category).trim();
              const displayName = formatDisplayName(fullName);
              const isActive = pathname.includes(category.toLowerCase());
              const showTooltip = displayName !== fullName;

              return (
                <Link
                  key={category}
                  href={`${baseLink}/category/${encodeURIComponent(category.toLowerCase())}`}
                  title={showTooltip ? fullName : undefined}
                  className={`relative px-4 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive ? "text-[#017BFF] border-b-2 border-[#017BFF]" : "text-gray-700 hover:text-[#017BFF]"
                  }`}
                >
                  {displayName}
                </Link>
              );
            })}
          </div>

          {/* Right Arrow (hidden on mobile) */}
          {!isMobile && (
            <button
              onClick={scrollRight}
              className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* optional: small bottom border shadow when sticky */}
      {isSticky && <div className="h-[1px] bg-gray-100 w-full" />}
    </div>
  );
}
