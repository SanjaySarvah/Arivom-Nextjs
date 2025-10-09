"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getNewsByCategory } from "@/lib/getData";
import { User, Calendar } from "lucide-react";
import PopularNews from '@/components/Common/DetailViews/PopularNews';
import PopularArticles from '@/components/Common/DetailViews/PopularArticles';
import Updates from '@/components/Common/DetailViews/Updates';

type Props = { params: { category: string } };

export default function CategoryPage({ params }: Props) {
  const allPosts = getNewsByCategory(params.category);
  const category = decodeURIComponent(params.category);

  // Pagination (Load More)
  const initialDisplayCount = 9;
  const loadMoreCount = 9;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const visiblePosts = allPosts.slice(0, displayCount);
  const hasMore = displayCount < allPosts.length;

  const handleLoadMore = () => setDisplayCount((prev) => prev + loadMoreCount);

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content - 2/3 width */}
          <div className="lg:w-2/3">
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{category} News</h1>
              <p className="text-gray-600 mt-2">Latest updates and stories in {category}</p>
            </div>

            {/* News Grid */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {visiblePosts.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Gradient Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Trending
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        {category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Author + Date */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>{post.author || "Editor"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date || "Recently"}</span>
                        </div>
                      </div>

                      {/* Read More */}
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

              {/* LOAD MORE */}
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
              
              {!hasMore && allPosts.length > initialDisplayCount && (
                <div className="text-center mt-12 py-6 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 font-medium">
                    You've reached the end — no more posts available.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:w-1/3">
            <div className="space-y-8 sticky top-4">
              {/* Popular News Section */}
              <PopularNews />
              
              {/* Popular Articles Section */}
              <PopularArticles />
              
              {/* Updates Section */}
              <Updates />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}