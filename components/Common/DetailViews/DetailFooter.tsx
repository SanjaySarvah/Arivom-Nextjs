import React from 'react';
import Link from 'next/link';
import {
  FaHome,
  FaHeart,
  FaEye,
  FaComment,
  FaShareAlt,
  FaBolt,
  FaThLarge,
  FaTags,
  FaMoneyBillWave,
} from 'react-icons/fa';

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

        {/* Breaking */}
        <Link
          href="/breaking"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#2ecc71] transition-colors"
        >
          <FaBolt size={24} />
          <span className="text-xs font-medium">Breaking</span>
        </Link>

        {/* Categories */}
        <Link
          href="/categories"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#2ecc71] transition-colors"
        >
          <FaThLarge size={24} />
          <span className="text-xs font-medium">Categories</span>
        </Link>

        {/* Offers and Deals */}
        <Link
          href="/offers"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#2ecc71] transition-colors"
        >
          <FaTags size={24} />
          <span className="text-xs font-medium">Offers</span>
        </Link>

        {/* Earn Money */}
        <Link
          href="/earn-money"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#2ecc71] transition-colors"
        >
          <FaMoneyBillWave size={24} />
          <span className="text-xs font-medium">Earn</span>
        </Link>
      </div>
    </footer>
  );
};

export default DetailFooter;
