'use client';

import Link from 'next/link';
import React from 'react';

export default function NewsCard({ item }: any) {
  if (!item) return null;

  const imgSrc = item.image?.startsWith('http') ? item.image : `http://localhost/newsapi/news/${item.image}`;

  return (
    <Link
      href={`/news/${item.id}`}
      className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
    >
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={imgSrc}
          alt={item.title || 'news image'}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/no-image.jpg';
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">{item.tname || item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
        <div className="text-xs text-gray-400 mt-2">By {item.author}</div>
      </div>
    </Link>
  );
}
