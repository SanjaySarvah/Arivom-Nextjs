"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaNewspaper,
  FaInfo,
  FaShieldAlt,
  FaFileContract,
  FaQuestionCircle,
  FaRss
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logoSrc from "@/public/assets/logos/arivom-logo-latest.svg";

const TrendingFooter = () => {
  const currentYear = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerSections = {
    company: [
      { name: "About Us", href: "/about", icon: FaInfo },
      { name: "Careers", href: "/careers", icon: FaNewspaper },
      { name: "Contact", href: "/contact", icon: FaEnvelope },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy", icon: FaShieldAlt },
      { name: "Terms of Service", href: "/terms", icon: FaFileContract },
      { name: "Cookie Policy", href: "/cookies", icon: FaQuestionCircle },
    ],
    resources: [
      { name: "Help Center", href: "/help", icon: FaQuestionCircle },
      { name: "RSS Feed", href: "/rss", icon: FaRss },
      { name: "Newsletter", href: "/newsletter", icon: MdEmail },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook", color: "hover:bg-[#1877F2]" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-[#FF0000]" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
    { icon: FaTelegramPlane, href: "https://telegram.org", label: "Telegram", color: "hover:bg-[#0088cc]" },
    { icon: FaWhatsapp, href: "https://whatsapp.com", label: "WhatsApp", color: "hover:bg-[#25D366]" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Color Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-secondary opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-16 left-1/3 w-72 h-72 bg-tertiary opacity-5 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section - Logo & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Image
                src={logoSrc}
                alt="Arivom Logo"
                width={160}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Your trusted source for the latest news, insights, and stories that matter. Stay informed, stay connected.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@arivom.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaEnvelope className="text-primary" />
                </div>
                <span className="text-sm">info@arivom.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaPhone className="text-primary" />
                </div>
                <span className="text-sm">+123 456 7890</span>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white relative inline-block">
                Company
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
              </h4>
              <ul className="space-y-4">
                {footerSections.company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
                    >
                      <item.icon className="text-sm group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white relative inline-block">
                Legal
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-tertiary"></span>
              </h4>
              <ul className="space-y-4">
                {footerSections.legal.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
                    >
                      <item.icon className="text-sm group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white relative inline-block">
                Resources
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-tertiary to-primary"></span>
              </h4>
              <ul className="space-y-4">
                {footerSections.resources.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
                    >
                      <item.icon className="text-sm group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Social Media Section */}
        <div className="mb-8">
          <h3 className="text-center text-lg font-semibold mb-6">Connect With Us</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`group relative w-11 h-11 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
              >
                <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors relative z-10" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} <span className="text-primary font-semibold">Arivom</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out z-50 group MobileViewContent transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-white text-lg group-hover:translate-y-[-2px] transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default TrendingFooter;
