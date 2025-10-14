"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Link from "next/link";

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-emerald-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label="Profile Menu"
      >
        <FaUserCircle className="w-6 h-6 text-gray-600 hover:text-emerald-600 transition-colors" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
          {/* Sign In */}
          <Link
            href="/signin"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <FaSignInAlt className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                Sign In
              </span>
              <span className="text-xs text-gray-500">
                Access your account
              </span>
            </div>
          </Link>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-1"></div>

          {/* Sign Up */}
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <FaUserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Sign Up
              </span>
              <span className="text-xs text-gray-500">
                Create new account
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
