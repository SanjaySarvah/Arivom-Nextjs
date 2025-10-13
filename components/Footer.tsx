"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import logoSrc from "@/public/assets/logos/arivom-logo-latest.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-[#f9f9f9] relative">
      <div className="max-w-[1320px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 h-[150px]">

        {/* Left Column: Logo + Description */}
        <div className="flex flex-col md:items-start items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={logoSrc}
              alt="Arivom Logo"
              width={100}
              height={40}
              className="object-contain"
            />
            {/* <span className="text-gray-800 text-base font-semibold">Arivom</span> */}
          </div>
          <p className="text-gray-600 text-base text-center md:text-left">
            © {currentYear} <b>Arivom</b> — Tamil News & Knowledge Sharing Portal.
          </p>
        </div>

        {/* Right Column: Navigation + Social Icons in same row */}
        <div className="flex flex-row flex-wrap items-center gap-4 md:gap-6">
          {/* Navigation Links */}
          <div className="flex items-center space-x-2 text-gray-600 text-sm md:text-base">
            <Link href="/terms" className="hover:text-black">Terms</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-black">Privacy</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-black">Contact</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-gray-700">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="w-5 h-5 hover:text-blue-600 transition-colors"/>
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="w-5 h-5 hover:text-blue-400 transition-colors"/>
            </a> */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-5 h-5 hover:text-pink-500 transition-colors"/>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube className="w-5 h-5 hover:text-[#2ecc71] transition-colors"/>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="w-5 h-5 hover:text-blue-700 transition-colors"/>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <FaTelegramPlane className="w-5 h-5 hover:text-blue-400 transition-colors"/>
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="w-5 h-5 hover:text-green-500 transition-colors"/>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
    <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="
    fixed
    bottom-24
    right-5
    w-12
    h-12
    flex
    items-center
    justify-center
    rounded-full
    bg-black
    shadow-lg
    transition-all
    duration-300
    ease-in-out
    z-50
    hover:bg-[#e43131]
    group
  "
  aria-label="Scroll to top"
>
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-white"
  >
    <path
      d="M3 11.9175L12 2.91748L21 11.9175H16.5V20.1675C16.5 20.3664 16.421 20.5572 16.2803 20.6978C16.1397 20.8385 15.9489 20.9175 15.75 20.9175H8.25C8.05109 20.9175 7.86032 20.8385 7.71967 20.6978C7.57902 20.5572 7.5 20.3664 7.5 20.1675V11.9175H3Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
</button>



      )}
    </footer>
  );
};

export default Footer;
