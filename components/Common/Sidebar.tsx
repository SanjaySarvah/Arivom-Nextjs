"use client";

import { usePathname } from "next/navigation";
import PopularNews from "@/components/Common/DetailViews/PopularNews";
import PopularArticles from "@/components/Common/DetailViews/PopularArticles";
import Updates from "@/components/Common/DetailViews/Updates";

export default function Sidebar() {
  const pathname = usePathname();

  // Determine which route we're on
  const isHome = pathname === "/";
  const isNews = pathname?.startsWith("/news");
  const isArticles = pathname?.startsWith("/articles");

  return (
    <div className="space-y-6">
      {/* Home: Show both */}
      {isHome && (
        <>
          <PopularNews />
          <PopularArticles />
        </>
      )}

      {/* News: Show only PopularNews */}
      {isNews && !isHome && <PopularNews />}

      {/* Articles: Show only PopularArticles */}
      {isArticles && !isHome && <PopularArticles />}

      {/* Updates shown on all pages */}
      <Updates />
    </div>
  );
}
