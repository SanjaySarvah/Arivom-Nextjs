"use client";

import { getAllArticles } from "@/lib/getData";
import TrendingCards from "@/components/Common/TrendingCards";
import SectionHeader from "@/components/Common/SectionHeader";
import Link from "next/link";
import { useState } from "react";
import { User } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import PopularTag from "@/components/Common/Badges/PopularTag";
import Popular from "@/components/Common/Sidebar/Popular";
import SectionwiseImportantNews from "@/components/Common/SectionwiseImportantNews";

export default function ArticlesPage() {
  const articles = getAllArticles();
  const [visibleCount, setVisibleCount] = useState(9);
  const hasMore = visibleCount < articles.length;
  const linkBase = "/articles";

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, articles.length));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 py-6 lg:py-10">

        {/* Hero Banner Section with Large Carousel */}
        <section className="mb-12 lg:mb-16">
          <TrendingCards
            title="Breaking Articles"
            items={articles.slice(0, 8)}
            linkBase="/articles"
          />
        </section>

        {/* Popular Section */}
        <section className="mb-10 lg:mb-16">
          <SectionHeader
            subtitle="Happening Now"
            title="Fresh Updates"
            showButton={true}
            buttonText="View All"
            buttonUrl="/articles"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column */}
            <div className="lg:col-span-8">
              <SectionwiseImportantNews
                items={articles}
                linkBase="/articles"
                title="பிரிவு வாரியாக முக்கிய கட்டுரைகள்"
                subtitle="ஒவ்வொரு பிரிவிலும் இருந்து தேர்ந்தெடுக்கப்பட்ட முக்கிய அப்டேட்கள்"
                categoryLabel="தமிழகம்"
                viewAllLink="/articles"
              />
            </div>

            {/* Right Column */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <Popular />
              </div>
            </aside>
          </div>
        </section>

        {/* Featured + Top Articles Grid */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Editor's Pick"
            title="Featured Articles"
            showButton={true}
            buttonText="View All"
            buttonUrl="/articles"
          />

          {/* Featured Articles Grid - Uniform Design - 3 Cards Per Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {articles.slice(0, visibleCount).map((item, index) => (
              <article
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col"
              >
                <Link href={`${linkBase}/${item.id}`} className="block relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-44 sm:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <PopularTag label={index === 0 ? "Featured" : "Top Story"} />
                  </div>
                </Link>

                <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                  <Link href={`${linkBase}/${item.id}`}>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                  </Link>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{item.author || "ARIVOM Desk"}</span>
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
        </section>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="group relative px-6 py-2.5 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
              style={{ background: 'var(--tertiary)' }}
            >
              <span className="relative z-10 flex items-center gap-2 text-sm">
                Load More
                <svg
                  className="w-4 h-4 transform group-hover:translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
