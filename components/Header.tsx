"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ Import usePathname
import logo from "@/public/assets/logos/arivom-logo-latest.svg";
import {
  FaAmazon,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
  FaHome,
  FaRegNewspaper,
  FaBook,
} from "react-icons/fa";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // ✅ Get current path

  const socialLinks = [
    { icon: <FaFacebookF size={18} />, color: "hover:text-blue-600", label: "Facebook" },
    { icon: <FaTwitter size={18} />, color: "hover:text-sky-500", label: "Twitter" },
    { icon: <FaInstagram size={18} />, color: "hover:text-pink-500", label: "Instagram" },
    { icon: <FaTiktok size={18} />, color: "hover:text-gray-900", label: "TikTok" },
    { icon: <FaAmazon size={18} />, color: "hover:text-orange-500", label: "Amazon" },
    { icon: <FaPinterestP size={18} />, color: "hover:text-red-500", label: "Pinterest" },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      {/* Top Section */}
      <div className="grid grid-cols-3 items-center py-5 max-w-[1320px] px-[15px] mx-auto">
        {/* Left: Social Icons */}
        <div className="hidden xl:flex gap-2">
          {socialLinks.map(({ icon, color, label }, idx) => (
            <a
              key={idx}
              href="#"
              aria-label={label}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 ${color} transition-colors duration-300`}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
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

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex justify-end gap-3">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition">
            Sign In
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden flex justify-end md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 border rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Desktop Navigation - Split 3 Columns */}
      <div className="hidden xl:flex border-t border-gray-200 bg-white h-[80px]">
        <div className="grid grid-cols-12 items-center w-full max-w-[1320px] mx-auto px-[15px]">
          {/* Left Column (3/12): ARTICLES Button */}
          <div className="col-span-3 flex items-center">
            <div className="relative group flex-shrink-0">
              <button className="flex items-center gap-2 text-white bg-[#0c74d6] px-[14px] py-[16px] rounded-md text-sm font-medium hover:bg-[#0a66be]">
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
                            <li key={child.id}>
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
          </div>

          {/* Center Column (6/12): Navigation */}
          {/* Center Column (6/12): Navigation */}
          <div className="col-span-6 flex justify-center center-nav">
            <nav>
              <ul className="flex gap-6 text-sm font-semibold items-center">
                <li>
                  <Link
                    href="/"
                    className={`flex items-center gap-2 ${pathname === "/" ? "text-[#e43131]" : "text-gray-800 hover:text-[#e43131]"
                      }`}
                  >
                    <FaHome size={14} />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className={`flex items-center gap-2 ${pathname.startsWith("/news")
                        ? "text-[#e43131]"
                        : "text-gray-800 hover:text-[#e43131]"
                      }`}
                  >
                    <FaRegNewspaper size={14} />
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className={`flex items-center gap-2 ${pathname.startsWith("/articles")
                        ? "text-[#e43131]"
                        : "text-gray-800 hover:text-[#e43131]"
                      }`}
                  >
                    <FaBook size={14} />
                    Articles
                  </Link>
                </li>
              </ul>
            </nav>
          </div>


          {/* Right Column (3/12): Placeholder / Future use */}
          <div className="col-span-3 flex justify-end">{/* Future use */}</div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="xl:hidden border-t bg-white">
          <ul className="flex flex-col p-4 space-y-2 text-sm">
            {["Explore", "Entertainment", "Technology", "Sports", "Health", "Business", "Travel"].map(
              (tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    {tab}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
