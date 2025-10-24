"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTimes,
  FaSearch,
  FaVideo,
  FaFilm,
  FaImages,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import logo from "@/public/assets/arivom-logo-latest.png";

interface HamburgerSiderProps {
  isOpen: boolean;
  onClose: () => void;
  mainNavigation: {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
    active: boolean;
  }[];
  pathname: string;
}

const HamburgerSider: React.FC<HamburgerSiderProps> = ({
  isOpen,
  onClose,
  mainNavigation,
  pathname,
}) => {
  if (!isOpen) return null;

  return (
    <div
   className="xl:hidden fixed inset-0 z-[9999] transition-all duration-300"
  onClick={onClose}
    >
      {/* Sidebar */}
    <div
  className={`relative bg-white text-black w-80 h-full transform transition-all duration-300 ease-out overflow-y-auto z-[10000] shadow-2xl ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
  onClick={(e) => e.stopPropagation()}
>

        {/* Header */}
        <div className="p-5 border-b border-[var(--secondarylight)] flex items-center justify-between sticky top-0 bg-[var(--background)] z-20 shadow-sm">
          <Image
            src={logo}
            alt="Arivom Logo"
            width={130}
            height={50}
            className="object-contain"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--secondarylight)] transition-all duration-200 group"
          >
            <FaTimes
              size={18}
              className="text-[var(--foreground)] group-hover:text-[var(--secondary)]"
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 mb-3">
          <div className="flex items-center bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl px-4 py-2.5 border border-gray-200 dark:border-gray-700 focus-within:border-[var(--primary)] transition-all duration-300">
            <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search news, articles..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-[var(--foreground)]"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1.5 mb-8">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 flex items-center gap-2">
            <span className="w-1 h-3 bg-[var(--tertiary)] rounded-full"></span>
            Main Navigation
          </div>

          {mainNavigation
            .filter(
              (item) =>
                item.name !== "News" &&
                item.name !== "Articles" &&
                item.name !== "Tags"
            )
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl border-l-4 transition-all duration-200 ${
                  item.active
                    ? "text-[var(--tertiary)] bg-emerald-50 dark:bg-[#162c1f] border-[var(--tertiary)]"
                    : "text-gray-700 dark:text-gray-300 hover:text-[var(--tertiary)] hover:bg-emerald-50 dark:hover:bg-[#1b2f24] border-transparent hover:border-[var(--tertiary)]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    item.active
                      ? "bg-[var(--tertiary)] text-white shadow-md"
                      : "bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <item.icon size={14} />
                </div>
                {item.name}
              </Link>
            ))}
        </nav>

        {/* Media Section */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-4 px-4 pb-28">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-4 flex items-center gap-2">
            <span className="w-1 h-3 bg-[var(--tertiary)] rounded-full"></span>
            Media
          </div>

          {[
            { name: "Videos", icon: FaVideo, href: "/videos" },
            { name: "Shorts", icon: FaFilm, href: "/shorts" },
            { name: "Gallery", icon: FaImages, href: "/gallery" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl border-l-4 transition-all duration-200 ${
                pathname === link.href
                  ? "text-[var(--tertiary)] bg-emerald-50 dark:bg-[#162c1f] border-[var(--tertiary)]"
                  : "text-gray-700 dark:text-gray-300 hover:text-[var(--tertiary)] hover:bg-emerald-50 dark:hover:bg-[#1b2f24] border-transparent hover:border-[var(--tertiary)]"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  pathname === link.href
                    ? "bg-[var(--tertiary)] text-white"
                    : "bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300"
                }`}
              >
                <link.icon size={14} />
              </div>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-80 bg-[var(--foreground)] text-[var(--background)] dark:bg-black dark:text-white border-t border-[var(--tertiary)]/30">
          {/* Social Icons */}
          <div className="px-4 pt-4 pb-3 border-b border-white/10 flex justify-center gap-4">
            {[FaFacebook, FaYoutube, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--primary)]/20 flex items-center justify-center border border-white/10 transition-all duration-300"
              >
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="px-4 py-3 text-[11px] text-center text-white/80 space-y-1 border-b border-white/10">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:support@arivom.com"
                className="hover:text-[var(--tertiary)]"
              >
                support@arivom.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+919876543210"
                className="hover:text-[var(--tertiary)]"
              >
                +91 9876543210
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="px-4 py-2 border-b border-white/10 flex justify-center text-[11px] gap-3">
            <Link
              href="/terms-and-conditions"
              onClick={onClose}
              className="text-white/70 hover:text-[var(--tertiary)]"
            >
              Terms
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/privacy-policy"
              onClick={onClose}
              className="text-white/70 hover:text-[var(--tertiary)]"
            >
              Privacy
            </Link>
          </div>

          <div className="px-4 py-2">
            <p className="text-[10px] text-center font-medium text-white/70">
              © 2025{" "}
              <span className="font-bold text-[var(--tertiary)]">
                Arivom
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>

        {/* Custom Scrollbar */}
        <style jsx>{`
          ::-webkit-scrollbar {
            width: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 2px;
          }
          @media (prefers-color-scheme: dark) {
            ::-webkit-scrollbar-thumb {
              background: #444;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default HamburgerSider;
