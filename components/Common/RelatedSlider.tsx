"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import { FiChevronLeft, FiChevronRight, FiHeart, FiBookmark, FiShare2 } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";

import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";
import ReadMoreButton from "@/components/Common/Badges/ReadMoreButton";

import { NewsItem, ArticleItem } from "@/lib/getData";
import BookmarkButton  from "@/components/Common/Badges/BookmarkButton";

interface Props {
  title: string;
  items: NewsItem[] | ArticleItem[];
  linkBase: string;
}

const TrendingSlider: FC<Props> = ({ title, items, linkBase }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  if (!items || items.length === 0) return null;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Swiper navigation
  useEffect(() => {
    if (swiperInstance && navigationPrevRef.current && navigationNextRef.current) {
      swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
      swiperInstance.params.navigation.nextEl = navigationNextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Like toggle
  const toggleLike = (itemId: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(String(itemId)) ? newSet.delete(String(itemId)) : newSet.add(String(itemId));
      return newSet;
    });
  };

  // Share functionality
  const handleShare = async (item: NewsItem | ArticleItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = String(item.id);
    const url = `${window.location.origin}${linkBase}/${itemId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.content,
          url,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  // Custom date format
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
        {/* Section Header */}
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

        {/* Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            slidesPerView={1}
            spaceBetween={16}
            centeredSlides={isMobile}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
            icon={<FaRegNewspaper className="text-white w-3 h-3" />}
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
          <DateBadge date={item.created_at} formatDate={customFormatDate} />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between mt-5">
          
          {/* Left side icons */}
          <div className="flex items-center gap-2">
            <LikeButton  id={item.id}/>
            <ShareButton onClick={(e) => handleShare(item, e)} />
            <BookmarkButton
              id="1"
              borderColor="#767676ff"
              backgroundColor="#ffffffff"
              savedBackgroundColor="#ffffffff"
              iconColor="#767676ff"
              savedIconColor="#6f42c2"
            />
          </div>

          {/* Right side - Read More button */}
          <ReadMoreButton href={`${linkBase}/${String(item.id)}`} />
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
