import React from 'react';
import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';

interface PopularArticle {
  id: number;
  title: string;
  count: number;
}

const popularArticlesData: PopularArticle[] = [
  {
    id: 1,
    title: 'அரசியல் செய்திகள்',
    count: 0
  },
  {
    id: 2,
    title: 'சமூகத்தின் நிலவரம்',
    count: 1
  },
  {
    id: 3,
    title: 'நடப்பு நிகழ்வுகள்',
    count: 0
  },
  {
    id: 4,
    title: 'உலக அரசியல்',
    count: 0
  },
  {
    id: 5,
    title: 'நாடு மற்றும் உலகம் செய்திகள்',
    count: 4
  }
];

const PopularArticles: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Popular Articles
        </h2>
        <Link
          href="/popular"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-50 transition-colors"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Articles List */}
      <ul className="space-y-4">
        {popularArticlesData.map((article) => (
          <li key={article.id}>
            <Link
              href={`/category/${article.id}`}
              className="flex items-center justify-between py-1 border-b border-gray-200 hover:bg-gray-50 transition-colors px-2 rounded group"
            >
              <div className="flex items-center gap-3">
                {/* Document Icon */}
               
                 <Newspaper className="w-5 h-5 text-green-600" />

                {/* Title */}
                <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                  {article.title}
                </span>
              </div>

              {/* Count Badge */}
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium min-w-[2rem] text-center">
                {article.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularArticles;
