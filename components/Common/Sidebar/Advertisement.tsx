"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/Common/SectionHeader";

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
    // {
    //   id: "4",
    //   title: "Smart Home Devices - Best Deals",
    //   image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    //   sponsor: "HomeTech",
    //   ctaLink: "#",
    //   category: "Smart Home",
    // },
    // {
    //   id: "5",
    //   title: "Fitness Gear - Exclusive Offers",
    //   image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    //   sponsor: "FitZone",
    //   ctaLink: "#",
    //   category: "Fitness",
    // },
  ];



  return (
    <div className="w-full">
      {/* Sponsored Ads Header */}
      <SectionHeader
        subtitle="Sponsered Ad"
        title="AD"
        showButton={false}
        buttonText="View All"
        buttonUrl="/news"
      />

      <div
        className="flex flex-col gap-6 max-h-[450px] overflow-y-auto pr-2
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
  transition-all"
      >

        {compactAds.map((ad) => (
          <Link
            key={ad.id}
            href={ad.ctaLink}
            className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm
            border border-gray-200 hover:shadow-md hover:-translate-y-0.5
            transition-all duration-200 group flex-shrink-0"
          >
            {/* Ad Image */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                className="object-cover rounded-md border border-gray-100 group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h6 className="font-semibold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {ad.title}
              </h6>
              <p className="text-xs text-gray-600">
                Sponsored by <span className="font-medium">{ad.sponsor}</span>
              </p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[var(--secondarylight)] group-hover:bg-[var(--secondary)] flex items-center justify-center transition-colors">
                <svg
                  className="w-4 h-4 text-white"
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
    </div>
  );
};

export default CompactAdList;
