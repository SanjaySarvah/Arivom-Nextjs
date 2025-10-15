"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectCoverflow,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import SectionHeader from "@/components/Common/SectionHeader";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import { NewsItem, ArticleItem } from "@/lib/getData";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  items: NewsItem[] | ArticleItem[];
  linkBase: string;
  viewAllLink?: string;
}
const TrendingSlider: FC<Props> = ({ title, items, linkBase, viewAllLink }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  if (!items || items.length === 0) return null;

  // ✅ Detect Mobile View
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Swiper Navigation Setup
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

  // ✅ Date Formatter
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
      <div className="mx-auto relative mt-12">
        <SectionHeader
          subtitle="Trending Now"
          title="Top Stories Today"
          showButton={true}
          buttonText="View All"
          buttonUrl="/articles"
        />

        {/* ✅ Swiper Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            centeredSlides={isMobile}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={
              isMobile
                ? { clickable: true, dynamicBullets: true } 
                : false
            }
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
                      {/* Category */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/80 mb-3">
                        <CategoryBadge
                          category={item.category}
                          icon={
                            <FaRegNewspaper className="text-white w-3 h-3" />
                          }
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 line-clamp-2 leading-tight transition-colors duration-300 text-sm md:text-lg">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.content}
                      </div>

                      {/* Author + Date */}
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 justify-between">
                        <AuthorBadge author={item.author} />
                        <DateBadge
                          date={item.created_at}
                          formatDate={customFormatDate}
                        />
                      </div>

                      {/* Buttons Row */}
                      <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
                        {/* Left Side: Like, Share, Bookmark */}
                        <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                          <LikeButton id={String(item.id)} />

                          {/* <BookmarkButton
                            id={String(item.id)}
                            borderColor="#767676ff"
                            backgroundColor="#ffffffff"
                            savedBackgroundColor="#ffffffff"
                            iconColor="#767676ff"
                            savedIconColor="#6f42c2"
                          /> */}
                          <ShareButton item={item} linkBase={linkBase} />
                        </div>

                        {/* Right Side: Read More */}
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
                          <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ Desktop Navigation Buttons */}
          {!isMobile && (
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
              <button
                ref={navigationPrevRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#7c3aed] hover:text-white transition-all duration-300 -ml-6"
              >
                <FiChevronLeft className="w-6 h-6 transition-colors" />
              </button>

              <button
                ref={navigationNextRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#7c3aed] hover:text-white transition-all duration-300 -mr-6"
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
