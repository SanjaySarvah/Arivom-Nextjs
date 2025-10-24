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
      { name: "Privacy Policy", href: "/privacy-policy", icon: FaShieldAlt },
      { name: "Terms & Conditions", href: "/terms-and-conditions", icon: FaFileContract },
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
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Color Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-green-500 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-16 left-1/3 w-72 h-72 bg-teal-500 opacity-8 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Top Section - Logo & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-4">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Image
                src={logoSrc}
                alt="Arivom Logo"
                width={160}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-white/80 leading-relaxed max-w-sm text-sm">
              Your trusted source for the latest news, insights, and stories that matter. Stay informed, stay connected.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@arivom.com" className="flex items-center gap-3 text-white/90 hover:text-emerald-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-500/20 transition-all duration-300 border border-white/10">
                  <FaEnvelope className="text-emerald-400" />
                </div>
                <span className="text-sm font-medium">info@arivom.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-white/90 hover:text-emerald-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-500/20 transition-all duration-300 border border-white/10">
                  <FaPhone className="text-emerald-400" />
                </div>
                <span className="text-sm font-medium">+123 456 7890</span>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Company Links */}
            <div>
              <h4 className="text-base font-bold mb-4 text-white relative inline-block pb-2">
                Company
                <span className="absolute -bottom-0 left-0 w-14 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></span>
              </h4>
              <ul className="space-y-2.5">
                {footerSections.company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all duration-300 border border-white/10">
                        <item.icon className="text-xs text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-base font-bold mb-4 text-white relative inline-block pb-2">
                Legal
                <span className="absolute -bottom-0 left-0 w-14 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></span>
              </h4>
              <ul className="space-y-2.5">
                {footerSections.legal.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-all duration-300 border border-white/10">
                        <item.icon className="text-xs text-green-400" />
                      </div>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-base font-bold mb-4 text-white relative inline-block pb-2">
                Resources
                <span className="absolute -bottom-0 left-0 w-14 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></span>
              </h4>
              <ul className="space-y-2.5">
                {footerSections.resources.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all duration-300 border border-white/10">
                        <item.icon className="text-xs text-teal-400" />
                      </div>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>

        {/* Social Media Section */}
        <div className="mb-6">
          <h3 className="text-center text-base font-bold mb-5 text-white">Connect With Us</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`group relative w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-white/10 border border-white/10 ${social.color}`}
              >
                <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform relative z-10" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-5 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} <span className="font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Arivom</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse text-base">❤</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out z-50 group transform hover:scale-110 border-2 border-white/20 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-white text-lg group-hover:translate-y-[-2px] transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default TrendingFooter;
