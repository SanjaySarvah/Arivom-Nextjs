"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { getAllNews, getAllArticles } from "@/lib/getData";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/Common/ClientLayoutWrapper";
import CategoryTabs from "@/components/Common/CategoryTabs";
import { Kumbh_Sans, Noto_Sans_Tamil } from "next/font/google";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kumbh",
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  display: "swap",
  variable: "--font-tamil",
});

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
    <html
      lang="en"
      className={`${kumbhSans.variable} ${notoSansTamil.variable} overflow-x-hidden`}
    >
      <body className="bg-gray-50 text-gray-800 overflow-x-hidden">
        <ClientLayoutWrapper>
          {/* ---------------- HEADER ---------------- */}
          <Header />

          {/* ---------------- STICKY CATEGORY TABS ---------------- */}
          {(showNewsTab || showArticlesTab) && (
            <div
              className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200"
              style={{ WebkitBackdropFilter: "blur(8px)" }}
            >
              {showNewsTab && (
                <CategoryTabs
                  items={news}
                  baseLink="/news"
                  label="NEWS"
                />
              )}
              {showArticlesTab && (
                <CategoryTabs
                  items={articles}
                  baseLink="/articles"
                  label="ARTICLES"
                />
              )}
            </div>
          )}

          {/* ---------------- MAIN CONTENT ---------------- */}
          <main className="w-full overflow-x-hidden min-h-screen">{children}</main>

          {/* ---------------- FOOTER ---------------- */}
          <Footer />
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
