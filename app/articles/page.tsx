"use client";

import { getAllArticles } from "@/lib/getData";
import CardList from "@/components/Common/CardList";

export default function ArticlesPage() {
  const articles = getAllArticles();

  // Extract unique categories from articles
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  // Helper to capitalize the first letter
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-8">


        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            All Articles
          </h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search articles..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none flex-grow sm:w-60"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Articles List */}
        <CardList items={articles} linkBase="/articles" />
      </div>
    </div>
  );
}
