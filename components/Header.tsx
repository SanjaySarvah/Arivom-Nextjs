"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/assets/logos/arivom-logo-latest.svg";
// import {
//   FaAmazon,
//   FaFacebookF,
//   FaInstagram,
//   FaPinterestP,
//   FaTiktok,
//   FaTwitter,
// } from "react-icons/fa";

interface Category {
  id: number;
  title: string;
  slug: string;
  children?: Category[];
}

interface HeaderProps {
  logoSrc?: string;
}

const mockCategories: Category[] = [
  {
    id: 1,
    title: "Technology",
    slug: "technology",
    children: [
      { id: 11, title: "AI & Machine Learning", slug: "ai-ml" },
      { id: 12, title: "Gadgets", slug: "gadgets" },
      { id: 13, title: "Software", slug: "software" },
    ],
  },
  {
    id: 2,
    title: "Entertainment",
    slug: "entertainment",
    children: [
      { id: 21, title: "Movies", slug: "movies" },
      { id: 22, title: "Music", slug: "music" },
      { id: 23, title: "TV Shows", slug: "tv-shows" },
    ],
  },
  {
    id: 3,
    title: "Sports",
    slug: "sports",
    children: [
      { id: 31, title: "Football", slug: "football" },
      { id: 32, title: "Cricket", slug: "cricket" },
      { id: 33, title: "Tennis", slug: "tennis" },
    ],
  },
  {
    id: 4,
    title: "Health",
    slug: "health",
    children: [
      { id: 41, title: "Fitness", slug: "fitness" },
      { id: 42, title: "Nutrition", slug: "nutrition" },
      { id: 43, title: "Mental Health", slug: "mental-health" },
    ],
  },
  {
    id: 5,
    title: "Business",
    slug: "business",
    children: [
      { id: 51, title: "Startups", slug: "startups" },
      { id: 52, title: "Markets", slug: "markets" },
      { id: 53, title: "Economy", slug: "economy" },
    ],
  },
  {
    id: 6,
    title: "Travel",
    slug: "travel",
    children: [
      { id: 61, title: "Destinations", slug: "destinations" },
      { id: 62, title: "Tips & Guides", slug: "tips-guides" },
      { id: 63, title: "Experiences", slug: "experiences" },
    ],
  },
];

const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
  const [activeTab, setActiveTab] = useState("Explore");
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    "Explore",
    "Entertainment",
    "Technology",
    "Sports",
    "Health",
    "Business",
    "Travel",
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm pt-[22px]">
      {/* Top Bar */}
    <div className="flex items-center justify-between px-[100px]">
        {/* Social Icons */}
        {/* <div className="hidden xl:flex gap-2 text-gray-500">
          
          {[{
            icon: <FaFacebookF size={18} />,
            hoverColor: "hover:text-blue-600",
            ariaLabel: "Facebook",
          }, {
            icon: <FaTwitter size={18} />,
            hoverColor: "hover:text-blue-400",
            ariaLabel: "X (Twitter)",
          }, {
            icon: <FaInstagram size={18} />,
            hoverColor: "hover:text-pink-500",
            ariaLabel: "Instagram",
          }, {
            icon: <FaTiktok size={18} />,
            hoverColor: "hover:text-gray-800",
            ariaLabel: "TikTok",
          }, {
            icon: <FaAmazon size={18} />,
            hoverColor: "hover:text-orange-500",
            ariaLabel: "Amazon",
          }, {
            icon: <FaPinterestP size={18} />,
            hoverColor: "hover:text-red-500",
            ariaLabel: "Pinterest",
          }].map(({ icon, hoverColor, ariaLabel }, idx) => (
            <a
              key={idx}
              href="#"
              className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 ${hoverColor} transition-colors duration-300`}
              aria-label={ariaLabel}
            >
              {icon}
            </a>
          ))}
        </div> */}

        {/* Logo */}
        <div className="flex-1 flex justify-center xl:justify-center">
          <Link href="/">
            <Image
              src={logoSrc ?? logo}
              alt="Arivom Logo"
              width={144}
              height={57}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition">
            Sign In
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md border text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
   {/* Desktop Navigation */}
<div className="hidden xl:flex items-center border-t border-gray-200 bg-white h-[60px]">
  <div className="flex items-center w-full px-[10px] max-w-[1320px] mx-auto">
    
    {/* Left: ARTICLES Button */}
    <div className="relative group flex-shrink-0">
      <button className="flex items-center gap-2 font-semibold text-white bg-blue-600 px-6 py-3 rounded-md text-base hover:bg-blue-700">
        ARTICLES
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[224px]">
        <ul className="p-2">
          {mockCategories.map((category) =>
            category.children ? (
              <li key={category.id} className="relative group/sub">
                <button className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md">
                  <span>{category.title}</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <ul className="absolute left-full top-0 hidden group-hover/sub:block bg-white border border-gray-200 rounded-md shadow-lg w-48">
                  {category.children.map((child) => (
                    <li className="childfont" key={child.id}>
                      <Link
                        href={`/articles/${child.slug}`}
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={category.id}>
                <Link
                  href={`/articles/${category.slug}`}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {category.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>

    {/* Center: Static Nav Links */}
    <div className="flex-1 flex justify-center">
      <nav>
        <ul className="flex gap-12 text-sm font-semibold items-center">
          <li>
            <Link href="/" className="flex items-center gap-[20px] text-red-600">
              <span className="childfont">🏠</span> Home
            </Link>
          </li>
          <li>
            <Link
              href="/news"
              className="flex items-center gap-[20px] text-gray-800 hover:text-blue-600"
            >
              <span className="childfont">📰</span> News
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              className="flex items-center gap-[20px] text-gray-800 hover:text-blue-600"
            >
              <span className="childfont">📄</span> Articles
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>





      {/* Mobile Tabs (hidden in your screenshot) */}
      {/* You can remove or keep it based on your needs */}
      {menuOpen && (
        <div className="xl:hidden border-t bg-white">
          <ul className="flex flex-col p-4 space-y-2 text-sm">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    setActiveTab(tab);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
