"use client";

import React from "react";
import Link from "next/link";
import { FiTrendingUp, FiChevronRight, FiClock } from "react-icons/fi";
import { Heart, Bookmark, Share2, User } from "lucide-react";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import { FaRegNewspaper } from "react-icons/fa";
import { getLatestNews } from "@/lib/getData"; // ✅ Using your data accessors

const CardView: React.FC = () => {
  // ✅ Fetch latest news (limit 4)
  const latestNews = getLatestNews(4);

  return (
    <div className="grid gap-6">
      {latestNews.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group"
        >
          <Link href={`/news/${item.id}`}>
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </Link>

          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <div
                className="flex items-center gap-1 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md"
                style={{ backgroundColor: "var(--secondary)" }}
              >
                <FiTrendingUp className="w-3 h-3" />
                <span>
                  {item.days_ago <= 1
                    ? "Trending"
                    : item.days_ago <= 3
                    ? "Hot"
                    : "Recent"}
                </span>
              </div>

              <CategoryBadge
                category={item.category}
                icon={<FaRegNewspaper className="text-white w-3 h-3" />}
              />
            </div>

            {/* Content */}
            <Link href={`/news/${item.id}`}>
             
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {item.excerpt}
              </p>
            </Link>
   <div className="flex items-center justify-between">
                  <div className="flex items-center ">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                  
                    >
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.author || 'Rohan Mehta'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiClock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="sm:hidden">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
        
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;

