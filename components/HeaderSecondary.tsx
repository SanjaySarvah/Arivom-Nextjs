"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaRegNewspaper,
  FaSearch,
  FaBars,
  FaTimes,FaBookOpen,FaPenNib,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import { LuBookOpen } from "react-icons/lu";
import {TbBook2} from "react-icons/tb";
import logo from "@/public/assets/arivom-logo-latest.png";
import ArticleDropdownButton from "@/components/ArticleDropdownButton"; // ✅ added
import { Banknote, Share2 } from "lucide-react";

const HeaderSecondary: React.FC = () => {
  const pathname = usePathname();
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
    },
    {
      name: "Earn Money",
      href: "/earnmoney",
      icon: Banknote,
      active: pathname.startsWith("/earnmoney"),
    },
    {
      name: "Social Media",
      href: "/socialmedia",
      icon: Share2,
      active: pathname.startsWith("/socialmedia"),
    }
  ];

  const newsCategories = [
    { name: "All News", href: "/news" },
    { name: "Politics", href: "/news/category/politics" },
    { name: "Business", href: "/news/category/business" },
    { name: "Technology", href: "/news/category/tech" },
    { name: "Health", href: "/news/category/health" },
  ];

  return (
    <>
      {/* Header Wrapper */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left Section - Mobile Menu & Articles Button */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>

              {/* Articles Button - Desktop Left Side */}
              <div className="hidden xl:block">
                <ArticleDropdownButton />
              </div>
            </div>

            {/* Logo - Centered on mobile */}
            <div className="xl:hidden absolute left-1/2 transform -translate-x-1/2">
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

            {/* Center Navigation - Desktop */}
            <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
              {/* Main Navigation Items */}
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
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

            {/* Right Section - Search */}
            <div className="hidden xl:flex items-center">
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
            <div className="xl:hidden relative flex items-center">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-2 rounded-full hover:bg-emerald-50 transition-colors flex items-center justify-center"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-[100]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-80 h-full transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b-2 border-[#2ecc71] flex items-center justify-between bg-white sticky top-0">
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

            <div className="p-4">
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

                {/* ✅ You can optionally include your dropdown here for mobile */}
                <div className="border-t border-gray-100">
                  <ArticleDropdownButton />
                </div>
              </nav>

              {/* Auth Links Mobile */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-lg hover:from-[#27ae60] hover:to-[#2ecc71] transition-all duration-300"
                  >
                    Register
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

export default HeaderSecondary;
