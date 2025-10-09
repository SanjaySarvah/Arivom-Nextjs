"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaRegNewspaper,
  FaBook,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const HeaderSecondary: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavigation = [
    {
      name: "Home",
      href: "/",
      icon: FaHome,
      active: pathname === "/"
    },
    {
      name: "News",
      href: "/news",
      icon: FaRegNewspaper,
      active: pathname.startsWith("/news")
    },
    {
      name: "Articles",
      href: "/articles",
      icon: FaBook,
      active: pathname.startsWith("/articles")
    }
  ];

  const articleCategories = [
    { name: "All Articles", href: "/articles" },
    { name: "Technology", href: "/articles/technology" },
    { name: "Business", href: "/articles/business" },
    { name: "Health", href: "/articles/health" },
    { name: "Science", href: "/articles/science" },
    { name: "Entertainment", href: "/articles/entertainment" },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? "shadow-lg sticky top-0 z-40" : "shadow-sm"
        }`}>
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="flex items-center justify-between h-16">

            {/* Left: Mobile Menu Button & Articles */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>

              {/* Articles Dropdown Button - Desktop */}
              <div className="relative hidden xl:block">
                <button
                  onMouseEnter={() => setIsArticlesDropdownOpen(true)}
                  onMouseLeave={() => setIsArticlesDropdownOpen(false)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white rounded-lg text-sm font-semibold hover:from-[#27ae60] hover:to-[#2ecc71] hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md"
                >
                  <FaBook className="w-3.5 h-3.5" />
                  Articles
                  <FaChevronDown className="w-3 h-3 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu */}
                {isArticlesDropdownOpen && (
                  <div
                    className="absolute left-0 top-full mt-1 bg-white border-2 border-emerald-100 rounded-lg shadow-xl z-50 min-w-[200px]"
                    onMouseEnter={() => setIsArticlesDropdownOpen(true)}
                    onMouseLeave={() => setIsArticlesDropdownOpen(false)}
                  >
                    <div className="p-1.5">
                      {articleCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block px-3 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#2ecc71] rounded-md transition-colors duration-200 font-medium border-l-3 border-transparent hover:border-[#2ecc71]"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Navigation Links - Desktop */}
            <nav className="hidden xl:flex items-center justify-center gap-1 flex-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${item.active
                      ? "text-[#1a8f52] bg-emerald-50 border-b-3 border-[#2ecc71] shadow-sm"
                      : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50"
                    }`}
                >
                  <item.icon size={14} />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right: Search Input */}
            <div className="flex items-center gap-3">
              {/* Desktop Search Input */}
              <div className="hidden xl:block">
                <div className="relative">
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2ecc71] focus-within:shadow-md min-w-[280px]">
                    <FaSearch className="w-3.5 h-3.5 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search news, articles..."
                      className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Articles & Search */}
              <div className="xl:hidden flex items-center gap-2">
                {/* Mobile Articles Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsArticlesDropdownOpen(!isArticlesDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white rounded-lg text-xs font-semibold hover:from-[#27ae60] hover:to-[#2ecc71] transition-all duration-300 shadow-md"
                  >
                    <FaBook className="w-3 h-3" />
                    <span className="hidden sm:inline">Articles</span>
                    <FaChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${isArticlesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobile Dropdown */}
                  {isArticlesDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white border-2 border-emerald-100 rounded-lg shadow-xl z-50 min-w-[180px]">
                      <div className="p-1.5">
                        {articleCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            onClick={() => setIsArticlesDropdownOpen(false)}
                            className="block px-3 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#2ecc71] rounded-md transition-colors duration-200 font-medium border-l-3 border-transparent hover:border-[#2ecc71]"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Search */}
                <button className="p-2 rounded-full hover:bg-emerald-50 transition-colors">
                  <FaSearch className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-80 h-full transform transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Main Navigation Mobile */}
              <nav className="space-y-2 mb-6">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 border-l-4 ${item.active
                        ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]"
                        : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                      }`}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Article Categories Mobile */}
              <div className="border-t border-emerald-100 pt-4">
                <h3 className="text-sm font-semibold text-[#1a8f52] mb-3 px-2">Article Categories</h3>
                <div className="space-y-1">
                  {articleCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#2ecc71] hover:bg-emerald-50 rounded-lg transition-colors duration-200 border-l-4 border-transparent hover:border-[#2ecc71]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Search */}
              <div className="border-t border-emerald-100 pt-4 mt-4">
                <div className="flex items-center bg-emerald-50 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#2ecc71] transition-all">
                  <FaSearch className="w-4 h-4 text-[#2ecc71] mr-3" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSecondary;