"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Calendar } from "lucide-react";

interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  image: string;
  badge: string;
}

interface GeneralPostProps {
  posts: Post[];
  initialDisplayCount?: number;
  loadMoreCount?: number;
  linkBase?: string;
}

export default function GeneralPost({
  posts,
  initialDisplayCount = 9,
  loadMoreCount = 9,
  linkBase = "/news",
}: GeneralPostProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + loadMoreCount);
  };

  const visiblePosts = posts.slice(0, displayCount);
  const hasMore = displayCount < posts.length;

  return (
    <div className="w-full">
      {/* Grid Layout - 3 columns on large screens, 2 on medium, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <Link
            key={post.id}
            href={`${linkBase}/${post.id}`}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative w-full h-48 sm:h-56 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                {post.badge}
              </div>
              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                {post.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {post.description}
              </p>

              {/* Author and Date */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Read More Arrow */}
              <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read More</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Load More
              <svg
                className="w-5 h-5 transform group-hover:translate-y-1 transition-transform"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>
      )}

      {/* No More Posts Message */}
      {!hasMore && posts.length > initialDisplayCount && (
        <div className="text-center mt-12 py-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600 font-medium">
            All posts have been displayed
          </p>
        </div>
      )}
    </div>
  );
}
