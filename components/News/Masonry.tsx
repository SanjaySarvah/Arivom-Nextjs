"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import { FaRegNewspaper } from "react-icons/fa";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import { NewsItem, ArticleItem } from "@/lib/getData";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";

import {
  getAllNews,
  getNewsByCategory,
  transformToGeneralPost,
} from "@/lib/getData";
import PopularTag from "../Common/Badges/PopularTag";
import DateBadge from "../Common/Badges/DateBadge";

type Category = string;

export default function NewsPortalLayout() {
  // ✅ Only using news data
  const allNews = useMemo(() => transformToGeneralPost(getAllNews()), []);
  const categories = useMemo(
    () => Array.from(new Set(allNews.map((n) => n.category))),
    [allNews]
  );
  const linkBase = "/news";

  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") return allNews;
    return transformToGeneralPost(getNewsByCategory(selectedCategory));
  }, [selectedCategory, allNews]);

  const featured = filteredNews[0];
  const gridItems = filteredNews.slice(1, 5);
  const sidebarItems = filteredNews.slice(7, 16);

 // ✅ Date Formatter
  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="">
      <div className="mb-8 ">
        <div className="flex items-center gap-4">
          {/* Heading Section */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600 shadow-lg"></div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-semibold text-green-600 uppercase tracking-wider">
                News
              </span>
              <h2 className="text-lg sm:text-2xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                முக்கிய செய்திகள்
              </h2>
            </div>
          </div>

          {/* Divider Line */}
          <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-4"></div>

          {/* View All Button */}
          <Link
            href="/news"
            className="relative px-2 py-1 sm:px-5 sm:py-2 text-[10px] sm:text-base font-semibold rounded-md border border-green-500 text-green-600 overflow-hidden transition-all duration-300 group flex items-center gap-1 sm:gap-2"
            aria-label="View All"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View All
            </span>

            <FiChevronRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-300 group-hover:text-white" />

            <span className="absolute inset-0 bg-green-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
          </Link>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 📰 Featured + Grid Section */}
          <div className="lg:col-span-8 space-y-12">
            {/* Featured Story */}
            {featured && (
              <Link
                href={`/news/${featured.id}`}
                className="block group MobileViewContent "
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <div className="relative w-full h-[420px] overflow-hidden group">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/30 transition"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-0 p-6 text-white">
                    <span
                      className="inline-block self-start text-white text-xs font-semibold rounded px-2 py-0.5 mb-5"
                      style={{ backgroundColor: "var(--tertiary)" }}
                    >
                      <CategoryBadge
                        className=""
                        category={featured.category}
                        icon={
                          <FaRegNewspaper className="text-white w-3 h-3 " />
                        }
                      />
                    </span>
                    <span className="font-bold text-base sm:text-xl md:text-xl mb-1.5 sm:mb-2 line-clamp-2 leading-tight transition text-white MobileViewContent hover:underline decoration-white decoration-2 underline-offset-4 mb-5">
                      {featured.title}
                    </span>
                    <p className="text-blue-100 text-base md:text-lg line-clamp-2 ">
                      {featured.description}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid Stories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gridItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group block"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <PopularTag label="popular" />

                      <CategoryBadge
                        category={item.category}
                        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                      />
                    </div>

                    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                    {/* Author + Date */}
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 justify-between">
                      <AuthorBadge author={item.author} />
                      <DateBadge
                        date={item.created_at}
                        formatDate={customFormatDate}
                      />
                    </div>
                    {/* Buttons Row */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      {/* Left Side Icons */}
                      <div className="flex items-center gap-3" onClick={(e) => e.preventDefault()}>
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

                      {/* Right Side Read More Button */}
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
                        <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4.5">
              {sidebarItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group block"
                >
                  <div className="flex gap-4 items-start rounded-lg p-3 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[var(--primary-color)] hover:scale-[1.02]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-20 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <p className="line-clamp-2 transition-colors group-hover:text-[var(--primary-color)] small-textsidebar">
                        {item.title}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500 w-full">
                        {/* Left: Author */}
                        <div className="flex items-center gap-1.5">
                          <AuthorBadge author={item.author} />
                        </div>

                        {/* Right: Category */}
                        <div className="flex items-center gap-1.5">
                          <CategoryBadge
                            category={item.category}
                            icon={
                              <FaRegNewspaper className="text-white w-3 h-3" />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
