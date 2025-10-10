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
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import logo from "@/public/assets/arivom-logo-latest.png";

const HeaderSecondary: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);
  const [isMobileNewsExpanded, setIsMobileNewsExpanded] = useState(false);
  const [isMobileArticlesExpanded, setIsMobileArticlesExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavigation = [
    { name: "Home", href: "/", icon: FaHome, active: pathname === "/" },
    {
      name: "News",
      href: "/news",
      icon: FaRegNewspaper,
      active: pathname.startsWith("/news"),
    },
    {
      name: "Articles",
      href: "/articles",
      icon: FaBook,
      active: pathname.startsWith("/articles"),
    },
  ];

  const newsCategories = [
    { name: "All News", href: "/news" },
    { name: "Politics", href: "/news/category/politics" },
    { name: "Business", href: "/news/category/business" },
    { name: "Technology", href: "/news/category/tech" },
    { name: "Health", href: "/news/category/health" },
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
      {/* Header Wrapper */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="relative flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>

              {/* Logo (mobile view only) */}
              <div className="flex justify-center flex-1 xl:hidden">
                <Link href="/" className="group flex items-center">
                  <Image
                    src={logo}
                    alt="Arivom Logo"
                    width={140}
                    height={56}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </Link>
              </div>

              {/* Articles Dropdown (Desktop) */}
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

                {isArticlesDropdownOpen && (
                  <div
                    className="absolute left-0 top-full mt-1 bg-white border-2 border-emerald-100 rounded-lg shadow-xl z-[100] min-w-[200px]"
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

            {/* Center Navigation (Desktop) */}
            <nav className="hidden xl:flex items-center justify-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    item.active
                      ? "text-[#1a8f52] bg-emerald-50 border-b-3 border-[#2ecc71] shadow-sm"
                      : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50"
                  }`}
                >
                  <item.icon size={14} />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search (Desktop) */}
              <div className="hidden xl:block relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2ecc71] focus-within:shadow-md min-w-[280px]">
                  <FaSearch className="w-3.5 h-3.5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search news, articles..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Profile Icon (Mobile) */}
              <div className="xl:hidden relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="p-2 rounded-full hover:bg-emerald-50 transition-colors"
                >
                  <FaUserCircle className="w-6 h-6 text-gray-700" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border-2 border-emerald-100 rounded-lg shadow-xl z-[100] min-w-[160px]">
                    <div className="p-1.5">
                      <Link
                        href="/login"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#2ecc71] rounded-md"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#2ecc71] rounded-md"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-[100]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-80 h-full transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b-2 border-[#2ecc71] flex items-center justify-between">
              <Image
                src={logo}
                alt="Arivom Logo"
                width={140}
                height={56}
                className="object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <FaTimes size={20} className="text-gray-700" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {/* Main Navigation Mobile */}
              <nav className="space-y-1">
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 ${
                    pathname === "/"
                      ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]"
                      : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                  }`}
                >
                  <FaHome size={16} />
                  Home
                </Link>

                {/* News with submenu */}
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => setIsMobileNewsExpanded(!isMobileNewsExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                  >
                    <div className="flex items-center gap-3">
                      <FaRegNewspaper size={16} />
                      News
                    </div>
                    <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileNewsExpanded ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 bg-emerald-50/30 ${
                      isMobileNewsExpanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="py-2">
                      {newsCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-[#2ecc71] border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Articles with submenu */}
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => setIsMobileArticlesExpanded(!isMobileArticlesExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                  >
                    <div className="flex items-center gap-3">
                      <FaBook size={16} />
                      Articles
                    </div>
                    <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileArticlesExpanded ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 bg-emerald-50/30 ${
                      isMobileArticlesExpanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="py-2">
                      {articleCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-[#2ecc71] border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSecondary;
