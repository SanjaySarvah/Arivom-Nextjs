"use client";
import { FC } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  liked: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const LikeButton: FC<LikeButtonProps> = ({ liked, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all ${
      liked ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-500 hover:bg-red-50"
    }`}
  >
    <Heart
      className={`w-4 h-4 ${liked ? "fill-red-500 stroke-red-500" : "stroke-gray-600 hover:stroke-red-500"}`}
    />
  </button>
);

export default LikeButton;
