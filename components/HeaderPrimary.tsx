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
  FaSearch,
  FaBell,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import logo from "@/public/assets/arivom-logo-latest.png";

const HeaderPrimary: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [articlesExpanded, setArticlesExpanded] = useState(false);
  
  // Marquee states
  const [isPaused, setIsPaused] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(40); // Lower = faster
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const newsCategories = ["Politics", "Business", "Tech", "Health"];
  const articlesCategories = ["Education", "Lifestyle", "Science"];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNews = () => setNewsExpanded(!newsExpanded);
  const toggleArticles = () => setArticlesExpanded(!articlesExpanded);

  const socialLinks = [
    { icon: <FaFacebookF size={14} />, color: "hover:text-blue-600", label: "Facebook" },
    { icon: <RiTwitterXFill size={14} />, color: "hover:text-gray-900", label: "X" },
    { icon: <FaInstagram size={14} />, color: "hover:text-pink-500", label: "Instagram" },
    { icon: <FaTiktok size={14} />, color: "hover:text-gray-900", label: "TikTok" },
    { icon: <FaAmazon size={14} />, color: "hover:text-orange-500", label: "Amazon" },
    { icon: <FaPinterestP size={14} />, color: "hover:text-red-500", label: "Pinterest" },
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
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 hidden xl:block">
        <div className="max-w-[1320px] px-[15px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            {/* LIVE Badge */}
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-bold">Latest</span>
            </div>

            {/* Enhanced Marquee with Controls */}
            <div className="relative flex-1 overflow-hidden group">
              {/* Marquee Container */}
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

          {/* Date */}
          <div className="text-xs opacity-90 whitespace-nowrap ml-4">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* 🟢 Main Header */}
      <div
        className={`hidden xl:block transition-all duration-300 ${
          isScrolled ? "py-2 shadow-sm" : "py-3"
        }`}
      >
        <div className="max-w-[1320px] px-[15px] mx-auto flex items-center justify-between">
          {/* Left: Social Icons */}
          <div className="flex items-center gap-2 min-w-[250px]">
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

          {/* Center: Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-lg">
                <FaSearch className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search news, topics, articles..."
                  className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3 min-w-[250px]">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <FaBell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-md">
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu Drawer */}
      <div
        className={`xl:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[400px] max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <button
              onClick={toggleMenu}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <HiX className="w-7 h-7 text-gray-700" />
            </button>
          </div>

          {/* Logo */}
          <div className="px-5 py-8 border-b border-gray-100">
            <Image
              src={logo}
              alt="Arivom Logo"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="py-2">
              <Link
                href="/"
                className="flex items-center justify-between px-5 py-4 text-gray-800 hover:bg-gray-50 text-base font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>

              {/* News Menu */}
              <div className="border-t border-gray-100">
                <button
                  onClick={toggleNews}
                  className="flex items-center justify-between w-full px-5 py-4 text-gray-800 hover:bg-gray-50 text-base font-medium"
                >
                  <span>News</span>
                  <span
                    className={`text-2xl font-light transition-transform duration-300 ${
                      newsExpanded ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                    newsExpanded ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="py-2">
                    {newsCategories.map((category: string, idx: number) => (
                      <Link
                        key={idx}
                        href={`/news/category/${category.toLowerCase()}`}
                        className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-blue-600"
                        onClick={toggleMenu}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Articles Menu */}
              <div className="border-t border-gray-100">
                <button
                  onClick={toggleArticles}
                  className="flex items-center justify-between w-full px-5 py-4 text-gray-800 hover:bg-gray-50 text-base font-medium"
                >
                  <span>Articles</span>
                  <span
                    className={`text-2xl font-light transition-transform duration-300 ${
                      articlesExpanded ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                    articlesExpanded ? "max-h-64" : "max-h-0"
                  }`}
                >
                  <div className="py-2">
                    {articlesCategories.map((category: string, idx: number) => (
                      <Link
                        key={idx}
                        href={`/articles/category/${category.toLowerCase()}`}
                        className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-blue-600"
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