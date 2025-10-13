'use client';

import React from 'react';
import {
  Heart,
  Eye,
  MessageCircle,
  Share2,
  ChevronRight,
  User,
  Calendar,
  Bookmark,
} from 'lucide-react';

import SectionwiseImportantNews from './SectionwiseImportantNews';

import {
  ArticleItem,
  getAllNews,
  NewsItem,
} from '@/lib/getData';

import LikeButton from './Badges/LikeButton';
import BookmarkButton from './Badges/BookmarkButton';
import ShareButton from './Badges/ShareButton';
import ReadMoreButton from './Badges/ReadMoreButton';

interface DetailViewProps {
  data: NewsItem | ArticleItem;
}

export default function DetailView({ data }: DetailViewProps) {
  const authorName = data.author || 'admin';
  const stats = {
    likes: data.likes || 0,
    views: 2340,
    comments: data.totalComments || 0,
  };
  const category = data.category || 'தமிழகம்';
  const date = data.created_at || 'August 31, 2025';
  const news = getAllNews().slice(0, 10);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-15 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-[#2ecc71] cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span
              className="text-gray-900 truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] font-medium"
              title={data.title}
            >
              {data.title.length > 60 ? `${data.title.substring(0, 60)}...` : data.title}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Image */}
              <div className="w-full h-80 bg-gradient-to-br from-emerald-500 to-green-600 relative">
                <img
                  src={data.image || '/assets/banners/arivom-news-default-banner.jpg'}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {data.title}
                </h3>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#2ecc71] text-white text-sm font-medium rounded-full">
                      {category}
                    </span>
                    {data.category === 'தமிழகம்' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        BUSINESS / ECONOMY
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#2ecc71]" />
                      <span className="font-medium">{authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{date}</span>
                    </div>
                  </div>
                </div>

                {/* Description Box */}
                <div className="bg-emerald-50 border-l-4 border-[#2ecc71] p-4 rounded-r-lg mb-6">
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    தமிழ்நாட்டில் 25 சுங்கச்சாவடிகளில் இன்று நள்ளிரவு முதல் கட்டண உயர்வு அமலுக்கு வருகிறது
                  </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap space-y-4">
                    {data.content}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                  <LikeButton id={String(data.id)} />

                  <ShareButton item={data} linkBase="/news" />

                  <BookmarkButton
                    id={String(data.id)}
                    borderColor="#767676ff"
                    backgroundColor="#ffffffff"
                    savedBackgroundColor="#ffffffff"
                    iconColor="#767676ff"
                    savedIconColor="#6f42c2"
                  />
                 
                </div>
              </div>
            </article>

            {/* Comments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Comments ({stats.comments})</h2>
                <button className="px-4 py-2 bg-[#2ecc71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition-colors">
                  Leave a Comment
                </button>
              </div>

              {/* Input */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <textarea
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent resize-none text-gray-700 bg-white"
                />
                <div className="mt-4 flex justify-end">
                  <button className="px-6 py-2.5 bg-[#2ecc71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>

              {/* No Comments Yet */}
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No comments yet. Be the first to comment!</p>
              </div>
            </div>

            {/* Related / Sectionwise */}
            <SectionwiseImportantNews
              items={news}
              linkBase="/news"
              title="பிரிவு வாரியாக முக்கிய செய்திகள்"
              subtitle="ஒவ்வொரு பிரிவிலும் இருந்து கேர்நெடுக்கப்பட்ட முக்கிய அப்டேட்கள்"
              categoryLabel="தமிழகம்"
              viewAllLink="/news"
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2ecc71] to-emerald-600 flex items-center justify-center mb-4 text-white text-2xl font-bold">
                    {authorName.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{authorName}</h3>
                  <p className="text-sm text-gray-600 mb-4">Author at Arivom News</p>

                  <div className="grid grid-cols-3 gap-4 w-full mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">24</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">1.2K</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">356</div>
                      <div className="text-xs text-gray-500">Following</div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-[#2ecc71] text-white rounded-lg font-medium hover:bg-[#27ae60] transition-colors">
                    Follow Author
                  </button>
                </div>
              </div>

              {/* Article Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Article Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Eye className="w-8 h-8 text-[#2ecc71] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stats.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stats.likes}</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stats.comments}</div>
                    <div className="text-sm text-gray-600">Comments</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Share2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">48</div>
                    <div className="text-sm text-gray-600">Shares</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 text-[#2ecc71] rounded-lg hover:bg-emerald-100 transition-colors">
                    <Bookmark className="w-5 h-5" />
                    <span>Save for Later</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share Article</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#2ecc71] to-emerald-600 rounded-xl shadow-sm p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-emerald-100 mb-4">Get the latest articles delivered to your inbox</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-emerald-200 text-white focus:outline-none focus:bg-white/30"
                  />
                  <button className="w-full px-4 py-3 bg-white text-[#2ecc71] rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Future Sections */}
              {/* <PopularNews /> */}
              {/* <PopularArticles /> */}
              {/* <Updates /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
