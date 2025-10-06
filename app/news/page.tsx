"use client";

import { getAllNews } from "@/lib/getData";
import CardList from "@/components/Common/CardList";
import Link from "next/link";
import CategoryTabs from "@/components/Common/CategoryTabs";

export default function NewsPage() {
  const news = getAllNews();
  const categories = Array.from(new Set(news.map((n) => n.category)));

  // Helper to capitalize first letter
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-8">
   
        <CategoryTabs items={news} baseLink="/news" label="NEWS" />

        {/* <section className="my-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/news/category/${cat}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 capitalize transition"
              >
                {capitalize(cat)}
              </Link>
            ))}
          </div>
        </section> */}

        {/* All News Section */}
        <section className="py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              All News
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search news..."
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none flex-grow sm:w-60"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>

          {/* Full Width Cards */}
          <CardList items={news} linkBase="/news" />
        </section>
      </div>
    </div>
  );
}
