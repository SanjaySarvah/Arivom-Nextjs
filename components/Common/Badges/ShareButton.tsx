"use client";
import { FC } from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const ShareButton: FC<ShareButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all"
  >
    <Share2 className="w-4 h-4 text-gray-600 hover:text-green-600" />
  </button>
);

export default ShareButton;
