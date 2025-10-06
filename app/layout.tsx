import './globals.css'
import Header from "../components/Header";
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Blog - Next.js + Tailwind',
  description: 'Demo blog with News and Articles',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <Navbar />
        <main className="container py-8">{children}</main>
      </body>
    </html>
  )
}
