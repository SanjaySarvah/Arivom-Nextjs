'use client'

import { usePathname } from 'next/navigation'
import Header from '../Header'
import HeaderSecondary from '../HeaderSecondary'
import Footer from '../Footer'
import CategoryTabs from './CategoryTabs'
import DetailsHeader from '../DetailsHeader'
import { getAllNews, getAllArticles } from '@/lib/getData'

export default function AppClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isDetailPage = pathname.match(/\/(news|articles)\/[^\/]+$/)
  const isAuthPage = pathname === '/signin' || pathname === '/signup'

  const showNewsTab =
    !isDetailPage &&
    pathname !== '/' && // 👈 Hide on root
    (pathname === '/news' || pathname.startsWith('/news/category'))

  const showArticlesTab =
    !isDetailPage &&
    pathname !== '/' && // 👈 Hide on root
    (pathname === '/articles' || pathname.startsWith('/articles/category'))

  const news = getAllNews()
  const articles = getAllArticles()

  return (
    <>
      {/* Header Section */}
      {isAuthPage ? (
        <DetailsHeader />
      ) : isDetailPage ? null : (
        <>
          <Header />
          <div className="sticky top-0 z-50 bg-white shadow-md">
            <HeaderSecondary />
             <CategoryTabs
                 
                    baseLink="/news"
                    label="NEWS"
                  />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="bg-white w-full max-w-full">{children}</main>

      {/* Footer */}
      <footer className="hidden sm:block w-full footerspacing">
        <Footer />
      </footer>
    </>
  )
}
