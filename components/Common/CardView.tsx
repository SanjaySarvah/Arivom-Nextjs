"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiTrendingUp, FiChevronRight } from "react-icons/fi";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import { FaRegNewspaper } from "react-icons/fa";
import { getLatestArticles } from "@/lib/getData"; // ✅ switched to articles
import ShareButton from './Badges/ShareButton';
import BookmarkButton  from "@/components/Common/Badges/BookmarkButton";
import LikeButton from "@/components/Common/Badges/LikeButton";
import TrendingBadge from "@/components/Common/Badges/TrendingBadge"
import TaggingBadge from "./Badges/TaggingBadge";

const CardView: React.FC = () => {
  const allArticles = getLatestArticles(); // get all
  const [visibleCount, setVisibleCount] = useState(6); // show first 6
   const linkBase = "/articles";

  // Slice to only show currently visible items
  const visibleArticles = allArticles.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allArticles.length));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {visibleArticles.map((item) => (
       <Link
  key={item.id}
  href={`/articles/${item.id}`}
  className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group block relative"
>
  {/* 🔹 Image with Overlay Badges */}
  <div className="relative">
    <img
      src={item.image}
      alt={item.title}
      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
    />

    {/* 🔸 Trending Badge (Top Left Overlay) */}
    <div className="absolute top-2 left-2 z-10">
      <TrendingBadge />
    </div>

    {/* 🔸 Tagging Badge (Top Right Overlay) */}

  
   
  </div>

  {/* 🔹 Content Section */}
  <div className="p-4">
    <div className="flex justify-between items-center mb-2">
          <TaggingBadge
        tag="Summary"
        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
      />
      <CategoryBadge
        category={item.category}
        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
      />
    </div>

    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
      {item.title}
    </h3>
    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.excerpt}</p>

    {/* Footer Actions */}
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
      {/* Left Side: Like / Bookmark / Share */}
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

      {/* Right Side: Read More */}
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
        <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  </div>
</Link>

        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < allArticles.length && (
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
};

export default CardView;
