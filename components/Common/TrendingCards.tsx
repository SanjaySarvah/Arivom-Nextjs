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
import Advertisement from "@/components/Common/Sidebar/Advertisement";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ShareButton from "@/components/Common/Badges/ShareButton";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { NewsItem, ArticleItem } from "@/lib/getData";
import SectionHeader from "@/components/Common/SectionHeader";

interface Props {
  title: string;
  items: NewsItem[] | ArticleItem[];
  linkBase: string;
}

const TrendingCards: FC<Props> = ({ title, items, linkBase }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

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

  // ✅ Initialize Swiper navigation
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

  // ✅ Helpers
  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const carouselItems = items.slice(0, 8);
  const dataType = linkBase.includes("/news") ? "news" : "article";

  // ✅ Toggle Like
  const toggleLike = (itemId: string | number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      const key = String(itemId);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  return (
    <section>
      <div className="mx-auto mt-5 sm:mt-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
            <SectionHeader
              subtitle="News That Speaks Truth"
              title="Arivom Today"
              showButton={false}
              buttonText="View All"
              buttonUrl="/news"
            />

            <div className="relative h-[350px] sm:h-[200px] lg:h-[450px] ">
<Swiper
  modules={[Navigation, Autoplay, Pagination]}
  slidesPerView={1}
  spaceBetween={24}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  pagination={
    isMobile
      ? { clickable: true, dynamicBullets: true } // Only show dots on mobile
      : false
  }
  onSwiper={setSwiperInstance}
  className="h-full rounded-2xl overflow-hidden"
>
  {carouselItems.map((item) => (
    <SwiperSlide key={item.id} className="h-full">
      <Link
        href={`${linkBase}/${String(item.id)}`}
        className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 block"
      >
        {/* Image & Gradient */}
        <div className="relative flex-1 overflow-hidden group">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Breaking News Tag */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center z-10">
            <TagBadge label="Breaking News" />
          </div>

          {/* Title & Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
            <span className="font-bold text-base sm:text-xl md:text-xl mb-1.5 sm:mb-2 line-clamp-2 leading-tight text-white hover:underline decoration-white decoration-2 underline-offset-4">
              {item.title}
            </span>
            <p className="text-white/90 text-xs sm:text-sm mb-2 line-clamp-3 leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>

        {/* Footer: Author, Category, Actions, Date */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-100">

          {/* Top Row: Author left, Category right */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <AuthorBadge author={item.author} />
            </div>
            <div className="flex items-center gap-2">
              <CategoryBadge
                category={item.category}
                icon={<FaRegNewspaper className="text-white w-3 h-3" />}
              />
            </div>
          </div>

          {/* Bottom Row: Actions left, Date right */}
          <div className="flex justify-between items-center">
            {/* Actions */}
            <div className="flex items-center gap-3">
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
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
                <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

            {/* Date */}
            <div className="text-xs sm:text-sm text-gray-500">
              <DateBadge date={item.created_at} formatDate={customFormatDate} />
            </div>
          </div>

        </div>
      </Link>
    </SwiperSlide>
  ))}
</Swiper>



              {/* ✅ Desktop Navigation Buttons */}
              {!isMobile && (
                <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20 "  >
                  <button
                    ref={navigationPrevRef}
                    className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[var(--secondary)] hover:border-[var(--secondary)] group -ml-6"
                  >
                    <FiChevronLeft className="w-6 h-6 text-black transition-colors duration-300 group-hover:text-white" />
                  </button>

                  <button
                    ref={navigationNextRef}
                    className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[var(--secondary)] hover:border-[var(--secondary)] group -mr-6"
                  >
                    <FiChevronRight className="w-6 h-6 text-black transition-colors duration-300 group-hover:text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <Advertisement />
        </div>
      </div>
    </section>
  );
};

export default TrendingCards;
