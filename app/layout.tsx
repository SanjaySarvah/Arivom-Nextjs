import './globals.css'
import { Kumbh_Sans, Noto_Sans_Tamil } from 'next/font/google'
import ClientLayoutWrapper from '@/components/Common/ClientLayoutWrapper'
import AppClientLayout from '@/components/Common/AppClientLayout'

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kumbh',
})

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  display: 'swap',
  variable: '--font-tamil',
})

export const metadata = {
  title: 'Arivom News',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kumbhSans.variable} ${notoSansTamil.variable}`}>
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        <ClientLayoutWrapper>
          <AppClientLayout>{children}</AppClientLayout>
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
