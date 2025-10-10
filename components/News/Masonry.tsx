"use client"
import { FiTrendingUp } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight, FiClock, FiUser, FiTag } from "react-icons/fi";
import { Heart, Bookmark, Share2, User } from "lucide-react";

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
  const sidebarItems = filteredNews.slice(7, 16)

  return (
    <section className=" bg-gray-50">
      <div >


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 📰 Featured Story + Grid */}
          <div className="lg:col-span-8 space-y-12">
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

     <h3
  className="mt-3 mb-2 leading-tight transition-colors duration-300 text-white! hover:text-[var(--secondary)]"
>
  {featured.title}
</h3>



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
                <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition group">
                  {/* Header: User Icon + Name (Left) | Date (Right) */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    {/* Left: User Icon + Name */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--tertiary)" }}
                      >
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.author || 'Rohan Mehta'}</span>
                    </div>

                    {/* Right: Date */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FiClock className="w-3.5 h-3.5" />
                      <span>{new Date(item.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <Link href={`/news/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

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

                    <Link href={`/news/${item.id}`}>
                      <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </Link>

                    {/* Bottom Action Buttons */}
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                      {/* Like Button */}
                      <button
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group/like"
                        aria-label="Like"
                      >
                        <Heart className="w-4 h-4 text-gray-600 group-hover/like:text-red-500 transition-colors" />
                      </button>

                      {/* Bookmark Button */}
                      <button
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group/bookmark"
                        aria-label="Bookmark"
                      >
                        <Bookmark className="w-4 h-4 text-gray-600 group-hover/bookmark:text-blue-500 transition-colors" />
                      </button>

                      {/* Share Button */}
                      <button
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 transition-all group/share"
                        style={{
                          borderColor: 'var(--tertiary-hover, #27ae60)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--tertiary-light, #d4edda)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        aria-label="Share"
                      >
                        <Share2
                          className="w-4 h-4 transition-colors"
                          style={{ color: 'var(--tertiary, #2ecc71)' }}
                        />
                      </button>

                      {/* Next/Arrow Button */}
                      <Link
                        href={`/news/${item.id}`}
                        className="ml-auto flex items-center justify-center w-9 h-9 rounded-full text-white transition-all hover:scale-110"
                        style={{ backgroundColor: "var(--tertiary)" }}
                        aria-label="Read more"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 📊 Sidebar Section */}
          <div className="lg:col-span-4 space-y-10">
            {/* Trending Stories */}
            <div>
              {/* <h2 className="text-lg font-bold border-b-2 border-blue-600 pb-2 mb-4 text-gray-800">
                Trending Now
              </h2> */}




    <div className="mb-8 text-left">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-2 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600 shadow-lg"
              ></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                  News
                </span>
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                 Trending Now
                </h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-4"></div>
          </div>
        </div>




              <div className="space-y-4">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="group block"
                  >
                    <div
                      className="flex gap-4 items-start rounded-lg p-3 bg-white shadow-sm 
               transition-all duration-300 hover:shadow-md hover:border-[var(--primary-color)] 
               hover:scale-[1.02]"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-20 object-cover rounded-md transition-transform duration-300 
                 group-hover:scale-105"
                      />

                      {/* Content */}
                      <div className="flex flex-col justify-between flex-1">
                        {/* Title */}
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 transition-colors 
                     group-hover:text-[var(--primary-color)]">
                          {item.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                          {/* Author */}
                          <span className="flex items-center gap-1.5">
                            <FiUser
                              className="w-3.5 h-3.5"
                              style={{ color: "var(--primary-color)" }}
                            />
                            <span className="font-medium">{item.author}</span>
                          </span>

                      

                          {/* Category */}
                          {item.category && (
                             <span className="inline-block self-start text-white text-xs font-semibold rounded px-2 py-0.5" style={{ backgroundColor: "var(--tertiary)" }}>
  {item.category}
</span>
                          )}
                        </div>
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
