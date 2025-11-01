'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface CategoryItem {
  id: number
  name: string
  slug: string
}

interface NewsItem {
  id: number
  category_id: number
  title: string
  tname?: string
  excerpt: string
  image: string
  author: string
  created_at: string
  slug: string
}

export default function CategoryPage() {
  const { slug } = useParams() as { slug: string }

  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Step 1: get all categories to find id from slug
  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const res = await fetch('http://localhost/newsapi/news/get/get_categories.php')
        const data = await res.json()

        if (data.success && Array.isArray(data.data)) {
          const found = data.data.find(
            (cat: CategoryItem) => cat.slug.toLowerCase() === slug.toLowerCase()
          )
          if (found) {
            setCategoryId(found.id)
          } else {
            setError('Category not found')
            setLoading(false)
          }
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load category info')
        setLoading(false)
      }
    }

    if (slug) fetchCategoryId()
  }, [slug])

  // Step 2: Fetch news by category id
  useEffect(() => {
    const fetchNewsByCategory = async () => {
      if (!categoryId) return
      setLoading(true)
      try {
        const res = await fetch(
          `http://localhost/newsapi/news/get/get_news_by_category.php?category_id=${categoryId}`
        )
        const data = await res.json()

        if (data.success && Array.isArray(data.data)) {
          setNewsList(data.data)
        } else {
          setError('No news found for this category')
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load category news')
      } finally {
        setLoading(false)
      }
    }

    fetchNewsByCategory()
  }, [categoryId])

  // UI states
  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#017BFF] mb-6 capitalize">
        {slug.replace(/-/g, ' ')} News
      </h1>

      {newsList.length === 0 ? (
        <p className="text-gray-500">No articles available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <Link
              key={item.id}
              href={`/news/category/${slug}/${item.id}`}
              className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 p-4"
            >
              <img
                src={`http://localhost/newsapi/${item.image}`}
                alt={item.title}
                className="w-full h-44 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                {item.tname || item.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {item.excerpt}
              </p>
              <p className="text-xs text-gray-400">
                {item.author} • {new Date(item.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
