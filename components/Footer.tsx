"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowUp, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoSrc from "@/public/assets/logos/arivom-logo-latest.svg";

const TrendingFooter = () => {
  const currentYear = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trendingTopics = [
    "Election",
    "Technology",
    "Sports",
    "Movies",
    "Business",
    "Health",
    "Education",
    "Weather",
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        {/* Top Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <Image src={logoSrc} alt="Arivom Logo" width={140} height={50} className="object-contain" />

 

          {/* Social Media Links */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            {[
              { icon: FaFacebookF, href: "https://facebook.com", color: "hover:text-blue-500" },
              { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-500" },
              { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
              { icon: FaYoutube, href: "https://youtube.com", color: "hover:text-red-500" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors ${social.color}`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm mt-6">
            © {currentYear} <span className="text-white font-semibold">Arivom</span>. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-red-700 shadow-lg transition-all duration-300 ease-in-out z-50 group MobileViewContent "
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-white text-lg group-hover:scale-110 transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default TrendingFooter;
