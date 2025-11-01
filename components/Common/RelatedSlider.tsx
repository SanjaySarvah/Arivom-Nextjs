"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
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
import TaggingBadge from "@/components/Common/Badges/TaggingBadge";

const BASE_URL = "http://localhost/newsapi";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  category_id: string;
  created_at: string;
  tname: string;
}

interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug: string;
  created_at: string;
}

const TrendingSlider: FC = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Record<string, CategoryItem>>({});
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  // ✅ Fetch news and categories
  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/get.php`, { cache: "no-store" });
        const data = await res.json();

        if (data.status === "success" && Array.isArray(data.news)) {
          const sortedNews = [...data.news].sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setItems(sortedNews);

          const uniqueCategoryIds = [...new Set(sortedNews.map((n) => n.category_id))];
          await loadCategories(uniqueCategoryIds);
        } else {
          console.error("Invalid API response:", data);
          setItems([]);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async (ids: string[]) => {
      const categoryMap: Record<string, CategoryItem> = {};
      for (const id of ids) {
        try {
          const res = await fetch(`${BASE_URL}/categories/get.php?category_id=${id}`, {
            cache: "no-store",
          });
          const data = await res.json();
          if (data.status === "success" && data.category) {
            categoryMap[id] = data.category;
          }
        } catch (err) {
          console.error("Error fetching category:", id, err);
        }
      }
      setCategories(categoryMap);
    };

    loadNews();
  }, []);

  // ✅ Check for mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Swiper navigation setup
  useEffect(() => {
    if (swiperInstance && navigationPrevRef.current && navigationNextRef.current) {
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

  if (loading) return <p className="text-center py-10">Loading trending news...</p>;
  if (!items.length) return <p className="text-center py-10">No trending news found.</p>;

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
            pagination={isMobile ? { clickable: true, dynamicBullets: true } : false}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16, centeredSlides: true },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onSwiper={setSwiperInstance}
            className="trending-slider !overflow-hidden"
          >
            {items.slice(0, 8).map((item) => {
              const category = categories[item.category_id];
              return (
                <SwiperSlide key={item.id} className="!h-auto">
                  <Link href={`/news/${item.id}`} className="block h-full group relative">
                    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col group-hover:scale-[1.02] transform border border-gray-200 shadow-sm">
                      {/* Image */}
                      <div className="relative h-48 md:h-56 w-full overflow-hidden">
                        <img
                          src={`${BASE_URL}/${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => ((e.target as HTMLImageElement).src = "/fallback.jpg")}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        {/* Category */}
                        <div className="flex items-center justify-between text-xs text-white/80 mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <CategoryBadge
                              category={category ? category.tname : "—"} // ✅ shows Tamil name
                              icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                            />
                          </div>
                          <TaggingBadge tag="trending" />
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 line-clamp-2 leading-tight transition-colors duration-300 text-sm md:text-lg">
                          {item.tname ? item.tname : item.title}
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

                        {/* Buttons */}
                        <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
                          <div
                            className="flex items-center gap-2"
                            onClick={(e) => e.preventDefault()}
                          >
                            <LikeButton id={String(item.id)} />
                            <ShareButton item={item} linkBase="/news" />
                          </div>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#a78bfa] text-white hover:bg-[#7c3aed] transition-all duration-300 cursor-pointer group">
                            <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation */}
          {!isMobile && (
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
              <button
                ref={navigationPrevRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#7c3aed] hover:text-white transition-all duration-300 -ml-6"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                ref={navigationNextRef}
                className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#7c3aed] hover:text-white transition-all duration-300 -mr-6"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingSlider;
