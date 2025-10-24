"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUserPlus, FaUser, FaChevronDown } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import logo from "@/public/assets/arivom-logo-latest.png";

interface DetailsHeaderProps {
  currentTitle?: string;
  contentType?: "news" | "articles";
  actions?: React.ReactNode; // ✅ your icons like share/bookmark
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  currentTitle,
  contentType,
  actions,
}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateHome = () => router.push("/");
  const handleNavigateToSection = () =>
    contentType && router.push(`/${contentType}`);

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
        : 'bg-white border-b border-gray-200'
      }`}>
      {/* === TOP HEADER === Desktop Only */}
      <div className={`hidden md:block max-w-[1320px] mx-auto px-3 sm:px-4 relative transition-all duration-300 ${isScrolled ? 'h-12' : 'h-14'
        }`}>
        <div className="flex items-center h-full">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className={`p-1.5 rounded-lg transition-all duration-300 z-10 ${isScrolled
                ? 'bg-emerald-50 hover:bg-emerald-100 shadow-sm'
                : 'hover:bg-emerald-50'
              }`}
          >
            <FaArrowLeft className={`w-4 h-4 transition-colors duration-300 ${isScrolled ? 'text-emerald-600' : 'text-gray-600'
              }`} />
          </button>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-0 transition-all duration-300">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={isScrolled ? 100 : 120}
                height={isScrolled ? 40 : 48}
                className="object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="ml-auto z-10" ref={dropdownRef}>
            {/* <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 group ${
              isScrolled
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 shadow-sm'
                : 'hover:bg-emerald-50'
            }`}
          >
            <div className="relative">
              <div className={`rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 ${
                isScrolled ? 'w-8 h-8' : 'w-9 h-9'
              }`}>
                <FaUser className={`transition-all duration-300 ${
                  isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'
                }`} />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ecc71] border-2 border-white rounded-full" />
            </div>

            <div className="text-left hidden md:block">
              <p className={`font-semibold text-gray-800 transition-all duration-300 ${
                isScrolled ? 'text-xs' : 'text-sm'
              }`}>Arivom</p>
            </div>

            <FaChevronDown
              className={`w-2.5 h-2.5 text-gray-500 transition-transform duration-300 hidden md:block ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button> */}

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-fadeIn">
                <div className="px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">Arivom</p>
                  <p className="text-xs text-gray-600">Admin</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    arivom@mail.com
                  </p>
                </div>

                <div className="py-1.5">
                  <Link
                    href="/signin"
                    className="flex items-center gap-2.5 px-3 py-1.5 text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                      <FaUser className="w-2.5 h-2.5 text-white" />
                    </span>
                    <span className="font-medium text-sm">Sign In</span>
                  </Link>

                  <Link
                    href="/signup"
                    className="flex items-center gap-2.5 px-3 py-1.5 text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
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
      </div>

      {/* === MOBILE: Back Button + Breadcrumb on Same Line === */}
      <div className="md:hidden">
        {(currentTitle || actions) && (
          <div className={`border-t border-gray-100 transition-all duration-300 ${isScrolled
              ? 'bg-gradient-to-r from-gray-50 to-white shadow-md'
              : 'bg-white/95 shadow-sm backdrop-blur-sm'
            }`}>
            <div className={`max-w-7xl mx-auto px-4 flex items-start gap-3 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-2'
              }`}>
              {/* Back Button on Mobile */}
              <button
                onClick={() => router.back()}
                className={`p-1.5 rounded-lg transition-all duration-300 flex-shrink-0 mt-0.5 ${isScrolled
                    ? 'bg-emerald-50 hover:bg-emerald-100 shadow-sm'
                    : 'hover:bg-emerald-50'
                  }`}
              >
                <FaArrowLeft className={`w-4 h-4 transition-colors duration-300 ${isScrolled ? 'text-emerald-600' : 'text-gray-600'
                  }`} />
              </button>

              {/* Breadcrumb on Mobile */}
              {currentTitle && contentType && (
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  {/* Navigation Path */}
                  <div className="flex items-center text-xs text-gray-600 whitespace-nowrap">
                    <span
                      onClick={handleNavigateHome}
                      className="hover:text-[#017BFF] cursor-pointer transition-colors duration-200"
                    >
                      Home
                    </span>

                    <ChevronRight className="w-3 h-3 mx-1 text-gray-400 flex-shrink-0" />

                    <span
                      onClick={handleNavigateToSection}
                      className="hover:text-[#017BFF] cursor-pointer transition-colors duration-200"
                    >
                      {contentType === "news" ? "News" : "Articles"}
                    </span>
                  </div>

                  <span className="!text-[14px] text-gray-600 leading-snug line-clamp-3">
                    {currentTitle}
                  </span>

                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* === BREADCRUMB + ACTIONS SINGLE ROW === Desktop Only */}
      {(currentTitle || actions) && (
        <div className={`hidden md:block border-t border-gray-100 transition-all duration-300 ${isScrolled
            ? 'bg-gradient-to-r from-gray-50 to-white shadow-md'
            : 'bg-white/95 shadow-sm backdrop-blur-sm'
          }`}>
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-10' : 'h-11'
            }`}>
            {/* Breadcrumb */}
            {currentTitle && contentType && (
              <div className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                <span
                  onClick={handleNavigateHome}
                  className="hover:text-[#017BFF] cursor-pointer transition-colors duration-200"
                >
                  Home
                </span>

                <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

                <span
                  onClick={handleNavigateToSection}
                  className="hover:text-[#017BFF] cursor-pointer transition-colors duration-200"
                >
                  {contentType === "news" ? "News" : "Articles"}
                </span>

                <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

                <span className="text-gray-900 font-medium truncate max-w-[160px] sm:max-w-none">
                  {currentTitle}
                </span>
              </div>
            )}

            {/* Actions (hidden on mobile) */}
            {actions && (
              <div className="hidden sm:flex items-center gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsHeader;
