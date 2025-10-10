"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FiChevronLeft, FiChevronRight, FiClock, FiUser, FiHeart, FiBookmark, FiShare2 } from "react-icons/fi";
import { NewsItem, ArticleItem } from "@/lib/getData";

interface Props {
  title: string;
  items: NewsItem[] | ArticleItem[];
  linkBase: string;
}

const TrendingSlider: FC<Props> = ({ title, items, linkBase }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  if (!items || items.length === 0) return null;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Fix navigation not working: attach refs AFTER init
  useEffect(() => {
    if (swiperInstance && navigationPrevRef.current && navigationNextRef.current) {
      swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
      swiperInstance.params.navigation.nextEl = navigationNextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section>
      <div className="mx-auto relative">
{/*       
    <div className="mb-6 text-left md:text-center">
  <div className="flex md:inline-flex items-center gap-3">

    <div className="w-2 h-8 bg-[#2ECC71] rounded-full md:mx-auto md:inline-block"></div>
 
    <h1 className="text-4xl font-bold">{title}</h1>
  </div>
</div> */}

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
                  {title}
                </h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-4"></div>
          </div>
        </div>


        {/* Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            slidesPerView={1}
            spaceBetween={16}
            centeredSlides={isMobile}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16, centeredSlides: true },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 24 },
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
              renderBullet: (index, className) =>
                `<span class="${className} !w-2 !h-2 !rounded-full !mx-1" style="background-color: var(--secondary-color);"></span>`,
            }}
            onSwiper={setSwiperInstance} // ✅ Capture swiper instance
            className="trending-slider !overflow-hidden pb-10"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <Link
                  href={`${linkBase}/${item.id}`}
                  className="block h-full group relative"
                >
                  <div className="bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col group-hover:scale-[1.02] transform border border-gray-200 shadow-sm">
                    {/* Image */}
                    <div className="relative h-48 md:h-56 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                    
      <span className="inline-block self-start text-white text-xs font-semibold rounded px-2 py-0.5" style={{ backgroundColor: "var(--tertiary)" }}>
  {item.category}
</span>


                      <h3
                        className="mb-3 line-clamp-2 leading-tight  transition-colors duration-300"
                      
                      >
                        {item.title}
                      </h3>

                      <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.content}
                      </div>

                      {/* Author and Date Row */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="flex items-center gap-2">
                          <FiUser className="w-4 h-4" style={{ color: "var(--tertiary)" }} />
                          <span style={{ color: "var(--tertiary)" }}>{item.author}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <FiClock className="w-4 h-4" style={{ color: "var(--tertiary)" }} />
                          <span style={{ color: "var(--tertiary)" }}>{formatDate(item.created_at)}</span>
                        </span>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // Like functionality
                          }}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300"
                          aria-label="Like"
                        >
                          <FiHeart className="w-5 h-5" style={{ color: "var(--tertiary)" }} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // Save functionality
                          }}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300"
                          aria-label="Save"
                        >
                          <FiBookmark className="w-5 h-5" style={{ color: "var(--tertiary)" }} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // Share functionality
                          }}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300"
                          aria-label="Share"
                        >
                          <FiShare2 className="w-5 h-5" style={{ color: "var(--tertiary)" }} />
                        </button>
                        <div className="flex-1"></div>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: "var(--tertiary)",
                          }}
                        >
                          <FiChevronRight
                            className="w-5 h-5 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          {!isMobile && (
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
              <button
                ref={navigationPrevRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -ml-6"
              >
                <FiChevronLeft
                  className="w-6 h-6 transition-colors"
  
                />
              </button>

              <button
                ref={navigationNextRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -mr-6"
              >
                <FiChevronRight
                  className="w-6 h-6 transition-colors"
            
                />
              </button>
            </div>
          )}
        </div>

        <div className="swiper-pagination-custom flex justify-center gap-1 mt-8 md:mt-12"></div>
      </div>
    </section>
  );
};

export default TrendingSlider;
