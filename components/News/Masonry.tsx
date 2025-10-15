"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import { FaRegNewspaper } from "react-icons/fa";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import SectionHeader from "@/components/Common/SectionHeader";
import PopularTag from "../Common/Badges/PopularTag";
import DateBadge from "../Common/Badges/DateBadge";
import TrendingBadge from "../Common/Badges/TrendingBadge";

import { getAllNews, NewsItem } from "@/lib/getData";
import TaggingBadge from "../Common/Badges/TaggingBadge";

type Category = string;

export default function NewsPortalLayout() {
  // ✅ Only using news data
  const allNews = useMemo(() => getAllNews(), []);
  
  // ✅ Unique categories based on tname
  const categories = useMemo(() => {
    const seen = new Set<string>();
    return allNews
      .filter((n) => n.tname && !seen.has(n.tname))
      .map((n) => {
        seen.add(n.tname!);
        return n.tname!;
      });
  }, [allNews]);

  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") return allNews;
    return allNews.filter(
      (n) => n.tname?.toLowerCase() === selectedCategory.toLowerCase()
    );
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
      <div className="mb-8">
        <SectionHeader
          subtitle="Latest"
          title="Popular News"
          showButton={true}
          buttonText="View All"
          buttonUrl="/news"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 📰 Featured + Grid Section */}
        <div className="lg:col-span-8 space-y-12">
          {featured && (
            <Link href={`/news/${featured.id}`} className="block group">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[440px] overflow-hidden group">
                <img
  src={featured.image}
  alt={featured.title}
  className="w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
/>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 p-6 text-white">
                  <span
                    className="inline-block text-xs font-semibold rounded px-2 py-0.5 mb-5"
                    style={{ backgroundColor: "var(--tertiary)" }}
                  >
                    <CategoryBadge
                      category={featured.tname || featured.category}
                      icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                    />
                  </span>
               
                     <span className="font-bold text-base sm:text-xl md:text-xl mb-1.5 sm:mb-2 line-clamp-2 leading-tight text-white hover:underline decoration-white decoration-2 underline-offset-4">
                            {featured.title}
                          </span>
                  <p className="text-blue-100 mt-2 line-clamp-2">
                    {featured.excerpt}
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
      {/* ✅ Image Container - relative for overlay */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* ✅ TrendingBadge overlay - top-right */}
        <div className="absolute top-2 left-2 z-10">
          <TrendingBadge />
        </div>
      </div>

      {/* ✅ Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <TaggingBadge
            tag="entertainment"
          
          />
          <CategoryBadge
            category={item.tname || item.category}
            icon={<FaRegNewspaper className="text-white w-3 h-3" />}
          />
        </div>

        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {item.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 justify-between mt-3">
          <AuthorBadge author={item.author} />
          <DateBadge date={item.created_at} formatDate={customFormatDate} />
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
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
            <ShareButton item={item} linkBase="/news" />
          </div>

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
          {sidebarItems.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="group block">
              <div className="flex gap-4 items-start rounded-lg p-3 bg-white shadow-sm hover:shadow-md hover:border-[var(--primary-color)] hover:scale-[1.02] transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-20 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col justify-between flex-1">
                  <p className="line-clamp-2 text-gray-900">{item.title}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500 w-full">
                    <AuthorBadge author={item.author} />
                    <CategoryBadge
                      category={item.tname || item.category}
                      icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
