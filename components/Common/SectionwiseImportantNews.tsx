"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";
import LikeButton from "./Badges/LikeButton";
import ShareButton from "./Badges/ShareButton";
import ReadMoreButton from "./Badges/ReadMoreButton";
import DateBadge from "@/components/Common/Badges/DateBadge";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";

// 👇 Direct API base URL
const BASE_URL = "http://localhost/newsapi";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  category_id: string;
  created_at: string;
  tname: string;
}

interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug: string;
  created_at: string;
}

const customFormatDate = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function SectionwiseImportantNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Record<string, CategoryItem>>({});
  const [loading, setLoading] = useState(true);

  // ✅ Load news first
  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/get.php`, { cache: "no-store" });
        const data = await res.json();

        if (data.status === "success" && Array.isArray(data.news)) {
          const sortedNews = [...data.news].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setItems(sortedNews);

          // After loading news, load all category names
          const uniqueCategoryIds = [...new Set(sortedNews.map((n) => n.category_id))];
          await loadCategories(uniqueCategoryIds);
        } else {
          console.error("Invalid API format:", data);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setItems([]);
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

  if (loading) return <p className="text-center py-10">Loading news...</p>;
  if (!items.length) return <p className="text-center py-10">No news available.</p>;

  const displayItems = items.slice(0, 6);

  return (
    <section className="space-y-4 md:space-y-5">
      {displayItems.map((item) => {
        const category = categories[item.category_id];
        return (
         <article
  key={item.id}
  className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 group"
>
  {/* ✅ Image Section */}
  <div
    className="
      relative 
      w-full sm:w-[280px] md:w-[320px] lg:w-[390px]   /* Responsive width */
      h-[220px] sm:h-[200px] md:h-[220px] lg:h-[240px] /* Responsive height */
      flex-shrink-0 
      overflow-hidden 
      rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none
    "
  >
    <Link href={`/news/${item.id}`}>
      <img
        src={`${BASE_URL}/${item.image}`}
        alt={item.title}
        className="
          w-full 
          h-full 
          object-cover 
          transform 
          group-hover:scale-105 
          transition-transform 
          duration-700 
          ease-out
        "
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/fallback.jpg";
        }}
      />

      {/* ✅ Subtle dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Link>
  </div>

  {/* ✅ Content Section */}
  <div className="flex-1 sm:p-5 p-3 flex flex-col justify-between">
    <div>
      <Link href={`/news/${item.id}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[var(--secondary)] transition-colors duration-300">
          {item.tname}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
      </Link>
    </div>

    {/* ✅ Meta Info */}
    <div className="flex items-center justify-between text-gray-500 mt-2">
      <div className="flex items-center gap-1">
        <AuthorBadge author={item.author} />
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5">
        <DateBadge date={item.created_at} formatDate={customFormatDate} />
      </div>
      <CategoryBadge
        category={category ? category.tname : "—"}
        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
      />
    </div>

    {/* ✅ Buttons */}
    <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-3">
      <div className="flex items-center gap-3">
        <LikeButton id={String(item.id)} />
        <ShareButton item={item} linkBase="/news" />
      </div>
      <ReadMoreButton href={`/news/${item.id}`} />
    </div>
  </div>
</article>

        );
      })}
    </section>
  );
}
