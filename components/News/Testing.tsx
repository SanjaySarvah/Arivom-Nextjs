"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  tname: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  highlights: string;
  created_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/newsapi/news/get.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.news)) {
          setNews(data.news);
        }
      })
      .catch((err) => console.error("Error loading news:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading news...</p>;

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`} // ✅ changed from slug to id
            className="group border rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
              <img
                src={`http://localhost/newsapi/${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-teal-600 font-medium mb-1">
                {item.highlights}
              </p>
              <h2 className="text-lg font-semibold group-hover:text-teal-600 transition">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {item.excerpt}
              </p>
              <p className="text-xs text-gray-400 mt-3">By {item.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
