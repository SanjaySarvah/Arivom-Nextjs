"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiChevronRight, FiTrendingUp } from "react-icons/fi";
import { User } from "lucide-react";
import { FaThumbsUp } from "react-icons/fa";


import TrendingBadge from "@/components/Common/Badges/TrendingBadge";
import TaggingBadge from "@/components/Common/Badges/TaggingBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";

interface TrendItem {
  id: number;
  title: string;
  username: string;
  likes: string;
  thumbnail: string;
  category: string;
  created_at?: string;
  redirectUrl: string;
}

interface TrendGridProps {
  items: TrendItem[];
  sectionTitle: string;
  linkBase?: string;
}

export default function TrendGrid({
  items,
  sectionTitle,
  linkBase = "/social-media",
}: TrendGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleItems = items.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, items.length));
  };

  return (
    <div className="flex flex-col items-center mb-16">



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {visibleItems.map((item) => (
          <Link
            key={item.id}
              target="_blank"
            href={`${item.redirectUrl}`}
            className="bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-md overflow-hidden transition group block relative"
          >

            <div className="relative">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={500}
                height={300}
                className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
           
             
            </div>

    
            <div className="p-4">
            <div className="flex justify-between items-center mb-2">
  <TaggingBadge tag={item.category} />
  <span className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 font-medium px-2 py-1 rounded-md">
    <FaThumbsUp className="w-3 h-3" />
    {item.likes}
  </span>
</div>


             <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-indigo-600">
  {item.title}
</h3>

      

              {/* 🔹 Meta Info */}
              <div className="flex justify-between items-center text-gray-400 text-xs mt-3">
                <div className="flex items-center gap-1">
               
                  <AuthorBadge author={item.username} />
                </div>

                {item.created_at && (
                  <div className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5" />
                    <span>
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* 🔹 Footer Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div
                  className="flex items-center gap-3"
                  onClick={(e) => e.preventDefault()}
                >
                 
                  <ShareButton item={item} linkBase={item.redirectUrl} />
                </div>

                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-400 text-white hover:bg-indigo-600 transition-all duration-300 cursor-pointer group">
                  <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔹 Load More Button */}
      {visibleCount < items.length && (
        <button
          onClick={handleLoadMore}
          className="mt-8 px-6 py-2 text-white font-semibold rounded-full transition-all hover:scale-105"
          style={{ backgroundColor: "var(--tertiary)" }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
