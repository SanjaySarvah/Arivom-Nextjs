"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { getAllNews, getAllArticles } from "@/lib/getData";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/Common/ClientLayoutWrapper";
import CategoryTabs from "@/components/Common/CategoryTabs";

const news = getAllNews();
const articles = getAllArticles();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine which tab to show
  const showNewsTab =
    pathname === "/" || pathname === "/news" || pathname.startsWith("/news/category");
  const showArticlesTab =
    pathname === "/articles" || pathname.startsWith("/articles/category");

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <ClientLayoutWrapper>
          <Header />

          {/* Show category tabs based on route */}
          {showNewsTab && <CategoryTabs items={news} baseLink="/news" label="NEWS" />}
          {showArticlesTab && (
            <CategoryTabs items={articles} baseLink="/articles" label="ARTICLES" />
          )}

          <main className="w-full">{children}</main>

          <Footer />
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
