"use client";
import { FC, MouseEvent } from "react";
import { Share2 } from "lucide-react";
import { ArticleItem, NewsItem } from "@/lib/getData";

interface ShareButtonProps {
  item: NewsItem | ArticleItem;
  linkBase: string;
}

const ShareButton: FC<ShareButtonProps> = ({ item, linkBase }) => {
  const handleShare = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = String(item.id);
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.content,
          url: `${window.location.origin}${linkBase}/${itemId}`,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}${linkBase}/${itemId}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all"
    >
      <Share2 className="w-4 h-4 text-gray-600 hover:text-green-600" />
    </button>
  );
};

export default ShareButton;
