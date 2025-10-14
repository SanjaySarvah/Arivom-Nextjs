"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPinterestP,
  FaAmazon,
  FaPause,
  FaPlay,
  FaUser,
  FaChevronDown,
  FaUserPlus,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import { Bell } from "lucide-react";
import logo from "@/public/assets/arivom-logo-latest.png";

const HeaderPrimary: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [articlesExpanded, setArticlesExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5); // Notification count state

  // Marquee states
  const [isPaused, setIsPaused] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(40); // Lower = faster
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const newsCategories = ["Politics", "Business", "Tech", "Health"];
  const articlesCategories = ["Education", "Lifestyle", "Science"];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNews = () => setNewsExpanded(!newsExpanded);
  const toggleArticles = () => setArticlesExpanded(!articlesExpanded);

  const socialLinks = [
    { icon: <FaFacebookF size={14} />, color: "hover:text-blue-600", label: "Facebook" },
    { icon: <RiTwitterXFill size={14} />, color: "hover:text-gray-900", label: "X" },
    { icon: <FaInstagram size={14} />, color: "hover:text-pink-500", label: "Instagram" },
    // { icon: <FaTiktok size={14} />, color: "hover:text-gray-900", label: "TikTok" },
    // { icon: <FaAmazon size={14} />, color: "hover:text-[#2ecc71]", label: "Amazon" },
    { icon: <FaPinterestP size={14} />, color: "hover:text-[#2ecc71]", label: "Pinterest" },
  ];

  const breakingNews = [
    "Breaking: Global Summit Reaches Climate Agreement",
    "Stock Markets Hit Record High",
    "New Tech Innovation Revolutionizes Healthcare",
    "Sports Update: Team India Wins Series 3-1",
    "Education Reform Bill Passes Parliament",
    "AI Startups Surge in Investment Worldwide",
    "Local Hero Saves Child from Floodwaters",
    "SpaceX Successfully Launches New Rocket",
    "New Electric Car Breaks Efficiency Record",
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manual sliding functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!marqueeRef.current) return;

    setIsDragging(true);
    setIsPaused(true);
    setDragStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);

    // Change cursor to grabbing
    marqueeRef.current.style.cursor = 'grabbing';
    marqueeRef.current.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    if (!marqueeRef.current) return;

    setIsDragging(false);
    marqueeRef.current.style.cursor = 'grab';
    marqueeRef.current.style.removeProperty('user-select');

    // Only resume if not manually paused
    if (!isPaused) {
      setTimeout(() => setIsPaused(false), 1000);
    }
  };

  const handleMouseUp = () => {
    if (!marqueeRef.current) return;

    setIsDragging(false);
    marqueeRef.current.style.cursor = 'grab';
    marqueeRef.current.style.removeProperty('user-select');

    // Only resume if not manually paused
    if (!isPaused) {
      setTimeout(() => setIsPaused(false), 1000);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;

    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - dragStartX) * 2; // Scroll-fast factor
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const increaseSpeed = () => {
    setMarqueeSpeed(prev => Math.max(10, prev - 10)); // Lower number = faster
  };

  const decreaseSpeed = () => {
    setMarqueeSpeed(prev => Math.min(100, prev + 10)); // Higher number = slower
  };

  return (
    <>
      {/* 🔴 Breaking News Bar */}
      {/* <div className="bg-gradient-to-r from-[#1a8f52] via-[#2ecc71] to-[#27ae60] text-white py-2 hidden xl:block">
        <div className="max-w-[1320px] px-[15px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden flex-1">
           
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-bold">Latest</span>
            </div>

           
            <div className="relative flex-1 overflow-hidden group">
             
              <div
                ref={marqueeRef}
                className="overflow-x-auto whitespace-nowrap scrollbar-hide cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div 
                  className={`inline-flex gap-6 px-4 ${
                    !isPaused && !isDragging ? 'animate-marquee' : ''
                  }`}
                  style={{
                    animationDuration: `${marqueeSpeed}s`,
                    animationPlayState: isPaused || isDragging ? 'paused' : 'running'
                  }}
                >
                  {breakingNews.concat(breakingNews).map((news, i) => (
                    <React.Fragment key={i}>
                      <span className="text-sm font-medium hover:underline transition-all duration-200 min-w-max">
                        {news}
                      </span>
                      {i < breakingNews.length * 2 - 1 && (
                        <span className="text-sm opacity-70">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

       
            </div>
          </div>

        
          <div className="text-xs opacity-90 whitespace-nowrap ml-4">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div> */}

      {/* 🟢 Main Header */}
      <div
        className={`hidden xl:block transition-all duration-300 ${isScrolled ? "py-2 shadow-sm" : "py-3"
          }`}
      >
        <div className="max-w-[1320px] px-[15px] mx-auto flex items-center justify-between">
          {/* Left: Social Icons */}
          <div className="lg:flex items-center gap-2 lg:min-w-[200px] min-w-[200px] invisible lg:visible">
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

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
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

          {/* Right: Notification & User Profile */}
          <div className="flex items-center justify-end gap-3 min-w-[200px]">
            {/* Notification Icon */}
            <button className="relative p-2 hover:bg-emerald-50 rounded-lg transition-all duration-300 group">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#2ecc71] transition-colors" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-emerald-50 rounded-lg transition-all duration-300 group"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all duration-300">
                    <FaUser className="w-4 h-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ecc71] border-2 border-white rounded-full"></span>
                </div>

                {/* Name Only */}
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">Arivom</p>
                </div>

                {/* Dropdown Icon */}
                <FaChevronDown
                  className={`w-2.5 h-2.5 text-gray-500 transition-transform duration-300 hidden md:block ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-fadeIn">
                  {/* User Info */}
                  <div className="px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">Arivom</p>
                    <p className="text-[8px] text-gray-600">Admin</p>
                    <p className="text-[8px] text-gray-500 mt-0.5">arivom@mail.com</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1.5">
                    <Link
                      href="/signin"
                      className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                     <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                        <FaUser className="w-2.5 h-2.5 text-white" />
                      </span>
                      <span className="font-medium text-sm">Sign In</span>
                    </Link>

                    <Link
                      href="/signup"
                      className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
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

      {/* 📱 Mobile Menu Drawer */}
      <div
        className={`xl:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[400px] max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b-2 border-[#2ecc71]">
            <button
              onClick={toggleMenu}
              className="p-1 hover:bg-emerald-50 rounded transition-colors"
            >
              <HiX className="w-7 h-7 text-gray-700 hover:text-[#2ecc71]" />
            </button>
          </div>

          {/* Logo */}
          <div className="px-5 py-8 border-b border-emerald-100">
            <Image
              src={logo}
              alt="Arivom Logo"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>

          {/* User Profile Section - Mobile */}
          <div className="px-5 py-4 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md">
                  <FaUser className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ecc71] border-2 border-white rounded-full"></span>
              </div>

              {/* Name and Designation */}
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-600">Editor</p>
              </div>
            </div>

            {/* Auth Buttons - Mobile */}
            <div className="mt-4 flex gap-2">
              <Link
                href="/signin"
                className="flex-1 px-4 py-2 border-2 border-[#2ecc71] text-[#1a8f52] rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-all duration-300 text-center"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white rounded-lg text-sm font-semibold hover:from-[#27ae60] hover:to-[#2ecc71] transition-all duration-300 text-center"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="py-2">
              <Link
                href="/"
                className="flex items-center justify-between px-5 py-4 text-gray-800 hover:bg-emerald-50 hover:text-[#1a8f52] text-base font-medium border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                onClick={toggleMenu}
              >
                Home
              </Link>

              {/* News Menu */}
              <div className="border-t border-emerald-100">
                <button
                  onClick={toggleNews}
                  className="flex items-center justify-between w-full px-5 py-4 text-gray-800 hover:bg-emerald-50 hover:text-[#1a8f52] text-base font-medium border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                >
                  <span>News</span>
                  <span
                    className={`text-2xl font-light transition-transform duration-300 ${newsExpanded ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 bg-emerald-50/30 ${newsExpanded ? "max-h-96" : "max-h-0"
                    }`}
                >
                  <div className="py-2">
                    {newsCategories.map((category: string, idx: number) => (
                      <Link
                        key={idx}
                        href={`/news/category/${category.toLowerCase()}`}
                        className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-[#2ecc71] border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                        onClick={toggleMenu}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Articles Menu */}
              <div className="border-t border-emerald-100">
                <button
                  onClick={toggleArticles}
                  className="flex items-center justify-between w-full px-5 py-4 text-gray-800 hover:bg-emerald-50 hover:text-[#1a8f52] text-base font-medium border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                >
                  <span>Articles</span>
                  <span
                    className={`text-2xl font-light transition-transform duration-300 ${articlesExpanded ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 bg-emerald-50/30 ${articlesExpanded ? "max-h-64" : "max-h-0"
                    }`}
                >
                  <div className="py-2">
                    {articlesCategories.map((category: string, idx: number) => (
                      <Link
                        key={idx}
                        href={`/articles/category/${category.toLowerCase()}`}
                        className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-[#2ecc71] border-l-4 border-transparent hover:border-[#2ecc71] transition-all"
                        onClick={toggleMenu}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPrimary;