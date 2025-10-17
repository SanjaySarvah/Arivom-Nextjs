"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getAllNews } from "@/lib/getData";
import ViewAllGrid from "@/components/Common/ViewAllGrid";
import { FiArrowLeft, FiGrid, FiLayers, FiMenu } from "react-icons/fi";

export default function AllNewsPage() {
  const router = useRouter();
  const allNews = getAllNews();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false);
  const linkBase = "/news";

  // Get unique categories from news
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allNews.forEach(item => {
      if (item.category) {
        uniqueCategories.add(item.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [allNews]);

  // Filter news based on selected category
  const filteredNews = useMemo(() => {
    if (selectedCategory === "all") {
      return allNews;
    }
    return allNews.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [allNews, selectedCategory]);

  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    const newsItem = allNews.find(item =>
      item.category?.toLowerCase() === category.toLowerCase()
    );
    return newsItem?.tname || category;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-br from-gray-50 via-white to-gray-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => router.back()}
                className="group inline-flex items-center justify-center p-2 text-gray-700 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50"
                aria-label="Go back"
              >
                <FiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  All News
                </h1>
                <div className="flex items-center gap-1.5 text-gray-600 text-xs sm:text-sm">
                  <FiGrid className="w-3 h-3" />
                  <span>
                    {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
                    {selectedCategory !== "all" && (
                      <span className="ml-1 font-semibold text-[var(--secondary)]">
                        in {getCategoryDisplayName(selectedCategory)}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Category Toggle */}
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 text-gray-700 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                aria-label="Toggle categories"
              >
                <FiMenu className="w-5 h-5" />
              </button>

              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 text-xs">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-700">
                  {categories.length} Categories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Sidebar - Categories (Desktop) */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Categories Card */}
              <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-gradient-to-br from-[var(--primary)] via-blue-600 to-cyan-500">
                {/* Header with Light Green Logo */}
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                    <FiLayers className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-white font-bold text-base">
                    Categories
                  </h2>
                </div>

                <div className="p-3 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/40">
                  {/* All News Option */}
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between group mb-2 ${
                      selectedCategory === "all"
                        ? "bg-white text-[var(--primary)] shadow-lg scale-105"
                        : "text-white hover:bg-white/15 hover:scale-102"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FiGrid className="w-4 h-4" />
                      All News
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-[var(--primary)] to-blue-600 text-white"
                        : "bg-white/20 text-white group-hover:bg-white/30"
                    }`}>
                      {allNews.length}
                    </span>
                  </button>

                  {/* Category List */}
                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const count = allNews.filter(item =>
                        item.category?.toLowerCase() === category.toLowerCase()
                      ).length;
                      const displayName = getCategoryDisplayName(category);

                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsCategoryMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between group ${
                            selectedCategory === category
                              ? "bg-white text-[var(--primary)] shadow-lg scale-105"
                              : "text-white hover:bg-white/15 hover:scale-102"
                          }`}
                        >
                          <span className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="truncate">{displayName}</span>
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${
                            selectedCategory === category
                              ? "bg-gradient-to-r from-[var(--primary)] to-blue-600 text-white"
                              : "bg-white/20 text-white group-hover:bg-white/30"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Category Dropdown */}
          {isCategoryMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsCategoryMenuOpen(false)}>
              <div
                className="absolute top-20 left-4 right-4 max-h-[70vh] bg-gradient-to-br from-[var(--primary)] via-blue-600 to-cyan-500 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Header */}
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                      <FiLayers className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-white font-bold text-base">Categories</h2>
                  </div>
                  <button
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile Category List */}
                <div className="p-3 overflow-y-auto max-h-[calc(70vh-60px)] scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between mb-2 ${
                      selectedCategory === "all"
                        ? "bg-white text-[var(--primary)] shadow-lg"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FiGrid className="w-4 h-4" />
                      All News
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-[var(--primary)] to-blue-600 text-white"
                        : "bg-white/20 text-white"
                    }`}>
                      {allNews.length}
                    </span>
                  </button>

                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const count = allNews.filter(item =>
                        item.category?.toLowerCase() === category.toLowerCase()
                      ).length;
                      const displayName = getCategoryDisplayName(category);

                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsCategoryMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${
                            selectedCategory === category
                              ? "bg-white text-[var(--primary)] shadow-lg"
                              : "text-white hover:bg-white/15"
                          }`}
                        >
                          <span className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="truncate">{displayName}</span>
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${
                            selectedCategory === category
                              ? "bg-gradient-to-r from-[var(--primary)] to-blue-600 text-white"
                              : "bg-white/20 text-white"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {filteredNews.length > 0 ? (
              <ViewAllGrid
                items={filteredNews}
                linkBase={linkBase}
                initialVisibleCount={9}
                loadMoreIncrement={9}
                showInteractiveButtons={false}
                showTaggingBadge={false}
                showPopularTag={true}
              />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600 text-lg">No news found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
