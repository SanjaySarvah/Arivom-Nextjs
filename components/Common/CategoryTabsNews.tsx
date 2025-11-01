'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface CategoryItem {
  id: number
  name: string
  tname?: string
  slug: string
}

interface SubCategoryItem {
  id: number
  name: string
  tname?: string
  slug?: string
}

interface CategoryTabsProps {
  baseLink: string
  label: string
}

const TRUNCATE_BY_CHARS = false
const MAX_WORDS = 8
const MAX_CHARS = 8

export default function CategoryTabs({ baseLink, label }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pathname = (usePathname() ?? '').toLowerCase()
  const router = useRouter()

  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [subcategories, setSubcategories] = useState<SubCategoryItem[]>([])
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  // 🔥 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost/newsapi/news/get/get_categories.php')
        const data = await res.json()
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data)
        } else {
          console.error('Invalid category API response:', data)
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
  }, [])

  // 🧩 Handle category click → fetch subcategories + update URL
  const handleCategoryClick = async (category: CategoryItem) => {
    setActiveCategory(category.id)
    setSubcategories([])

    // 👇 Navigate to category route
    router.push(`${baseLink}/category/${encodeURIComponent(category.slug.toLowerCase())}`)

    try {
      const res = await fetch('http://localhost/newsapi/news/get/get_subcategories.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_id: category.id }),
      })
      const data = await res.json()

      if (data.status === 'success' && Array.isArray(data.subcategories)) {
        setSubcategories(data.subcategories)
      } else {
        console.warn('⚠️ No subcategories found:', data)
      }
    } catch (err) {
      console.error('Error fetching subcategories:', err)
    }
  }

  // 📱 Handle resize & sticky state
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 639px)')
    const onMqChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(Boolean(e.matches))
    if ('addEventListener' in mq) {
      mq.addEventListener('change', onMqChange as EventListener)
    } else {
      // @ts-ignore
      mq.addListener(onMqChange)
    }
    setIsMobile(mq.matches)
    const onScroll = () => setIsSticky(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => {
      if ('removeEventListener' in mq) {
        mq.removeEventListener('change', onMqChange as EventListener)
      } else {
        // @ts-ignore
        mq.removeListener(onMqChange)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // 🔄 Scroll
  const scrollLeft = () => containerRef.current?.scrollBy({ left: -250, behavior: 'smooth' })
  const scrollRight = () => containerRef.current?.scrollBy({ left: 250, behavior: 'smooth' })

  // ✂️ Helpers
  const truncateByWords = (s: string) => {
    const words = s.trim().split(/\s+/)
    return words.length <= MAX_WORDS ? s : words.slice(0, MAX_WORDS).join(' ') + '...'
  }
  const truncateByChars = (s: string) => (s.length <= MAX_CHARS ? s : s.slice(0, MAX_CHARS) + '...')
  const formatDisplayName = (fullName: string) => {
    if (!isMobile) return fullName
    return TRUNCATE_BY_CHARS ? truncateByChars(fullName) : truncateByWords(fullName)
  }

  return (
    <div
      className={`block w-full transition-all duration-300 ${
        isSticky ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-gray-50'
      }`}
    >
      {/* 🟦 Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-12">
          {/* Label */}
          <span className="text-[#017BFF] font-bold text-sm whitespace-nowrap px-3 py-1 rounded-lg bg-gradient-to-r from-[#017BFF]/10 to-[#017BFF]/10 border border-[#017BFF]/20">
            {label}
          </span>

          {/* Left Arrow */}
          {!isMobile && (
            <button onClick={scrollLeft} className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scrollable Categories */}
          <div
            ref={containerRef}
            className="flex-1 flex overflow-x-auto whitespace-nowrap scroll-smooth gap-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat) => {
              const fullName = (cat.tname || cat.name).trim()
              const displayName = formatDisplayName(fullName)
              const isActive = activeCategory === cat.id
              const showTooltip = displayName !== fullName

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  title={showTooltip ? fullName : undefined}
                  className={`relative px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#017BFF] border-b-2 border-[#017BFF]'
                      : 'text-gray-700 hover:text-[#017BFF]'
                  }`}
                >
                  {displayName}
                </button>
              )
            })}
          </div>

          {/* Right Arrow */}
          {!isMobile && (
            <button onClick={scrollRight} className="text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 🟨 Subcategory Links */}
      {subcategories.length > 0 && (
        <div className="bg-white border-t border-gray-200 mt-2">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-3">
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`${baseLink}/category/${encodeURIComponent(
                  categories.find((c) => c.id === activeCategory)?.slug || ''
                )}/${sub.id}`}
                className="text-sm text-gray-700 bg-gray-100 hover:bg-[#017BFF] hover:text-white px-3 py-1 rounded-lg transition-all"
              >
                {sub.tname || sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
