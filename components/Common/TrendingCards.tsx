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
import SectionHeader from "@/components/Common/SectionHeader";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";

// 👇 API base URL
const BASE_URL = "http://localhost/newsapi";

interface NewsItem {
  id: string;
  category_id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  highlights: string;
  created_at: string;
}

interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug: string;
  created_at: string;
}

const TrendingCards: FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Record<string, CategoryItem>>({});
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  // ✅ Detect Mobile View
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Initialize Swiper navigation
  useEffect(() => {
    if (swiperInstance && navigationPrevRef.current && navigationNextRef.current) {
      swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
      swiperInstance.params.navigation.nextEl = navigationNextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

useEffect(() => {
  const loadNews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/news/get.php`, { cache: "no-store" });
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.news)) {
        // ✅ Filter only "Breaking" news
        const breakingNews = data.news.filter(
          (item: NewsItem) => item.highlights?.toLowerCase() === "breaking"
        );

        // ✅ Sort by date (newest first)
        const sortedNews = breakingNews.sort(
          (a: NewsItem, b: NewsItem) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // ✅ Show top 8 only
        setNews(sortedNews.slice(0, 8));

        // ✅ Collect unique category IDs and load their details
        const uniqueCategoryIds = [...new Set(sortedNews.map((n: NewsItem) => n.category_id))];
        await loadCategories(uniqueCategoryIds as string[]);
      } else {
        console.error("Invalid API format:", data);
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load related categories for those news
  const loadCategories = async (categoryIds: string[]) => {
    const categoryMap: Record<string, CategoryItem> = {};
    for (const id of categoryIds) {
      try {
        const res = await fetch(`${BASE_URL}/categories/get.php?category_id=${id}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.status === "success" && data.category) {
          categoryMap[id] = data.category;
        }
      } catch (err) {
        console.error("Error loading category:", id, err);
      }
    }
    setCategories(categoryMap);
  };

  loadNews();
}, []);


  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <p className="text-center py-10">Loading trending news...</p>;
  if (!news.length) return <p className="text-center py-10">No trending news available.</p>;

  return (
    <section>
      <div className="mx-auto mt-5 sm:mt-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
            <SectionHeader
              subtitle="News That Speaks Truth"
              title="Arivom Today"
              showButton={false}
              buttonText="View All"
              buttonUrl="/news/category/all"
            />

            {/* ✅ Swiper Carousel */}
            <div className="relative h-[30px] sm:h-[450px] lg:h-[550px]">
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
                  isMobile ? { clickable: true, dynamicBullets: true } : false
                }
                onSwiper={setSwiperInstance}
                className="h-full rounded-2xl overflow-hidden"
              >
                {news.map((item) => {
                  const category = categories[item.category_id];
                  return (
                    <SwiperSlide key={item.id} className="h-full">
                      <Link
                        href={`/news/${item.id}`}
                        className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 block"
                      >
{/* Image & Gradient */}
<div className="relative overflow-hidden group h-[200px] sm:h-[320px] md:h-[380px] lg:h-[440px]">
  <img
    src={`${BASE_URL}/${item.image}`}
    alt={item.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    onError={(e) => {
      (e.target as HTMLImageElement).src = "/fallback.jpg";
    }}
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

<p className="text-white/90 text-xs sm:text-sm mb-2 line-clamp-2 leading-relaxed">
  {item.excerpt}
</p>

  </div>
</div>



                        {/* Footer */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-100">
                          <div className="flex justify-between items-center mb-2">
                            <AuthorBadge author={item.author || "ARIVOM Desk"} />
                            <CategoryBadge
                              category={category ? category.tname : "—"}
                              icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <LikeButton id={String(item.id)} />
                              <BookmarkButton
                                id={String(item.id)}
                                borderColor="#e5e7eb"
                                backgroundColor="#ffffff"
                                savedBackgroundColor="#fef2f2"
                                iconColor="#4b5563"
                                savedIconColor="#6f42c2"
                                dataType="news"
                              />
                              <ShareButton item={item} linkBase="/news" />
                            </div>
                            <DateBadge date={item.created_at} formatDate={customFormatDate} />
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* ✅ Desktop Navigation */}
              {!isMobile && (
                <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
                  <button
                    ref={navigationPrevRef}
                    className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:border-blue-600 group -ml-6"
                  >
                    <FiChevronLeft className="w-6 h-6 text-black group-hover:text-white" />
                  </button>

                  <button
                    ref={navigationNextRef}
                    className="pointer-events-auto bg-white/90 border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:border-blue-600 group -mr-6"
                  >
                    <FiChevronRight className="w-6 h-6 text-black group-hover:text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ✅ RIGHT SIDE AD */}
          <Advertisement />
        </div>
      </div>
    </section>
  );
};

export default TrendingCards;
