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
    <div className="bg-white min-h-screen">
   

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

                {/* Article Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 bg-gray-50 rounded-xl py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[#2ecc71]" />
                      <span className="text-sm font-medium">{formatNumber(stats.views)} Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium">{formatNumber(stats.likes)} Likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium">{formatNumber(stats.comments)} Comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium">{formatNumber(stats.shares)} Shares</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                    <LikeButton id={String(data.id)} />
                    <ShareButton item={data} linkBase={linkBase} />
                    <BookmarkButton
                      id={String(data.id)}
                      borderColor="#767676"
                      backgroundColor="#ffffff"
                      savedBackgroundColor="#ffffff"
                      iconColor="#767676"
                      savedIconColor="#6f42c2"
                    />
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
              {/* Author Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2ecc71] to-emerald-600 flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg">
                    {authorName.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{authorName}</h3>
                  <p className="text-sm text-gray-600 mb-4">Author at Arivom News</p>
                </div>
              </div>

              {/* Article Stats Sidebar */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Article Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-[#2ecc71] mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(stats.views)}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(stats.likes)}</div>
                    <div className="text-xs text-gray-600">Likes</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl border border-green-100">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(stats.comments)}</div>
                    <div className="text-xs text-gray-600">Comments</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(stats.shares)}</div>
                    <div className="text-xs text-gray-600">Shares</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailFooter/>
    </div>
  );
}
