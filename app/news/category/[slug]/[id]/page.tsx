'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CategoryPage() {
  const params = useParams()
  const { slug, id } = params as { slug: string; id: string }

  const [news, setNews] = useState<any[]>([])

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const res = await fetch('http://localhost/newsapi/news/get/get_news_by_category.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category_id: id }),
        })
        const data = await res.json()
        if (data.status === 'success' && Array.isArray(data.news)) {
          setNews(data.news)
        } else {
          console.warn('No news found:', data)
        }
      } catch (err) {
        console.error('Error fetching category news:', err)
      }
    }

    if (id) fetchCategoryNews()
  }, [id])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#017BFF] mb-4 capitalize">
        Category: {slug.replace(/-/g, ' ')} ({id})
      </h1>

      {news.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition-all"
            >
              <img
                src={item.image || '/placeholder.jpg'}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="font-semibold text-lg mb-1">{item.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
