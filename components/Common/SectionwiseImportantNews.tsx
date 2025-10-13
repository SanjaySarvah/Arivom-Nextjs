"use client";

import { FC } from "react";
import Link from "next/link";
import { Heart, Bookmark, Share2, User } from "lucide-react";
import { FiClock, FiChevronRight } from "react-icons/fi";
import LikeButton from "./Badges/LikeButton";
import ShareButton from "./Badges/ShareButton";
import BookmarkButton from "./Badges/BookmarkButton";
import ReadMoreButton from "./Badges/ReadMoreButton";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  subcategory?: string;
  
  excerpt: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  created_at: string;
  days_ago: number;
};

interface Props {
  title: string;
  subtitle?: string;
  categoryLabel: string;
  items: NewsItem[];
  linkBase: string;
  viewAllLink?: string;
}

const SectionwiseImportantNews: FC<Props> = ({
  title,
  subtitle,
  categoryLabel,
  items,
  linkBase,
  viewAllLink,
}) => {
  if (!items || items.length === 0) return null;

  const displayItems = items.slice(0, 5);

  return (
    <section className="py-8">
      <div>
        {/* Header Section */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs md:text-sm text-gray-600">{subtitle}</p>
              )}
            </div>

            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm border-2 border-blue-600 hover:border-blue-700 px-3 py-1.5 rounded-full transition-all hover:bg-blue-50 whitespace-nowrap"
              >
                View all →
              </Link>
            )}
          </div>
        </div>

        {/* Category Label */}
        <div className="mb-3 md:mb-4">
          <h3 className="text-lg md:text-xl font-bold text-blue-600">
            {categoryLabel}
          </h3>
        </div>

        {/* News Cards */}
        <div className="space-y-4 md:space-y-5">
          {displayItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image Section */}
              <div className="relative w-full sm:w-48 md:w-56 lg:w-64 h-40 sm:h-auto flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700">
                <Link href={`${linkBase}/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title || "News Image"}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Branding */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl md:text-2xl opacity-90">
                        ARIVOM
                      </div>
                      <div className="text-white text-xs font-semibold opacity-80">
                        NEWS
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-3 md:p-4 flex flex-col justify-between min-h-[140px] sm:min-h-0">
                {/* Header: User Icon + Name (Left) | Date (Right) */}
               

                <div className="flex-1">
                  {/* Category Tags */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="inline-block px-2 py-0.5 text-white text-xs font-semibold rounded"
                      style={{ backgroundColor: "var(--tertiary)" }}
                    >
                      {item.category}
                    </span>
                    {item.subcategory && (
                      <span className="text-xs text-blue-600 font-medium uppercase">
                        {item.subcategory}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link href={`${linkBase}/${item.id}`}>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-2 mb-2">
                      {item.content || item.excerpt}
                    </p>
                  </Link>
                </div>


                 <div className="flex items-center justify-between">
                  {/* Left: User Icon + Name */}
                  <div className="flex items-center ">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                  
                    >
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.author || 'Rohan Mehta'}
                    </span>
                  </div>

                  {/* Right: Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FiClock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="sm:hidden">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <LikeButton id={String(item.id)} />

                    <ShareButton item={item} linkBase="/news" />

                    <BookmarkButton
                      id={String(item.id)}
                      borderColor="#767676ff"
                      backgroundColor="#ffffffff"
                      savedBackgroundColor="#ffffffff"
                      iconColor="#767676ff"
                      savedIconColor="#6f42c2"
                    />
                  </div>

                  <ReadMoreButton href={`${linkBase}/${String(item.id)}`} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Line clamp styling */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default SectionwiseImportantNews;
