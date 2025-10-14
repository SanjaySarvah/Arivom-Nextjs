"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface BookmarkButtonProps {
  id: string | number;
  onToggle?: (isSaved: boolean) => void;
  size?: number;
  borderColor?: string;
  iconColor?: string;
  savedIconColor?: string;
  backgroundColor?: string;
  savedBackgroundColor?: string;
  dataType?: 'news' | 'article' | 'video'; // Add dataType prop to determine source
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  onToggle,
  size = 20,
  borderColor = "#e5e7eb", // border-gray-200
  iconColor = "#000000ff", // stroke-gray-600
  savedIconColor = "#6f42c2", // red-500
  backgroundColor = "#ffffff", // white
  savedBackgroundColor = "#fef2f2", // red-50
  dataType, // Accept dataType prop
}) => {
  // Hide bookmark button if data is from NewsItem
  if (dataType === 'news') {
    return null;
  }
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem("savedNews");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setSavedItems(new Set(parsed));
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("savedNews", JSON.stringify(Array.from(savedItems)));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [savedItems, isClient]);

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems((prev) => {
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

  const isSaved = savedItems.has(String(id));

  return (
    <button
      onClick={toggleBookmark}
      className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200  transition-all ${
        isSaved
          ? "border-gray-200 bg-red-50"
          : "border-gray-200 hover:border-red-500 hover:bg-red-50"
      }`}
      style={{
        borderColor: isSaved ? "#6f42c2" : borderColor,
        backgroundColor: isSaved ? savedBackgroundColor : backgroundColor,
         borderWidth: "0.1px", // 👈 much thinner border
             borderStyle: "solid",
      }}
    >
      {isSaved ? (
        <BookmarkCheck
          style={{
            width: size,
            height: size,
            stroke: savedIconColor,
            fill: savedIconColor,
          }}
          strokeWidth={1.5} 
        />
      ) : (
        <Bookmark
          style={{
            width: size,
            height: size,
            stroke: iconColor,
          }}
          strokeWidth={2} 
        />
      )}
    </button>
  );
};

export default BookmarkButton;
