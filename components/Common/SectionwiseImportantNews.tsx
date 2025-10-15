"use client";

import { FC } from "react";
import { NewsItem } from "@/lib/getData";
import Link from "next/link";
import { User } from "lucide-react";
import { FiClock } from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import LikeButton from "./Badges/LikeButton";
import ShareButton from "./Badges/ShareButton";
import BookmarkButton from "./Badges/BookmarkButton";
import ReadMoreButton from "./Badges/ReadMoreButton";
import DateBadge from "@/components/Common/Badges/DateBadge";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";

interface SectionwiseImportantNewsProps {
  items: NewsItem[];
  linkBase: string;
  title: string;
  subtitle?: string;
  categoryLabel?: string;
  viewAllLink?: string;
}
 const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

const SectionwiseImportantNews: FC<SectionwiseImportantNewsProps> = ({
  items,
  linkBase,
  title,
  subtitle,
  categoryLabel,
  viewAllLink,
}) => {
  const displayItems = items.slice(0, 6);

  return (
    <section className="space-y-4 md:space-y-5">


      {/* News List */}
      {displayItems.map((item) => (
      <article
  key={item.id}
  className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 group"
>
  {/* Image Section */}
  <div className="relative w-full sm:w-60 h-56 sm:h-66 flex-shrink-0 overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
    <Link href={`${linkBase}/${item.id}`} className="block h-full w-full">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      {/* Optional overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Link>

    {/* Floating category badge on image */}
    <div className="absolute top-3 left-3 z-10">
    
    </div>
  </div>

  {/* Content Section */}
  <div className="flex-1 sm:p-5 p-2 flex flex-col justify-between">
    <div>
      <Link href={`${linkBase}/${item.id}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[var(--secondary)] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.content || item.excerpt}
        </p>
      </Link>
    </div>

    {/* Author + Date */}
    <div className="flex items-center justify-between  text-gray-500">
      
       
      <div className="flex items-center gap-1 MobileViewContent">
        <AuthorBadge author={item.author} />
      </div>
 <div className="flex items-center gap-2 px-3 py-1.5">
                    <DateBadge date={item.created_at} formatDate={customFormatDate} />
                  </div>
       <CategoryBadge
        category={item.tname ?? item.category}
        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
      />
    </div>

    {/* Buttons */}
    <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-3">
      <div className="flex items-center gap-3">
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
      <ReadMoreButton href={`${linkBase}/${item.id}`} />
    </div>
  </div>
</article>

      ))}
    </section>
  );
};

export default SectionwiseImportantNews;
