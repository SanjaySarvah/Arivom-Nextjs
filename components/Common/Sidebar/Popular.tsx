"use client";

import React from "react";
import Link from "next/link";
import { FiTrendingUp, FiClock } from "react-icons/fi";
import { User } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import { getLatestNews } from "@/lib/getData";
import PopularTag from "../Badges/PopularTag";

const CardView: React.FC = () => {
  const latestNews = getLatestNews(4);

  return (
    <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-1 xl:grid-cols-1">
      {latestNews.map((item) => (
        <article
          key={item.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 group"
        >
          {/* Image */}
          <Link href={`/news/${item.id}`} className="block relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="h-44 sm:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2">
            

              <PopularTag label="popular"/>
            </div>
          </Link>

          {/* Content */}
          <div className="p-3 sm:p-4 flex flex-col justify-between">
            {/* Category */}
            <div className="flex justify-between items-center mb-1">
            
            </div>

            {/* Title + Description */}
            <Link href={`/news/${item.id}`}>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              {item.excerpt && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.excerpt}
                </p>
              )}
            </Link>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
   
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{item.author || "ARIVOM Desk"}</span>
              </div>
                         <CategoryBadge
        category={item.tname ?? item.category}
        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
      />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CardView;
