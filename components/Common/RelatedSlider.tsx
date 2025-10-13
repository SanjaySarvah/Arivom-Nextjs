"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  FaHome,
  FaRegNewspaper,
  FaSearch,
  FaBars,
  FaTimes, FaBookOpen, FaPenNib,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import AddBookmarkButton from "@/components/Common/Badges/BookmarkButton";
import TagBadge from "@/components/Common/Badges/TagBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";

import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiUser,
  FiHeart,
  FiBookmark,
  FiShare2,
} from "react-icons/fi";
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

  useEffect(() => {
    if (
      swiperInstance &&
      navigationPrevRef.current &&
      navigationNextRef.current
    ) {
      swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
      swiperInstance.params.navigation.nextEl = navigationNextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section>
      <div className="mx-auto relative mt-15">
        {/* 🔹 Section Header */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600 shadow-lg"></div>
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

        {/* 🔹 Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
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
            onSwiper={setSwiperInstance}
            className="trending-slider !overflow-hidden"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <Link
                  href={`${linkBase}/${item.id}`}
                  className="block h-full group relative"
                >
                  <div className="bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col group-hover:scale-[1.02] transform border border-gray-200 shadow-sm">
                    {/* 🖼️ Image */}
                    <div className="relative h-48 md:h-56 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* 📝 Content */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/80 mb-3">
                        <CategoryBadge
                          category={item.category}
                          icon={<FaRegNewspaper className="text-white w-3 h-3" />}

                        />
                      </div>


                      <h3 className="mb-3 line-clamp-2 leading-tight transition-colors duration-300">
                        {item.title}
                      </h3>

                      <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.content}
                      </div>

                       <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 justify-between">
                            <span className="flex items-center gap-1.5">
                              <AuthorBadge author={item.author} /></span>
                            <span className="flex items-center gap-1.5 MobileViewContent">
                              <DateBadge date={item.created_at} formatDate={customFormatDate} /></span>
                          </div>

                   
                      <div className="flex items-center gap-2 mt-5">
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300"
                        >
                          <FiHeart
                            className="w-5 h-5"
                            style={{ color: "var(--tertiary)" }}
                          />
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300"
                        >
                          <FiBookmark
                            className="w-5 h-5"
                            style={{ color: "var(--tertiary)" }}
                          />
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300"
                        >
                          <FiShare2
                            className="w-5 h-5"
                            style={{ color: "var(--tertiary)" }}
                          />
                        </button>
                        <div className="flex-1"></div>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{
                            backgroundColor: "var(--tertiary)",
                          }}
                        >
                          <FiChevronRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 🔹 Navigation Buttons */}
          {!isMobile && (
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
              <button
                ref={navigationPrevRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -ml-6"
              >
                <FiChevronLeft className="w-6 h-6 transition-colors" />
              </button>

              <button
                ref={navigationNextRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 hover:text-white transition-all duration-300 -mr-6"
              >
                <FiChevronRight className="w-6 h-6 transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingSlider;
