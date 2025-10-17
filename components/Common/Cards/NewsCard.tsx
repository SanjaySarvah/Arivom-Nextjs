"use client";

import React from "react";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { User } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import { NewsItem } from "@/lib/getData";

interface NewsCardProps {
  item: NewsItem;
  linkBase: string;
  variant?: "default" | "compact";
}

const NewsCard: React.FC<NewsCardProps> = ({ item, linkBase, variant = "default" }) => {
  if (variant === "compact") {
    return (
      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <Link href={`${linkBase}/${item.id}`} className="block relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-2 left-2">
            <CategoryBadge
              category={item.tname ?? item.category}
              icon={<FaRegNewspaper className="text-white w-2.5 h-2.5" />}
            />
          </div>
        </Link>

        <div className="p-3">
          <Link href={`${linkBase}/${item.id}`}>
            <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[var(--secondary)] transition-colors line-clamp-2 mb-2">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                {item.excerpt}
              </p>
            )}
          </Link>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              <span className="truncate">
                {new Date(item.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <LikeButton id={String(item.id)} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <Link href={`${linkBase}/${item.id}`} className="block relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-48 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge
            category={item.tname ?? item.category}
            icon={<FaRegNewspaper className="text-white w-3 h-3" />}
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`${linkBase}/${item.id}`}>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-[var(--secondary)] transition-colors line-clamp-2 mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.excerpt || item.content}</p>
        </Link>

        <div className="flex justify-between items-center text-gray-600 text-sm mb-3">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{item.author || "ARIVOM Desk"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>
              {new Date(item.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3" onClick={(e) => e.preventDefault()}>
            <LikeButton id={String(item.id)} />
            <ShareButton item={item} linkBase={linkBase} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
