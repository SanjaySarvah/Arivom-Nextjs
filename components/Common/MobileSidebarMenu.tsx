"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaRegNewspaper } from "react-icons/fa";
import { TbBook2 } from "react-icons/tb";
import { Banknote, Share2 } from "lucide-react";
import ArticleCategoryDropdown from "@/components/ArticleDropdownButton";

const mainNavigation = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "News", href: "/news", icon: FaRegNewspaper },
  { name: "Articles", href: "/articles", icon: TbBook2 },
  { name: "Earn Money", href: "/earnmoney", icon: Banknote },
  { name: "Social Media", href: "/socialmedia", icon: Share2 },
  { name: "Gallery", href: "/gallery", icon: Share2 },
  { name: "Video", href: "/video", icon: Share2 },
];

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="xl:hidden fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-sm z-[999]">
      <div className="flex justify-around items-center py-2">
        {mainNavigation.map((item) => {
          if (item.name === "Articles") {
            // 🔽 Replace normal link with dropdown for mobile
            return (
              <div key={item.name} className="flex-1 text-center">
                <ArticleCategoryDropdown />
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center text-xs ${
                pathname === item.href
                  ? "text-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
           
            </Link>
          );
        })}
      </div>
    </div>
  );
}
