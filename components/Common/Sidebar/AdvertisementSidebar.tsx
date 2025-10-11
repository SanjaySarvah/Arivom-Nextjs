"use client";

import Link from "next/link";
import { Heart, Bookmark, Share2, User } from "lucide-react";
import { FiChevronRight } from "react-icons/fi";
import { FC } from "react";
import { NewsItem, ArticleItem } from "@/lib/getData";

interface Props {
  items: NewsItem[] | ArticleItem[];
  linkBase: string;
  likedItems: Set<string | number>;
  savedItems: Set<string | number>;
  toggleLike: (id: string | number, e: React.MouseEvent) => void;
  toggleSave: (id: string | number, e: React.MouseEvent) => void;
  handleShare: (item: NewsItem | ArticleItem, e: React.MouseEvent) => void;
}

const AdvertisementSidebar: FC<Props> = ({
  items,
  linkBase,
  likedItems,
  savedItems,
  toggleLike,
  toggleSave,
  handleShare,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full lg:w-1/3 h-[550px] sm:h-[600px] lg:h-[600px]">
      <div className="flex flex-col gap-5 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group"
          >
            {/* Sponsored Label */}
            <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shadow-sm">
              Sponsored
            </div>

            {/* Ad Content */}
            <Link href={`${linkBase}/${String(item.id)}`} className="flex gap-3 p-3 sm:p-4">
              {/* Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500"></div>
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-2 mb-2 leading-tight group-hover:text-green-700 transition-colors">
                  {item.title}
                </h3>

                <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-medium truncate">{item.author || "Rohan Mehta"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="inline-block text-white text-[11px] font-semibold rounded px-2 py-0.5 shadow-sm"
                      style={{ backgroundColor: "var(--tertiary)" }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Buttons */}
            <div className="px-3 pb-3 bg-white border-t border-gray-200 pt-2.5">
              <div className="flex items-center gap-2">
                {/* Like */}
                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                    likedItems.has(item.id)
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      likedItems.has(item.id)
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-gray-600 hover:stroke-red-500"
                    }`}
                  />
                </button>

                {/* Save */}
                <button
                  onClick={(e) => toggleSave(item.id, e)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                    savedItems.has(item.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 transition-colors ${
                      savedItems.has(item.id)
                        ? "fill-blue-500 stroke-blue-500"
                        : "stroke-gray-600 hover:stroke-blue-500"
                    }`}
                  />
                </button>

                {/* Share */}
                <button
                  onClick={(e) => handleShare(item, e)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:border-green-500 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-gray-600 hover:text-green-600" />
                </button>

                {/* CTA */}
                <Link
                  href={`${linkBase}/${String(item.id)}`}
                  className="ml-auto flex items-center justify-center w-8 h-8 rounded-full text-white transition-all hover:scale-110 shadow-md"
                  style={{ backgroundColor: "var(--tertiary)" }}
                >
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSidebar;
