'use client';

import React from 'react';
import {
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Bookmark,
} from 'lucide-react';
import { FaRegNewspaper } from "react-icons/fa";
import DetailsHeader from '../../components/DetailsHeader';
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import DetailFooter from './DetailViews/DetailFooter';
import SectionwiseImportantNews from './SectionwiseImportantNews';
import SectionHeader from "@/components/Common/SectionHeader";
import SectionHeaderSidebar from "@/components/Common/SectionHeaderSidebar";
import {
  ArticleItem,
  getAllNews,
  NewsItem,
} from '@/lib/getData';
import LikeButton from './Badges/LikeButton';
import BookmarkButton from './Badges/BookmarkButton';
import ShareButton from './Badges/ShareButton';

interface DetailViewProps {
  data: NewsItem | ArticleItem;
  contentType?: 'news' | 'articles';
}

export default function DetailView({ data, contentType = 'news' }: DetailViewProps) {
  const authorName = data.author ?? 'admin';

  const stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  } = {
    likes: typeof data.likes === 'number' ? data.likes : 0,
    views: 'views' in data && typeof data.views === 'number' ? data.views : 2340,
    comments: typeof data.totalComments === 'number' ? data.totalComments : 0,
    shares: 'shares' in data && typeof data.shares === 'number' ? data.shares : 48,
  };
  const linkBase = contentType === 'news' ? "/news" : "/articles";
  const category = data.category || 'தமிழகம்';
  const date = data.created_at || 'August 31, 2025';
  const news = getAllNews().slice(0, 10);

  // Custom date format
  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="bg-white min-h-screen mb-10">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-2xl duration-300">
              {/* Image Section */}
              <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-emerald-500 to-green-600">
                <img
                  src={data.image || '/assets/banners/arivom-news-default-banner.jpg'}
                  alt={data.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <CategoryBadge
                    category={category}
                    icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                  />
                </div>
              </div>

              {/* Article Content */}
              <div >
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight mt-2">
                  {data.title}
                </h3>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <AuthorBadge author={authorName} />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <DateBadge date={date} formatDate={customFormatDate} />
                  </div>
                </div>

                {/* Description Box */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-[#2ecc71] p-4 sm:p-6 rounded-r-xl mb-6 sm:mb-8 shadow-sm">
                  <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
                    {data.content || "No description available."}
                  </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-wrap space-y-4 sm:space-y-6">
                    {data.content}
                  </div>
                </div>




                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                    <LikeButton id={String(data.id)} />

                    <BookmarkButton
                      id={String(data.id)}
                      borderColor="#767676"
                      backgroundColor="#ffffff"
                      savedBackgroundColor="#ffffff"
                      iconColor="#767676"
                      savedIconColor="#6f42c2"
                    />
                    <ShareButton item={data} linkBase={linkBase} />
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Comments ({stats.comments})</h2>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 border border-gray-200">
                <textarea
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent resize-none text-gray-700 bg-white transition-all duration-200"
                />
                <div className="mt-4 flex justify-end">
                  <button className="px-6 py-2.5 bg-[#2ecc71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition-colors duration-200 shadow-sm">
                    Post Comment
                  </button>
                </div>
              </div>

              <div className="text-center py-8 sm:py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No comments yet</p>
                <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
              </div>
            </div>
            <div className='mt-5 '>
              {/* Related News */}
              <SectionwiseImportantNews
                items={news}
                linkBase={linkBase}
                title="பிரிவு வாரியாக முக்கிய செய்திகள்"
                subtitle="ஒவ்வொரு பிரிவிலும் இருந்து தேர்ந்தெடுக்கப்பட்ட முக்கிய அப்டேட்கள்"
                categoryLabel="தமிழகம்"
                viewAllLink={linkBase}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-25 space-y-6">


              {/* Article Stats Sidebar */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">

             {/* Read-only Stats Section */}
<div className="mb-6">
    <SectionHeaderSidebar 
  subtitle="" 
  title="Insights" 
  size="small"
/>
  <div className="grid grid-cols-4 gap-2">
    {/* Blue - Views */}
    <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200 cursor-default group hover:bg-blue-100 transition-colors">
      <div className="w-8 h-8 bg-[#017BFF] rounded-full flex items-center justify-center mx-auto mb-1">
        <Eye className="w-4 h-4 text-white" />
      </div>
      <div className="text-sm font-bold text-gray-900">{formatNumber(stats.views)}</div>
      <div className="text-xs text-blue-600 font-medium">Views</div>
    </div>
    
    {/* Purple - Likes */}
    <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-200 cursor-default group hover:bg-purple-100 transition-colors">
      <div className="w-8 h-8 bg-[#6f42c2] rounded-full flex items-center justify-center mx-auto mb-1">
        <Heart className="w-4 h-4 text-white" />
      </div>
      <div className="text-sm font-bold text-gray-900">{formatNumber(stats.likes)}</div>
      <div className="text-xs text-purple-600 font-medium">Likes</div>
    </div>
    
    {/* Green - Comments */}
    <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200 cursor-default group hover:bg-green-100 transition-colors">
      <div className="w-8 h-8 bg-[#28a745] rounded-full flex items-center justify-center mx-auto mb-1">
        <MessageCircle className="w-4 h-4 text-white" />
      </div>
      <div className="text-sm font-bold text-gray-900">{formatNumber(stats.comments)}</div>
      <div className="text-xs text-green-600 font-medium">Comments</div>
    </div>
    
    {/* Gray - Shares */}
    <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-default group hover:bg-gray-100 transition-colors">
      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-1">
        <Share2 className="w-4 h-4 text-white" />
      </div>
      <div className="text-sm font-bold text-gray-900">{formatNumber(stats.shares)}</div>
      <div className="text-xs text-gray-600 font-medium">Shares</div>
    </div>
  </div>
</div>

                {/* Actionable Buttons Section */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">Your Actions</h4>
                  <div className="flex items-center justify-center gap-3">
                    <LikeButton id={String(data.id)} />
                    <BookmarkButton
                      id={String(data.id)}
                      borderColor="#6b7280"
                      backgroundColor="#f9fafb"
                      savedBackgroundColor="#f9fafb"
                      iconColor="#6b7280"
                      savedIconColor="#6f42c2"
                    />
                    <ShareButton item={data} linkBase={linkBase} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailFooter />
    </div>
  
  );
}
