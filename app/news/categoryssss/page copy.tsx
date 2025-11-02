'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import NewsCard from './components/NewsCard';

type Category = {
  id: number;
  name: string;
  tname?: string;
  slug: string;
};

export default function CategoryRootPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost/newsapi/news/get/get_categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
          setActiveCategoryId(data.data[0]?.id ?? null);
        }
      })
      .catch(err => console.error('Failed to load categories', err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        categories={categories}
        activeCategory={activeCategoryId}
        onSelect={(id: number, slug?: string) => {
          // navigate to slug route
          if (slug) {
            window.location.href = `/news/category/${slug}`;
          } else {
            setActiveCategoryId(id);
          }
        }}
      />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Category — Overview</h1>
        {activeCategoryId ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* For the root page we fetch news for activeCategoryId */}
            <FetchNewsForCategory categoryId={activeCategoryId} />
          </div>
        ) : (
          <p className="text-gray-500">No category selected.</p>
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

  if (!news.length) return <p className="text-gray-500">No news found.</p>;

  return (
    <>
      {news.map(item => (
        <NewsCard key={item.id} item={item} />
      ))}
    </>
  );
}
