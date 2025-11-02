'use client';

import React, { useEffect, useState } from 'react';

export default function CategorySidebar({ categories, activeCategory, onSelect }: any) {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (!activeCategory) return;
    fetch(`http://localhost/newsapi/news/get/get_subcategories.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Filter only for active category
          const subs = data.data.filter((s: any) => s.category_id === activeCategory);
          setSubcategories(subs);
        }
      });
  }, [activeCategory]);

  return (
    <div className="w-64 bg-white border-r p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat: any) => (
          <li
            key={cat.id}
            className={`cursor-pointer px-3 py-2 rounded-lg ${
              activeCategory === cat.id ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.tname || cat.name}
          </li>
        ))}
      </ul>

      {subcategories.length > 0 && (
        <>
          <h3 className="mt-5 text-sm font-semibold text-gray-600">Subcategories</h3>
          <ul className="ml-3 mt-2 space-y-1">
            {subcategories.map((sub: any) => (
              <li key={sub.id} className="text-gray-700 hover:text-blue-600 cursor-pointer text-sm">
                {sub.tname || sub.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
