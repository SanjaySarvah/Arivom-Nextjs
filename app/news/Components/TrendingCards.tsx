"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BookmarkButton from "@/components/Common/Badges/BookmarkButton";
import TagBadge from "@/components/Common/Badges/TagBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { NewsItem } from "@/lib/getData";
import SectionHeader from "@/components/Common/SectionHeader";

interface Props {
  title: string;
  items: NewsItem[];
  linkBase: string;
}

const TrendingCards: FC<Props> = ({ title, items, linkBase }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoading, setImageLoading] = useState<{[key: string]: boolean}>({});
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

  const handleImageLoad = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: string) => {
    setImageLoading(prev => ({ ...prev, [id]: false }));
  };

  const customFormatDate = (date: string | Date) => {
    if (!date) return "No date";
    
    try {
      const d = typeof date === "string" ? new Date(date) : date;
      if (isNaN(d.getTime())) return "Invalid date";
      
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getValidImage = (image: string) => {
    if (!image || image === "null" || image === "undefined") {
      return "/api/placeholder/600/400?text=No+Image";
    }
    return image;
  };

  const truncateContent = (text: string, maxLength: number = 150) => {
    if (!text) return "No content available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const carouselItems = items.slice(0, 8);
  const dataType = linkBase.includes("/news") ? "news" : "article";

  return (
    <section className="w-full">
      <div className="mx-auto mt-6 sm:mt-10 relative ">
        <SectionHeader
          subtitle="Top Headlines"
          title={title || "Trending Now"}
          showButton={false}
        />

        {/* MAIN SLIDER CONTAINER */}
        <div className="relative rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={0}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={isMobile ? { 
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return `<span class="${className} bg-gray-400 hover:bg-gray-600 transition-colors duration-200"></span>`;
              }
            } : false}
            onSwiper={setSwiperInstance}
            className="h-full rounded-2xl"
          >
            {carouselItems.map((item) => (
            <SwiperSlide key={item.id} className="h-full bg-white">
  <Link
    href={`${linkBase}/${String(item.id)}`}
    className="flex flex-col lg:flex-row h-full gap-0 bg-white transition-all duration-500 rounded-2xl"
  >
    {/* IMAGE SECTION */}
    <div className="w-full lg:w-2/5 xl:w-1/2 relative overflow-hidden order-1 lg:order-1 flex-shrink-0">
      <div className="relative w-full h-[220px] sm:h-[280px] lg:h-full">
        <img
          src={getValidImage(item.image)}
          alt={item.title || "No title"}
          className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none transition-transform duration-700 group-hover:scale-105"
          onLoad={() => handleImageLoad(String(item.id))}
          onError={() => handleImageError(String(item.id))}
        />
        {(imageLoading[String(item.id)] === undefined || imageLoading[String(item.id)]) && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none" />
        )}
        <div className="absolute top-4 left-4 z-10">
          <TagBadge label="Breaking News" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/30 lg:via-transparent lg:to-transparent" />
      </div>
    </div>

    {/* CONTENT SECTION */}
    <div className="flex flex-col justify-between w-full lg:w-3/5 xl:w-1/2 p-4 sm:p-6 lg:p-8 order-2 lg:order-2">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-[var(--secondary)] transition-colors duration-300 line-clamp-3">
            {item.title || "Untitled"}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-5">
            {truncateContent(item.content || "No content available", 200)}
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100 pt-2">
          <div className="hidden lg:flex items-center justify-start flex-1">
            <AuthorBadge author={item.author} />
          </div>
          <div className="flex items-center justify-center flex-1 sm:justify-start lg:justify-center">
            <DateBadge date={item.created_at} formatDate={customFormatDate} />
          </div>
          <div className="flex items-center justify-end flex-1 sm:justify-end">
          <CategoryBadge
  category={
    ((item.tname || item.category || "Uncategorized").length > 10
      ? (item.tname || item.category || "Uncategorized").slice(0, 10) + "…"
      : item.tname || item.category || "Uncategorized")
  }
  icon={<FaRegNewspaper className="text-white w-3 h-3" />}
/>

          </div>
        </div>

        <div className="lg:hidden mt-2">
          <AuthorBadge author={item.author} />
        </div>

        <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-gray-100">
          <LikeButton id={String(item.id)} />
          <BookmarkButton
            id={String(item.id)}
            borderColor="#e5e7eb"
            backgroundColor="#ffffff"
            savedBackgroundColor="#fef2f2"
            iconColor="#4b5563"
            savedIconColor="#6f42c2"
            dataType={dataType as "news" | "article"}
          />
          <ShareButton item={item} linkBase={linkBase} />
        </div>
      </div>
    </div>
  </Link>
</SwiperSlide>

            ))}
          </Swiper>
        </div>

        {/* NAVIGATION ARROWS */}
        {!isMobile && carouselItems.length > 1 && (
          <>
            <button
              ref={navigationPrevRef}
              className="absolute top-1/2 -translate-y-1/2 -left-3 xl:-left-5 z-50 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[var(--secondary)] hover:border-[var(--secondary)] hover:shadow-xl group transition-all duration-300 transform hover:scale-105"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
            </button>

            <button
              ref={navigationNextRef}
              className="absolute top-1/2 -translate-y-1/2 -right-3 xl:-right-5 z-50 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[var(--secondary)] hover:border-[var(--secondary)] hover:shadow-xl group transition-all duration-300 transform hover:scale-105"
              aria-label="Next slide"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default TrendingCards;