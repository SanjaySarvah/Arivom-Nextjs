import React from 'react';
import Link from 'next/link';

interface PopularArticle {
  id: number;
  title: string;
  count: number;
}

const popularArticlesData: PopularArticle[] = [
  {
    id: 1,
    title: 'தமிழகம்',
    count: 17
  },
  {
    id: 2,
    title: 'இந்தியா',
    count: 1
  },
  {
    id: 3,
    title: 'உலகம்',
    count: 1
  },
  {
    id: 4,
    title: 'வேலை வாய்ப்புகள்',
    count: 0
  },
  {
    id: 5,
    title: 'விளையாட்டு',
    count: 0
  },
  {
    id: 6,
    title: 'பொழுதுபோக்கு',
    count: 0
  }
];

const PopularArticles: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg md:text-xl font-bold text-blue-600">
          Popular News
        </h2>
        <Link
          href="/popular"
          className="text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm flex items-center gap-1 border-2 border-blue-600 hover:border-blue-700 rounded-full px-3 py-1 hover:bg-blue-50 transition-all whitespace-nowrap"
        >
          View all &rarr;
        </Link>
      </div>

      {/* Articles List */}
      <ul className="divide-y divide-gray-100">
        {popularArticlesData.map((article) => (
          <li key={article.id}>
            <Link
              href={`/category/${article.id}`}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {/* Newspaper Icon */}
                <svg
                  className="w-4 h-4 text-red-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <rect x="3" y="3" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="6" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5"/>
                </svg>

                {/* Title */}
                <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors text-sm">
                  {article.title}
                </span>
              </div>

              {/* Count Badge */}
              <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-semibold min-w-[2rem] text-center flex-shrink-0">
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
