"use client"

import Link from "next/link"
import { FiUser, FiClock, FiMapPin } from "react-icons/fi"

type NewsItem = {
  id: number
  title: string
  category: string
  image: string
  author: string
  created_at: string
  excerpt: string
  isBreaking?: boolean
  location?: string
}

interface Props {
  items: NewsItem[]
}

export default function NewspaperLayout({ items }: Props) {
  const mainStory = items[0]
  const secondaryStories = items.slice(1, 4)
  const sideStories = items.slice(4, 8)
  const bottomStories = items.slice(8, 12)

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto ">
        {/* Newspaper Header */}
        <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-2 tracking-tight">
            DAILY NEWS
          </h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600">
            <span>Today's Edition • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            })}</span>
            <span>Vol. 124 • No. 45</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Story - Left Column */}
          <div className="lg:col-span-8">
            {mainStory && (
              <Link href={`/news/${mainStory.id}`}>
                <div className="group cursor-pointer mb-8">
                  {/* Breaking News Banner */}
                  {mainStory.isBreaking && (
                    <div className="bg-red-600 text-white px-4 py-2 mb-4 inline-flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="font-bold text-sm uppercase">Breaking News</span>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={mainStory.image}
                      alt={mainStory.title}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-bold uppercase">
                          {mainStory.category}
                        </span>
                        {mainStory.location && (
                          <span className="flex items-center gap-1 text-gray-600 text-sm">
                            <FiMapPin className="w-4 h-4" />
                            {mainStory.location}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                        {mainStory.title}
                      </h2>
                      
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        {mainStory.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <FiUser className="w-4 h-4" />
                            {mainStory.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FiClock className="w-4 h-4" />
                            {new Date(mainStory.created_at).toLocaleTimeString([], { 
                              hour: '2-digit', minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        <span className="text-sm uppercase tracking-wide font-semibold">
                          Continue Reading →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Secondary Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {secondaryStories.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="group cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-32">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Stories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              {bottomStories.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="group cursor-pointer">
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{item.author}</span>
                      <span>•</span>
                      <span>{new Date(item.created_at).getHours()}h ago</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              {/* Side Stories */}
              <div className="space-y-6">
                {sideStories.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <div className="group cursor-pointer border-l-4 border-blue-600 pl-4 py-2">
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mb-2">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-lg p-6 mt-8 text-white">
                <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                <p className="text-blue-200 text-sm mb-4">
                  Get the latest news delivered to your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-white/40"
                  />
                  <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}