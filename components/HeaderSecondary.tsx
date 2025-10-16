"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiImage, FiVideo, FiPlayCircle } from "react-icons/fi";
import {
  FaHome,
  FaRegNewspaper,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserCircle,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { TbBook2 } from "react-icons/tb";
import { Banknote, Share2 } from "lucide-react";
import logo from "@/public/assets/arivom-logo-latest.png";
import ArticleDropdownButton from "@/components/ArticleDropdownButton";

const HeaderSecondary: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileNewsExpanded, setIsMobileNewsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <div
        className={`bg-white border-b border-gray-200 sticky top-0 z-[90] MobileViewContent  ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="flex items-center justify-between h-16 gap-4 relative">
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

            {/* Right Section - Search & Profile */}
            <div className="flex items-center gap-3">
              {/* Search - Desktop */}
              <div className="hidden xl:flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2ecc71] focus-within:shadow-md min-w-[280px]">
                <FaSearch className="w-3.5 h-3.5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search news, articles..."
                  className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                />
              </div>

              {/* User Profile Dropdown (Mobile) */}
              <div className="relative xl:hidden" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-emerald-50 rounded-lg transition-all duration-300 group"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all duration-300">
                      <FaUserCircle className="w-5 h-5" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ecc71] border-2 border-white rounded-full"></span>
                  </div>


                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-fadeIn">
                    {/* User Info */}
                    <div className="px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        Arivom
                      </p>
                      <p className="text-[8px] text-gray-600">Admin</p>
                      <p className="text-[8px] text-gray-500 mt-0.5">
                        arivom@mail.com
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1.5">
                      <Link
                        href="/signin"
                        className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                          <FaUser className="w-2.5 h-2.5 text-white" />
                        </span>
                        <span className="font-medium text-sm">Sign In</span>
                      </Link>

                      <Link
                        href="/signup"
                        className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                          <FaUserPlus className="w-2.5 h-2.5 text-white" />
                        </span>
                        <span className="font-medium text-sm">Sign Up</span>
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
            className="bg-white w-80 h-full transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="p-4 border-b-2 border-[#2ecc71] flex items-center justify-between bg-white sticky top-0 z-20">
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

            {/* Search Mobile */}
            <div className="p-4 mb-6">
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
            <nav className="px-4 space-y-1">
              {mainNavigation.map((item) =>
                item.name !== "News" ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-200 border-l-4 ${
                      item.active
                        ? "text-[#1a8f52] bg-emerald-50 border-[#2ecc71]"
                        : "text-gray-700 hover:text-[#2ecc71] hover:bg-emerald-50 border-transparent hover:border-[#2ecc71]"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </Link>
                ) : (
                  <div key={item.name} className="border-t border-gray-100">
                    <button
                      onClick={() =>
                        setIsMobileNewsExpanded(!isMobileNewsExpanded)
                      }
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
                      {/* <FaChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isMobileNewsExpanded ? "rotate-180" : ""
                        }`}
                      /> */}
                    </button>
                    {/* <div
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
                    </div> */}
                      {/* Contact Details */}

                  </div>
                )
              )}

              {/* Articles Dropdown */}
              {/* <div className="border-t border-gray-100">
                <ArticleDropdownButton />
              </div> */}
            </nav>

                  <div className="fixed bottom-0 left-0  px-4 py-3 text-xs text-gray-600 space-y-1 text-center ">
    <p className="font-semibold text-gray-700">Contact Us</p>
    <p>Email: <a href="mailto:support@arivom.com" className="text-[#2ecc71]">support@arivom.com</a></p>
    <p>Phone: <a href="tel:+919876543210" className="text-[#2ecc71]">+91 9876543210</a></p>
    <p className="mt-1 text-[9px] text-gray-400">© 2025 Arivom. All rights reserved.</p>
  </div>
          </div>
    
        </div>
      )}
    </>
  );
};

export default HeaderSecondary;
