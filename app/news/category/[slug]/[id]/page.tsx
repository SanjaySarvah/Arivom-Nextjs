'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { FaRegNewspaper } from 'react-icons/fa'
import CategoryBadge from '@/components/Common/Badges/CategoryBadge'
import PopularTag from '@/components/Common/Badges/PopularTag'
import TaggingBadgetesting from '@/components/News/Common/Badges/TaggingBadgetesting'
import { BASE_URL } from '@/lib/config'  

/** --- Types --- **/
interface NewsItem {
  id: string | number
  title: string
  excerpt?: string
  image?: string
  author?: string
  created_at?: string
  highlights?: string
  category_id?: string | number
  category_name?: string
  tags?: string 
}

interface CategoryItem {
  id: string | number
  name: string
  tname?: string
  slug?: string
  created_at?: string
  news?: NewsItem[]
}

/** --- Helper: Parse tags safely --- **/
const parseTags = (raw?: string | string[]): string[] => {
  if (!raw) return []
  // If already an array
  if (Array.isArray(raw)) return raw as string[]
  // If string: try JSON.parse then fallback to manual split
  try {
    const parsed = JSON.parse(raw as string)
    if (Array.isArray(parsed)) return parsed.map((t) => String(t))
  } catch (e) {
    // fallback: remove brackets and split by comma
    const cleaned = (raw as string).replace(/^\[|\]$/g, '').trim()
    if (!cleaned) return []
    return cleaned.split(',').map((s) => s.replace(/^["']|["']$/g, '').trim())
  }
  return []
}

/** --- TagRotator Component --- **/
function TagRotator({ tagsRaw, intervalMs = 5000 }: { tagsRaw?: string | string[]; intervalMs?: number }) {
  const tags = parseTags(tagsRaw)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (tags.length === 0) return
    // reset index when tags change
    setIdx(0)
    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % tags.length)
    }, intervalMs)

    return () => clearInterval(id)
  }, [tagsRaw, intervalMs]) // restart if tags change

  if (tags.length === 0) return null

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-[10px] leading-none uppercase tracking-wide text-gray-500">Tag</span>
      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
        {tags[idx]}
      </span>
    </div>
  )
}

/** --- Main Component --- **/
export default function CategoryPage() {
  const params = useParams()
  const { slug, id } = (params as { slug: string; id: string }) || { slug: undefined, id: undefined }

  const [category, setCategory] = useState<CategoryItem | null>(null)
  const [subcategories, setSubcategories] = useState<CategoryItem[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch main + subcategory + news
  const fetchCategoryData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/news/get/get_category_by_id.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_id: id }),
      })
      const data = await res.json()
      console.log('API Response:', data)

      if (data && data.success) {
        const cat = data.data.category
        const subs = data.data.subcategories || []
        const catNews = data.data.news || []

        setCategory(cat)
        setSubcategories(subs)
        setNews(catNews)
      } else {
        console.warn('No data found:', data)
        setCategory(null)
        setSubcategories([])
        setNews([])
      }
    } catch (err) {
      console.error('Error fetching category data:', err)
      setCategory(null)
      setSubcategories([])
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchCategoryData()
    // If id is undefined we still attempt fetch? guard is used above.
  }, [id])

  // Sidebar click
  const handleSidebarClick = (subcategory: CategoryItem | null) => {
    if (subcategory) {
      setSelectedSubcategory(Number(subcategory.id))
      setNews(subcategory.news || [])
    } else {
      setSelectedSubcategory(null)
      setNews(category?.news || [])
    }
  }

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '—'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  // Get category name dynamically
  const getNewsItemCategory = (newsItem: NewsItem) => {
    if ((newsItem as any).category_name) return (newsItem as any).category_name

    if (selectedSubcategory) {
      const subCat = subcategories.find((s) => Number(s.id) === selectedSubcategory)
      return subCat?.tname || subCat?.name || 'News'
    }

    return category?.tname || category?.name || 'News'
  }

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>
  if (!category) return <p className="text-center py-10 text-gray-500">Category not found.</p>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="bg-gray-50 rounded-xl shadow-sm p-4 h-fit md:sticky md:top-24">
        <h2
          onClick={() => handleSidebarClick(null)}
          className={`cursor-pointer font-semibold text-lg mb-3 ${selectedSubcategory === null ? 'text-[#017BFF]' : 'text-gray-800'}`}
        >
          {category.tname || category.name}
        </h2>

        <ul className="space-y-2">
          {subcategories.map((sub) => (
            <li
              key={sub.id}
              onClick={() => handleSidebarClick(sub)}
              className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition ${
                selectedSubcategory === Number(sub.id)
                  ? 'bg-[#017BFF]/10 text-[#017BFF] font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {sub.tname || sub.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* News Grid */}
      <main className="md:col-span-3">
        {/* <h1 className="text-2xl font-bold text-[#017BFF] mb-6 capitalize">
          {selectedSubcategory
            ? subcategories.find((s) => Number(s.id) === selectedSubcategory)?.tname ||
              subcategories.find((s) => Number(s.id) === selectedSubcategory)?.name
            : category.tname || category.name}
        </h1> */}

        {news.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link href={`/news/${item.id}`} className="block relative overflow-hidden">
                  <img
                    src={`${BASE_URL}/${item.image}`}
                    alt={item.title}
                    className="h-48 sm:h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => ((e.target as HTMLImageElement).src = '/fallback.jpg')}
                  />
                  {item.highlights && item.highlights.trim() !== '' && (
                    <div className="absolute top-2 left-2">
                      <PopularTag label={item.highlights} />
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div>
                    <Link href={`/news/${item.id}`}>
                      <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-[#017BFF] transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                    </Link>

                    {item.excerpt && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2 mb-3">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{item.author || 'ARIVOM Desk'}</span>
                      </div>
                      <span>{formatDate(item.created_at)}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      {/* Category Badge */}
                      {getNewsItemCategory(item) ? (
                        <CategoryBadge
                          category={getNewsItemCategory(item)}
                          icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                        />
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}

                      {/* Tag Rotator (shows one tag at a time, rotates every 5s) */}
                      <div className="ml-auto">
                        {/* <TagRotator tagsRaw={(item as any).tags} intervalMs={5000} /> */}
                        <TaggingBadgetesting tag={(item as any).tags} intervalMs={2000} />


                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
