'use client';

import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

export default function NewsGrid({ categoryId }: { categoryId: number }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/newsapi/news/get/get_news_by_category.php?category_id=${categoryId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setNews(data.data);
      });
  }, [categoryId]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.length > 0 ? (
        news.map((item: any) => <NewsCard key={item.id} item={item} />)
      ) : (
        <p className="text-gray-500">No news found for this category.</p>
      )}
    </div>
  );
}
