"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import { FiChevronRight, FiClock } from "react-icons/fi";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import PopularTag from "@/components/Common/Badges/PopularTag";
import TrendingBadge from "@/components/Common/Badges/TrendingBadge";
import TaggingBadge from "./Badges/TaggingBadge";
import ShareButton from "./Badges/ShareButton";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import LikeButton from "@/components/Common/Badges/LikeButton";

interface ViewAllGridProps {
  items: any[];
  linkBase: string;
  initialVisibleCount?: number;
  loadMoreIncrement?: number;
  showInteractiveButtons?: boolean;
  showTaggingBadge?: boolean;
  showPopularTag?: boolean;
}

const ViewAllGrid: React.FC<ViewAllGridProps> = ({
  items,
  linkBase,
  initialVisibleCount = 9,
  loadMoreIncrement = 9,
  showInteractiveButtons = false,
  showTaggingBadge = false,
  showPopularTag = true,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const hasMore = visibleCount < items.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreIncrement, items.length));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        {items.slice(0, visibleCount).map((item, index) => (
          <article
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col"
          >
            {/* Image Section */}
            <Link
              href={`${linkBase}/${item.id}`}
              className="block relative overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-44 sm:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Top Left Badge */}
              <div className="absolute top-2 left-2 z-10">
                {showPopularTag ? (
                  <PopularTag label={index === 0 ? "Featured" : "Top Story"} />
                ) : (
                  <TrendingBadge />
                )}
              </div>
            </Link>
            {/* <h1>test view all</h1> */}
            {/* Content Section */}
            <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
              {/* Category and Tagging Badge Row */}
              <div className="flex justify-between items-center mb-2">
                {showTaggingBadge && <TaggingBadge tag="Summary" />}
                <CategoryBadge
                  category={item.tname ?? item.category}
                  icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                />
              </div>

              {/* Title and Excerpt */}
              <Link href={`${linkBase}/${item.id}`}>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
              </Link>

              {/* Author and Date Row */}
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{item.author || "ARIVOM Desk"}</span>
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

              {/* Interactive Buttons (Optional) */}
              {showInteractiveButtons && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.preventDefault()}
                  >
                    <LikeButton id={String(item.id)} />
                    <BookmarkButton
                      id={String(item.id)}
                      borderColor="#767676ff"
                      backgroundColor="#ffffffff"
                      savedBackgroundColor="#ffffffff"
                      iconColor="#767676ff"
                      savedIconColor="#6f42c2"
                    />
                    <ShareButton item={item} linkBase={linkBase} />
                  </div>

                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
                    <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="group relative px-6 py-2.5 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
            style={{ background: "var(--tertiary)" }}
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Load More
              <svg
                className="w-4 h-4 transform group-hover:translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAllGrid;
