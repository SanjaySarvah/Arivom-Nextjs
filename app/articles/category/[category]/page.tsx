"use client";

import React, { useState } from "react";
import { getNewsByCategory, getNewsSubcategoriesWithCount } from "@/lib/getData";
import ViewAllGrid from "@/components/Common/ViewAllGrid";
import Link from "next/link";
import AdvertisementSidebar from "@/components/Common/Sidebar/AdvertisementSidebar";
import { FiFilter, FiX } from "react-icons/fi";
import SectionHeader from "@/components/Common/SectionHeader";

type Props = { params: Promise<{ category: string }> };

export default function CategoryPage({ params }: Props) {
  // ✅ unwrap the Promise
  const { category: encodedCategory } = React.use(params);
  const category = decodeURIComponent(encodedCategory);

  const allPosts = getNewsByCategory(category);
  const subcategories = getNewsSubcategoriesWithCount(category);
  const linkBase = "/news";
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="mb-8">
              <div className="flex items-center justify-between lg:block mb-4">
                <h1 className="block md:hidden text-2xl font-bold text-gray-900 capitalize truncate max-w-[80%]">
                  {category} News
                </h1>

                {/* Mobile Filter Icon */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden p-0 m-0 bg-transparent border-none text-gray-600 hover:text-black hover:scale-110 transition-transform"
                >
                  <FiFilter className="w-5 h-5" />
                </button>
              </div>
            </div>

            <section>
              <ViewAllGrid
                items={allPosts}
                linkBase={linkBase}
                initialVisibleCount={9}
                loadMoreIncrement={9}
                showInteractiveButtons={false}
                showTaggingBadge={false}
                showPopularTag={true}
              />
            </section>
          </div>

          {/* Desktop Sidebar */}
          <div className="lg:w-1/3 hidden lg:block">
            <div className="space-y-8 sticky top-4">
              {subcategories.length > 0 && (
                <div className="bg-gray-50 p-5 rounded-2xl shadow-sm">
                  <SectionHeader
                    subtitle="Subcategories"
                    title=""
                    showButton={false}
                    buttonText="View All"
                    buttonUrl="/news/all"
                  />

                  <ul className="space-y-3 -mt-5">
                    {subcategories.map((sub) => (
                      <li key={sub.subcategory} className="flex justify-between items-center">
                        <Link
                          href={`/news/category/${encodeURIComponent(category)}/${encodeURIComponent(
                            sub.subcategory
                          )}`}
                          className="text-gray-600 hover:text-gray-800 font-medium capitalize truncate max-w-[80%]"
                        >
                          {sub.subcategory}
                        </Link>
                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                          {sub.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <AdvertisementSidebar />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
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
            Subcategories
          </h2>

          {subcategories.length > 0 ? (
            <ul className="space-y-3">
              {subcategories.map((sub) => (
                <li
                  key={sub.subcategory}
                  className="flex justify-between items-center border-b border-gray-100 pb-2"
                >
                  <Link
                    href={`/news/category/${encodeURIComponent(category)}/${encodeURIComponent(
                      sub.subcategory
                    )}`}
                    onClick={() => setShowMobileFilter(false)}
                    className="text-blue-600 hover:text-blue-800 font-medium capitalize truncate max-w-[80%]"
                  >
                    {sub.subcategory}
                  </Link>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                    {sub.count}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No subcategories found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
