"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  getArticleCategories, 
  getArticleSubcategories, 
  getArticleSubsubcategories 
} from "@/lib/getData";

export default function ArticleCategoryDropdown() {
  const categories = getArticleCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveCategory(null);
        setActiveSubcategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  };

  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else {
      setActiveCategory(category);
      setActiveSubcategory(null);
    }
  };

  const toggleSubcategory = (subcategory: string) => {
    if (activeSubcategory === subcategory) {
      setActiveSubcategory(null);
    } else {
      setActiveSubcategory(subcategory);
    }
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveCategory(null);
    setActiveSubcategory(null);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Simple Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
      >
        Article Categories
        <svg
          className={`w-4 h-4 ml-2 inline transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="mb-4 pb-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Categories</h3>
            </div>
            
            <ul className="space-y-1">
              {categories.map((cat) => {
                const subcategories = getArticleSubcategories(cat.category);
                const hasSubcategories = subcategories.length > 0;

                return (
                  <li key={cat.category} className="border-b border-gray-100 last:border-b-0">
                    {/* Category Item */}
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href={`/articles/category/${cat.category}`}
                        className="flex-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        onClick={closeAll}
                      >
                        {cat.tname}
                      </Link>
                      
                      {hasSubcategories && (
                        <button
                          onClick={() => toggleCategory(cat.category)}
                          className="ml-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              activeCategory === cat.category ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Subcategories */}
                    {activeCategory === cat.category && hasSubcategories && (
                      <ul className="ml-4 mt-1 pb-2 space-y-1 border-l border-gray-200">
                        {subcategories.map((subcat) => {
                          const subsubcategories = getArticleSubsubcategories(subcat.subcategory);
                          const hasSubsubcategories = subsubcategories.length > 0;

                          return (
                            <li key={subcat.subcategory} className="border-b border-gray-100 last:border-b-0">
                              <div className="flex items-center justify-between py-2">
                                <Link
                                  href={`/articles/category/${cat.category}/${subcat.subcategory}`}
                                  className="flex-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                  onClick={closeAll}
                                >
                                  {subcat.tname}
                                </Link>
                                
                                {hasSubsubcategories && (
                                  <button
                                    onClick={() => toggleSubcategory(subcat.subcategory)}
                                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                  >
                                    <svg
                                      className={`w-3 h-3 transition-transform ${
                                        activeSubcategory === subcat.subcategory ? "rotate-180" : ""
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                )}
                              </div>

                              {/* Subsubcategories */}
                              {activeSubcategory === subcat.subcategory && hasSubsubcategories && (
                                <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200">
                                  {subsubcategories.map((subsubcat) => (
                                    <li key={subsubcat.subsubcategory}>
                                      <Link
                                        href={`/articles/category/${cat.category}/${subcat.subcategory}/${subsubcat.subsubcategory}`}
                                        className="block py-1 text-gray-500 hover:text-blue-600 transition-colors text-sm"
                                        onClick={closeAll}
                                      >
                                        {subsubcat.tname}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}