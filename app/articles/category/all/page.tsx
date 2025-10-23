"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  getAllNews,
  getNewsByCategory,
  getNewsBySubcategory,
  getNewsSubcategoriesWithCount,
} from "@/lib/getData";
import ViewAllGrid from "@/components/Common/ViewAllGrid";
import AdvertisementSidebar from "@/components/Common/Sidebar/AdvertisementSidebar";
import SectionHeader from "@/components/Common/SectionHeader";
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from "react-icons/fi";

export default function NewsAllCategoriesPage() {
  const allNews = getAllNews();

  // ✅ Create unique category list with Tamil name fallback
  const categories = Array.from(new Set(allNews.map((n) => n.category)))
    .map((cat) => {
      const item = allNews.find((n) => n.category === cat);
      return { category: cat, tname: item?.tname || null };
    })
    // Optional: Sort alphabetically by tname or category
    .sort((a, b) => (a.tname || a.category).localeCompare(b.tname || b.category));

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0]?.category || null
  );
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const subcategories = selectedCategory
    ? getNewsSubcategoriesWithCount(selectedCategory)
    : [];

  const displayedNews = selectedSubcategory
    ? getNewsBySubcategory(selectedSubcategory)
    : selectedCategory
    ? getNewsByCategory(selectedCategory)
    : allNews;

  const toggleExpand = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ================= LEFT SIDEBAR (DESKTOP) ================= */}
          <aside className="lg:w-1/3 hidden lg:block">
            <div className="bg-gray-50 p-5 rounded-2xl shadow-sm sticky top-4 space-y-8">
              <SectionHeader subtitle="All Categories" title="" showButton={false} />

              <ul className="space-y-3 -mt-5">
                {categories.map((cat) => {
                  const subs = getNewsSubcategoriesWithCount(cat.category);
                  const isExpanded = expandedCategory === cat.category;

                  return (
                    <li key={cat.category}>
                      {/* Category Row */}
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.category);
                            setSelectedSubcategory(null);
                          }}
                          className={`text-left font-medium capitalize transition-colors ${
                            selectedCategory === cat.category && !selectedSubcategory
                              ? "text-blue-700"
                              : "text-gray-700 hover:text-blue-600"
                          }`}
                        >
                          {/* ✅ Show tname if available */}
                          {cat.tname || cat.category}
                        </button>

                        {subs.length > 0 && (
                          <button
                            onClick={() => toggleExpand(cat.category)}
                            className="text-gray-500 hover:text-gray-800 transition"
                          >
                            {isExpanded ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Subcategories */}
                      {isExpanded && subs.length > 0 && (
                        <ul className="mt-2 ml-3 border-l border-gray-200 pl-3 space-y-1">
                          {subs.map((sub) => (
                            <li key={sub.subcategory}>
                              <button
                                onClick={() => {
                                  setSelectedCategory(cat.category);
                                  setSelectedSubcategory(sub.subcategory);
                                }}
                                className={`text-sm capitalize transition-colors ${
                                  selectedSubcategory === sub.subcategory
                                    ? "text-blue-700"
                                    : "text-gray-600 hover:text-blue-600"
                                }`}
                              >
                                {sub.subcategory}
                                <span className="ml-2 text-xs text-gray-400">
                                  ({sub.count})
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6">
                <AdvertisementSidebar />
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <section className="lg:w-2/3">
            <div className="flex items-center justify-between lg:block mb-4">
              <h1 className="block md:hidden text-2xl font-bold text-gray-900 capitalize truncate max-w-[80%]">
                All News
              </h1>

              <button
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden p-0 m-0 bg-transparent border-none text-gray-600 hover:text-black hover:scale-110 transition-transform"
              >
                <FiFilter className="w-5 h-5" />
              </button>
            </div>

            <ViewAllGrid
              items={displayedNews}
              linkBase="/news"
              initialVisibleCount={9}
              loadMoreIncrement={9}
              showInteractiveButtons={false}
              showTaggingBadge={false}
              showPopularTag={true}
            />
          </section>
        </div>
      </div>

      {/* ================= MOBILE FILTER PANEL ================= */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/40 transition-opacity duration-300 ${
          showMobileFilter ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:hidden`}
        onClick={() => setShowMobileFilter(false)}
      >
        <div
          className={`absolute top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white shadow-xl p-6 overflow-y-auto transform transition-transform duration-500 ${
            showMobileFilter ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowMobileFilter(false)}
            className="absolute top-4 right-4 p-0 bg-transparent border-none text-gray-600 hover:text-black hover:scale-110 transition-transform"
          >
            <FiX className="w-6 h-6" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-10">
            All Categories
          </h2>

          <ul className="space-y-3">
            {categories.map((cat) => {
              const subs = getNewsSubcategoriesWithCount(cat.category);
              const isExpanded = expandedCategory === cat.category;

              return (
                <li key={cat.category}>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.category);
                        setSelectedSubcategory(null);
                        setShowMobileFilter(false);
                      }}
                      className={`text-left font-medium capitalize transition-colors ${
                        selectedCategory === cat.category && !selectedSubcategory
                          ? "text-blue-700"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {/* ✅ Show tname if available */}
                      {cat.tname || cat.category}
                    </button>

                    {subs.length > 0 && (
                      <button
                        onClick={() => toggleExpand(cat.category)}
                        className="text-gray-500 hover:text-gray-800 transition"
                      >
                        {isExpanded ? (
                          <FiChevronUp className="w-4 h-4" />
                        ) : (
                          <FiChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {isExpanded && subs.length > 0 && (
                    <ul className="mt-2 ml-3 border-l border-gray-200 pl-3 space-y-1">
                      {subs.map((sub) => (
                        <li key={sub.subcategory}>
                          <button
                            onClick={() => {
                              setSelectedCategory(cat.category);
                              setSelectedSubcategory(sub.subcategory);
                              setShowMobileFilter(false);
                            }}
                            className={`text-sm capitalize transition-colors ${
                              selectedSubcategory === sub.subcategory
                                ? "text-blue-700"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                          >
                            {sub.subcategory}
                            <span className="ml-2 text-xs text-gray-400">
                              ({sub.count})
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
