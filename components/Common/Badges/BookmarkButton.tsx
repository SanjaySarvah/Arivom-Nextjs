"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface BookmarkButtonProps {
  id: string | number;
  onToggle?: (isSaved: boolean) => void;
  size?: number;
  
  // 🎨 Comprehensive color customization props
  borderColor?: string;
  iconColor?: string;
  savedIconColor?: string;
  backgroundColor?: string;
  savedBackgroundColor?: string;
  hoverShadowColor?: string;
  hoverIconColor?: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  onToggle,
  size = 20,
  
  // Color props with defaults
  borderColor = "var(--secondary)",
  iconColor = "#ffffff",
  savedIconColor = "#ffffff",
  backgroundColor = "var(--secondary)80", // 50% transparent
  savedBackgroundColor = "var(--secondary)",
  hoverShadowColor = "var(--secondary)",
  hoverIconColor = "#ffffff",
}) => {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem("savedNews");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedItems(new Set(parsed));
        }
      }
    } catch (err) {
      console.error("❌ Error reading localStorage:", err);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("savedNews", JSON.stringify(Array.from(savedItems)));
    } catch (err) {
      console.error("❌ Error saving to localStorage:", err);
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

  const isSaved = savedItems.has(String(id));

  if (!isClient) return null;

  // 🎨 Calculate current colors based on state
  const currentBorderColor = borderColor;
  const currentBackgroundColor = isSaved ? savedBackgroundColor : backgroundColor;
  const currentIconColor = isHovered ? hoverIconColor : (isSaved ? savedIconColor : iconColor);
  const currentShadow = isHovered ? `0 0 8px ${hoverShadowColor}` : 'none';

  return (
    <button
      onClick={toggleBookmark}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-center 
        w-8 h-8 sm:w-9 sm:h-9 rounded-full 
        border transition-all duration-300 
        hover:scale-110"
      style={{
        borderColor: currentBorderColor,
        backgroundColor: currentBackgroundColor,
        boxShadow: currentShadow,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {isSaved ? (
        <BookmarkCheck
          style={{ 
            width: size, 
            height: size, 
            color: currentIconColor,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
          className="transition-all duration-300"
        />
      ) : (
        <Bookmark
          style={{ 
            width: size, 
            height: size, 
            color: currentIconColor,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
          className="transition-all duration-300"
        />
      )}
    </button>
  );
};

export default BookmarkButton;