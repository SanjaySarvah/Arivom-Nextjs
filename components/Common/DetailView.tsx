import React from 'react';
import { Heart, Eye, MessageCircle, Facebook, Linkedin, Twitter, Share2, ChevronRight, User, Calendar } from 'lucide-react';
import PopularNews from './DetailViews/PopularNews';
import Updates from './DetailViews/Updates';
import RelatedPosts from './DetailViews/RelatedPosts';
import PopularArticles from './DetailViews/PopularArticles';

interface DetailViewProps {
  data: {
    title: string;
    content: string;
    image?: string;
    category?: string;
    author?: {
      name: string;
      role: string;
      avatar?: string;
    };
    stats?: {
      likes: number;
      views: number;
      comments: number;
    };
    date?: string;
  };
}

export default function DetailView({ data }: DetailViewProps) {
  const author = data.author || { name: 'admin', role: 'Author at Our Blog' };
  const stats = data.stats || { likes: 0, views: 2340, comments: 0 };
  const category = data.category || 'தமிழகம்';
  const date = data.date || 'August 31, 2025 (1 month ago)';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="hover:text-blue-600 cursor-pointer">Blog</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 truncate">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - 8/12 */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Article Image */}
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <img 
                  src={data.image || '/assets/banners/arivom-news-default-banner.jpg'} 
                  alt={data.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Article Content */}
              <div className="p-8">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {data.title}
                </h1>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-4 py-1 bg-red-600 text-white text-sm font-medium rounded">
                    {category}
                  </span>
                  {data.category === 'தமிழகம்' && (
                    <span className="ml-2 inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                      BUSINESS / ECONOMY
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-gray-700 text-base mb-4 leading-relaxed">
                  தமிழ்நாட்டில் 25 சுங்கச்சாவடிகளில் இன்று நள்ளிரவு முதல் கட்டண உயர்வு அமலுக்கு வருகிறதுtamilnadu-25-tollgates-toll-fee-hike-midnight
                </p>

                {/* Author and Date */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-orange-500" />
                    <span>{author.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{date}</span>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                    {data.content}
                  </p>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Comments (0)
              </h2>

              {/* Leave a Comment */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Leave a Comment
                </h3>
                
                <textarea
                  placeholder="Write your comment..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
                />
                
                <div className="mt-4 flex justify-end">
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
            <RelatedPosts />
          </div>

          {/* Right Column - 4/12 */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Author Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    {author.avatar ? (
                      <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    )}
                  </div>
                  
                  {/* Author Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{author.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{author.role}</p>
                  
                  {/* View Profile Button */}
                  <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {/* Likes */}
                  <div className="flex flex-col items-center">
                    <Heart className="w-6 h-6 text-red-500 mb-2" />
                    <span className="text-2xl font-bold text-gray-900">{stats.likes}</span>
                  </div>
                  
                  {/* Views */}
                  <div className="flex flex-col items-center">
                    <Eye className="w-6 h-6 text-gray-600 mb-2" />
                    <span className="text-2xl font-bold text-gray-900">{stats.views.toLocaleString()}</span>
                  </div>
                  
                  {/* Comments */}
                  <div className="flex flex-col items-center">
                    <MessageCircle className="w-6 h-6 text-green-600 mb-2" />
                    <span className="text-2xl font-bold text-gray-900">{stats.comments}</span>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Share this post:</h3>
                
                <div className="flex justify-center gap-3">
                  {/* Facebook */}
                  <button className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  
                  {/* LinkedIn */}
                  <button className="w-12 h-12 rounded-full border-2 border-blue-700 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  
                  {/* Twitter */}
                  <button className="w-12 h-12 rounded-full border-2 border-sky-500 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  
                  {/* WhatsApp */}
                  <button className="w-12 h-12 rounded-full border-2 border-green-600 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Additional Image Below Cards */}
              {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/1/400/200" 
                  alt="Advertisement" 
                  className="w-full h-auto object-cover"
                />
              </div> */}
              <PopularNews />
              <PopularArticles />
              <Updates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
