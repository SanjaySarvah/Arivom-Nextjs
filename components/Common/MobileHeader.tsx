"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    FaBars, FaUserCircle, FaHome, FaBookOpen, FaTags, FaRegNewspaper,
    FaUser, FaUserPlus
} from "react-icons/fa";

import HamburgerSider from "../Common/HamburgerSider";
import logo from "@/public/assets/arivom-logo-latest.png";
import MobileCategoryTabs from "@/components/Common/MobileCategoryTabs";

const MobileHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileNewsExpanded, setIsMobileNewsExpanded] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const mainNavigation = [
        { name: "Home", href: "/", icon: FaHome, active: pathname === "/" },
        { name: "News", href: "/news", icon: FaRegNewspaper, active: pathname.startsWith("/news") },
        { name: "Articles", href: "/articles", icon: FaBookOpen, active: pathname.startsWith("/articles") },
        { name: "Tags", href: "/tags", icon: FaTags, active: pathname.startsWith("/tags") },
    ];

    const newsCategories = [
        { name: "India", href: "/news/india" },
        { name: "World", href: "/news/world" },
        { name: "Politics", href: "/news/politics" },
        { name: "Technology", href: "/news/technology" },
        { name: "Sports", href: "/news/sports" },
    ];

    const toggleNewsExpanded = () => setIsMobileNewsExpanded(!isMobileNewsExpanded);

    return (
        <>
            <div className="xl:hidden fixed top-0 left-0 w-full z-[101]">
                <header className="w-full bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 rounded-md hover:bg-gray-100 transition">
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
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2 px-2 py-1.5 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                            >
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md transition-all duration-300">
                                        <FaUserCircle className="w-5 h-5" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ecc71] border-2 border-white rounded-full"></span>
                                </div>
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] animate-fadeIn">
                                    <div className="px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800">Arivom</p>
                                        <p className="text-xs text-gray-600">Admin</p>
                                        <p className="text-xs text-gray-500 mt-0.5">arivom@mail.com</p>
                                    </div>

                                    <div className="py-1.5">
                                        <Link
                                            href="/signin"
                                            className="flex items-center gap-2.5 px-3 py-1.5 text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center">
                                                <FaUser className="w-2.5 h-2.5 text-white" />
                                            </span>
                                            <span className="font-medium text-sm">Sign In</span>
                                        </Link>

                                        <Link
                                            href="/signup"
                                            className="flex items-center gap-2.5 px-3 py-1.5 text-gray-700 hover:bg-emerald-50 hover:text-[#1a8f52] transition-colors"
                                            onClick={() => setIsProfileDropdownOpen(false)}
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
                </header>

{pathname !== "/socialmedia" && pathname !== "/jobs" && (
  <div className="xl:hidden">
    <MobileCategoryTabs items={[]} baseLink={""} />
    {/* Spacer only when tabs are visible */}
    <div className="h-[108px]" />
  </div>
)}



            </div>

            {/* Spacer for header */}
            <div className="h-[108px] xl:hidden" />

            {/* Hamburger Sider */}
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
