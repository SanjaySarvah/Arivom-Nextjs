"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import SectionHeader from "@/components/Common/SectionHeader";
import TaggingBadge from "@/components/Common/Badges/TaggingBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import TrendingBadge from "@/components/Common/Badges/TrendingBadge";

const BASE_URL = "http://localhost/newsapi";

// ✅ Type definitions
interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug?: string;
}

interface NewsItem {
  id: string;
  category_id: string;
  subcategory_id?: string;
  title: string;
  tname?: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  created_at: string;
}

export default function NewsPortalLayout() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Record<string, CategoryItem>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/get.php`, { cache: "no-store" });
        const data = await res.json();

        if (data.status === "success" && Array.isArray(data.news)) {
          const sorted: NewsItem[] = (data.news as NewsItem[]).sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setNews(sorted);

          // ✅ FIXED TYPE: explicitly define `n` and cast to string[]
          const uniqueCategoryIds: string[] = Array.from(
            new Set(sorted.map((n: NewsItem) => String(n.category_id)))
          );
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

    const loadCategories = async (ids: string[]) => {
      const map: Record<string, CategoryItem> = {};
      for (const id of ids) {
        try {
          const res = await fetch(`${BASE_URL}/categories/get.php?category_id=${id}`);
          const data = await res.json();
          if (data.status === "success" && data.category) {
            map[id] = {
              id,
              name: data.category.name || "",
              tname: data.category.tname || "—",
              slug: data.category.slug || "",
            };
          }
        } catch {
          console.warn("Failed to fetch category:", id);
        }
      }
      setCategories(map);
    };

    loadNews();
  }, []);

  // ✅ Merge news with category Tamil name
  const mergedNews = useMemo(() => {
    return news.map((item) => ({
      ...item,
      category_tname: categories[item.category_id]?.tname || "—",
    }));
  }, [news, categories]);

  const featured = mergedNews[0];
  const gridItems = mergedNews.slice(1, 5);
  const sidebarItems = mergedNews.slice(6, 15);

  const customFormatDate = (date: string | Date): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <p className="text-center py-10">Loading news...</p>;

  return (
    <section>
      <div className="mb-8">
        <SectionHeader
          subtitle="Viral & Vital"
          title="The Pulse of Today"
          showButton={true}
          buttonText="View All"
          buttonUrl="/news/all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 📰 Main Column */}
        <div className="lg:col-span-8 space-y-12">
          {/* ✅ Featured Story */}
          {featured && (
            <Link
              href={`/news/${featured.id}/${featured.slug}`}
              className="block group relative overflow-hidden rounded-xl shadow-lg"
            >
              <div className="relative w-full h-[230px] sm:h-[380px] md:h-[420px] lg:h-[460px] overflow-hidden">
                <img
                  src={`${BASE_URL}/${featured.image}`}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => ((e.target as HTMLImageElement).src = "/fallback.jpg")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white/90 via-white/60 to-transparent backdrop-blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 p-6 text-gray-900">
                <CategoryBadge
                  category={featured.category_tname}
                  icon={<FaRegNewspaper className="text-gray-800 w-3 h-3" />}
                />
                <h3 className="text-gray-700 line-clamp-2 mt-1">{featured.tname}</h3>
              </div>
            </Link>
          )}

          {/* ✅ Grid Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridItems.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}/${item.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group block"
              >
                <div className="relative">
                  <img
                    src={`${BASE_URL}/${item.image}`}
                    alt={item.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => ((e.target as HTMLImageElement).src = "/fallback.jpg")}
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <TrendingBadge />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <TaggingBadge tag="entertainment" />
                    <CategoryBadge
                      category={item.category_tname}
                      icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                    />
                  </div>

                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                    {item.tname}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 justify-between mt-3">
                    <AuthorBadge author={item.author} />
                    <DateBadge date={item.created_at} formatDate={customFormatDate} />
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div
                      className="flex items-center gap-3"
                      onClick={(e) => e.preventDefault()}
                    >
                      <LikeButton id={String(item.id)} />
                      <BookmarkButton
                        id={String(item.id)}
                        borderColor="#767676ff"
                        backgroundColor="#ffffffff"
                        savedBackgroundColor="#ffffffff"
                        iconColor="#767676ff"
                        savedIconColor="#6f42c2"
                        dataType="news"
                      />
                      <ShareButton item={item} linkBase="/news" />
                    </div>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
                      <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 📰 Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {sidebarItems.map((item) => (
            <Link key={item.id} href={`/news/${item.id}/${item.slug}`} className="group block">
              <div className="flex gap-4 items-start rounded-lg p-3 bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <img
                  src={`${BASE_URL}/${item.image}`}
                  alt={item.title}
                  className="w-35 h-20 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => ((e.target as HTMLImageElement).src = "/fallback.jpg")}
                />
                <div className="flex flex-col justify-between flex-1">
                  <p className="line-clamp-2 text-gray-900">{item.title}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500 w-full">
                    <AuthorBadge author={item.author} />
                    <CategoryBadge
                      category={item.category_tname}
                      icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
