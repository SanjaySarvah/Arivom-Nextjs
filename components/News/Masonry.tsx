"use client"
import { FiTrendingUp } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight, FiClock, FiUser } from "react-icons/fi";


import { useState, useMemo } from "react"
import Link from "next/link"
import {
  getAllNews,
  getNewsByCategory,
  transformToGeneralPost,
} from "@/lib/getData"

type Category = string

export default function NewsPortalLayout() {
  // 🗞️ Fetch all data once
  const allNews = useMemo(() => transformToGeneralPost(getAllNews()), [])
  const categories = useMemo(
    () => Array.from(new Set(allNews.map((n) => n.category))),
    [allNews]
  )

  // 🔍 Category Filter
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") return allNews
    return transformToGeneralPost(getNewsByCategory(selectedCategory))
  }, [selectedCategory, allNews])

  // 🔝 Featured Article
  const featured = filteredNews[0]
  const gridItems = filteredNews.slice(1, 5)
  const sidebarItems = filteredNews.slice(7, 20)

  return (
    <section className=" bg-gray-50">
      <div className="max-w-7xl ">
    

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 📰 Featured Story + Grid */}
          <div className="lg:col-span-8 space-y-10">
            {/* 🎯 Featured Story */}
            {featured && (
              <Link href={`/news/${featured.id}`} className="block group">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative w-full h-[420px] overflow-hidden group">
  <img
    src={featured.image}
    alt={featured.title}
    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/30 transition"></div>

</div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-0 p-6 text-white">
                   
                    <span className="inline-block self-start  text-white text-xs font-semibold rounded px-2 py-0.5" style={{ backgroundColor: "var(--tertiary)" }}>
  {featured.category}
</span>

                 <h2 className="text-2xl md:text-4xl font-bold mt-3 mb-2 leading-tight group-hover:text-blue-300 transition text-white !text-white">
  {featured.title}
</h2>

                    <p className="text-blue-100 text-base md:text-lg line-clamp-2">
                      {featured.description}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* 🔹 Grid Stories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gridItems.map((item) => (
  <Link key={item.id} href={`/news/${item.id}`} className="group">
  <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition">
    <img
      src={item.image}
      alt={item.title}
      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
    />

    <div className="p-4">
      {/* Trending and Category row */}
      <div className="flex justify-between items-center mb-2">
        {/* Trending badge - left */}
     <div
  className="flex items-center gap-1 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md"
  style={{ backgroundColor: "var(--secondary)" }}
>
  <FiTrendingUp className="w-3 h-3" />
  <span>Trending</span>
</div>


        {/* Category badge - right */}
        <span className="inline-block bg-[#2ecc71] text-white text-xs font-semibold rounded px-2 py-0.5" style={{ backgroundColor: "var(--tertiary)" }}>
          {item.category}
        </span>
      </div>

      <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
        {item.title}
      </h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>
    </div>
  </div>
</Link>


              ))}
            </div>
          </div>

          {/* 📊 Sidebar Section */}
          <div className="lg:col-span-4 space-y-10">
            {/* Trending Stories */}
            <div>
              <h2 className="text-lg font-bold border-b-2 border-blue-600 pb-2 mb-4 text-gray-800">
                Trending Now
              </h2>
              <div className="space-y-4">
                {sidebarItems.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="group block">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-blue-600">
                          {item.title}
                        </h4>
                         <span className="flex items-center gap-1.5">
                            <FiUser
                              className="w-3 h-3"
                              style={{ color: "var(--primary-color)" }}
                            />
                            <span className="font-medium">{item.author}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                         
                           
                          </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-1">Stay Updated</h3>
              <p className="text-blue-200 text-sm mb-4">
                Subscribe for exclusive updates.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 mb-3 rounded bg-white/10 border border-white/30 text-white placeholder-blue-200"
              />
              <button className="w-full bg-white text-blue-900 py-2 rounded font-bold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
