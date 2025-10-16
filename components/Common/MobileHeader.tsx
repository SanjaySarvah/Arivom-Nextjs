"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {FaBars,FaUserCircle,FaHome,FaBookOpen,FaTags,FaRegNewspaper,} from "react-icons/fa";
import HamburgerSider from "../Common/HamburgerSider";
import logo from "@/public/assets/arivom-logo-latest.png";

const MobileHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNewsExpanded, setIsMobileNewsExpanded] = useState(false);
  const pathname = usePathname();
  const mainNavigation = [
    { name: "Home", href: "/", icon: FaHome, active: pathname === "/" },
    {
      name: "News",
      href: "/news",
      icon: FaRegNewspaper,
      active: pathname.startsWith("/news"),
    },
    {
      name: "Articles",
      href: "/articles",
      icon: FaBookOpen,
      active: pathname.startsWith("/articles"),
    },
    {
      name: "Tags",
      href: "/tags",
      icon: FaTags,
      active: pathname.startsWith("/tags"),
    },
  ];

  const newsCategories = [
    { name: "India", href: "/news/india" },
    { name: "World", href: "/news/world" },
    { name: "Politics", href: "/news/politics" },
    { name: "Technology", href: "/news/technology" },
    { name: "Sports", href: "/news/sports" },
  ];

  const toggleNewsExpanded = () =>
    setIsMobileNewsExpanded(!isMobileNewsExpanded);

  return (
    <>

      <header className="xl:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-[101] shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FaBars size={22} className="text-gray-800" />
          </button>

          <div className="flex-shrink-0">
            <Image
              src={logo}
              alt="Arivom Logo"
              width={120}
              height={40}
              className="object-contain mx-auto"
            />
          </div>

          <button
            onClick={() => alert("Profile clicked!")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaUserCircle size={24} className="text-gray-800" />
          </button>
        </div>
      </header>

      <HamburgerSider
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        mainNavigation={mainNavigation}
        newsCategories={newsCategories}
        isMobileNewsExpanded={isMobileNewsExpanded}
        toggleNewsExpanded={toggleNewsExpanded}
        pathname={pathname}
      />
    </>
  );
};

export default MobileHeader;
