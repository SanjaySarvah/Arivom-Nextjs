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
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiClock, 
  FiUser, 
  FiShare2, 
  FiHeart, 
  FiBookmark 
} from "react-icons/fi";
import { NewsItem, ArticleItem } from "@/lib/getData";

interface Props {
  title: string;
  items: NewsItem[] | ArticleItem[];
  linkBase: string;
}

const TrendingCards: FC<Props> = ({ title, items, linkBase }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
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

  const toggleLike = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleSave = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleShare = async (item: NewsItem | ArticleItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.content,
          url: `${window.location.origin}${linkBase}/${item.id}`,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}${linkBase}/${item.id}`);
      alert('Link copied to clipboard!');
    }
  };

  // Split items into 8 for carousel and 2 for right side
  const carouselItems = items.slice(0, 8);
  const gridItems = items.slice(8, 10); // Take only 2 items

  return (
    <section className="py-8">
      <div className="mx-auto ">
        {/* Section Title with Design */}
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

        {/* Main Container - Single Row with 8+2 Split */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column - 8 Items Carousel (2/3 width) */}
          <div className="lg:w-2/3">
            <div className="relative w-full">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  el: ".custom-pagination",
                  bulletClass: "custom-bullet",
                  bulletActiveClass: "custom-bullet-active",
                }}
                onSwiper={setSwiperInstance}
                className="h-full rounded-2xl"
              >
                {carouselItems.map((item) => (
                  <SwiperSlide key={item.id} className="!h-auto">
                    <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-64 md:h-72 lg:h-80 w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span 
                            className="inline-block text-white text-sm font-semibold rounded-full px-4 py-2 shadow-lg"
                            style={{ backgroundColor: "var(--tertiary)" }}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <Link href={`${linkBase}/${item.id}`} className="flex-1">
                          <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 line-clamp-2 leading-tight hover:text-green-600 transition-colors duration-300 text-gray-800">
                            {item.title}
                          </h3>

                          <div className="text-gray-600 text-lg md:text-xl mb-6 line-clamp-3 leading-relaxed">
                            {item.content}
                          </div>
                        </Link>

                        {/* Author and Date */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm md:text-base text-gray-600">
                            <span className="flex items-center gap-2">
                              <FiUser className="w-5 h-5 text-green-500" />
                              <span className="font-semibold">{item.author}</span>
                            </span>
                            <span className="flex items-center gap-2">
                              <FiClock className="w-5 h-5 text-green-500" />
                              <span className="font-medium">{formatDate(item.created_at)}</span>
                            </span>
                          </div>
                        </div>

                    {/* 🔹 Dummy Action Icons - Bottom */}
<div className="flex items-center justify-between pt-3 border-t border-gray-100">
  <div className="flex items-center gap-2">
    {/* ❤️ Like */}
    <button
      className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
    >
      <FiHeart className="w-4 h-4" />
    </button>

    {/* 🔖 Save */}
    <button
      className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
    >
      <FiBookmark className="w-4 h-4" />
    </button>

    {/* 📤 Share */}
    <button
      className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
    >
      <FiShare2 className="w-4 h-4" />
    </button>
  </div>

  {/* ➡️ Next Link */}
  <div
    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:scale-110 hover:bg-green-600 group cursor-pointer"
    style={{
      backgroundColor: "color-mix(in srgb, var(--primary-color) 15%, white)",
    }}
  >
    <FiChevronRight className="w-4 h-4 text-green-600 group-hover:text-white transition-colors duration-300" />
  </div>
</div>

                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              {!isMobile && (
                <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
                  <button
                    ref={navigationPrevRef}
                    className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -ml-6"
                  >
                    <FiChevronLeft className="w-7 h-7 text-gray-700 hover:text-white transition-colors duration-300" />
                  </button>

                  <button
                    ref={navigationNextRef}
                    className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -mr-6"
                  >
                    <FiChevronRight className="w-7 h-7 text-gray-700 hover:text-white transition-colors duration-300" />
                  </button>
                </div>
              )}
            </div>

            {/* Custom 3 Dots Pagination */}
            <div className="custom-pagination flex justify-center gap-3 mt-6"></div>
          </div>

          {/* Right Column - 2 Items Grid (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 h-full">
              {gridItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="inline-block text-white text-xs font-semibold rounded-full px-3 py-1 shadow-md"
                        style={{ backgroundColor: "var(--tertiary)" }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <Link href={`${linkBase}/${item.id}`} className="flex-1">
                      <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-tight hover:text-green-600 transition-colors duration-300 text-gray-800">
                        {item.title}
                      </h3>

                      <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.content}
                      </div>
                    </Link>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <FiUser className="w-3 h-3 text-green-500" />
                          <span className="font-medium">{item.author}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiClock className="w-3 h-3 text-green-500" />
                          <span>{formatDate(item.created_at)}</span>
                        </span>
                      </div>
                    </div>

                 {/* 🔹 Dummy Action Icons - Bottom */}
<div className="flex items-center justify-between pt-3 border-t border-gray-100">
  <div className="flex items-center gap-2">
    {/* ❤️ Like */}
    <button
      className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
    >
      <FiHeart className="w-4 h-4" />
    </button>

    {/* 🔖 Save */}
    <button
      className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
    >
      <FiBookmark className="w-4 h-4" />
    </button>

    {/* 📤 Share */}
    <button
      className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
    >
      <FiShare2 className="w-4 h-4" />
    </button>
  </div>

  {/* ➡️ Next Link */}
  <div
    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:scale-110 hover:bg-green-600 group cursor-pointer"
    style={{
      backgroundColor: "color-mix(in srgb, var(--primary-color) 15%, white)",
    }}
  >
    <FiChevronRight className="w-4 h-4 text-green-600 group-hover:text-white transition-colors duration-300" />
  </div>
</div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for 3 dots */}
      <style jsx global>{`
        .custom-pagination {
          display: flex !important;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
        }
        .custom-bullet {
          width: 12px;
          height: 12px;
          background-color: #d1d5db;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .custom-bullet-active {
          background-color: #10b981;
          transform: scale(1.2);
        }
        /* Ensure exactly 3 bullets */
        .custom-pagination .swiper-pagination-bullet:nth-child(n+4) {
          display: none !important;
        }
      `}</style>
    </section>
  );
};

export default TrendingCards;