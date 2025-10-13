"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiChevronRight } from "react-icons/fi";
import { Heart, Bookmark, Share2, User } from "lucide-react";

import { ArrowRight } from 'lucide-react'

import { getLatestNews, transformToGeneralPost } from "@/lib/getData";

// ✅ Helper for date formatting
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const NewsGrid: React.FC = () => {
  const allNews = getLatestNews(10);
  const newsItems = transformToGeneralPost(allNews);

  if (newsItems.length === 0) return null;

  const mainStory = newsItems[0];
  const rightTop = newsItems[1];
  const rightBottom = newsItems[2];
  const gridStories = newsItems.slice(3, 9);

  return (
    <div className="py-8">
      {/* 🔹 Top Section */}





      <div className="mb-8 text-left">
        <div className="flex items-center gap-4">
          {/* Heading Section */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600 shadow-lg"></div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                News
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                dvjvdcuig
              </h2>
            </div>
          </div>

          {/* Divider Line */}
          <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-4"></div>

          <button className="relative px-6 py-2 font-semibold rounded-lg border-2 border-green-500 text-green-600 overflow-hidden transition-all duration-300 group flex items-center gap-2">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View All
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover:text-white" />
            <span className="absolute inset-0 bg-green-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
          </button>

        </div>
      </div>







      <div className="grid md:grid-cols-3 gap-6">
        {/* Left — Big Story */}
        <Link
          href={`/news/${mainStory.id}`}
          className="md:col-span-2 block group cursor-pointer"
        >
          <div className="relative w-full h-72 md:h-[420px] overflow-hidden rounded-2xl">
            <Image
              src={mainStory.image}
              alt={mainStory.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="mt-4">
            <h3 className=" font-bold leading-tight text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              {mainStory.title}
            </h3>
            <p className="text-gray-700 mt-2 text-lg line-clamp-3">
              {mainStory.description}  {mainStory.description}  {mainStory.description}  {mainStory.description}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {formatDate(mainStory.date)} • {mainStory.category}
            </p>
          </div>
        </Link>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Top small story */}
          {rightTop && (
            <Link
              href={`/news/${rightTop.id}`}
              className="block group cursor-pointer"
            >
              <div className="relative w-full h-48 overflow-hidden rounded-xl">
                <Image
                  src={rightTop.image}
                  alt={rightTop.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                {rightTop.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {rightTop.description}
              </p>
            </Link>
          )}

          {/* Bottom small story */}
          {rightBottom && (
            <Link
              href={`/news/${rightBottom.id}`}
              className="block border-t border-gray-200 pt-4 group cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                {rightBottom.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {rightBottom.description}
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* 🔹 Bottom Grid Section */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridStories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col group hover:shadow-lg transform border border-gray-200"
          >


            {/* Image */}
            <Link href={`/news/${item.id}`} className="block">
              <div className="relative h-48 md:h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-5 md:p-6 flex-1 flex flex-col">
              {/* Category */}
              <div className="mb-2">
                <span
                  className="inline-block text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: "var(--tertiary)" }}
                >
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <Link href={`/news/${item.id}`}>
                <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-tight text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </div>
              </Link>

              {/* Action Buttons Footer */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                {/* Like Button */}
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group/like"
                  aria-label="Like"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-4 h-4 text-gray-600 group-hover/like:text-red-500 transition-colors" />
                </button>

                {/* Bookmark Button */}
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group/bookmark"
                  aria-label="Bookmark"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Bookmark className="w-4 h-4 text-gray-600 group-hover/bookmark:text-blue-500 transition-colors" />
                </button>

                {/* Share Button */}
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full border transition-all group/share"
                  style={{ borderColor: 'var(--tertiary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--tertiary-light, #d4edda)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  aria-label="Share"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2
                    className="w-4 h-4 transition-colors"
                    style={{ color: 'var(--tertiary)' }}
                  />
                </button>

                {/* Next/Arrow Button */}
                <Link
                  href={`/news/${item.id}`}
                  className="ml-auto flex items-center justify-center w-9 h-9 rounded-full text-white transition-all hover:scale-110"
                  style={{ backgroundColor: "var(--tertiary)" }}
                  aria-label="Read more"
                >
                  <FiChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
