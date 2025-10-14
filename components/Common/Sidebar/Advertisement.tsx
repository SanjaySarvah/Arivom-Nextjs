"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface AdItem {
  id: string;
  title: string;
  image: string;
  sponsor: string;
  ctaLink: string;
  category?: string;
}

const CompactAdList: FC = () => {
  const compactAds: AdItem[] = [
    {
      id: "1",
      title: "Up to 50% Off on Premium Laptops",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      sponsor: "TechWorld",
      ctaLink: "#",
      category: "Electronics",
    },
    {
      id: "2",
      title: "Trendy Summer Collection - New Arrivals",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      sponsor: "UrbanWear",
      ctaLink: "#",
      category: "Fashion",
    },
    {
      id: "3",
      title: "Smartphones Mega Sale - Save up to 40%",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      sponsor: "MobileHub",
      ctaLink: "#",
      category: "Mobile",
    },
   
  ];



  return (
    <aside className="w-full">
    <span className="text-lg font-semibold text-gray-700 mb-1 pb-1 block">
  Sponsored Ads
</span>


      <div className="flex flex-col gap-4">
        {compactAds.map((ad) => (
          <Link
            key={ad.id}
            href={ad.ctaLink}
            className="flex items-center gap-4 bg-white rounded-lg p-3 shadow-sm 
            border border-gray-200 hover:shadow-md hover:-translate-y-0.5 
            transition-all duration-200 group"
          >
            {/* Ad Image */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                className="object-cover rounded-md border border-gray-100 group-hover:scale-105 transition-transform"
              />

              {/* {ad.category && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-semibold px-2 py-[1px] rounded-full shadow-sm">
                  {ad.category}
                </span>
              )} */}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h6 className="text-sm font-semibold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {ad.title}
              </h6>
              <p className="text-xs text-gray-600">
                Sponsored by <span className="font-medium">{ad.sponsor}</span>
              </p>
            </div>

        {/* Arrow */}
<div className="flex-shrink-0 group">
  <div className="w-7 h-7 rounded-full bg-[var(--secondarylight)] text-white flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--secondary)]">
    <svg
      className="w-4 h-4 text-white transition-colors duration-300 group-hover:text-white"
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
  </div>
</div>

          </Link>
        ))}
      </div>
    </aside>
  );
};

export default CompactAdList;
