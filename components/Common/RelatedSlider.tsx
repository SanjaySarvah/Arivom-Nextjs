"use client"

import { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "swiper/css/scrollbar"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-fade"
import "swiper/css/effect-cards"
import "swiper/css/effect-flip"
import "swiper/css/effect-creative"
// import "swiper/css/effect-zoom"

type Item = {
  id: number
  title: string
  category: string
  excerpt: string
  thumbnail: string
  author?: string
  readTime?: string
  publishedAt?: string
}

interface Props {
  title: string
  items: Item[]
  linkBase: string
}

const RelatedSlider: FC<Props> = ({ title, items, linkBase }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 border-l-4 border-green-500 pl-4">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col md:flex-row bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                {/* IMAGE */}
                <div className="md:w-2/5 h-40 md:h-auto flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{item.category}</p>
                    <h6 className="font-bold text-md mb-2 line-clamp-2">{item.title}</h6>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                  </div>

                  <div className="mt-2 text-xs text-gray-400 flex justify-between">
                    <span>{item.author || "Arivom"}</span>
                    <span>{item.readTime || "5 min read"}</span>
                    <span>{item.publishedAt || "Today"}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default RelatedSlider
