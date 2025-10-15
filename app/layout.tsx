"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { getAllNews, getAllArticles } from "@/lib/getData";
import Header from "../components/Header";
import HeaderSecondary from "../components/HeaderSecondary";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/Common/ClientLayoutWrapper";
import CategoryTabs from "@/components/Common/CategoryTabs";
import { Kumbh_Sans, Noto_Sans_Tamil } from "next/font/google";
import DetailsHeader from "@/components/DetailsHeader";
import MobileCategoryTabs from "@/components/Common/MobileCategoryTabs";

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

  // Detect detail page
  const isDetailPage = pathname.match(/\/(news|articles)\/[^\/]+$/);

  // Detect auth pages (signin/signup)
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  // Tabs visibility
  const showNewsTab =
    !isDetailPage &&
    (pathname === "/" ||
      pathname === "/news" ||
      pathname.startsWith("/news/category"));

  const showArticlesTab =
    !isDetailPage &&
    (pathname === "/articles" ||
      pathname.startsWith("/articles/category"));

  return (
    <html lang="en" className={`${kumbhSans.variable} ${notoSansTamil.variable}`}>
      <head>
        {/* ✅ Viewport for proper mobile scaling */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Arivom News</title>
      </head>

      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        <ClientLayoutWrapper>
          {/* ---------------- HEADER SECTION ---------------- */}
          {isAuthPage ? (
            <DetailsHeader />
          ) : isDetailPage ? (
            ''    // logic removed
          ) : (
            <>
              {/* First Row */}
              <Header />

              {/* Sticky Navigation */}
              <div className="sticky top-0 z-50 bg-white shadow-md">
                <HeaderSecondary />

                {/* FIXED: Remove the label prop */}
                <MobileCategoryTabs items={[]} baseLink={""} />

                {(showNewsTab || showArticlesTab) && (
                  <div
                    className="bg-white/95 backdrop-blur-sm border-t border-gray-200"
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
              </div>
            </>
          )}

          {/* ---------------- MAIN CONTENT ---------------- */}
          <main className="bg-white w-full max-w-full ">
            {children}
          </main>

          {/* ---------------- FOOTER ---------------- */}
          <footer className="w-full footerspacing">
            <Footer />
          </footer>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}