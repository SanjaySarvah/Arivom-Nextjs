"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTimes,
  FaSearch,
  FaRegNewspaper,
  FaVideo,
  FaFilm,
  FaImages,
} from "react-icons/fa";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import logo from "@/public/assets/arivom-logo-latest.png";
import {
  getArticleCategories,
  getArticleSubcategories,
  getArticleSubsubcategories,
} from "@/lib/getData";

interface HamburgerSiderProps {
  isOpen: boolean;
  onClose: () => void;
  mainNavigation: {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
    active: boolean;
  }[];
  pathname: string;
  newsCategories: { name: string; href: string }[];
  isMobileNewsExpanded: boolean;
  toggleNewsExpanded: () => void;
}

const HamburgerSider: React.FC<HamburgerSiderProps> = ({
  isOpen,
  onClose,
  mainNavigation,
  pathname,
  newsCategories,
  isMobileNewsExpanded,
  toggleNewsExpanded,
}) => {
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [isMediaExpanded, setIsMediaExpanded] = useState(false);
  const [activeMediaType, setActiveMediaType] = useState<string | null>(null);

  const categories = getArticleCategories();

  // Default media categories
  const mediaCategories = {
    videos: [
      { name: "Latest Videos", href: "/videos/latest" },
      { name: "Trending", href: "/videos/trending" },
      { name: "News Videos", href: "/videos/news" },
      { name: "Interviews", href: "/videos/interviews" },
      { name: "Documentaries", href: "/videos/documentaries" },
    ],
    shorts: [
      { name: "Trending Shorts", href: "/shorts/trending" },
      { name: "News Shorts", href: "/shorts/news" },
      { name: "Quick Updates", href: "/shorts/updates" },
      { name: "Top Picks", href: "/shorts/top-picks" },
    ],
    gallery: [
      { name: "Latest Photos", href: "/gallery/latest" },
      { name: "Events", href: "/gallery/events" },
      { name: "Featured", href: "/gallery/featured" },
      { name: "Photo Stories", href: "/gallery/stories" },
    ],
  };

  const handleMediaClick = (type: string) => {
    if (activeMediaType === type) {
      setActiveMediaType(null);
      setIsMediaExpanded(false);
    } else {
      setActiveMediaType(type);
      setIsMediaExpanded(true);
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

  if (!isOpen) return null;

  return (
    <div
      className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Sidebar */}
      <div
        className={`relative bg-white w-80 h-full transform transition-transform duration-300 overflow-y-auto z-[10000] shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-[#2ecc71] flex items-center justify-between sticky top-0 bg-white z-20">
          <Image
            src={logo}
            alt="Arivom Logo"
            width={140}
            height={56}
            className="object-contain"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <FaTimes size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 mb-6">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2ecc71]">
            <FaSearch className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search news, articles..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
            />
          </div>
        </div>

        {/* Media Buttons */}
        <div className="px-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            {/* Video Button */}
            <button
              onClick={() => handleMediaClick("videos")}
              className="relative group"
            >
              <div className={`flex flex-col items-center gap-2 p-3 border-2 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                activeMediaType === "videos"
                  ? "bg-emerald-50 border-[#2ecc71]"
                  : "bg-white border-gray-100 hover:border-[#2ecc71] hover:bg-emerald-50/50"
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeMediaType === "videos"
                    ? "bg-gradient-to-br from-[#2ecc71] to-[#27ae60]"
                    : "bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-[#2ecc71] group-hover:to-[#27ae60]"
                }`}>
                  <FaVideo className={`w-4 h-4 transition-colors duration-300 ${
                    activeMediaType === "videos"
                      ? "text-white"
                      : "text-[#1a8f52] group-hover:text-white"
                  }`} />
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${
                  activeMediaType === "videos"
                    ? "text-[#1a8f52]"
                    : "text-gray-700 group-hover:text-[#1a8f52]"
                }`}>
                  Videos
                </span>
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg ring-2 ring-white animate-pulse">
                NEW
              </span>
            </button>

            {/* Shorts Button */}
            <button
              onClick={() => handleMediaClick("shorts")}
              className="relative group"
            >
              <div className={`flex flex-col items-center gap-2 p-3 border-2 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                activeMediaType === "shorts"
                  ? "bg-emerald-50 border-[#2ecc71]"
                  : "bg-white border-gray-100 hover:border-[#2ecc71] hover:bg-emerald-50/50"
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeMediaType === "shorts"
                    ? "bg-gradient-to-br from-[#2ecc71] to-[#27ae60]"
                    : "bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-[#2ecc71] group-hover:to-[#27ae60]"
                }`}>
                  <FaFilm className={`w-4 h-4 transition-colors duration-300 ${
                    activeMediaType === "shorts"
                      ? "text-white"
                      : "text-[#1a8f52] group-hover:text-white"
                  }`} />
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${
                  activeMediaType === "shorts"
                    ? "text-[#1a8f52]"
                    : "text-gray-700 group-hover:text-[#1a8f52]"
                }`}>
                  Shorts
                </span>
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg ring-2 ring-white animate-pulse">
                NEW
              </span>
            </button>

            {/* Gallery Button */}
            <button
              onClick={() => handleMediaClick("gallery")}
              className="relative group"
            >
              <div className={`flex flex-col items-center gap-2 p-3 border-2 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                activeMediaType === "gallery"
                  ? "bg-emerald-50 border-[#2ecc71]"
                  : "bg-white border-gray-100 hover:border-[#2ecc71] hover:bg-emerald-50/50"
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeMediaType === "gallery"
                    ? "bg-gradient-to-br from-[#2ecc71] to-[#27ae60]"
                    : "bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-[#2ecc71] group-hover:to-[#27ae60]"
                }`}>
                  <FaImages className={`w-4 h-4 transition-colors duration-300 ${
                    activeMediaType === "gallery"
                      ? "text-white"
                      : "text-[#1a8f52] group-hover:text-white"
                  }`} />
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${
                  activeMediaType === "gallery"
                    ? "text-[#1a8f52]"
                    : "text-gray-700 group-hover:text-[#1a8f52]"
                }`}>
                  Gallery
                </span>
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg ring-2 ring-white animate-pulse">
                NEW
              </span>
            </button>
          </div>

          {/* Media Categories Dropdown */}
          {activeMediaType && (
            <div className="mt-3 p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-[#2ecc71] animate-in fade-in duration-200">
              <div className="space-y-1">
                {mediaCategories[activeMediaType as keyof typeof mediaCategories].map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1a8f52] hover:bg-white rounded-lg transition-all duration-200 hover:pl-4"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          {mainNavigation
            .filter((item) => item.name !== "News" && item.name !== "Articles")
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 text-base font-medium border-l-4 transition-all ${
                  item.active
                    ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]"
                    : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}

          {/* NEWS SECTION */}
          <div className="border-t border-gray-100 mt-4">
            <button
              onClick={toggleNewsExpanded}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium border-l-4 transition-all ${
                pathname.startsWith("/news")
                  ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]"
                  : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaRegNewspaper size={16} />
                News
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isMobileNewsExpanded ? "rotate-180 text-[#1a8f52]" : ""
                }`}
              />
            </button>

            {isMobileNewsExpanded && (
              <div className="pl-8 py-2 space-y-1">
                {newsCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={onClose}
                    className={`block text-sm px-3 py-2 rounded-md ${
                      pathname === cat.href
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ARTICLES SECTION */}
          <div className="border-t border-gray-100 mt-4">
            <button
              onClick={() => setIsArticleExpanded(!isArticleExpanded)}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium border-l-4 transition-all ${
                pathname.startsWith("/articles")
                  ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]"
                  : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={16} />
                Articles
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isArticleExpanded ? "rotate-180 text-[#1a8f52]" : ""
                }`}
              />
            </button>

            {isArticleExpanded && (
              <div className="pl-4 pr-2 py-2 max-h-[65vh] overflow-y-auto custom-scrollbar">
                {categories.map((cat) => {
                  const subcategories = getArticleSubcategories(cat.category);
                  const hasSubcategories = subcategories.length > 0;

                  return (
                    <div key={cat.category} className="group">
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-green-50 transition-all">
                        {hasSubcategories ? (
                          <button
                            onClick={() => toggleCategory(cat.category)}
                            className="flex-1 text-left text-sm text-gray-800 flex items-center gap-2 font-medium"
                          >
                            {activeCategory === cat.category ? (
                              <FolderOpen className="w-4 h-4 text-green-600" />
                            ) : (
                              <Folder className="w-4 h-4 text-gray-400" />
                            )}
                            {cat.tname || cat.category}
                            <ChevronDown
                              className={`w-3 h-3 ml-auto transition-transform ${
                                activeCategory === cat.category
                                  ? "rotate-180 text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>
                        ) : (
                          <Link
                            href={`/articles/category/${cat.category}`}
                            onClick={onClose}
                            className="flex-1 flex items-center gap-2 text-sm text-gray-800 hover:text-green-700"
                          >
                            <FileText className="w-4 h-4 text-gray-400" />
                            {cat.tname || cat.category}
                            <ChevronRight className="w-3 h-3 ml-auto text-gray-400" />
                          </Link>
                        )}
                      </div>

                      {/* SUBCATEGORIES */}
                      {activeCategory === cat.category && hasSubcategories && (
                        <div className="ml-4 pl-3 border-l-2 border-green-200 space-y-1 animate-in fade-in duration-200">
                          {subcategories.map((subcat) => {
                            const subsubcategories =
                              getArticleSubsubcategories(subcat.subcategory);
                            const hasSubsubcategories =
                              subsubcategories.length > 0;

                            return (
                              <div key={subcat.subcategory}>
                                <div className="flex items-center justify-between p-1.5 rounded-md hover:bg-green-25">
                                  {hasSubsubcategories ? (
                                    <button
                                      onClick={() =>
                                        toggleSubcategory(subcat.subcategory)
                                      }
                                      className="flex-1 text-left text-xs text-gray-700 font-medium flex items-center gap-2"
                                    >
                                      <Folder className="w-3 h-3 text-gray-400" />
                                      {subcat.subcategory}
                                      <ChevronDown
                                        className={`w-3 h-3 ml-auto transition-transform ${
                                          activeSubcategory ===
                                          subcat.subcategory
                                            ? "rotate-180 text-green-600"
                                            : "text-gray-400"
                                        }`}
                                      />
                                    </button>
                                  ) : (
                                    <Link
                                      href={`/articles/category/${cat.category}/${subcat.subcategory}`}
                                      onClick={onClose}
                                      className="flex-1 text-xs text-gray-700 hover:text-green-700 flex items-center gap-2"
                                    >
                                      <FileText className="w-3 h-3 text-gray-400" />
                                      {subcat.subcategory}
                                      <ChevronRight className="w-3 h-3 ml-auto text-gray-400" />
                                    </Link>
                                  )}
                                </div>

                                {/* SUBSUBCATEGORIES */}
                                {activeSubcategory === subcat.subcategory &&
                                  hasSubsubcategories && (
                                    <div className="ml-3 pl-3 border-l-2 border-gray-200 space-y-0.5">
                                      {subsubcategories.map((subsubcat) => (
                                        <Link
                                          key={subsubcat.subsubcategory}
                                          href={`/articles/category/${cat.category}/${subcat.subcategory}/${subsubcat.subsubcategory}`}
                                          onClick={onClose}
                                          className="block py-1 text-xs text-gray-600 hover:text-green-600 hover:bg-green-25 rounded-md px-2"
                                        >
                                          <FileText className="w-2.5 h-2.5 inline text-gray-400 mr-2" />
                                          {subsubcat.subsubcategory}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Footer Contact */}
        <div className="fixed bottom-0 left-0 w-80 bg-white border-t border-gray-200 px-4 py-3 text-xs text-gray-600 space-y-1">
          <p className="font-semibold text-gray-700">Contact Us</p>
          <p>
            Email:{" "}
            <a href="mailto:support@arivom.com" className="text-[#2ecc71]">
              support@arivom.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+919876543210" className="text-[#2ecc71]">
              +91 9876543210
            </a>
          </p>
          <p className="mt-1 text-[9px] text-gray-400">
            © 2025 Arivom. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .hover\\:bg-green-25:hover {
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
};

export default HamburgerSider;
