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
  slug?: string;
  highlights?: string;
  tags?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug: string;
  created_at: string;
}

const CardView: React.FC = () => {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // 👈 initially show 6
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

          setAllNews(sortedNews);

          // Extract unique category IDs
          const uniqueCategoryIds = [...new Set(sortedNews.map((n) => n.category_id))];
          await loadCategories(uniqueCategoryIds);
        } else {
          console.error("Invalid API format:", data);
          setAllNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setAllNews([]);
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

  // ✅ Handle Load More
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const news = allNews.slice(0, visibleCount);

  if (loading) return <p className="text-center py-10">Loading latest news...</p>;
  if (!news.length) return <p className="text-center py-10">No recent news available.</p>;

  return (
    <section>
      {/* ✅ News Grid */}
      <div className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2">
        {news.map((item) => {
          const category = categories[item.category_id];
          return (
            <article
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              {/* Image */}
              <Link href={`/news/${item.slug}`} className="block relative overflow-hidden">
                <img
                  src={`${BASE_URL}/${item.image}`}
                  alt={item.title}
                  className="h-48 sm:h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback.jpg";
                  }}
                />
                <div className="absolute top-2 left-2">
                  <PopularTag label="popular" />
                </div>
              </Link>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between">
                {/* Title + Description */}
                <Link href={`/news/${item.id}`}>
                  <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.excerpt}</p>
                  )}
                </Link>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
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

      {/* ✅ Load More Button */}
      {visibleCount < allNews.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default CardView;
