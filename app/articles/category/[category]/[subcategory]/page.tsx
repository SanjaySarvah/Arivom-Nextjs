"use client";

import React from "react";
import { getNewsByCategory, getNewsBySubcategory } from "@/lib/getData";
import ViewAllGrid from "@/components/Common/ViewAllGrid";
import Link from "next/link";
import AdvertisementSidebar from "@/components/Common/Sidebar/AdvertisementSidebar";
import SectionHeader from "@/components/Common/SectionHeader";

type Props = {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
};

export default function SubcategoryPage({ params }: Props) {
  // ✅ Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const category = decodeURIComponent(unwrappedParams.category);
  const subcategory = decodeURIComponent(unwrappedParams.subcategory);

  const allCategoryNews = getNewsByCategory(category);
  const subcategoryNews = getNewsBySubcategory(subcategory);
  const linkBase = "/news";

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <section>
              <ViewAllGrid
                items={subcategoryNews}
                linkBase={linkBase}
                initialVisibleCount={9}
                loadMoreIncrement={9}
                showInteractiveButtons={false}
                showTaggingBadge={false}
                showPopularTag={true}
              />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-8 sticky top-4">
              <div className="bg-gray-50 p-5 rounded-2xl shadow-sm">
                <SectionHeader
                  subtitle={
                    subcategory.length > 20
                      ? subcategory.slice(0, 20) + "..."
                      : subcategory
                  }
                  title=""
                  showButton={false}
                  buttonText="View All"
                  buttonUrl="/news"
                />

                <Link
                  href={`/news/category/${encodeURIComponent(category)}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← View all {category} News
                </Link>

                <span className="mt-8 block">
                  <AdvertisementSidebar />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
