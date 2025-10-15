"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Newspaper,
  BookOpen,
  UserPlus,
  Share2,
} from "lucide-react";

interface CommonFooterProps {
  onJoinClick?: () => void;
  onShareClick?: () => void;
}

const CommonFooter: React.FC<CommonFooterProps> = ({
  onJoinClick,
  onShareClick,
}) => {
  const pathname = usePathname();

  return (
    <footer className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-40">
      <div className="flex justify-around items-center py-2.5 px-2">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            pathname === "/" ? "text-[#2ecc71]" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Home size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Home</span>
        </Link>

        {/* News */}
        <Link
          href="/news"
          className={`flex flex-col items-center gap-1 transition-colors ${
            pathname.startsWith("/news")
              ? "text-[#2ecc71]"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Newspaper size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">News</span>
        </Link>

        {/* Articles */}
        <Link
          href="/articles"
          className={`flex flex-col items-center gap-1 transition-colors ${
            pathname.startsWith("/articles")
              ? "text-[#2ecc71]"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <BookOpen size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Articles</span>
        </Link>

        {/* Join Us */}
        <button
          onClick={onJoinClick}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#2ecc71] transition-colors"
        >
          <UserPlus size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Join</span>
        </button>

        {/* Share */}
        <button
          onClick={onShareClick}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#2ecc71] transition-colors"
        >
          <Share2 size={20} strokeWidth={1.8} />
          <span className="text-[11px] font-medium">Share</span>
        </button>
      </div>
    </footer>
  );
};

export default CommonFooter;
