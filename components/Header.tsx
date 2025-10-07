"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/public/assets/logos/arivom-logo-latest.svg";
import {
  FaAmazon,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaHome,
  FaRegNewspaper,
  FaBook,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import CommonFooter from "./CommonFooter";
import DetailFooter from "./Common/DetailViews/DetailFooter";

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
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const pathname = usePathname();

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, color: "hover:text-blue-600", label: "Facebook" },
    { icon: <RiTwitterXFill size={16} />, color: "hover:text-gray-900", label: "X" },
    { icon: <FaInstagram size={16} />, color: "hover:text-pink-500", label: "Instagram" },
    { icon: <FaTiktok size={16} />, color: "hover:text-gray-900", label: "TikTok" },
    { icon: <FaAmazon size={16} />, color: "hover:text-orange-500", label: "Amazon" },
    { icon: <FaPinterestP size={16} />, color: "hover:text-red-500", label: "Pinterest" },
  ];

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Toggle body scroll when menu opens/closes
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .scrollbar-hide {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}</style>
      {/* Top Section */}
      <div className="py-3 max-w-[1320px] px-[15px] mx-auto">
        {/* Desktop View - Grid 3 columns */}
        <div className="hidden xl:grid grid-cols-3 items-center">
          {/* Left: Social Icons */}
          <div className="flex gap-2">
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
          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition">
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile/Tablet View - Below 1024px */}
        <div className="xl:hidden flex items-center justify-between">
          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
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

          {/* Right: Empty space for balance */}
          <div className="w-10"></div>
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
          <div className="col-span-6 flex justify-center center-nav">
            <nav>
              <ul className="flex gap-6 text-sm font-semibold items-center">
                <li>
                  <Link
                    href="/"
                    className={`flex items-center gap-2 ${pathname === "/" ? "text-[#e43131]" : "text-gray-800 hover:text-[#e43131]"} `}
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

          {/* Right Column (3/12): Placeholder */}
          <div className="col-span-3 flex justify-end">{/* Future use */}</div>
        </div>
      </div>

      {/* Bottom Sticky Navigation - Only visible below 1024px and outside menu */}
      {/* Show DetailFooter on detail pages (news/[id], articles/[id]), otherwise show CommonFooter */}
      {pathname.match(/\/(news|articles)\/[^\/]+$/) ? (
        <DetailFooter />
      ) : (
        <CommonFooter />
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`xl:hidden fixed inset-0 z-50 bg-black transition-all duration-300 ease-in-out ${
          menuOpen ? 'bg-opacity-50 visible' : 'bg-opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        {/* Mobile Menu Sidebar */}
        <div
          className={`w-[320px] max-w-[85vw] bg-white h-full fixed top-0 left-0 shadow-2xl overflow-y-auto scrollbar-hide transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
            {/* Close Button (First Row) */}
            <div className="flex justify-start p-3 pb-3">
              <button
                className="p-1 text-3xl text-gray-600 hover:text-gray-900 transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Logo (Second Row) */}
            <div className="flex justify-center px-6 border-b border-gray-200">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src={logoSrc ?? logo}
                  alt="Arivom Logo"
                  width={280}
                  height={112}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="py-4">
              <Link 
                href="/" 
                className="flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/news" 
                className="flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                <span>News</span>
                <span className="text-2xl font-light">+</span>
              </Link>
              
              {/* Articles with Expandable Categories */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => toggleCategory(0)}
                  className="flex items-center justify-between w-full px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-50"
                >
                  <span>Articles</span>
                  <span className="text-2xl font-light transition-transform duration-200" style={{ transform: expandedCategory === 0 ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                
                {/* Categories Submenu */}
                {expandedCategory === 0 && (
                  <div className="bg-gray-50">
                    {mockCategories.map((category) => (
                      <div key={category.id}>
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="flex items-center justify-between w-full px-8 py-3 text-base text-gray-700 hover:bg-gray-100"
                        >
                          <span>{category.title}</span>
                          {category.children && (
                            <svg
                              className="w-4 h-4 transition-transform duration-200"
                              style={{ transform: expandedCategory === category.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                        
                        {/* Subcategories */}
                        {category.children && expandedCategory === category.id && (
                          <div className="bg-white">
                            {category.children.map((child) => (
                              <Link
                                key={child.id}
                                href={`/articles/${child.slug}`}
                                className="block px-12 py-3 text-sm text-gray-600 hover:bg-gray-50"
                                onClick={() => setMenuOpen(false)}
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section */}
            <div className="border-t border-gray-200 p-6 space-y-6">
              {/* Need Help Section */}
              <div className="text-left space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
                <div className="flex items-left justify-left gap-2 text-gray-700 text-[15.42px]">
                  <FaEnvelope size={14} className="text-gray-500" />
                  <a href="mailto:support@arivom.com" className="text-sm hover:text-blue-600">
                    support@arivom.com
                  </a>
                </div>
                <div className="flex items-left justify-left gap-2 text-gray-700 text-[15.42px]">
                  <FaPhone size={14} className="text-gray-500" />
                  <a href="tel:+917667298398" className="text-sm hover:text-blue-600">
                    +91 7667298398
                  </a>
                </div>
              </div>

              {/* Legal Links */}
              <div className="text-left text-sm space-y-1 text-[17.75px]">
                <div>
                  <Link href="/terms" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                    Terms & Conditions
                  </Link>
                </div>
                <div>
                  <Link href="/privacy" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                    Privacy Policy
                  </Link>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center gap-6 pb-6">
                <a 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
                  aria-label="X (Twitter)"
                >
                  <RiTwitterXFill size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;