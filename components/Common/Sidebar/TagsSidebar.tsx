'use client';

import React from 'react';
import SectionHeaderSidebar from '@/components/Common/SectionHeaderSidebar';

interface TagsSidebarProps {
  tags?: string[];
}

const TagsSidebar: React.FC<TagsSidebarProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
      <SectionHeaderSidebar title="" subtitle="Tags" size="medium" />
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-gray-100 text-gray-800 hover:bg-[#2ecc71] hover:text-white transition-colors duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsSidebar;
