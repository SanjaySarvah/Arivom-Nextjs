"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getAllArticles } from "@/lib/getData";
import ViewAllGrid from "@/components/Common/ViewAllGrid";
import { FiArrowLeft, FiGrid, FiFilter } from "react-icons/fi";

export default function AllArticlesPage() {
  const router = useRouter();
  const allArticles = getAllArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const linkBase = "/articles";

  // Get unique categories from articles
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allArticles.forEach(item => {
      if (item.category) {
        uniqueCategories.add(item.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [allArticles]);

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") {
      return allArticles;
    }
    return allArticles.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [allArticles, selectedCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
      {/* Sticky Header Container */}
      <div className="sticky top-0 z-40 bg-gradient-to-br from-gray-50 via-white to-gray-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">

          {/* Back Button & Compact Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => router.back()}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50"
              >
                <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-medium hidden sm:inline">Back</span>
              </button>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  All Articles
                </h1>
                <div className="flex items-center gap-1.5 text-gray-600 text-xs sm:text-sm">
                  <FiGrid className="w-3 h-3" />
                  <span>
                    {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                    {selectedCategory !== "all" && (
                      <span className="ml-1 font-semibold text-[var(--secondary)]">
                        in {allArticles.find(item => item.category?.toLowerCase() === selectedCategory.toLowerCase())?.tname || selectedCategory}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Category Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 text-xs">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-700">
                {categories.length} Categories
              </span>
            </div>
          </div>

          {/* Compact Category Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3">
            <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400" style={{ scrollbarWidth: 'thin' }}>
              {/* All Categories Button */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={`flex-shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-[var(--secondary)] to-purple-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-[var(--secondary)] hover:bg-purple-50"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FiGrid className="w-3 h-3 sm:w-4 sm:h-4" />
                  All
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                    selectedCategory === "all"
                      ? "bg-white/20"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {allArticles.length}
                  </span>
                </span>
              </button>

              {/* Individual Category Buttons */}
              {categories.map((category) => {
                const count = allArticles.filter(item => item.category?.toLowerCase() === category.toLowerCase()).length;
                const tname = allArticles.find(item => item.category?.toLowerCase() === category.toLowerCase())?.tname;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-[var(--secondary)] to-purple-600 text-white shadow-md"
                        : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-[var(--secondary)] hover:bg-purple-50"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {tname || category}
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                        selectedCategory === category
                          ? "bg-white/20"
                          : "bg-gray-200 text-gray-600"
                      }`}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">

        {/* Articles Grid - Full Width */}
        <section>
          {filteredArticles.length > 0 ? (
            <ViewAllGrid
              items={filteredArticles}
              linkBase={linkBase}
              initialVisibleCount={9}
              loadMoreIncrement={9}
              showInteractiveButtons={false}
              showTaggingBadge={false}
              showPopularTag={true}
            />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg">No articles found in this category.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
