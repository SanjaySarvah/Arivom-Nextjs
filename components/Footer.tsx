"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn, 
  FaTelegramPlane, 
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRss,
  FaArrowUp
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import logoSrc from "@/public/assets/logos/arivom-logo-latest.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const newsCategories = [
    "Politics", "Business", "Technology", "Sports", "Entertainment", 
    "Health", "Education", "World", "Local", "Opinion"
  ];

  const quickLinks = [
    "Home", "Latest News", "Popular", "Trending", "About Us", 
    "Careers", "Advertise", "Sitemap", "Archive"
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Main Footer Content */}
      <div className="max-w-[1320px] mx-auto px-4 py-12">
        {/* Top Section - Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-gray-700">
          {/* Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get the latest Tamil news and insights delivered to your inbox daily.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
              <div className="flex-1 relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                <span>123 News Street, Chennai, Tamil Nadu 600001</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-red-500 flex-shrink-0" />
                <span>+91 44 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-500 flex-shrink-0" />
                <span>contact@arivom.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-b border-gray-700">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={logoSrc}
                alt="Arivom Logo"
                width={120}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Arivom is your trusted Tamil news portal delivering accurate, timely news and 
              insightful analysis to keep you informed and empowered.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex items-center space-x-3">
                {[
                  { icon: FaFacebookF, href: "https://facebook.com", color: "hover:text-blue-500" },
                  { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-500" },
                  { icon: FaYoutube, href: "https://youtube.com", color: "hover:text-red-500" },
                  { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
                  { icon: FaTelegramPlane, href: "https://telegram.org", color: "hover:text-blue-400" },
                  { icon: FaWhatsapp, href: "https://wa.me", color: "hover:text-green-500" },
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
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">News Categories</h4>
            <ul className="space-y-2">
              {newsCategories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={`/category/${category.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Trending Topics</h4>
            <div className="flex flex-wrap gap-2">
              {["Election", "Technology", "Sports", "Movies", "Business", "Health", "Education", "Weather"].map((tag, index) => (
                <Link
                  key={index}
                  href={`/tag/${tag.toLowerCase()}`}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-300 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              © {currentYear} <span className="text-white font-semibold">Arivom</span>. 
              All rights reserved. — Tamil News & Knowledge Sharing Portal.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/rss" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <FaRss className="w-4 h-4" />
              RSS
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 shadow-lg transition-all duration-300 ease-in-out z-50 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-white text-lg group-hover:scale-110 transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default Footer;