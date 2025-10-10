"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiClock, FiChevronRight } from "react-icons/fi";
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
    <div className="max-w-7xl py-8">
      {/* 🔹 Top Section */}
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
            <h2 className="text-3xl font-bold leading-tight text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              {mainStory.title}
            </h2>
            <p className="text-gray-700 mt-2 text-lg line-clamp-3">
              {mainStory.description}
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
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="block h-full group relative cursor-pointer"
          >
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col group-hover:scale-[1.02] transform border border-gray-200 backdrop-blur-sm">
              {/* Image */}
              <div className="relative h-48 md:h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 flex-1 flex flex-col">
                {/* Category */}
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {item.tname || item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-tight text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {item.description || item.excerpt || item.content}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiUser className="w-3 h-3 text-blue-500" />
                      <span className="font-medium">{item.author}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock className="w-3 h-3 text-purple-500" />
                      <span>{formatDate(item.created_at || item.date)}</span>
                    </span>
                  </div>

                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                    <FiChevronRight className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
