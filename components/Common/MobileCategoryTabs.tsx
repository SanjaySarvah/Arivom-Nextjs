"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, TrendingUp, Bell, Gift, DollarSign, Users } from "lucide-react";

interface CategoryItem {
  category: string;
  tname?: string; // optional Tamil name
}

interface MobileCategoryTabsProps {
  items: { id: number; title: string; category: string; tname?: string }[];
  baseLink: string; // e.g., "/news" or "/articles"
  label: string; // e.g., "NEWS" or "ARTICLES"
}

export default function MobileCategoryTabs({ items, baseLink, label }: MobileCategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    // Extract unique categories
    const uniqueCats = Array.from(
      new Map(
        items.map((i) => [i.category, { category: i.category, tname: i.tname }])
      ).values()
    );
    setCategories(uniqueCats);

    // Detect scroll for sticky class
    const handleScroll = () => {
      if (window.scrollY > 80) setIsSticky(true);
      else setIsSticky(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [categories]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Special feature tabs with icons
  const specialTabs = [
    { label: "Trending", href: "/trending", icon: TrendingUp, gradient: "from-orange-500 to-red-500", hoverColor: "hover:text-orange-500" },
    { label: "Updates", href: "/updates", icon: Bell, gradient: "from-blue-500 to-cyan-500", hoverColor: "hover:text-blue-500" },
    { label: "Offers & Deals", href: "/offers", icon: Gift, gradient: "from-purple-500 to-pink-500", hoverColor: "hover:text-purple-500" },
    { label: "Earn Money", href: "/earn", icon: DollarSign, gradient: "from-green-500 to-emerald-600", hoverColor: "hover:text-green-500" },
    { label: "Referrals", href: "/referrals", icon: Users, gradient: "from-indigo-500 to-violet-500", hoverColor: "hover:text-indigo-500" },
  ];

  return (
    <div
      className={`xl:hidden w-full transition-all duration-300 ${
        isSticky
          ? "sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="relative flex items-center h-14 px-2">
        {/* Label Badge */}
        {/* <div className="flex-shrink-0 pl-2 pr-3">
          <span className="inline-block text-[#2ecc71] font-bold text-xs sm:text-sm whitespace-nowrap px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 shadow-sm">
            {label}
          </span>
        </div> */}

        {/* Left Scroll Arrow */}
        {/* {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-12 sm:left-20 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
        )} */}

        {/* Scrollable Tabs Container */}
        <div
          ref={containerRef}
          className="flex-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth px-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-2 min-w-max">
            {/* Category Links */}
            {categories.map(({ category, tname }) => {
              const isActive =
                pathname !== baseLink &&
                pathname.toLowerCase().includes(category.toLowerCase());
              return (
                <Link
                  key={category}
                  href={`${baseLink}/category/${category.toLowerCase()}`}
                  className={`relative px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 border-b-2 ${
                    isActive
                      ? "text-[#2ecc71] border-[#2ecc71]"
                      : "text-gray-700 hover:text-[#2ecc71] border-transparent hover:border-gray-300"
                  }`}
                >
                  {tname || category}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent self-stretch mx-1" />

            {/* Special Feature Tabs with Icons */}
            {specialTabs.map(({ label, href, icon: Icon, gradient, hoverColor }) => {
              const isActive = pathname === href;
              // Map gradient to actual color for active state
              const colorMap: { [key: string]: string } = {
                'from-orange-500': 'text-orange-500',
                'from-blue-500': 'text-blue-500',
                'from-purple-500': 'text-purple-500',
                'from-green-500': 'text-green-500',
                'from-indigo-500': 'text-indigo-500',
              };
              const activeColor = colorMap[gradient.split(' ')[0]] || 'text-gray-700';

              // Border color map
              const borderColorMap: { [key: string]: string } = {
                'from-orange-500': 'border-orange-500',
                'from-blue-500': 'border-blue-500',
                'from-purple-500': 'border-purple-500',
                'from-green-500': 'border-green-500',
                'from-indigo-500': 'border-indigo-500',
              };
              const activeBorderColor = borderColorMap[gradient.split(' ')[0]] || 'border-gray-300';

              return (
                <Link
                  key={label}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 group border-b-2 ${
                    isActive
                      ? `${activeColor} ${activeBorderColor}`
                      : `text-gray-700 ${hoverColor} border-transparent hover:border-gray-300`
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Arrow */}
       {/* {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-2 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        )} */}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
