"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FiChevronLeft, FiChevronRight, FiClock, FiUser } from "react-icons/fi";
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

  // ✅ Fix navigation not working: attach refs AFTER init
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

  return (
    <section>
      <div className="mx-auto relative">
      
    <div className="mb-6 text-left md:text-center">
  <div className="flex md:inline-flex items-center gap-3">
    {/* Left Bar */}
    <div className="w-2 h-8 bg-[#2ECC71] rounded-full md:mx-auto md:inline-block"></div>
    
    {/* Title */}
    <h1 className="text-4xl font-bold">{title}</h1>
  </div>
</div>


        {/* Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
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
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
              renderBullet: (index, className) =>
                `<span class="${className} !w-2 !h-2 !rounded-full !mx-1" style="background-color: var(--secondary-color);"></span>`,
            }}
            onSwiper={setSwiperInstance} // ✅ Capture swiper instance
            className="trending-slider !overflow-hidden pb-10"
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
                    
      <span className="inline-block self-start text-white text-xs font-semibold rounded px-2 py-0.5" style={{ backgroundColor: "var(--tertiary)" }}>
  {item.category}
</span>


                      <h3
                        className="font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-tight group-hover:underline transition-colors duration-300"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.title}
                      </h3>

                      <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.content}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <FiUser
                              className="w-3 h-3"
                              style={{ color: "var(--primary-color)" }}
                            />
                            <span className="font-medium">{item.author}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FiClock
                              className="w-3 h-3"
                              style={{ color: "var(--secondary-color)" }}
                            />
                            <span>{formatDate(item.created_at)}</span>
                          </span>
                        </div>

                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                          style={{
                            backgroundColor:
                              "color-mix(in srgb, var(--primary-color) 15%, white)",
                          }}
                        >
                          <FiChevronRight
                            className="w-4 h-4 transition-colors duration-300"
                            style={{ color: "var(--primary-color)" }}
                          />
                        </div>
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
                className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 -ml-6"
              >
                <FiChevronLeft
                  className="w-6 h-6 transition-colors"
                  style={{ color: "var(--foreground)" }}
                />
              </button>

              <button
                ref={navigationNextRef}
                className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 -mr-6"
              >
                <FiChevronRight
                  className="w-6 h-6 transition-colors"
                  style={{ color: "var(--foreground)" }}
                />
              </button>
            </div>
          )}
        </div>

        <div className="swiper-pagination-custom flex justify-center gap-1 mt-8 md:mt-12"></div>
      </div>
    </section>
  );
};

export default TrendingSlider;
