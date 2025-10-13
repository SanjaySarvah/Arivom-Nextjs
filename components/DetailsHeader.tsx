"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaRegNewspaper,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserCircle,
  FaArrowLeft,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { TbBook2 } from "react-icons/tb";
import logo from "@/public/assets/arivom-logo-latest.png";
import ArticleDropdownButton from "@/components/ArticleDropdownButton";

const DetailsHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileNewsExpanded, setIsMobileNewsExpanded] = useState(false);

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
      icon: TbBook2,
      active: pathname.startsWith("/articles"),
    }
  ];

  const newsCategories = [
    { name: "All News", href: "/news" },
    { name: "Politics", href: "/news/category/politics" },
    { name: "Business", href: "/news/category/business" },
    { name: "Technology", href: "/news/category/tech" },
    { name: "Health", href: "/news/category/health" },
  ];

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {/* Header Wrapper */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="relative flex items-center justify-between h-16">
            {/* Left Section - Back Button & Articles Dropdown */}
            <div className="flex items-center gap-3 flex-1">
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200 group"
                aria-label="Go back"
              >
                <FaArrowLeft 
                  className="w-5 h-5 text-gray-600 group-hover:text-[#2ecc71] transition-colors" 
                />
              </button>

              {/* Articles Dropdown (Desktop) */}
              
            </div>

            {/* Logo - Centered */}
            <div className="flex-1 flex justify-center">
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

            {/* Right Section - Profile & Auth */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              {/* Search (Desktop) */}
              {/* <div className="hidden lg:block relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2ecc71] focus-within:shadow-md min-w-[240px]">
                  <FaSearch className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search news, articles..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                  />
                </div>
              </div> */}

              {/* Profile Dropdown (Desktop) */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200 group"
                >
                  <FaUserCircle className="w-8 h-8 text-gray-600 group-hover:text-[#2ecc71] transition-colors" />
                  <FaChevronDown 
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`} 
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-emerald-100 rounded-xl shadow-xl z-[100] overflow-hidden">
                    <div className="p-2">
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#2ecc71] rounded-lg transition-all duration-200 group"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FaSignInAlt className="w-4 h-4 text-gray-500 group-hover:text-[#2ecc71] transition-colors" />
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#2ecc71] rounded-lg transition-all duration-200 group"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <FaUserPlus className="w-4 h-4 text-gray-500 group-hover:text-[#2ecc71] transition-colors" />
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>

          {/* Center Navigation (Desktop) */}
         
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[100]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-80 h-full transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="p-4 border-b-2 border-[#2ecc71] flex items-center justify-between bg-white sticky top-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  className="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <FaArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-sm font-medium text-gray-700">Back</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <FaTimes size={20} className="text-gray-700" />
              </button>
            </div>

            {/* Mobile Content */}
            <div className="p-4">
              {/* Logo Mobile */}
              <div className="flex justify-center mb-6">
                <Image
                  src={logo}
                  alt="Arivom Logo"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* Search Mobile */}
              <div className="mb-6 relative">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2ecc71]">
                  <FaSearch className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search news, articles..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Main Navigation Mobile */}
              <nav className="space-y-1 mb-6">
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
                    className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 ${
                      pathname.startsWith("/news")
                        ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]"
                        : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FaRegNewspaper size={16} />
                      News
                    </div>
                    <FaChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isMobileNewsExpanded ? "rotate-180" : ""
                      }`}
                    />
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

                {/* Articles Dropdown Mobile */}
                <div className="border-t border-gray-100">
                  <ArticleDropdownButton />
                </div>
              </nav>

              {/* Auth Links Mobile */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 justify-center px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <FaSignInAlt className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 justify-center px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-lg hover:from-[#27ae60] hover:to-[#2ecc71] transition-all duration-300"
                  >
                    <FaUserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsHeader;