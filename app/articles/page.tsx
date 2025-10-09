"use client";

import { getAllArticles } from "@/lib/getData";
import CardList from "@/components/Common/CardList";
import Sidebar from "@/components/Common/Sidebar";
import RelatedSlider from "@/components/Common/RelatedSlider";
import related from "@/data/RelatedSlider.json"
import SectionwiseImportantNews from "@/components/Common/SectionwiseImportantNews";
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
        <div className="mb-8">
          <RelatedSlider title="முக்கிய செய்திகள்" items={related} linkBase="/articles" />
        </div>
        {/* Articles List with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content - 8/12 width */}
          <div className="lg:col-span-8">
            <SectionwiseImportantNews
                items={articles}
                linkBase="/articles"
                title="பிரிவு வாரியாக முக்கிய செய்திகள்"
                subtitle="ஒவ்வொரு பிரிவிலும் இருந்து கேர்நெடுக்கப்பட்ட முக்கிய அப்டேட்கள்"
                categoryLabel="தமிழகம்"
                viewAllLink="/articles"
              />
          </div>

          {/* Sidebar - 4/12 width */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
