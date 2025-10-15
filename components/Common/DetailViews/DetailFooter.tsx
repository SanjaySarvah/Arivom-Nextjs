"use client";

import React from "react";
import Link from "next/link";
import { Home, Zap, LayoutGrid, Tag, Wallet } from "lucide-react";

interface DetailFooterProps {
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
  onLike?: () => void;
  onShare?: () => void;
  authorName?: string;
  date?: string | Date;
  formatDate?: (date: string | Date) => string;
}

const DetailFooter: React.FC<DetailFooterProps> = ({
  likeCount = 0,
  viewCount = 2300,
  commentCount = 0,
  onLike,
  onShare,
  authorName,
  date,
  formatDate,
}) => {
  return (
    <footer className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-40">
      {/* Author Badge - Positioned absolutely in top-left corner */}
      {authorName && (
        <div className="absolute -top-8 left-0">
          <div className="bg-white text-gray px-3 py-1.5 rounded-r-lg rounded-t-lg  ">
            <span className="text-xs font-semibold whitespace-nowrap">
              By {authorName}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-around items-center py-2.5 px-2 max-w-screen-xl mx-auto">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 transition-colors text-gray-500 hover:text-[#2ecc71]"
        >
          <Home size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Home</span>
        </Link>

        <Link
          href="/breaking"
          className="flex flex-col items-center gap-1 transition-colors text-gray-500 hover:text-[#2ecc71]"
        >
          <Zap size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Breaking</span>
        </Link>

        <Link
          href="/categories"
          className="flex flex-col items-center gap-1 transition-colors text-gray-500 hover:text-[#2ecc71]"
        >
          <LayoutGrid size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Categories</span>
        </Link>

        <Link
          href="/offers"
          className="flex flex-col items-center gap-1 transition-colors text-gray-500 hover:text-[#2ecc71]"
        >
          <Tag size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Offers</span>
        </Link>

        <Link
          href="/earn-money"
          className="flex flex-col items-center gap-1 transition-colors text-gray-500 hover:text-[#2ecc71]"
        >
          <Wallet size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Earn</span>
        </Link>
      </div>
    </footer>
  );
};

export default DetailFooter;