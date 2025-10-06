'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoSrc from "../../public/images/logo/arivom-logo-latest.svg"
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f9f9f9] py-6 border-t relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Logo and Description */}
        <div className="flex items-center space-x-3">
          <Image src={logoSrc} alt="Arivom Logo" width={24} height={24} />
          <span className="text-gray-800 text-sm">
            © {currentYear} <strong>Arivom</strong> — Tamil News & Knowledge Sharing Portal.
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex space-x-5 text-sm text-gray-600">
          <Link href="/terms" className="hover:text-black">Terms</Link>
          <Link href="/privacy" className="hover:text-black">Privacy</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center space-x-3 text-gray-700">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f text-lg hover:text-[#3b5998]"></i>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <i className="fab fa-x-twitter text-lg hover:text-black"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram text-lg hover:text-[#e1306c]"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="fab fa-youtube text-lg hover:text-[#ff0000]"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in text-lg hover:text-[#0077b5]"></i>
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <i className="fab fa-telegram-plane text-lg hover:text-[#0088cc]"></i>
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <i className="fab fa-whatsapp text-lg hover:text-[#25d366]"></i>
          </a>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-800 z-50"
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
