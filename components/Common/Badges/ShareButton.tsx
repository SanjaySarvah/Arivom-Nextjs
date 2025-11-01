"use client";

import { FC, MouseEvent, useEffect, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userId = localStorage.getItem("user_id");
    setIsLoggedIn(!!userId);
  }, []);

  const handleShare = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      alert("Please sign in to share this post.");
      return;
    }

    const itemUrl = `${window.location.origin}${linkBase}/${item.id}`;
    const userId = localStorage.getItem("user_id") || "0";

    let shared = false;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: "content" in item ? item.content || "" : "",
          url: itemUrl,
        });
        shared = true;
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(itemUrl);
        shared = true;
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

    // ✅ Once successfully shared or copied, update count in backend
    if (shared) {
      try {
        const response = await fetch("http://localhost/newsapi/news/active.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            news_id: Number(item.id),
            user_id: Number(userId),
            share_status: 1,
          }),
        });

        const data = await response.json();
        console.log("✅ Share API Response:", data);
      } catch (err) {
        console.error("❌ Share API Error:", err);
      }
    }
  };

  if (!isClient) return null;

  return (
    <button
      onClick={handleShare}
      disabled={!isLoggedIn}
      aria-label="Share this post"
      className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 transition-all group 
        ${!isLoggedIn ? "opacity-50 blur-[1px] cursor-not-allowed" : ""}
      `}
    >
      <Share2
        className={`w-4 h-4 text-gray-600 transition-all duration-300 
          group-hover:text-green-600 group-hover:fill-green-600
        `}
      />
    </button>
  );
};

export default ShareButton;
