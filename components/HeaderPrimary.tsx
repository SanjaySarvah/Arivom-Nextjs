"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logos/arivom-logo-latest.svg";
import { FaFacebookF, FaInstagram, FaTiktok, FaPinterestP, FaAmazon } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

interface HeaderPrimaryProps {
  logoSrc?: string;
}

const HeaderPrimary: React.FC<HeaderPrimaryProps> = ({ logoSrc }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [articlesExpanded, setArticlesExpanded] = useState(false);

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, color: "hover:text-blue-600", label: "Facebook" },
    { icon: <RiTwitterXFill size={16} />, color: "hover:text-gray-900", label: "X" },
    { icon: <FaInstagram size={16} />, color: "hover:text-pink-500", label: "Instagram" },
    { icon: <FaTiktok size={16} />, color: "hover:text-gray-900", label: "TikTok" },
    { icon: <FaAmazon size={16} />, color: "hover:text-orange-500", label: "Amazon" },
    { icon: <FaPinterestP size={16} />, color: "hover:text-red-500", label: "Pinterest" },
  ];

  const newsCategories = [
    "வானியல்",
    "போக்குவரத்து",
    "சினிமா",
    "விவசாயம்",
    "சுற்றுச்சூழல் & சுற்றுலா",
    "கல்வி & தொழில்",
    "சுற்றுச்சூழல்",
    "தொழில்",
    "மருத்துவம்",
  ];

  const articlesCategories = [
    "Technology",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
    "Education",
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNews = () => setNewsExpanded(!newsExpanded);
  const toggleArticles = () => setArticlesExpanded(!articlesExpanded);

  return (
    <div className="py-3 max-w-[1320px] px-[15px] mx-auto">
      {/* Desktop View */}
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

      {/* Mobile/Tablet View */}
      <div className="xl:hidden flex items-center justify-between">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6 text-gray-700" />
          ) : (
            <HiMenu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Logo */}
        <div className="flex justify-center flex-1">
          <Link href="/">
            <Image
              src={logoSrc ?? logo}
              alt="Arivom Logo"
              width={120}
              height={48}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Placeholder for balance */}
        <div className="w-10"></div>
      </div>

      {/* Mobile Menu Drawer */}
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
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <button
              onClick={toggleMenu}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close menu"
            >
              <HiX className="w-7 h-7 text-gray-700" />
            </button>
          </div>

          {/* Logo Section */}
          <div className="px-5 py-8 border-b border-gray-100">
            <Image
              src={logoSrc ?? logo}
              alt="Arivom Logo"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Drawer Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Menu */}
            <nav className="py-2">
              <Link
                href="/"
                className="flex items-center justify-between px-5 py-4 text-gray-800 hover:bg-gray-50 transition-colors text-base font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>

              {/* News with Submenu */}
              <div className="border-t border-gray-100">
                <button
                  onClick={toggleNews}
                  className="flex items-center justify-between w-full px-5 py-4 text-gray-800 hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  <span>News</span>
                  <span className={`text-2xl font-light transition-transform duration-300 ${newsExpanded ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                {/* News Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                    newsExpanded ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="py-2">
                    {newsCategories.map((category, idx) => (
                      <Link
                        key={idx}
                        href={`/news/category/${category}`}
                        className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-blue-600 transition-colors"
                        onClick={toggleMenu}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Articles with Submenu */}
              <div className="border-t border-gray-100">
                <button
                  onClick={toggleArticles}
                  className="flex items-center justify-between w-full px-5 py-4 text-gray-800 hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  <span>Articles</span>
                  <span className={`text-2xl font-light transition-transform duration-300 ${articlesExpanded ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                {/* Articles Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                    articlesExpanded ? 'max-h-64' : 'max-h-0'
                  }`}
                >
                  <div className="py-2">
                    {articlesCategories.map((category, idx) => (
                      <Link
                        key={idx}
                        href={`/articles/category/${category.toLowerCase()}`}
                        className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-white hover:text-blue-600 transition-colors"
                        onClick={toggleMenu}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Need Help Section */}
            <div className="px-5 py-8 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <a
                  href="mailto:support@arivom.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">support@arivom.com</span>
                </a>
                <a
                  href="tel:+917667298398"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">+91 7667298398</span>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="px-5 py-4 space-y-3 border-t border-gray-100">
              <Link
                href="/terms"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-base font-medium"
                onClick={toggleMenu}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-base font-medium"
                onClick={toggleMenu}
              >
                Privacy Policy
              </Link>
            </div>

            {/* Social Links */}
            <div className="px-5 py-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="#"
                  aria-label="X"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-colors"
                >
                  <RiTwitterXFill size={20} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Auth Buttons - Bottom */}
          <div className="p-5 border-t border-gray-200 space-y-3 bg-gray-50">
            <button className="w-full px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all">
              Sign In
            </button>
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrimary;
