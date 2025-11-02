'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  tname: string;
  slug: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/newsapi/news/get/get_categories.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      })
      .catch((err) => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">News Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/news/category/${cat.slug}/${cat.id}`}
            className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 p-5 text-center"
          >
            <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>
            <p className="text-sm text-gray-500">{cat.tname}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
