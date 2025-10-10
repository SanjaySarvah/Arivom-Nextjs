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
  FiClock,
  FiUser,
  FiShare2,
  FiHeart,
  FiBookmark,
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
    <section className="py-8">
      <div className="mx-auto ">
        {/* Title */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600"></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-green-600 uppercase">News</span>
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {title}
                </h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent ml-4"></div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-[600px] lg:h-[500px]">
          {/* LEFT SIDE - Single Card Swiper */}
          <div className="lg:w-2/3 h-full">
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
                      <div className="relative h-2/3 w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
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
                        <Link href={`${linkBase}/${String(item.id)}`} className="flex-1">
                          <h3 className="font-bold text-2xl mb-3 line-clamp-2 text-gray-800 hover:text-green-600">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-base mb-4 line-clamp-3">{item.content}</p>
                        </Link>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-2">
                            <FiUser className="text-green-500" /> {item.author}
                          </span>
                          <span className="flex items-center gap-2">
                            <FiClock className="text-green-500" /> {formatDate(item.created_at)}
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => toggleLike(item.id, e)}
                              className={`p-2 rounded-full transition-all duration-300 ${
                                likedItems.has(item.id)
                                  ? "bg-red-50 text-red-600"
                                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <FiHeart
                                className={`w-5 h-5 ${
                                  likedItems.has(item.id) ? "fill-current" : ""
                                }`}
                              />
                            </button>
                            <button
                              onClick={(e) => toggleSave(item.id, e)}
                              className={`p-2 rounded-full transition-all duration-300 ${
                                savedItems.has(item.id)
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <FiBookmark
                                className={`w-5 h-5 ${
                                  savedItems.has(item.id) ? "fill-current" : ""
                                }`}
                              />
                            </button>
                            <button
                              onClick={(e) => handleShare(item, e)}
                              className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
                            >
                              <FiShare2 className="w-5 h-5" />
                            </button>
                          </div>

                          <Link
                            href={`${linkBase}/${String(item.id)}`}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                            style={{
                              backgroundColor:
                                "color-mix(in srgb, var(--primary-color) 15%, white)",
                            }}
                          >
                            <FiChevronRight className="w-5 h-5 text-green-600 group-hover:text-white" />
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

          {/* RIGHT SIDE - Two Equal Height Cards */}
          <div className="lg:w-1/3 h-full">
            <div className="flex flex-col gap-6 h-full">
              {gridItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 flex-1"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
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
                  <div className="p-4 flex-1 flex flex-col">
                    <Link href={`${linkBase}/${String(item.id)}`} className="flex-1">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 hover:text-green-600">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.content}</p>
                    </Link>

                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                      <span className="flex items-center gap-2">
                        <FiUser className="text-green-500" /> {item.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiClock className="text-green-500" /> {formatDate(item.created_at)}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleLike(item.id, e)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            likedItems.has(item.id)
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <FiHeart
                            className={`w-4 h-4 ${
                              likedItems.has(item.id) ? "fill-current" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => toggleSave(item.id, e)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            savedItems.has(item.id)
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <FiBookmark
                            className={`w-4 h-4 ${
                              savedItems.has(item.id) ? "fill-current" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => handleShare(item, e)}
                          className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300"
                        >
                          <FiShare2 className="w-4 h-4" />
                        </button>
                      </div>

                      <Link
                        href={`${linkBase}/${String(item.id)}`}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                        style={{
                          backgroundColor:
                            "color-mix(in srgb, var(--primary-color) 15%, white)",
                        }}
                      >
                        <FiChevronRight className="w-4 h-4 text-green-600 group-hover:text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingCards;