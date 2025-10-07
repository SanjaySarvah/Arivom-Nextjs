import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface UpdatesProps {
  categories?: Category[];
}

export default function Updates({ categories }: UpdatesProps) {
  const defaultCategories: Category[] = [
    { id: '1', name: 'Business / Economy', color: 'pink' },
    { id: '2', name: 'Technology', color: 'blue' },
    { id: '3', name: 'Education', color: 'red' },
    { id: '4', name: 'Health / Fitness', color: 'green' },
    { id: '5', name: 'Sports', color: 'pink' },
    { id: '6', name: 'Entertainment', color: 'blue' },
    { id: '7', name: 'Lifestyle', color: 'orange' },
    { id: '8', name: 'World / International', color: 'green' },
    { id: '9', name: 'National / Local News', color: 'pink' },
    { id: '10', name: 'Religion & Spirituality', color: 'blue' },
    { id: '11', name: 'History & Heritage', color: 'orange' },
    { id: '12', name: 'Finance / Stock Market', color: 'blue' },
    { id: '13', name: 'Startups / Innovation', color: 'red' },
    { id: '14', name: 'Weather / Natural Disasters', color: 'pink' },
    { id: '15', name: 'Career / Jobs', color: 'orange' },
  ];

  const updateCategories = categories || defaultCategories;

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      pink: 'bg-pink-500 hover:bg-pink-600',
      blue: 'bg-blue-600 hover:bg-blue-700',
      red: 'bg-red-600 hover:bg-red-700',
      green: 'bg-green-600 hover:bg-green-700',
      orange: 'bg-orange-500 hover:bg-orange-600',
    };
    return colorMap[color] || 'bg-gray-600 hover:bg-gray-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Updates</h2>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium">
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-3">
        {updateCategories.map((category) => (
          <button
            key={category.id}
            className={`px-2 py-1 text-white rounded-full font-medium text-sm transition-all ${getColorClasses(
              category.color
            )} shadow-sm hover:shadow-md`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Example usage:
// import Updates from './Updates';
// 
// <Updates />