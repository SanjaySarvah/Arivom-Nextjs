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

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
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
    <div ref={dropdownRef} className="relative inline-block w-full sm:w-auto">
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-between text-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Categories</span>
        <svg
          className={`w-3 h-3 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-green-200 z-50 max-h-[70vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 pb-3 bg-gradient-to-r from-green-50 to-white border-b border-green-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-base">Categories</h3>
              <button
                onClick={closeAll}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Browse articles by category</p>
          </div>

          {/* Categories List */}
          <div className="p-3 max-h-64 overflow-y-auto custom-scrollbar">
            <ul className="space-y-1">
              {categories.map((cat) => {
                const subcategories = getArticleSubcategories(cat.category);
                const hasSubcategories = subcategories.length > 0;

                return (
                  <li key={cat.category} className="group">
                    {/* Category Item */}
                    <div className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-green-50 group-hover:bg-green-50 border border-transparent hover:border-green-100">
                      {hasSubcategories ? (
                        <button
                          onClick={() => toggleCategory(cat.category)}
                          className="flex-1 text-left font-medium text-gray-800 hover:text-green-700 transition-colors flex items-center text-sm"
                          aria-expanded={activeCategory === cat.category}
                          aria-controls={`subcategory-list-${cat.category}`}
                        >
                          <span className="flex-1">{cat.category}</span>
                          <svg
                            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                              activeCategory === cat.category ? "rotate-180 text-green-600" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      ) : (
                        <Link
                          href={`/articles/category/${cat.category}`}
                          className="flex-1 font-medium text-gray-800 hover:text-green-700 transition-colors flex items-center text-sm"
                          onClick={closeAll}
                        >
                          <span className="flex-1">{cat.category}</span>
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>

                    {/* Subcategories */}
                    {activeCategory === cat.category && hasSubcategories && (
                      <ul
                        id={`subcategory-list-${cat.category}`}
                        className="ml-3 mt-1 pl-3 border-l-2 border-green-200 space-y-1 animate-in fade-in duration-200"
                        role="region"
                        aria-label={`${cat.category} subcategories`}
                      >
                        {subcategories.map((subcat) => {
                          const subsubcategories = getArticleSubsubcategories(subcat.subcategory);
                          const hasSubsubcategories = subsubcategories.length > 0;

                          return (
                            <li key={subcat.subcategory} className="group">
                              <div className="flex items-center justify-between p-1.5 rounded-md transition-all duration-200 hover:bg-green-25">
                                {hasSubsubcategories ? (
                                  <button
                                    onClick={() => toggleSubcategory(subcat.subcategory)}
                                    className="flex-1 text-left text-gray-700 hover:text-green-600 transition-colors text-xs font-medium flex items-center"
                                    aria-expanded={activeSubcategory === subcat.subcategory}
                                    aria-controls={`subsubcategory-list-${subcat.subcategory}`}
                                  >
                                    <span className="flex-1">{subcat.subcategory}</span>
                                    <svg
                                      className={`w-2.5 h-2.5 text-gray-400 transition-transform duration-200 ${
                                        activeSubcategory === subcat.subcategory ? "rotate-180 text-green-500" : ""
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                ) : (
                                  <Link
                                    href={`/articles/category/${cat.category}/${subcat.subcategory}`}
                                    className="flex-1 text-gray-700 hover:text-green-600 transition-colors text-xs font-medium flex items-center"
                                    onClick={closeAll}
                                  >
                                    <span className="flex-1">{subcat.subcategory}</span>
                                    <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </Link>
                                )}
                              </div>

                              {/* Subsubcategories */}
                              {activeSubcategory === subcat.subcategory && hasSubsubcategories && (
                                <ul
                                  id={`subsubcategory-list-${subcat.subcategory}`}
                                  className="ml-3 mt-1 pl-3 border-l-2 border-gray-200 space-y-0.5 animate-in fade-in duration-200"
                                  role="region"
                                  aria-label={`${subcat.subcategory} subsubcategories`}
                                >
                                  {subsubcategories.map((subsubcat) => (
                                    <li key={subsubcat.subsubcategory}>
                                      <Link
                                        href={`/articles/category/${cat.category}/${subcat.subcategory}/${subsubcat.subsubcategory}`}
                                        className="block py-1.5 px-2 text-gray-600 hover:text-green-600 hover:bg-green-25 rounded-md transition-all duration-200 text-xs border border-transparent hover:border-green-100"
                                        onClick={closeAll}
                                      >
                                        {subsubcat.subsubcategory}
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

          {/* Footer */}
          <div className="p-3 bg-green-50 border-t border-green-100">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                {categories.length} categories
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .hover\:bg-green-25:hover {
          background-color: #f0fdf4;
        }
        .animate-in {
          animation: animateIn 0.2s ease-out;
        }
        @keyframes animateIn {
          from {
            opacity: 0;
            transform: translateY(-3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}