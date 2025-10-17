"use client";

import { getAllNews } from "@/lib/getData";
import TrendingCards from "@/components/Common/TrendingCards";
import SectionHeader from "@/components/Common/SectionHeader";
import Link from "next/link";
import { useState } from "react";
import { FiChevronRight, FiClock } from "react-icons/fi";
import { User } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import TrendingBadge from "@/components/Common/Badges/TrendingBadge";
import TaggingBadge from "@/components/Common/Badges/TaggingBadge";
import PopularTag from "@/components/Common/Badges/PopularTag";

export default function NewsPage() {
  const news = getAllNews();
  const [visibleCount, setVisibleCount] = useState(15);

  // Shuffle function for randomizing news cards
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledNews = shuffleArray(news);
  const trendingNews = news.slice(8, 13); // Adjusted range
  const latestNews = shuffledNews.slice(0, visibleCount);
  const linkBase = "/news";

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, shuffledNews.length));
  };

  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 py-6 lg:py-10">

        {/* Hero Banner Section with Large Carousel (8 cols) + Ad (4 cols) */}
        <section className="mb-12 lg:mb-16">
          <TrendingCards
            title="Breaking News"
            items={news.slice(0, 8)}
            linkBase="/news"
          />
        </section>

        {/* Featured + Top Stories Grid */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Editor's Pick"
            title="Featured Stories"
            showButton={true}
            buttonText="View All"
            buttonUrl="/news"
          />

          {/* Featured Stories Grid - Uniform Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mt-8">
            {news.slice(0, 8).map((item, index) => (
              <Link
                key={item.id}
                href={`${linkBase}/${item.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group block relative"
              >
                {/* Image with Overlay Badges */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <PopularTag label={index === 0 ? "Featured" : "Top Story"} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <TaggingBadge tag="Featured" />
                    <CategoryBadge
                      category={item.tname ?? item.category}
                      icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                    />
                  </div>

                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {item.excerpt || item.content}
                  </p>

                  <div className="flex justify-between items-center text-gray-600 text-xs">
                    {/* Left: Author */}
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span className="truncate">{item.author || "ARIVOM Desk"}</span>
                    </div>

                    {/* Right: Date */}
                    <div className="flex items-center gap-1">
                      <FiClock className="w-3.5 h-3.5" />
                      <span>{customFormatDate(item.created_at)}</span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    {/* Left Side: Like / Bookmark / Share */}
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.preventDefault()}
                    >
                      <LikeButton id={String(item.id)} />
                      <BookmarkButton
                        id={String(item.id)}
                        borderColor="#767676ff"
                        backgroundColor="#ffffffff"
                        savedBackgroundColor="#ffffffff"
                        iconColor="#767676ff"
                        savedIconColor="#6f42c2"
                        dataType="news"
                      />
                      <ShareButton item={item} linkBase={linkBase} />
                    </div>

                    {/* Right Side: Read More */}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer">
                      <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Sidebar Section */}
        <section className="mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area - 8 columns - Latest News Cards */}
            <div className="lg:col-span-8">
              <SectionHeader
                subtitle="Fresh Content"
                title="Latest News"
                showButton={false}
                buttonText=""
                buttonUrl=""
              />

              {/* Grid of Cards - Matching Home Page CardView Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
                {latestNews.map((item, index) => {
                  // Create varied layouts - every 6th card is full width
                  const isFullWidth = index % 6 === 0 && index !== 0;

                  return (
                    <Link
                      key={item.id}
                      href={`${linkBase}/${item.id}`}
                      className={`bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group block relative ${
                        isFullWidth ? 'sm:col-span-2 lg:col-span-3' : ''
                      }`}
                    >
                      {/* Image with Overlay Badges */}
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                            isFullWidth ? 'h-64 sm:h-80' : 'h-48'
                          }`}
                        />

                        {/* Trending Badge (Top Left Overlay) */}
                        {index < 3 && (
                          <div className="absolute top-2 left-2 z-10">
                            <TrendingBadge />
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <TaggingBadge tag="News" />
                          <CategoryBadge
                            category={item.tname ?? item.category}
                            icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                          />
                        </div>

                        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {item.excerpt || item.content}
                        </p>

                        <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
                          {/* Left: Author */}
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{item.author || "ARIVOM Desk"}</span>
                          </div>

                          {/* Right: Date */}
                          <div className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            <span>{customFormatDate(item.created_at)}</span>
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          {/* Left Side: Like / Bookmark / Share */}
                          <div
                            className="flex items-center gap-3"
                            onClick={(e) => e.preventDefault()}
                          >
                            <LikeButton id={String(item.id)} />
                            <BookmarkButton
                              id={String(item.id)}
                              borderColor="#767676ff"
                              backgroundColor="#ffffffff"
                              savedBackgroundColor="#ffffffff"
                              iconColor="#767676ff"
                              savedIconColor="#6f42c2"
                              dataType="news"
                            />
                            <ShareButton item={item} linkBase={linkBase} />
                          </div>

                          {/* Right Side: Read More */}
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
                            <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Load More Button */}
              {visibleCount < shuffledNews.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 text-white font-semibold rounded-full transition-all hover:scale-105"
                    style={{ backgroundColor: "var(--tertiary)" }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>

            {/* Trending Sidebar - 4 columns */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Trending Section */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 lg:p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-5">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800">Trending Now</h3>
                  </div>

                  <div className="space-y-3">
                    {trendingNews.map((item, index) => (
                      <article
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 group"
                      >
                        <Link href={`${linkBase}/${item.id}`} className="block relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-28 sm:h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2 left-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                              {index + 1}
                            </div>
                          </div>
                        </Link>

                        <div className="p-3 flex flex-col justify-between">
                          <Link href={`${linkBase}/${item.id}`}>
                            <h4 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                              {item.title}
                            </h4>
                          </Link>

                          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="truncate">{item.author || "ARIVOM"}</span>
                            </div>
                            <CategoryBadge
                              category={item.tname ?? item.category}
                              icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                            />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-5 lg:p-6 shadow-lg text-white">
                  <h3 className="text-lg lg:text-xl font-bold mb-3">Stay Updated!</h3>
                  <p className="text-xs sm:text-sm mb-4 text-blue-100">
                    Get the latest news delivered to your inbox
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg text-gray-800 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-lg transition-colors">
                    Subscribe Now
                  </button>
                </div>

                {/* Quick Categories */}
                <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health'].map((cat) => (
                      <Link
                        key={cat}
                        href={`/news?category=${cat.toLowerCase()}`}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs sm:text-sm font-semibold rounded-full hover:from-purple-200 hover:to-pink-200 transition-all"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Most Read */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 lg:p-6 shadow-lg">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Most Read</h3>
                  <div className="space-y-3">
                    {news.slice(13, 18).map((item, index) => (
                      <Link
                        key={item.id}
                        href={`${linkBase}/${item.id}`}
                        className="flex gap-3 group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {customFormatDate(item.created_at)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
