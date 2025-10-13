"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface BookmarkButtonProps {
  id: string | number;
  onToggle?: (isSaved: boolean) => void;
  size?: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ id, onToggle, size = 20 }) => {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  // ✅ Ensure localStorage is accessed only in the browser
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

  // ✅ Persist to localStorage only on client side
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("savedNews", JSON.stringify(Array.from(savedItems)));
      console.log("💾 Saved to localStorage:", Array.from(savedItems));
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
        console.log("🗑️ Removed bookmark:", key);
      } else {
        newSet.add(key);
        onToggle?.(true);
        console.log("🔖 Added bookmark:", key);
      }

      return newSet;
    });
  };

  const isSaved = savedItems.has(String(id));

  if (!isClient) return null; // prevents SSR mismatch warning

  return (
    <button
      onClick={toggleBookmark}
      className={`group relative flex items-center justify-center 
        w-8 h-8 sm:w-9 sm:h-9 rounded-full 
        border border-[var(--secondary)] 
        bg-[var(--secondary)]/50 backdrop-blur-sm 
        transition-all duration-300 
        hover:bg-[var(--secondary)] hover:scale-110 hover:shadow-[0_0_8px_var(--secondary)]`}
    >
      {isSaved ? (
        <BookmarkCheck
          className="text-white transition-transform duration-300 group-hover:scale-110"
          style={{ width: size, height: size }}
        />
      ) : (
        <Bookmark
          className="stroke-white transition-transform duration-300 group-hover:scale-110"
          style={{ width: size, height: size }}
        />
      )}
    </button>
  );
};

export default BookmarkButton;
