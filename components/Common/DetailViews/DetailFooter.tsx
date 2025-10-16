"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import LikeButton from "@/components/Common/Badges/LikeButton";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import ShareButton from "@/components/Common/Badges/ShareButton";

interface DetailFooterProps {
  likeCount?: number;
  commentCount?: number;
  authorName?: string;
  date?: string | Date;
  formatDate?: (date: string | Date) => string;
  item?: any;
  linkBase?: string;
}

const DetailFooter: React.FC<DetailFooterProps> = ({
  likeCount = 0,
  commentCount = 0,
  authorName,
  item,
  linkBase = "/", // ✅ default value to ensure string
}) => {
  const formatCount = (count: number): string => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <footer className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] z-40">
      {authorName && (
        <div className="absolute -top-8 left-0">
          <div className="bg-white text-gray-700 px-3 py-1.5 rounded-r-lg rounded-t-lg shadow-sm border border-gray-200">
            <span className="text-xs font-semibold whitespace-nowrap">By {authorName}</span>
          </div>
        </div>
      )}

      <div className="flex justify-around items-center py-3 px-4 max-w-screen-xl mx-auto text-gray-700 font-medium">
        {/* Like */}
        <div className="relative flex items-center justify-center min-w-[60px]">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <LikeButton id={String(item?.id || 0)} />
          </div>
          {likeCount > 0 && (
            <span className="absolute -bottom-1 -right-1 bg-gray-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center border border-white">
              {formatCount(likeCount)}
            </span>
          )}
        </div>

        {/* Comment */}
        <div className="relative flex items-center justify-center min-w-[60px]">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => {
              const commentSection = document.getElementById("comment-section");
              if (commentSection) {
                commentSection.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
          >
            <MessageCircle className="w-5 h-5 text-gray-500" />
          </button>
          {commentCount > 0 && (
            <span className="absolute -bottom-1 -right-1 bg-gray-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center border border-white">
              {formatCount(commentCount)}
            </span>
          )}
        </div>

        {/* Bookmark */}
        <div className="relative flex items-center justify-center min-w-[60px]">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <BookmarkButton
              id={String(item?.id || 0)}
              borderColor="#d1d5db"
              backgroundColor="#f9fafb"
              savedBackgroundColor="#f9fafb"
              iconColor="#6b7280"
              savedIconColor="#6f42c2"
            />
          </div>
        </div>

        {/* Share */}
        <div className="relative flex items-center justify-center min-w-[60px]">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <ShareButton item={item} linkBase={linkBase} /> {/* ✅ linkBase is guaranteed string */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DetailFooter;
