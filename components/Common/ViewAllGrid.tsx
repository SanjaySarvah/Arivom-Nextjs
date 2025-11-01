"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import PopularTag from "@/components/Common/Badges/PopularTag";

// 👇 Direct API base URL
const BASE_URL = "http://localhost/newsapi";

interface NewsItem {
  id: string;
  category_id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  created_at: string;
  tname?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug: string;
  created_at: string;
}

const CardView: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Record<string, CategoryItem>>({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch News + Category Data
  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/get.php`, { cache: "no-store" });
        const data = await res.json();

        if (data.status === "success" && Array.isArray(data.news)) {
          // Sort by date (latest first)
          const sortedNews: NewsItem[] = [...data.news].sort(
            (a: NewsItem, b: NewsItem) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

          // Take top 4 latest items
          const latestNews = sortedNews.slice(0, 4);
          setNews(latestNews);

          // Extract unique category IDs
          const uniqueCategoryIds = [...new Set(latestNews.map((n) => n.category_id))];
          await loadCategories(uniqueCategoryIds);
        } else {
          console.error("Invalid API format:", data);
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async (categoryIds: string[]) => {
      const categoryMap: Record<string, CategoryItem> = {};

      for (const id of categoryIds) {
        try {
          const res = await fetch(`${BASE_URL}/categories/get.php?category_id=${id}`, {
            cache: "no-store",
          });
          const data = await res.json();

          if (data.status === "success" && data.category) {
            categoryMap[id] = data.category;
          }
        } catch (err) {
          console.error("Error loading category:", id, err);
        }
      }

      setCategories(categoryMap);
    };

    loadNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading latest news...</p>;
  if (!news.length) return <p className="text-center py-10">No recent news available.</p>;

  return (
<div
  className="
    grid 
    grid-cols-1           /* 📱 Mobile: 1 column */
    sm:grid-cols-2         /* 💻 Tablet and up: 2 columns */
    gap-4 sm:gap-5 md:gap-6
  "
>
  {news.map((item) => {
    const category = categories[item.category_id];
    return (
      <article
        key={item.id}
        className="
          bg-white 
          border 
          border-gray-200 
          rounded-xl 
          overflow-hidden 
          hover:shadow-md 
          transition-all 
          duration-300 
          group
        "
      >
        {/* ✅ Image */}
        <Link href={`/news/${item.id}`} className="block relative overflow-hidden">
          <img
            src={`${BASE_URL}/${item.image}`}
            alt={item.title}
            className="
              w-full 
              h-[220px] sm:h-[240px] md:h-[260px] 
              object-cover 
              transition-transform 
              duration-500 
              group-hover:scale-105
            "
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/fallback.jpg";
            }}
          />
          <div className="absolute top-2 left-2">
            <PopularTag label="Popular" />
          </div>
        </Link>

        {/* ✅ Content */}
        <div className="p-3 sm:p-4 flex flex-col justify-between">
          <Link href={`/news/${item.id}`}>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug group-hover:text-[var(--secondary)] transition-colors line-clamp-2">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {item.excerpt}
              </p>
            )}
          </Link>

          {/* ✅ Footer */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{item.author || "ARIVOM Desk"}</span>
            </div>

            <CategoryBadge
              category={category ? category.tname : "—"}
              icon={<FaRegNewspaper className="text-white w-3 h-3" />}
            />
          </div>
        </div>
      </article>
    );
  })}
</div>

  );
};

export default CardView;
