'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import NewsCard from '../components/NewsCard';

type Category = {
  id: number;
  name: string;
  tname?: string;
  slug: string;
};

export default function CategorySlugPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost/newsapi/news/get/get_categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
          const found = data.data.find((c: any) => c.slug === slug);
          if (found) setActiveCategoryId(found.id);
        }
      })
      .catch(err => console.error('Failed to load categories', err));
  }, [slug]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        categories={categories}
        activeCategory={activeCategoryId}
        onSelect={(id: number, s?: string) => {
          if (s) window.location.href = `/news/category/${s}`;
          else window.location.reload();
        }}
      />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Category: {slug}</h1>
        {activeCategoryId ? (
          <FetchNewsForCategory categoryId={activeCategoryId} />
        ) : (
          <p className="text-gray-500">Loading category...</p>
        )}
      </main>
    </div>
  );
}

function FetchNewsForCategory({ categoryId }: { categoryId: number }) {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost/newsapi/news/get/get_news_by_category.php?category_id=${categoryId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setNews(data.data);
      })
      .catch(err => console.error('Failed to load news', err));
  }, [categoryId]);

  if (!news.length) return <p className="text-gray-500">No news found for this category.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map(item => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
