"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTimes,
  FaSearch,
  FaVideo,
  FaFilm,
  FaImages,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import logo from "@/public/assets/arivom-logo-latest.png";

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

  if (!isOpen) return null;

  return (
    <div
      className="xl:hidden fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-md z-[9999] transition-all duration-300"
      onClick={onClose}
    >
      {/* Sidebar */}
      <div
        className={`relative bg-gradient-to-b from-white to-gray-50 w-80 h-full transform transition-all duration-300 ease-out overflow-y-auto z-[10000] shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-[#2ecc71] flex items-center justify-between sticky top-0 bg-gradient-to-r from-white to-gray-50 z-20 shadow-sm">
          <Image
            src={logo}
            alt="Arivom Logo"
            width={140}
            height={56}
            className="object-contain"
          />
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 transition-all duration-200 hover:shadow-md group"
          >
            <FaTimes size={20} className="text-gray-600 group-hover:text-red-600 transition-colors duration-200" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 mb-4">
          <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-5 py-3 border-2 border-gray-200 focus-within:bg-white focus-within:border-[#2ecc71] focus-within:shadow-lg transition-all duration-300">
            <FaSearch className="w-3.5 h-3.5 text-gray-400 mr-3 transition-colors focus-within:text-[#2ecc71]" />
            <input
              type="text"
              placeholder="Search news, articles..."
              className="bg-transparent border-none outline-none text-xs w-full placeholder-gray-400 text-gray-700 font-medium"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1.5 mb-6">
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider px-4 mb-2 flex items-center gap-2">
            <span className="w-1 h-3 bg-[#2ecc71] rounded-full"></span>
            Navigation
          </div>
          {mainNavigation
            .filter((item) => item.name !== "News" && item.name !== "Articles" && item.name !== "Tags")
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold rounded-xl border-l-4 transition-all duration-200 ${
                  item.active
                    ? "text-[#1a8f52] bg-gradient-to-r from-emerald-50 to-green-50 border-[#2ecc71] shadow-sm"
                    : "text-gray-700 hover:text-[#1a8f52] hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 border-transparent hover:border-[#2ecc71] hover:shadow-sm"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-br from-[#2ecc71] to-[#27ae60] shadow-md"
                    : "bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#2ecc71] group-hover:to-[#27ae60]"
                }`}>
                  <item.icon size={14} className={item.active ? "text-white" : "text-gray-600"} />
                </div>
                {item.name}
              </Link>
            ))}

          {/* NEWS SECTION */}
          {/* <div className="border-t border-gray-100 mt-4">
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
          </div> */}

          {/* ARTICLES SECTION */}
          {/* <div className="border-t border-gray-100 mt-4">
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
          </div> */}
        </nav>

        {/* Media Section */}
        <div className="border-t border-gray-100 mt-4 px-4">
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-4 flex items-center gap-2">
            <span className="w-1 h-3 bg-[#2ecc71] rounded-full"></span>
            Media
          </div>

          {/* Videos */}
          <Link
            href="/videos"
            onClick={onClose}
            className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold rounded-xl border-l-4 transition-all duration-200 ${
              pathname === "/videos"
                ? "text-[#1a8f52] bg-gradient-to-r from-emerald-50 to-green-50 border-[#2ecc71] shadow-sm"
                : "text-gray-700 hover:text-[#1a8f52] hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 border-transparent hover:border-[#2ecc71] hover:shadow-sm"
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
              pathname === "/videos"
                ? "bg-gradient-to-br from-[#2ecc71] to-[#27ae60] shadow-md"
                : "bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#2ecc71] group-hover:to-[#27ae60]"
            }`}>
              <FaVideo size={14} className={pathname === "/videos" ? "text-white" : "text-gray-600"} />
            </div>
            Videos
          </Link>

          {/* Shorts */}
          <Link
            href="/shorts"
            onClick={onClose}
            className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold rounded-xl border-l-4 transition-all duration-200 ${
              pathname === "/shorts"
                ? "text-[#1a8f52] bg-gradient-to-r from-emerald-50 to-green-50 border-[#2ecc71] shadow-sm"
                : "text-gray-700 hover:text-[#1a8f52] hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 border-transparent hover:border-[#2ecc71] hover:shadow-sm"
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
              pathname === "/shorts"
                ? "bg-gradient-to-br from-[#2ecc71] to-[#27ae60] shadow-md"
                : "bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#2ecc71] group-hover:to-[#27ae60]"
            }`}>
              <FaFilm size={14} className={pathname === "/shorts" ? "text-white" : "text-gray-600"} />
            </div>
            Shorts
          </Link>

          {/* Gallery */}
          <Link
            href="/gallery"
            onClick={onClose}
            className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold rounded-xl border-l-4 transition-all duration-200 ${
              pathname === "/gallery"
                ? "text-[#1a8f52] bg-gradient-to-r from-emerald-50 to-green-50 border-[#2ecc71] shadow-sm"
                : "text-gray-700 hover:text-[#1a8f52] hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 border-transparent hover:border-[#2ecc71] hover:shadow-sm"
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
              pathname === "/gallery"
                ? "bg-gradient-to-br from-[#2ecc71] to-[#27ae60] shadow-md"
                : "bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#2ecc71] group-hover:to-[#27ae60]"
            }`}>
              <FaImages size={14} className={pathname === "/gallery" ? "text-white" : "text-gray-600"} />
            </div>
            Gallery
          </Link>
        </div>

        {/* Footer Contact */}
        <div className="fixed bottom-0 left-0 w-80 bg-gradient-to-br from-gray-50 to-white border-t-2 border-[#2ecc71] shadow-lg">
          {/* Social Media Icons */}
          <div className="px-4 pt-3 pb-2 border-b border-gray-100">
            <div className="flex gap-3 justify-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-500 hover:to-blue-600 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
              >
                <FaFacebook className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-red-100 to-red-200 hover:from-red-500 hover:to-red-600 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
              >
                <FaYoutube className="w-4 h-4 text-red-600 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-100 to-purple-200 hover:from-pink-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
              >
                <FaInstagram className="w-4 h-4 text-pink-600 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-4 pt-2 pb-2 border-b border-gray-100">
            <div className="flex gap-3 justify-center text-[11px]">
              <Link
                href="/terms-and-conditions"
                onClick={onClose}
                className="text-gray-700 hover:text-[#1a8f52] font-semibold transition-colors duration-200 hover:underline underline-offset-2"
              >
                Terms & Conditions
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/privacy-policy"
                onClick={onClose}
                className="text-gray-700 hover:text-[#1a8f52] font-semibold transition-colors duration-200 hover:underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="px-4 py-2.5 text-[10px] text-gray-600 space-y-1">
            <p className="text-center text-gray-500">
              Email: <a href="mailto:support@arivom.com" className="text-[#1a8f52] hover:text-[#2ecc71] font-medium transition-colors duration-200">support@arivom.com</a>
            </p>
            <p className="text-center text-gray-500">
              Phone: <a href="tel:+919876543210" className="text-[#1a8f52] hover:text-[#2ecc71] font-medium transition-colors duration-200">+91 9876543210</a>
            </p>
            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="flex gap-2 justify-center text-[10px] mb-1.5">
                <Link
                  href="/terms-and-conditions"
                  onClick={onClose}
                  className="text-gray-600 hover:text-[#1a8f52] font-medium transition-colors duration-200 hover:underline underline-offset-2"
                >
                  Terms & Conditions
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/privacy-policy"
                  onClick={onClose}
                  className="text-gray-600 hover:text-[#1a8f52] font-medium transition-colors duration-200 hover:underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
              </div>
              <p className="text-[8px] text-gray-500 text-center">
                © 2025 Arivom. All rights reserved.
              </p>
            </div>
          </div>
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
