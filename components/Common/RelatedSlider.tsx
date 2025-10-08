"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

const RelatedSlider: FC<Props> = ({ title, items, linkBase }) => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Always call hooks before any conditional returns
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const calculateMaxHeight = () => {
      if (window.innerWidth >= 768) {
        const heights = slideRefs.current
          .filter((ref) => ref !== null)
          .map((ref) => ref?.offsetHeight || 0);

        if (heights.length > 0) {
          setMaxHeight(Math.max(...heights));
        }
      } else {
        setMaxHeight(0);
      }
    };

    checkMobile();
    calculateMaxHeight();

    const handleResize = () => {
      checkMobile();
      calculateMaxHeight();
    };

    window.addEventListener("resize", handleResize);
    const timeoutId = setTimeout(calculateMaxHeight, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [items]);

  // ✅ Safe to conditionally return AFTER hooks
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 relative overflow-visible">
      <div className="w-full px-4 sm:px-6 md:px-10 overflow-visible">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="relative overflow-visible">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="related-slider"
            onSlideChange={() => {
              if (!isMobile) {
                setTimeout(() => {
                  const heights = slideRefs.current
                    .filter((ref) => ref !== null)
                    .map((ref) => ref?.offsetHeight || 0);
                  if (heights.length > 0) {
                    setMaxHeight(Math.max(...heights));
                  }
                }, 50);
              }
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  style={
                    maxHeight > 0 && !isMobile
                      ? { height: `${maxHeight}px` }
                      : {}
                  }
                  className="h-full"
                >
                  <Link
                    href={`${linkBase}/${item.id}`}
                    className="block h-full group"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-full group-hover:-translate-y-1 transform">
                      <div className="md:w-2/5 h-48 md:h-auto flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onLoad={() => {
                            if (!isMobile) {
                              setTimeout(() => {
                                const heights = slideRefs.current
                                  .filter((ref) => ref !== null)
                                  .map((ref) => ref?.offsetHeight || 0);
                                if (heights.length > 0) {
                                  setMaxHeight(Math.max(...heights));
                                }
                              }, 50);
                            }
                          }}
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between h-full">
                        <div className="flex-1">
                          <div className="mb-2">
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded mr-2">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">
                              {item.subcategory}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <span className="font-medium">{item.author}</span>
                          <span>
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                          <span>{item.days_ago} days ago</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors translate-x-[-50%] hidden md:flex">
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors translate-x-[50%] hidden md:flex">
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedSlider;
