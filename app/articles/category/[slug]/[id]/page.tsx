'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NewsItem {
  id: number
  category_id: number
  title: string
  tname?: string
  excerpt: string
  content: string
  image: string
  author: string
  created_at: string
  likes: number
  highlights?: string
}

export default function NewsDetailPage() {
  const { slug, id } = useParams() as { slug: string; id: string }
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost/newsapi/news/get/get_single_news.php?id=${id}`
        )
        const data = await res.json()

        if (data.success && data.data) {
          setNews(data.data)
        } else {
          setError('News item not found')
        }
      } catch (err) {
        console.error(err)
        setError('Failed to fetch news details')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchNewsDetail()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  if (!news) {
    return <div className="p-8 text-center text-gray-500">No details found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={`http://localhost/newsapi/${news.image}`}
        alt={news.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />

      <h1 className="text-2xl font-bold mb-3 text-[#017BFF]">
        {news.tname || news.title}
      </h1>

      <p className="text-gray-500 text-sm mb-6">
        {news.author} • {new Date(news.created_at).toLocaleDateString()} • {news.likes} likes
      </p>

      <div className="prose prose-blue max-w-none">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {news.content}
        </p>
      </div>
    </div>
  )
}
