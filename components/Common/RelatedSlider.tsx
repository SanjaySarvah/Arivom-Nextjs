"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FiChevronLeft, FiChevronRight, FiClock, FiUser } from "react-icons/fi";

type Item = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  created_at: string;
  days_ago: number;
};

interface Props {
  title: string;
  items: Item[];
  linkBase: string;
}

const TrendingSlider: FC<Props> = ({ title, items, linkBase }) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  if (!items || items.length === 0) return null;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="">
      <div className="container mx-auto relative">
        {/* Title */}
       <div className="mb-6 text-left md:text-center">
  <div className="flex md:inline-flex items-center gap-3">
    <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
    <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
  </div>
</div>


        {/* Slider */}
        <div className="relative w-full">
          <div className="overflow-hidden relative z-10">
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
                // Mobile first approach
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                  centeredSlides: true,
                  effect: "slide",
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                  centeredSlides: false,
                  effect: "coverflow",
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                  },
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                  centeredSlides: false,
                  effect: "coverflow",
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                  },
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                  centeredSlides: false,
                  effect: "coverflow",
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                  },
                },
              }}
              navigation={
                !isMobile
                  ? {
                      prevEl: navigationPrevRef.current,
                      nextEl: navigationNextRef.current,
                    }
                  : false
              }
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom",
                renderBullet: (index, className) =>
                  `<span class="${className} !w-2 !h-2 !bg-white/60 !border !border-white/80 !mx-1"></span>`,
              }}
              onInit={(swiper) => {
                if (!isMobile) {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }}
              className="trending-slider !overflow-hidden"
            >
              {items.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto">
                  <Link href={`${linkBase}/${item.id}`} className="block h-full group relative">
<div className="bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col group-hover:scale-[1.02] transform border border-gray-200 backdrop-blur-sm">

                      <div className="relative h-48 md:h-56 w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            TRENDING
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                          <span className="text-gray-900 font-bold text-xs uppercase tracking-wide">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-tight text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {item.excerpt || item.content}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <FiUser className="w-3 h-3 text-blue-500" />
                              <span className="font-medium">{item.author}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FiClock className="w-3 h-3 text-purple-500" />
                              <span>{formatDate(item.created_at)}</span>
                            </span>
                          </div>
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                            <FiChevronRight className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Arrows (hide on mobile) */}
          {!isMobile && (
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2 pointer-events-none z-20">
              <button
                ref={navigationPrevRef}
                className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-xl hover:bg-blue-500 hover:border-blue-500 hover:scale-110 transition-all duration-300 absolute -left-4"
              >
                <FiChevronLeft className="w-6 h-6 text-gray-700 hover:text-white transition-colors" />
              </button>

              <button
                ref={navigationNextRef}
                className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-xl hover:bg-blue-500 hover:border-blue-500 hover:scale-110 transition-all duration-300 absolute -right-4"
              >
                <FiChevronRight className="w-6 h-6 text-gray-700 hover:text-white transition-colors" />
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