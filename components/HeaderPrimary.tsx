"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logos/arivom-logo-latest.svg";
import { FaFacebookF, FaInstagram, FaTiktok, FaPinterestP, FaAmazon } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

interface HeaderPrimaryProps {
  logoSrc?: string;
}

const HeaderPrimary: React.FC<HeaderPrimaryProps> = ({ logoSrc }) => {
  const socialLinks = [
    { icon: <FaFacebookF size={16} />, color: "hover:text-blue-600", label: "Facebook" },
    { icon: <RiTwitterXFill size={16} />, color: "hover:text-gray-900", label: "X" },
    { icon: <FaInstagram size={16} />, color: "hover:text-pink-500", label: "Instagram" },
    { icon: <FaTiktok size={16} />, color: "hover:text-gray-900", label: "TikTok" },
    { icon: <FaAmazon size={16} />, color: "hover:text-orange-500", label: "Amazon" },
    { icon: <FaPinterestP size={16} />, color: "hover:text-red-500", label: "Pinterest" },
  ];

  return (
    <div className="py-3 max-w-[1320px] px-[15px] mx-auto">
      {/* Desktop View */}
      <div className="hidden xl:grid grid-cols-3 items-center">
        {/* Left: Social Icons */}
        <div className="flex gap-2">
          {socialLinks.map(({ icon, color, label }, idx) => (
            <a
              key={idx}
              href="#"
              aria-label={label}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 ${color} transition-colors duration-300`}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src={logoSrc ?? logo}
              alt="Arivom Logo"
              width={144}
              height={57}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition">
            Sign In
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="xl:hidden flex items-center justify-between">
        <div className="flex justify-center flex-1">
          <Link href="/">
            <Image
              src={logoSrc ?? logo}
              alt="Arivom Logo"
              width={144}
              height={57}
              className="object-contain"
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrimary;
