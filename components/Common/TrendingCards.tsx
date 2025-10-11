"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FiChevronLeft,
  FiChevronRight,
  FiZap,
} from "react-icons/fi";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { NewsItem, ArticleItem } from "@/lib/getData";
import Advertisement from "@/components/Common/Sidebar/Advertisement";

interface Props {
  title: string;
  items: NewsItem[] | ArticleItem[];
  linkBase: string;
}

const TrendingCards: FC<Props> = ({ title, items, linkBase }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [likedItems, setLikedItems] = useState<Set<string | number>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string | number>>(new Set());

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  if (!items || items.length === 0) return null;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const toggleLike = (itemId: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId);
      return newSet;
    });
  };

  const toggleSave = (itemId: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId);
      return newSet;
    });
  };

  const handleShare = async (item: NewsItem | ArticleItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = String(item.id);

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.content,
          url: `${window.location.origin}${linkBase}/${itemId}`,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}${linkBase}/${itemId}`);
      alert("Link copied to clipboard!");
    }
  };

  const carouselItems = items.slice(0, 8);
  const gridItems = items.slice(8, 10);

  return (
    <section>
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600"></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">News</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {title}
                </h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-4"></div>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-2/3 h-[550px] sm:h-[600px] lg:h-[450px]">
            <div className="relative w-full h-full">
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSwiper={setSwiperInstance}
                className="h-full rounded-2xl"
              >
                {carouselItems.map((item) => (
                  <SwiperSlide key={item.id} className="h-full">
                    <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500">
                      {/* Image */}
                      <Link href={`${linkBase}/${String(item.id)}`} className="relative flex-1 overflow-hidden group">
                        <div className="relative w-full h-full">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                          {/* Badge */}
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                            <span
                              className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg backdrop-blur-sm"
                              style={{ backgroundColor: "var(--primary)" }}
                            >
                              <FiZap className="text-yellow-300 text-sm sm:text-base animate-pulse" />
                              Breaking News
                            </span>
                          </div>

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 text-white">
                            <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 line-clamp-2 leading-tight text-white transition">
                              {item.title}
                            </h3>
                            <p className="text-white/90 text-xs sm:text-sm mb-2 line-clamp-2 leading-relaxed">
                              {item.content}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/80 mb-3">
                              <span className="flex items-center gap-1">
                                <span className="font-semibold text-white">Author:</span> {item.author || "Rohan Mehta"}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center gap-1">
                                <span className="font-semibold text-white">Category:</span> {item.category}
                              </span>
                              <span className="hidden md:inline">•</span>
                              <span className="hidden md:flex items-center gap-1">
                                <span className="font-semibold text-white">Published:</span> {formatDate(item.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Action Buttons */}
                      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={(e) => toggleLike(item.id, e)}
                            className={`flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-full border transition-all ${
                              likedItems.has(item.id)
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 hover:border-red-500 hover:bg-red-50"
                            }`}
                          >
                            <Heart
                              className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
                                likedItems.has(item.id)
                                  ? "fill-red-500 stroke-red-500"
                                  : "stroke-gray-600 hover:stroke-red-500"
                              }`}
                            />
                          </button>

                          <button
                            onClick={(e) => toggleSave(item.id, e)}
                            className={`flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-full border transition-all ${
                              savedItems.has(item.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                            }`}
                          >
                            <Bookmark
                              className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
                                savedItems.has(item.id)
                                  ? "fill-blue-500 stroke-blue-500"
                                  : "stroke-gray-600 hover:stroke-blue-500"
                              }`}
                            />
                          </button>

                          <button
                            onClick={(e) => handleShare(item, e)}
                            className="flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-full border border-gray-200 hover:border-green-500 transition-all"
                          >
                            <Share2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-600 hover:text-green-600" />
                          </button>

                          <Link
                            href={`${linkBase}/${String(item.id)}`}
                            className="ml-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg"
                            style={{ backgroundColor: "var(--secondary)" }}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation */}
              {!isMobile && (
                <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
                  <button
                    ref={navigationPrevRef}
                    className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -ml-6"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    ref={navigationNextRef}
                    className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -mr-6"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ✅ RIGHT SIDE - Reusable Advertisement Component */}
          <Advertisement/>
        </div>
      </div>
    </section>
  );
};

export default TrendingCards;
