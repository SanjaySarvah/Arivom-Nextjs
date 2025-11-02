'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
  tname?: string;
  slug: string;
};

type Subcategory = {
  id: number;
  category_id: number;
  name: string;
  tname?: string;
  slug: string;
};

export default function Sidebar({ categories, activeCategory, onSelect }: any) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    fetch('http://localhost/newsapi/news/get/get_subcategories.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSubcategories(data.data);
      })
      .catch(err => console.error('Failed to load subcategories', err));
  }, []);

  const subsForActive = subcategories.filter(s => s.category_id === activeCategory);

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Categories</h2>

      <ul className="space-y-2">
        {categories.map((cat: Category) => (
          <li
            key={cat.id}
            onClick={() => onSelect(cat.id, cat.slug)}
            className={`cursor-pointer px-3 py-2 rounded-lg ${
              activeCategory === cat.id ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {cat.tname || cat.name}
          </li>
        ))}
      </ul>

      {subsForActive.length > 0 && (
        <>
          <h3 className="mt-6 mb-2 text-sm font-semibold text-gray-600">Subcategories</h3>
          <ul className="ml-3 space-y-1">
            {subsForActive.map(sub => (
              <li key={sub.id}>
                <Link href={`/news/category/${sub.slug}`} className="block text-gray-700 hover:text-blue-600 text-sm">
                  {sub.tname || sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
