"use client";

import { FC, MouseEvent } from "react";
import { Share2 } from "lucide-react";
import { ArticleItem, NewsItem } from "@/lib/getData";

interface GeneralPostItem {
  id: string | number;
  title: string;
  description?: string;
  [key: string]: any;
}

interface ShareButtonProps {
  item: NewsItem | ArticleItem | GeneralPostItem;
  linkBase: string;
}

const ShareButton: FC<ShareButtonProps> = ({ item, linkBase }) => {
  const handleShare = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const itemUrl = `${window.location.origin}${linkBase}/${item.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: "content" in item ? item.content || "" : "",

          url: itemUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(itemUrl);
        // ✅ Non-blocking feedback (no alert)
        const toast = document.createElement("div");
        toast.textContent = "🔗 Link copied!";
        toast.className =
          "fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fadeInOut z-[9999]";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      } catch {
        alert("Failed to copy link.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share this post"
      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
    >
      <Share2 className="w-4 h-4 text-gray-600 group-hover:text-green-600 transition-colors" />
    </button>
  );
};

export default ShareButton;
