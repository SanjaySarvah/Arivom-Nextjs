import React from 'react';
import { Newspaper, ArrowRight } from 'lucide-react';

interface NewsCategory {
  id: string;
  name: string;
  count: number;
}

interface PopularNewsProps {
  categories?: NewsCategory[];
}

export default function PopularNews({ categories }: PopularNewsProps) {
  const defaultCategories: NewsCategory[] = [
    { id: '1', name: 'தமிழகம்', count: 17 },
    { id: '2', name: 'இந்தியா', count: 1 },
    { id: '3', name: 'உலகம்', count: 1 },
    { id: '4', name: 'வேலை வாய்ப்புகள்', count: 0 },
    { id: '5', name: 'விளையாட்டு', count: 0 },
    { id: '6', name: 'பொழுதுபோக்கு', count: 0 },
  ];

  const newsCategories = categories || defaultCategories;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600">Popular News</h2>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium">
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Categories List */}
      <div className="divide-y divide-gray-200">
        {newsCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {/* Newspaper Icon */}
              <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center flex-shrink-0">
                <Newspaper className="w-5 h-5 text-red-600" />
              </div>
              
              {/* Category Name */}
              <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                {category.name}
              </span>
            </div>

            {/* Count Badge */}
            <span className="text-gray-500 font-medium min-w-[2rem] text-right">
              {category.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example usage in DetailView:
// import PopularNews from './PopularNews';
// 
// Then add in the right column:
// <PopularNews />