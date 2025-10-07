import "./globals.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/Common/ClientLayoutWrapper";

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
      

          {/* ✅ Main Content */}
          <main className="w-full py-8">{children}</main>

          {/* ✅ Footer */}
          <Footer />
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
