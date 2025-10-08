"use client"

import { FC, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css/navigation"
import "swiper/css/pagination"

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
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  if (!items || items.length === 0) return null

  useEffect(() => {
    // Check if mobile on initial render and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()

    // Calculate the maximum height among all slides (only on desktop)
    const calculateMaxHeight = () => {
      if (window.innerWidth >= 768) {
        const heights = slideRefs.current
          .filter(ref => ref !== null)
          .map(ref => ref?.offsetHeight || 0)
        
        if (heights.length > 0) {
          const maximumHeight = Math.max(...heights)
          setMaxHeight(maximumHeight)
        }
      } else {
        setMaxHeight(0) // Reset height on mobile
      }
    }

    calculateMaxHeight()

    // Event listeners
    window.addEventListener('resize', () => {
      checkMobile()
      calculateMaxHeight()
    })
    
    // Recalculate after a short delay to ensure images are loaded
    const timeoutId = setTimeout(calculateMaxHeight, 100)

    return () => {
      window.removeEventListener('resize', () => {
        checkMobile()
        calculateMaxHeight()
      })
      clearTimeout(timeoutId)
    }
  }, [items])

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            speed={800}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 14
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 18
              },
            }}
            className="related-slider !overflow-visible"
            onSlideChange={() => {
              if (!isMobile) {
                setTimeout(() => {
                  const heights = slideRefs.current
                    .filter(ref => ref !== null)
                    .map(ref => ref?.offsetHeight || 0)

                  if (heights.length > 0) {
                    setMaxHeight(Math.max(...heights))
                  }
                }, 50)
              }
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div
                  ref={el => {
                    slideRefs.current[index] = el
                  }}
                  style={maxHeight > 0 && !isMobile ? { height: `${maxHeight}px` } : {}}
                  className="h-full"
                >
                  <Link href={`${linkBase}/${item.id}`} className="block h-full group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:scale-[1.02] transform">
                      {/* Image Container with Logo Overlay */}
                      <div className="relative h-40 md:h-44 lg:h-48 w-full bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onLoad={() => {
                            if (!isMobile) {
                              setTimeout(() => {
                                const heights = slideRefs.current
                                  .filter(ref => ref !== null)
                                  .map(ref => ref?.offsetHeight || 0)

                                if (heights.length > 0) {
                                  setMaxHeight(Math.max(...heights))
                                }
                              }, 50)
                            }
                          }}
                        />
                        {/* Arivom Badge */}
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded">
                          <span className="text-blue-600 font-bold text-xs">Arivom</span>
                        </div>
                        {/* 24H Badge */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded font-bold text-sm shadow-lg">
                          24H
                        </div>
                        {/* News Branding Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-center">
                            <div className="text-white font-bold text-2xl md:text-3xl opacity-90">ARIVOM</div>
                            <div className="text-white text-xs md:text-sm font-semibold opacity-80">NEWS</div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 md:p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          {/* Category Tags */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block px-2 py-0.5 bg-red-600 text-white text-xs font-semibold rounded">
                              {item.category}
                            </span>
                            <span className="text-xs text-blue-600 font-medium uppercase">
                              {item.subcategory}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-bold text-sm md:text-base mb-2 line-clamp-2 leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>

                          {/* Excerpt/Content */}
                          <div className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">
                            {item.content}
                          </div>
                        </div>

                        {/* Footer Meta */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <span className="text-yellow-500">✍️</span>
                            <span className="font-medium">{item.author}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>🕐</span>
                            <span>{new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ({item.days_ago} month ago)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Desktop Navigation Buttons - Half Outside Container */}
          <button
            className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-white border-2 border-gray-300 rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center shadow-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300 hidden md:flex group"
          >
            <FiChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-gray-700 group-hover:text-white transition-colors" />
          </button>

          <button
            className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 bg-white border-2 border-gray-300 rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center shadow-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300 hidden md:flex group"
          >
            <FiChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-gray-700 group-hover:text-white transition-colors" />
          </button>

          {/* Mobile Navigation - Inside Container */}
          <button
            className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 md:hidden"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          <button
            className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 md:hidden"
          >
            <FiChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        {/* Pagination Dots - Mobile Only */}
        <div className="swiper-pagination-custom flex justify-center gap-2 mt-6 md:hidden"></div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .related-slider {
          padding: 10px 0;
        }

        :global(.swiper-button-disabled) {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Pagination Dots Styling */
        :global(.swiper-pagination-bullet-custom) {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        :global(.swiper-pagination-bullet-custom:hover) {
          opacity: 0.8;
          transform: scale(1.1);
        }

        :global(.swiper-pagination-bullet-active-custom) {
          background: #3b82f6;
          width: 24px;
          border-radius: 5px;
          opacity: 1;
        }

        @media (min-width: 768px) {
          .related-slider {
            padding: 20px 0;
          }

          :global(.swiper-pagination-custom) {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default RelatedSlider