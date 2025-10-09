"use client";

import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPinterestP,
  FaAmazon,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const HeaderPrimary: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Breaking News Bar */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 hidden xl:block">
        <div className="max-w-[1320px] px-[15px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-bold">LIVE</span>
            </div>
            <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
              {breakingNews.map((news, i) => (
                <React.Fragment key={i}>
                  <span className="text-sm">{news}</span>
                  {i < breakingNews.length - 1 && <span className="text-sm">•</span>}
                </React.Fragment>
              ))}
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
      </div>

      {/* Main Header */}
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

          {/* Center: Search Bar (Perfectly Centered) */}
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

          {/* Right: Notification + Buttons */}
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
    </>
  );
};

export default HeaderPrimary;
