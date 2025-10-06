import './globals.css'
import Header from "../components/Header"
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'
import ClientLayoutWrapper from '@/components/Common/ClientLayoutWrapper'

export const metadata = {
  title: 'Blog - Next.js + Tailwind',
  description: 'Demo blog with News and Articles',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper>
          {/* ✅ Header centered with fixed width and padding */}
          <div >
            <Header />
          </div>

          <Navbar />

          <main className="container py-8">
            {children}
          </main>

          <Footer />
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
