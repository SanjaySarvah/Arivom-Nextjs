'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NewsGrid from '../components/NewsGrid';

export default function CategoryNewsPage() {
  const { id } = useParams();
  const categoryId = id ? Number(id) : null; // ✅ convert to number safely
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!categoryId) return;
    fetch('http://localhost/newsapi/news/get/get_categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const found = data.data.find((c: any) => c.id === categoryId);
          setCategoryName(found?.tname || found?.category || '');
        }
      });
  }, [categoryId]);

  if (!categoryId) {
    return <p className="text-gray-500 p-6">Invalid category ID</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {categoryName ? `${categoryName} News` : 'Loading category...'}
      </h1>
      <NewsGrid categoryId={categoryId} /> {/* ✅ now a number */}
    </div>
  );
}
