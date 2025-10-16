'use client';
import React, { useState } from 'react';
import { Heart, Eye, MessageCircle, Share2, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { FaRegNewspaper } from 'react-icons/fa';
import DetailsHeader from '../../components/DetailsHeader';
import CategoryBadge from '@/components/Common/Badges/CategoryBadge';
import AuthorBadge from '@/components/Common/Badges/AuthorBadge';
import DateBadge from '@/components/Common/Badges/DateBadge';
import DetailFooter from './DetailViews/DetailFooter';
import SectionwiseImportantNews from './SectionwiseImportantNews';
import SectionHeaderSidebar from '@/components/Common/SectionHeaderSidebar';
import AdvertisementSidebar from '@/components/Common/Sidebar/AdvertisementSidebar';
import { ArticleItem, getAllNews, NewsItem } from '@/lib/getData';
import LikeButton from './Badges/LikeButton';
import BookmarkButton from './Badges/BookmarkButton';
import ShareButton from './Badges/ShareButton';
import TagsSidebar from '@/components/Common/Sidebar/TagsSidebar';
import {
  FaHome, FaSearch, FaBars, FaTimes, FaChevronDown, FaUserCircle,
  FaUser, FaUserPlus,
} from "react-icons/fa";
import HeaderPrimary from '../HeaderPrimary';
import SectionHeader from './SectionHeader';
import TaggingBadge from './Badges/TaggingBadge';
interface Comment {
  id: string;
  UserName: string;
  ProfileImage: string;
  comment: string;
  timestamp: string;
  likes: number;
  userLiked: boolean;
  sub_comments?: Comment[];
}

interface DetailViewProps {
  data: NewsItem | ArticleItem;
  contentType?: 'news' | 'articles';
}

export default function DetailView({ data, contentType = 'news' }: DetailViewProps) {
  const authorName = data.author ?? 'admin';
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const stats = {
    likes: typeof data.likes === 'number' ? data.likes : 0,
    views: 'views' in data && typeof (data as any).views === 'number' ? (data as any).views : 2340,
    comments: typeof data.totalComments === 'number' ? data.totalComments : 0,
    shares: 'shares' in data && typeof (data as any).shares === 'number' ? (data as any).shares : 48,
  };

  const linkBase = contentType === 'news' ? '/news' : '/articles';
  const category = data.category || 'தமிழகம்';
  const date = data.created_at || 'August 31, 2025';
  const news = getAllNews().slice(0, 10);


  const customFormatDate = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };


  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };


  const toggleSubComments = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };


  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    console.log('New comment:', newComment);
    setNewComment('');
  };


  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    console.log('Reply to', commentId, ':', replyContent);
    setReplyContent('');
    setReplyingTo(null);
  };


  const handleLikeComment = (commentId: string) => {
    console.log('Like comment:', commentId);
  };


  const handleShareComment = (commentId: string) => {
    console.log('Share comment:', commentId);
  };

  return (
    <div className="bg-white min-h-screen mb-10">
      <DetailsHeader currentTitle={data.title} contentType={contentType} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8">
            <article className="bg-white rounded-2xl duration-300">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-emerald-500 to-green-600">
                <img
                  src={data.image || '/assets/banners/arivom-news-default-banner.jpg'}
                  alt={data.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* <div className="absolute top-4 left-4">
                  <CategoryBadge
                    category={category}
                    icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                  />
                </div> */}
              </div>

              {/* Title & Meta */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight mt-2">
                  {data.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  {/* --- Mobile Layout (Category left, Date right, hide Author) --- */}
                  <div className="flex w-full justify-between md:hidden">
                    <div className="flex items-center gap-2 px-3 py-1.5">
                      <CategoryBadge
                        category={category}
                        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5">
                      <DateBadge date={date} formatDate={customFormatDate} />
                    </div>
                  </div>

                  {/* --- Desktop Layout (Show all badges in one row) --- */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5">
                      <CategoryBadge
                        category={category}
                        icon={<FaRegNewspaper className="text-white w-3 h-3" />}
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5">
                      <AuthorBadge author={authorName} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5">
                      <DateBadge date={date} formatDate={customFormatDate} />
                    </div>
                  </div>
                </div>


                {/* Description */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-[#2ecc71] p-4 sm:p-6 rounded-r-xl mb-6 sm:mb-8 shadow-sm">
                  <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
                    {data.excerpt || data.content || 'No description available.'}
                  </p>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-wrap space-y-4 sm:space-y-6">
                    {data.content}
                            <TagsSidebar tags={data.tags} />

                  </div>
                </div>
              </div>
            </article>




     
            {/* ---------------- IMPROVED COMMENTS SECTION ---------------- */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Comments ({stats.comments})
              </h2>
              <p className="text-gray-500 text-sm mb-6">Join the conversation</p>

              {/* Comment Section */}
              <div id="comment-section" className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-8 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-all duration-300">
                    <FaUserCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent resize-none text-gray-700 bg-white transition-all duration-200"
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        className="px-4 py-2 bg-[#2ecc71] text-white rounded-lg font-medium hover:bg-[#27ae60] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>


          
         {data.comments && data.comments.length > 0 ? (
  <div className="space-y-6">
    {(data.comments as Comment[]).map((comment,  index) => (
      <div key={comment.id || index} className="border-b border-gray-100 pb-6 last:border-b-0">
        {/* Main Comment */}
        <div className="flex items-start gap-4">
          <img
            src={comment.ProfileImage}
            alt={comment.UserName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900">{comment.UserName}</h4>
              <span className="text-gray-500 text-sm">
                {formatRelativeTime(comment.timestamp)}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{comment.comment}</p>

            {/* Comment Actions */}
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => handleLikeComment(comment.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${comment.userLiked
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                  }`}
              >
                <Heart className={`w-4 h-4 ${comment.userLiked ? 'fill-current' : ''}`} />
                <span>{comment.likes}</span>
              </button>

              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>

              <button
                onClick={() => handleShareComment(comment.id)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="mt-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  You
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 bg-white text-sm"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Post Reply
                    </button>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sub Comments */}
            {comment.sub_comments && comment.sub_comments.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => toggleSubComments(comment.id)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium mb-3"
                >
                  {expandedComments.has(comment.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  {expandedComments.has(comment.id) ? 'Hide' : 'Show'} {comment.sub_comments.length} replies
                </button>

                {expandedComments.has(comment.id) && (
                  <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-4">
                    {comment.sub_comments.map((subComment) => (
                      <div key={subComment.id} className="flex items-start gap-3 pt-4 first:pt-0">
                        <img
                          src={subComment.ProfileImage}
                          alt={subComment.UserName}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-gray-800 text-sm">{subComment.UserName}</h5>
                            <span className="text-gray-500 text-xs">
                              {formatRelativeTime(subComment.timestamp)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{subComment.comment}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <button
                              onClick={() => handleLikeComment(subComment.id)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${subComment.userLiked
                                ? 'text-red-600 bg-red-50'
                                : 'text-gray-500 hover:text-red-600 hover:bg-gray-50'
                                }`}
                            >
                              <Heart className={`w-3 h-3 ${subComment.userLiked ? 'fill-current' : ''}`} />
                              <span>{subComment.likes}</span>
                            </button>
                            <button
                              onClick={() => handleShareComment(subComment.id)}
                              className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-500 hover:text-green-600 hover:bg-gray-50 transition-colors"
                            >
                              <Share2 className="w-3 h-3" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-12">
    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <p className="text-gray-500 text-lg mb-2">No comments yet</p>
    <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
  </div>
)}

            </div>
            <div className="mt-5">
              <SectionHeader
                subtitle="More to explore"
                title="Related Post"
                showButton={true}
                buttonText="View All"
                buttonUrl="/news"
              />
            </div>
            <div className="mt-5">
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

          {/* ---------------- SIDEBAR ---------------- */}
          <div className="lg:col-span-4">
            <div className="sticky top-25 space-y-6">
              {/* Insights Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 hover:shadow-md transition-shadow duration-300">
                <div className="mb-6">
                  <SectionHeaderSidebar subtitle="Insights" title="" size="large" />
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                      <div className="w-8 h-8 bg-[#017BFF] rounded-full flex items-center justify-center mx-auto mb-1">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(stats.views)}
                      </div>
                      <div className="text-xs text-blue-600 font-medium">Views</div>
                    </div>

                    <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                      <div className="w-8 h-8 bg-[#6f42c2] rounded-full flex items-center justify-center mx-auto mb-1">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(stats.likes)}
                      </div>
                      <div className="text-xs text-purple-600 font-medium">Likes</div>
                    </div>

                    <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                      <div className="w-8 h-8 bg-[#28a745] rounded-full flex items-center justify-center mx-auto mb-1">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(stats.comments)}
                      </div>
                      <div className="text-xs text-green-600 font-medium">Comments</div>
                    </div>

                    <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-1">
                        <Share2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(stats.shares)}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Shares</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-4 MobileViewContent">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">
                    Your Actions
                  </h4>
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

              {/* Advertisement */}
              <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <AdvertisementSidebar />

              </div>
              <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <TagsSidebar tags={data.tags} /></div>
            </div>
          </div>
        </div>
      </div>
<DetailFooter
  authorName={authorName}
  date={date}
  formatDate={customFormatDate}
  likeCount={stats.likes}
  commentCount={stats.comments}
  item={data}
  linkBase={linkBase || "/"}  // ensure it's always a string
/>





    </div>
  );
}