"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import SectionHeader from "@/components/Common/SectionHeader";
import AddBookmarkButton from "@/components/Common/Badges/BookmarkButton";
import TagBadge from "@/components/Common/Badges/TagBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";

import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import Advertisement from "@/components/Common/Sidebar/Advertisement";
import LikeButton from "@/components/Common/Badges/LikeButton";
import ReadMoreButton from "@/components/Common/Badges/ReadMoreButton";
import ShareButton from "@/components/Common/Badges/ShareButton";

import {
  FiChevronLeft,
  FiChevronRight,
  FiZap,
  FiUser,
  FiClock,
} from "react-icons/fi";
import {
  FaHome,
  FaRegNewspaper,
  FaSearch,
  FaBars,
  FaTimes, FaBookOpen, FaPenNib,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import { Heart, Share2 } from "lucide-react";
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

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  if (!items || items.length === 0) return null;

  // Detect mobile layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize Swiper navigation
  useEffect(() => {
    if (swiperInstance && navigationPrevRef.current && navigationNextRef.current) {
      swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
      swiperInstance.params.navigation.nextEl = navigationNextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Helpers
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Toggle like
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

  // Handle share
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

  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const carouselItems = items.slice(0, 8);

  return (
    <section>
      <div className="mx-auto">
        <SectionHeader
          subtitle="News"
          title={title || "Latest Headlines"}
          showButton={false}
          buttonText="View All"
          buttonUrl="/news"
        />

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-2/3 h-[350px] sm:h-[200px] lg:h-[450px]">
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
                      <Link
                        href={`${linkBase}/${String(item.id)}`}
                        className="relative flex-1 overflow-hidden group"
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10">

                            <span>
                              <TagBadge label="Breaking New" />
                            </span>

                            <AddBookmarkButton id={item.id} />
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 ">
                            <span className="font-bold text-base sm:text-xl md:text-xl mb-1.5 sm:mb-2 line-clamp-2 leading-tight transition text-white! MobileViewContent">
                              {item.title}
                            </span>
                            <p className="text-white/90 text-xs sm:text-sm mb-2 line-clamp-3 leading-relaxed ">
                              {item.content}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/80 mb-3">
                              <CategoryBadge
                                category={item.category}
                                icon={<FaRegNewspaper className="text-white w-3 h-3" />}

                              />
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-100">
                        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-1.5">
                              <AuthorBadge author={item.author} /></span>
                            <span className="flex items-center gap-1.5 MobileViewContent">
                              <DateBadge date={item.created_at} formatDate={customFormatDate} /></span>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 ml-auto">

                            <LikeButton liked={likedItems.has(String(item.id))} onClick={(e) => toggleLike(String(item.id), e)} />

                            <ShareButton onClick={(e) => handleShare(item, e)} />

                            <ReadMoreButton href={`${linkBase}/${String(item.id)}`} />
                          </div>
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
