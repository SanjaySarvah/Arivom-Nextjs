"use client"

import { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

type Item = {
  id: number
  title: string
  category: string
  subcategory: string
  excerpt: string
  content: string
  image: string
  author: string
  slug: string
  created_at: string
  days_ago: number
}

interface Props {
  title: string
  items: Item[]
  linkBase: string
}

const RelatedSlider: FC<Props> = ({ title, items, linkBase }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="py-12 bg-gray-50 relative overflow-visible">
      <div className="w-full px-4 sm:px-6 md:px-10 overflow-visible">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="relative overflow-visible">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="related-slider"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-full">
                  {/* Image */}
                  <div className="md:w-2/5 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded mr-2">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {item.subcategory}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="font-medium">{item.author}</span>
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      <span>{item.days_ago} days ago</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Arrow — half outside */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors translate-x-[-50%]">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow — half outside */}
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors translate-x-[50%]">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .related-slider {
          padding: 20px 0;
          overflow: visible !important;
        }

        /* Make sure arrows are not clipped */
        .swiper {
          overflow: visible !important;
        }

        @media (max-width: 767px) {
          .related-slider {
            padding: 10px 0;
          }
        }
      `}</style>
    </section>
  )
}

export default RelatedSlider
