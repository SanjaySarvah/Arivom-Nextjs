import "./globals.css";

import { getAllNews } from "@/lib/getData";
import { getAllArticles } from "@/lib/getData";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/Common/ClientLayoutWrapper";
import CategoryTabs from "@/components/Common/CategoryTabs";
const news = getAllNews();
const articles =getAllArticles();

export const metadata = {
  title: "Blog - Next.js + Tailwind",
  description: "Demo blog with News and Articles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <ClientLayoutWrapper>
          {/* ✅ Common Layout Components */}
          <Header />
      
<CategoryTabs items={news} baseLink="/news" label="NEWS" />
          {/* ✅ Main Content */}
          <main className="w-full">{children}</main>

          {/* ✅ Footer */}
          <Footer />
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
