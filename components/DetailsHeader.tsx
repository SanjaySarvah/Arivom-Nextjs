"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import logo from "@/public/assets/arivom-logo-latest.png";

interface DetailsHeaderProps {
  currentTitle?: string;
  contentType?: "news" | "articles";
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ currentTitle, contentType }) => {
  const router = useRouter();

  const handleNavigateHome = () => router.push("/");
  const handleNavigateToSection = () => contentType && router.push(`/${contentType}`);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1320px] mx-auto px-3 sm:px-4 relative flex items-center h-14">
        {/* Left: Back Button */}
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-lg hover:bg-emerald-50 transition-colors duration-200 z-10"
        >
          <FaArrowLeft className="w-4 h-4 text-gray-600" />
        </button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
          <Link href="/">
            <Image src={logo} alt="Logo" width={120} height={48} className="object-contain" />
          </Link>
        </div>

        {/* Right: Profile Placeholder */}
        <div className="ml-auto z-10">
          <FaUserCircle className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* Breadcrumbs */}
      {currentTitle && contentType && (
        <div className="bg-white border-t border-gray-100 z-40 shadow-sm backdrop-blur-sm bg-white/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-600 py-2 overflow-x-auto">
              <span
                onClick={handleNavigateHome}
                className="hover:text-[#2ecc71] cursor-pointer transition-colors duration-200 whitespace-nowrap"
              >
                Home
              </span>

              <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

              <span
                onClick={handleNavigateToSection}
                className="hover:text-[#2ecc71] cursor-pointer transition-colors duration-200 whitespace-nowrap"
              >
                {contentType === "news" ? "News" : "Articles"}
              </span>

              <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />

              <span className="text-gray-900 truncate font-medium whitespace-nowrap">
                {currentTitle.length > 50 ? `${currentTitle.substring(0, 50)}...` : currentTitle}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsHeader;
