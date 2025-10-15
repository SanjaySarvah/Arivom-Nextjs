"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaUserPlus,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import logo from "@/public/assets/arivom-logo-latest.png";

interface DetailsHeaderProps {
  currentTitle?: string;
  contentType?: "news" | "articles";
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  currentTitle,
  contentType,
}) => {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigateHome = () => router.push("/");
  const handleNavigateToSection = () =>
    contentType && router.push(`/${contentType}`);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1320px] mx-auto px-3 sm:px-4 relative flex items-center h-14">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-lg hover:bg-emerald-50 transition-colors duration-200 z-10"
        >
          <FaArrowLeft className="w-4 h-4 text-gray-600" />
        </button>

        {/* Logo Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="ml-auto z-10" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-emerald-50 rounded-lg transition-all duration-300 group"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all duration-300">
                <FaUser className="w-4 h-4" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ecc71] border-2 border-white rounded-full" />
            </div>

            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-gray-800">Arivom</p>
            </div>

            <FaChevronDown
              className={`w-2.5 h-2.5 text-gray-500 transition-transform duration-300 hidden md:block ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-fadeIn">
              <div className="px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">Arivom</p>
                <p className="text-[8px] text-gray-600">Admin</p>
                <p className="text-[8px] text-gray-500 mt-0.5">
                  arivom@mail.com
                </p>
              </div>

              <div className="py-1.5">
                <Link
                  href="/signin"
                  className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                    <FaUser className="w-2.5 h-2.5 text-white" />
                  </span>
                  <span className="font-medium text-sm">Sign In</span>
                </Link>

                <Link
                  href="/signup"
                  className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                    <FaUserPlus className="w-2.5 h-2.5 text-white" />
                  </span>
                  <span className="font-medium text-sm">Sign Up</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

   {/* Breadcrumbs */}
{currentTitle && contentType && (
  <div className="bg-white border-t border-gray-100 z-40 shadow-sm backdrop-blur-sm bg-white/95">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="
          flex items-center text-sm text-gray-600 py-2
          overflow-x-auto sm:overflow-visible
          whitespace-nowrap sm:whitespace-normal
        "
      >
        <span
          onClick={handleNavigateHome}
          className="hover:text-[#2ecc71] cursor-pointer transition-colors duration-200 flex-shrink-0"
        >
          Home
        </span>

        <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

        <span
          onClick={handleNavigateToSection}
          className="hover:text-[#2ecc71] cursor-pointer transition-colors duration-200 flex-shrink-0"
        >
          {contentType === "news" ? "News" : "Articles"}
        </span>

        <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

        <span
          className="
            text-gray-900 font-medium
            truncate max-w-[180px]
            sm:truncate-0 sm:max-w-none
            flex-shrink
          "
        >
          {currentTitle}
        </span>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default DetailsHeader;
