import React from 'react';
import Link from 'next/link';
import { FaHome, FaHeart, FaEye, FaComment, FaShareAlt } from 'react-icons/fa';

interface DetailFooterProps {
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
  onLike?: () => void;
  onShare?: () => void;
}

const DetailFooter: React.FC<DetailFooterProps> = ({
  likeCount = 0,
  viewCount = 2300,
  commentCount = 0,
  onLike,
  onShare,
}) => {
  return (
    <footer className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center py-3 px-4 max-w-screen-xl mx-auto">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-[#2ecc71] hover:text-[#27ae60] transition-colors"
        >
          <FaHome size={24} />
          <span className="text-xs font-medium">Home</span>
        </Link>

        {/* Like */}
        <button
          onClick={onLike}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#2ecc71] transition-colors"
        >
          <FaHeart size={24} />
          <span className="text-sm font-semibold">{likeCount}</span>
        </button>

        {/* Views */}
        <div className="flex flex-col items-center gap-1 text-gray-600">
          <FaEye size={24} />
          <span className="text-sm font-semibold">
            {viewCount >= 1000 ? `${(viewCount / 1000).toFixed(1)}k` : viewCount}
          </span>
        </div>

        {/* Comments */}
        <button className="flex flex-col items-center gap-1 text-green-500 hover:text-green-600 transition-colors">
          <FaComment size={24} />
          <span className="text-sm font-semibold">{commentCount}</span>
        </button>

        {/* Share */}
        <button
          onClick={onShare}
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <FaShareAlt size={24} />
          <span className="text-xs font-medium">Share</span>
        </button>
      </div>
    </footer>
  );
};

export default DetailFooter;
