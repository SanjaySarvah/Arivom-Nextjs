"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getAllArticles, getArticleSubcategories } from "@/lib/getData";
import ViewAllGrid from "@/components/Common/ViewAllGrid";
import { FiArrowLeft, FiGrid, FiChevronRight, FiLayers, FiMenu } from "react-icons/fi";

export default function AllArticlesPage() {
  const router = useRouter();
  const allArticles = getAllArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false);
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

  // Get subcategories for selected category
  const subcategories = useMemo(() => {
    if (selectedCategory === "all") return [];
    return getArticleSubcategories(selectedCategory);
  }, [selectedCategory]);

  // Filter articles based on selected category and subcategory
  const filteredArticles = useMemo(() => {
    let filtered = allArticles;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item =>
        item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedSubcategory !== "all" && selectedCategory !== "all") {
      filtered = filtered.filter(item =>
        item.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }

    return filtered;
  }, [allArticles, selectedCategory, selectedSubcategory]);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("all"); // Reset subcategory when category changes
    setIsCategoryMenuOpen(false); // Close mobile menu after selection
  };

  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    const article = allArticles.find(item =>
      item.category?.toLowerCase() === category.toLowerCase()
    );
    return article?.tname || category;
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
                  All Articles
                </h1>
                <div className="flex items-center gap-1.5 text-gray-600 text-xs sm:text-sm">
                  <FiGrid className="w-3 h-3" />
                  <span>
                    {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
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
                  {/* All Articles Option */}
                  <button
                    onClick={() => handleCategorySelect("all")}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between group mb-2 ${
                      selectedCategory === "all"
                        ? "bg-white text-[var(--primary)] shadow-lg scale-105"
                        : "text-white hover:bg-white/15 hover:scale-102"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FiGrid className="w-4 h-4" />
                      All Articles
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-[var(--primary)] to-blue-600 text-white"
                        : "bg-white/20 text-white group-hover:bg-white/30"
                    }`}>
                      {allArticles.length}
                    </span>
                  </button>

                  {/* Category List */}
                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const count = allArticles.filter(item =>
                        item.category?.toLowerCase() === category.toLowerCase()
                      ).length;
                      const displayName = getCategoryDisplayName(category);
                      const hasSubcategories = getArticleSubcategories(category).length > 0;

                      return (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between group ${
                            selectedCategory === category
                              ? "bg-white text-[var(--primary)] shadow-lg scale-105"
                              : "text-white hover:bg-white/15 hover:scale-102"
                          }`}
                        >
                          <span className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="truncate">{displayName}</span>
                            {hasSubcategories && (
                              <FiChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                                selectedCategory === category ? "rotate-90" : ""
                              }`} />
                            )}
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
                    onClick={() => handleCategorySelect("all")}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between mb-2 ${
                      selectedCategory === "all"
                        ? "bg-white text-[var(--primary)] shadow-lg"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FiGrid className="w-4 h-4" />
                      All Articles
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-[var(--primary)] to-blue-600 text-white"
                        : "bg-white/20 text-white"
                    }`}>
                      {allArticles.length}
                    </span>
                  </button>

                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const count = allArticles.filter(item =>
                        item.category?.toLowerCase() === category.toLowerCase()
                      ).length;
                      const displayName = getCategoryDisplayName(category);
                      const hasSubcategories = getArticleSubcategories(category).length > 0;

                      return (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${
                            selectedCategory === category
                              ? "bg-white text-[var(--primary)] shadow-lg"
                              : "text-white hover:bg-white/15"
                          }`}
                        >
                          <span className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="truncate">{displayName}</span>
                            {hasSubcategories && (
                              <FiChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                                selectedCategory === category ? "rotate-90" : ""
                              }`} />
                            )}
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
          </div>

          {/* Right Sidebar - Subcategories */}
          {selectedCategory !== "all" && subcategories.length > 0 && (
            <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3">
                    <h2 className="text-white font-bold text-sm flex items-center gap-2">
                      <FiChevronRight className="w-4 h-4" />
                      Subcategories
                    </h2>
                  </div>

                  <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {/* All Subcategories Option */}
                    <button
                      onClick={() => setSelectedSubcategory("all")}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between group ${
                        selectedSubcategory === "all"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-pink-50 hover:text-purple-600"
                      }`}
                    >
                      <span>All</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        selectedSubcategory === "all"
                          ? "bg-white/20"
                          : "bg-gray-200 text-gray-600 group-hover:bg-pink-200"
                      }`}>
                        {allArticles.filter(item =>
                          item.category?.toLowerCase() === selectedCategory.toLowerCase()
                        ).length}
                      </span>
                    </button>

                    {/* Subcategory List */}
                    <div className="mt-2 space-y-1">
                      {subcategories.map((sub) => {
                        const count = allArticles.filter(item =>
                          item.category?.toLowerCase() === selectedCategory.toLowerCase() &&
                          item.subcategory?.toLowerCase() === sub.subcategory.toLowerCase()
                        ).length;

                        return (
                          <button
                            key={sub.subcategory}
                            onClick={() => {
                              setSelectedSubcategory(sub.subcategory);
                              // Navigate to the subcategory page
                              router.push(`/articles/category/${selectedCategory}/${sub.subcategory}`);
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between group hover:translate-x-1 ${
                              selectedSubcategory === sub.subcategory
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-pink-50 hover:text-purple-600"
                            }`}
                          >
                            <span className="truncate">{sub.subcategory}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${
                              selectedSubcategory === sub.subcategory
                                ? "bg-white/20"
                                : "bg-gray-200 text-gray-600 group-hover:bg-pink-200"
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
          )}
        </div>
      </div>
    </main>
  );
}
