"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Bell, Gift, DollarSign, Users } from "lucide-react";

interface CategoryItem {
  category: string;
  tname?: string;
}

interface MobileCategoryTabsProps {
  items: { id: number; title: string; category: string; tname?: string }[];
  baseLink: string;
}

export default function MobileCategoryTabs({ items, baseLink }: MobileCategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCats = Array.from(
      new Map(items.map((i) => [i.category, { category: i.category, tname: i.tname }])).values()
    );
    setCategories(uniqueCats);
  }, [items]);

  // Special tabs
  const specialTabs = [
    { label: "Trending", href: "/trending", icon: TrendingUp },
    { label: "Updates", href: "/updates", icon: Bell },
    { label: "Offers & Deals", href: "/offers", icon: Gift },
    { label: "Earn Money", href: "/earn", icon: DollarSign },
    { label: "Referrals", href: "/referrals", icon: Users },
  ];

  return (
    <div className="xl:hidden w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="relative flex items-center h-14">
        {/* Scrollable Tabs */}
        <div
          ref={containerRef}
          className="flex-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
        >
          <div className="flex min-w-max">
            {/* Categories */}
            {categories.map(({ category, tname }, idx) => {
              // Active: URL match or first tab by default
              const isActive =
                pathname !== baseLink &&
                pathname.toLowerCase().includes(category.toLowerCase())
                  ? true
                  : idx === 0 && !categories.some((c) =>
                      pathname.toLowerCase().includes(c.category.toLowerCase())
                    );

              return (
                <Link
                  key={category}
                  href={`${baseLink}/category/${category.toLowerCase()}`}
                  className={`relative px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-[#017BFF]"
                      : "text-gray-700 hover:text-[#017BFF]"
                  }`}
                >
                  {tname || category}
                  
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#017BFF] transition-all duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`} />
                </Link>
              );
            })}

            {/* Special Tabs */}
            {specialTabs.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-[#017BFF]"
                      : "text-gray-700 hover:text-[#017BFF]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4`} />
                  <span>{label}</span>
                  
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#017BFF] transition-all duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}