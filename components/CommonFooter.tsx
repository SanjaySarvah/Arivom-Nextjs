"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaRegNewspaper, FaBook, FaUserPlus, FaShareAlt } from 'react-icons/fa';

interface CommonFooterProps {
  onJoinClick?: () => void;
  onShareClick?: () => void;
}

const CommonFooter: React.FC<CommonFooterProps> = ({ onJoinClick, onShareClick }) => {
  const pathname = usePathname();

  return (
    <footer className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center py-3 px-2">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/" ? "text-[#2ecc71]" : "text-gray-600"
          }`}
        >
          <FaHome size={20} />
          <span className="text-xs font-medium">Home</span>
        </Link>

        {/* News */}
        <Link
          href="/news"
          className={`flex flex-col items-center gap-1 ${
            pathname.startsWith("/news") ? "text-[#2ecc71]" : "text-gray-600"
          }`}
        >
          <FaRegNewspaper size={20} />
          <span className="text-xs font-medium">News</span>
        </Link>

        {/* Articles */}
        <Link
          href="/articles"
          className={`flex flex-col items-center gap-1 ${
            pathname.startsWith("/articles") ? "text-[#2ecc71]" : "text-gray-600"
          }`}
        >
          <FaBook size={20} />
          <span className="text-xs font-medium">Articles</span>
        </Link>

        {/* Join Us */}
        <button
          onClick={onJoinClick}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <FaUserPlus size={20} />
          <span className="text-xs font-medium">Join Us</span>
        </button>

        {/* Share */}
        <button
          onClick={onShareClick}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <FaShareAlt size={20} />
          <span className="text-xs font-medium">Share</span>
        </button>
      </div>
    </footer>
  );
};

export default CommonFooter;
