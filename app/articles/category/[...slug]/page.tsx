// app/articles/category/[...slug]/page.tsx
"use client";

import { use } from "react";
import { getAllArticles } from "@/lib/getData";
import ViewAllGrid from "@/components/Common/ViewAllGrid";
import PopularNews from '@/components/Common/DetailViews/PopularNews';
import PopularArticles from '@/components/Common/DetailViews/PopularArticles';
import Updates from '@/components/Common/DetailViews/Updates';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default function CategoryPage({ params }: Props) {
  // ✅ Use the React `use` hook to unwrap the promise
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [category, subcategory, subsubcategory] = slug.map(decodeURIComponent);
  const articles = getAllArticles();
  const linkBase = "/articles";

  // ✅ Filtering logic
  let filtered = articles;

  if (category) {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (subcategory) {
    filtered = filtered.filter(
      (a) => a.subcategory?.toLowerCase() === subcategory.toLowerCase()
    );
  }

  if (subsubcategory) {
    filtered = filtered.filter(
      (a) => a.subsubcategory?.toLowerCase() === subsubcategory.toLowerCase()
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content - 2/3 width */}
          <div className="lg:w-2/3">
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {slug.join(" / ")} Articles
              </h1>
              <p className="text-gray-600 mt-2">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found in this category
              </p>
            </div>

            {/* Articles Grid */}
            <section>
              {filtered.length > 0 ? (
                <ViewAllGrid
                  items={filtered}
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
