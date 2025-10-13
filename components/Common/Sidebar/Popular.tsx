"use client";

import React from "react";
import Link from "next/link";
import { FiTrendingUp, FiChevronRight } from "react-icons/fi";
import { Heart, Bookmark, Share2 } from "lucide-react";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import { FaRegNewspaper } from "react-icons/fa";

const CardView: React.FC = () => {
  // ✅ Static sample data
  const item = {
    id: 1,
    title: "Breaking: Global Markets Rally as Tech Stocks Surge",
    description:
      "Major tech companies saw strong gains today, pushing global markets higher and boosting investor confidence.",
    category: "Business",
    image: "/images/sample-news.jpg", // replace with your image path
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group">
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
            <span>Trending</span>
          </div>

          <CategoryBadge
            category={item.category}
            icon={<FaRegNewspaper className="text-white w-3 h-3" />}
          />
        </div>

        {/* Content */}
        <Link href={`/news/${item.id}`}>
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {item.description}
          </p>
        </Link>

        {/* Footer actions */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
          {/* Like */}
          <button className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group/like">
            <Heart className="w-4 h-4 text-gray-600 group-hover/like:text-red-500 transition-colors" />
          </button>

          {/* Bookmark */}
          <button className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group/bookmark">
            <Bookmark className="w-4 h-4 text-gray-600 group-hover/bookmark:text-blue-500 transition-colors" />
          </button>

          {/* Share */}
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 transition-all group/share"
            style={{ borderColor: "var(--tertiary-hover, #27ae60)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--tertiary-light, #d4edda)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Share2
              className="w-4 h-4 transition-colors"
              style={{ color: "var(--tertiary, #2ecc71)" }}
            />
          </button>

          {/* Read more */}
          <Link
            href={`/news/${item.id}`}
            className="ml-auto flex items-center justify-center w-9 h-9 rounded-full text-white transition-all hover:scale-110"
            style={{ backgroundColor: "var(--tertiary)" }}
          >
            <FiChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardView;
