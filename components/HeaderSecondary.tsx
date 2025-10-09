"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  FaHome, 
  FaRegNewspaper, 
  FaBook, 
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown
} from "react-icons/fa";
import logo from "@/public/assets/logos/arivom-logo-latest.svg";

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
      <div className={`bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? "shadow-lg sticky top-0 z-40" : "shadow-sm"
      }`}>
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Navigation Links */}
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center gap-1">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      item.active
                        ? "text-red-600 bg-red-50 border-b-2 border-red-600"
                        : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={14} />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link href="/" className="group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={logo}
                      alt="Arivom Logo"
                      width={120}
                      height={48}
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="hidden lg:block border-l border-gray-300 pl-3">
                    <div className="text-xs text-gray-500 font-medium leading-tight">
                      Trusted News<br/>Global Coverage
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Articles Button & Search */}
            <div className="flex items-center gap-4">
              {/* Articles Dropdown Button */}
              <div className="relative hidden md:block">
               <button
  onMouseEnter={() => setIsArticlesDropdownOpen(true)}
  onMouseLeave={() => setIsArticlesDropdownOpen(false)}
  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
>
  <FaBook className="w-4 h-4" />
  ARTICLES
  <FaChevronDown className="w-3 h-3 transition-transform duration-300" />
</button>


                {/* Dropdown Menu */}
                {isArticlesDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[200px]"
                    onMouseEnter={() => setIsArticlesDropdownOpen(true)}
                    onMouseLeave={() => setIsArticlesDropdownOpen(false)}
                  >
                    <div className="p-2">
                      {articleCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Articles Button */}
              <Link
                href="/articles"
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
              >
                <FaBook className="w-4 h-4" />
                <span className="hidden sm:inline">ARTICLES</span>
              </Link>

              {/* Search Button - Mobile */}
              <button className="xl:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaSearch className="w-5 h-5 text-gray-600" />
              </button>

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
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 ${
                      item.active
                        ? "text-red-600 bg-red-50"
                        : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Article Categories Mobile */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">Article Categories</h3>
                <div className="space-y-1">
                  {articleCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Search */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <FaSearch className="w-4 h-4 text-gray-500 mr-3" />
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