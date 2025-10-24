"use client";
import { useState, useEffect } from "react";

interface Tab {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SocialTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const tabs: Tab[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zm-4.25 1.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "x",
    name: "X",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function SocialTabs({ activeTab, onChange }: SocialTabsProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Mobile slider */}
      <div className="sm:hidden overflow-x-auto no-scrollbar">
        <div className="flex gap-4 px-4">
          {tabs.map((tab: Tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 text-sm font-medium transition-all duration-200 relative rounded-t-lg whitespace-nowrap
                  ${isActive
                    ? "text-gray-900 bg-gray-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div
                  className={`p-1.5 rounded-md ${
                    isActive ? "bg-transparent" : "bg-transparent"
                  }`}
                >
                  {tab.icon}
                </div>
                <span className="font-semibold">{tab.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-1 bg-blue-500 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop / Tablet normal tabs */}
      <div className="hidden sm:flex justify-center gap-6 py-4">
        {tabs.map((tab: Tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-3 py-4 px-4 text-sm font-medium transition-all duration-200 relative rounded-t-lg
                ${isActive
                  ? "text-gray-900 bg-gray-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <div
                className={`p-1.5 rounded-md ${
                  isActive ? "bg-gray-100" : "bg-transparent"
                }`}
              >
                {tab.icon}
              </div>
              <span className="font-semibold">{tab.name}</span>
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-1 bg-blue-500 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
