"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface LikeButtonProps {
  id: string | number;
  onToggle?: (isLiked: boolean) => void;
  size?: number;
  borderColor?: string;
  iconColor?: string;
  likedIconColor?: string;
  backgroundColor?: string;
  likedBackgroundColor?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  id,
  onToggle,
  size = 20,
  borderColor = "#e5e7eb",          // border-gray-200
  iconColor = "#4b5563",            // stroke-gray-600
  likedIconColor = "#ef4444",       // red-500
  backgroundColor = "#ffffff",      // white
  likedBackgroundColor = "#fef2f2", // red-50
}) => {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  // ✅ Load from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem("likedNews");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setLikedItems(new Set(parsed));
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("likedNews", JSON.stringify(Array.from(likedItems)));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [likedItems, isClient]);

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setLikedItems((prev) => {
      const newSet = new Set(prev);
      const key = String(id);

      if (newSet.has(key)) {
        newSet.delete(key);
        onToggle?.(false);
      } else {
        newSet.add(key);
        onToggle?.(true);
      }

      return newSet;
    });
  };

  if (!isClient) return null;

  const isLiked = likedItems.has(String(id));

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all ${
        isLiked
          ? "border-red-500 bg-red-50"
          : "border-gray-200 hover:border-red-500 hover:bg-red-50"
      }`}
      style={{
        borderColor: isLiked ? "#ef4444" : borderColor,
        backgroundColor: isLiked ? likedBackgroundColor : backgroundColor,
      }}
    >
      <Heart
        style={{
          width: size,
          height: size,
          stroke: isLiked ? likedIconColor : iconColor,
          fill: isLiked ? likedIconColor : "none",
        }}
      />
    </button>
  );
};

export default LikeButton;
