"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaUser,
  FaChevronDown,
  FaHome,
  FaRegNewspaper,
  FaBook,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import logo from "@/public/assets/arivom-logo-latest.png";
import CommonFooter from "./CommonFooter";
import DetailFooter from "./Common/DetailViews/DetailFooter";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);
  const [mobileNewsExpanded, setMobileNewsExpanded] = useState(false);
  const [mobileArticlesExpanded, setMobileArticlesExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const socialLinks = [
    { icon: <FaFacebookF size={14} />, color: "hover:text-blue-600", label: "Facebook" },
    { icon: <RiTwitterXFill size={14} />, color: "hover:text-gray-900", label: "X" },
    { icon: <FaInstagram size={14} />, color: "hover:text-pink-500", label: "Instagram" },
    { icon: <FaPinterestP size={14} />, color: "hover:text-[#2ecc71]", label: "Pinterest" },
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

  const mainNavigation = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "News", href: "/news", icon: FaRegNewspaper },
    { name: "Articles", href: "/articles", icon: FaBook },
  ];

  return (
    <header className="w-full bg-white">
      {/* Top Header Row - Logo, Social Icons (xl+), Profile - Scrolls away */}
      <div className={`transition-all duration-300 ${isScrolled ? "py-2" : "py-3"} border-b border-gray-200`}>
        <div className="max-w-[1320px] px-[15px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Left: Toggle (< xl) OR Social Icons (xl+) */}
            <div className="flex items-center gap-2 w-[200px]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="hidden xl:flex items-center gap-2">
                {socialLinks.map(({ icon, color, label }, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label={label}
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 ${color} transition-all duration-300 hover:scale-110`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="group">
                <Image
                  src={logo}
                  alt="Arivom Logo"
                  width={180}
                  height={72}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Right: Profile Dropdown */}
            <div className="flex items-center justify-end w-[200px]">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-emerald-50 rounded-lg transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all duration-300">
                      <FaUser className="w-4 h-4" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ecc71] border-2 border-white rounded-full"></span>
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-800">Arivom</p>
                  </div>
                  <FaChevronDown
                    className={`w-2.5 h-2.5 text-gray-500 transition-transform duration-300 hidden md:block ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-fadeIn">
                    <div className="px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">Arivom</p>
                      <p className="text-[11px] text-gray-600">Admin</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">arivom@mail.com</p>
                    </div>
                    <div className="py-1.5">
                      <Link
                        href="/signin"
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                          <FaUser className="w-3 h-3 text-[#1a8f52]" />
                        </span>
                        <span className="font-medium text-xs">Sign In</span>
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                          <FaUser className="w-3 h-3 text-white" />
                        </span>
                        <span className="font-medium text-xs">Sign Up</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Row - Only visible on xl+ - Sticky */}
      <div className="hidden xl:block bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="relative flex items-center justify-between h-16">
            {/* Articles Dropdown */}
            <div className="relative">
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

            {/* Center Navigation */}
            <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-[#1a8f52] bg-emerald-50 border-b-3 border-[#2ecc71] shadow-sm"
                      : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50"
                  }`}
                >
                  <item.icon size={14} />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div className="relative">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2ecc71] focus-within:shadow-md min-w-[280px]">
                <svg className="w-3.5 h-3.5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search news, articles..."
                  className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="xl:hidden fixed inset-0 bg-black/50 z-[100]" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-80 h-full transform transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b-2 border-[#2ecc71] flex items-center justify-between">
              <Image src={logo} alt="Arivom Logo" width={140} height={56} className="object-contain" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                <HiX className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <nav className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 ${
                    pathname === "/" ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]" : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                  }`}
                >
                  <FaHome size={16} />
                  Home
                </Link>

                <div className="border-t border-gray-100">
                  <button
                    onClick={() => setMobileNewsExpanded(!mobileNewsExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                  >
                    <div className="flex items-center gap-3">
                      <FaRegNewspaper size={16} />
                      News
                    </div>
                    <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileNewsExpanded ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 bg-emerald-50/30 ${mobileNewsExpanded ? "max-h-96" : "max-h-0"}`}>
                    <div className="py-2">
                      {newsCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-[#2ecc71] border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100">
                  <button
                    onClick={() => setMobileArticlesExpanded(!mobileArticlesExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                  >
                    <div className="flex items-center gap-3">
                      <FaBook size={16} />
                      Articles
                    </div>
                    <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileArticlesExpanded ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 bg-emerald-50/30 ${mobileArticlesExpanded ? "max-h-96" : "max-h-0"}`}>
                    <div className="py-2">
                      {articleCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsMenuOpen(false)}
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

      {/* Footer Section */}
      {pathname.match(/\/(news|articles)\/[^\/]+$/) ? <DetailFooter /> : <CommonFooter />}
    </header>
  );
};

export default Header;
