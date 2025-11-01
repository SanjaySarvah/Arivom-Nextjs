"use client";

import React, { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { Heart, Eye, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { FaRegNewspaper } from "react-icons/fa";
import DetailsHeader from "../DetailsHeader";
import CategoryBadge from "@/components/Common/Badges/CategoryBadge";
import AuthorBadge from "@/components/Common/Badges/AuthorBadge";
import DateBadge from "@/components/Common/Badges/DateBadge";
import DetailFooter from "./DetailViews/DetailFooter";
import SectionHeaderSidebar from "@/components/Common/SectionHeaderSidebar";
import AdvertisementSidebar from "@/components/Common/Sidebar/AdvertisementSidebar";
import LikeButton from "./Badges/LikeButton";
import BookmarkButton from "./Badges/BookmarkButton";
import ShareButton from "./Badges/ShareButton";
import TagsSidebar from "@/components/Common/Sidebar/TagsSidebar";
import SectionHeader from "./SectionHeader";
import CardView from "./CardView";

interface NewsItem {
  id: string;
  category_id: string;
  title: string;
  tname: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  highlights: string;
  created_at: string;
  tags?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug?: string;
  created_at?: string;
}

interface ActivitySummary {
  total_comments: number;
  total_likes: number;
  total_shares: number;
  total_views: number;
}

interface Comment {
  user: {
    id: number;
    name: string;
    email: string;
  };
  comment: string;
  created_at: string;
}

interface CommentsResponse {
  success: boolean;
  news_id: number;
  total_comments: number;
  comments: Comment[];
}

interface ExtraContentProps {
  article: NewsItem;
  category?: CategoryItem | null;
  activitySummary: ActivitySummary;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExtraContent({
  article,
  category,
  activitySummary,
}: ExtraContentProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = Number(localStorage.getItem("user_id")) || null;
    setUserId(id);
  }, []);

  const { data: liveActivity } = useSWR<ActivitySummary>(
    article?.id
      ? `http://localhost/newsapi/news/stats.php?id=${article.id}`
      : null,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
      fallbackData: activitySummary,
    }
  );

  const activity = liveActivity ?? activitySummary;

  // Record view once
  useEffect(() => {
    if (!userId || !article?.id) return;
    fetch("http://localhost/newsapi/news/active.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        news_id: Number(article.id),
        user_id: userId,
        view_count: 1,
      }),
    }).catch((err) => console.error("❌ View count error:", err));
  }, [article.id, userId]);

  // Fetch comments
  const fetchComments = async () => {
    if (!article?.id) return;
    try {
      const response = await fetch("http://localhost/newsapi/news/get_comments.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ news_id: Number(article.id) }),
      });
      const data: CommentsResponse = await response.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [article?.id]);

  // Handle Like / Share / Comment
  const handleActivity = async (type: "like" | "share" | "comment") => {
    if (!userId) return alert("Please log in to interact.");

    if (type === "comment" && !commentText.trim()) {
      return alert("Please write a comment before posting.");
    }

    const payload: any = { news_id: Number(article.id), user_id: userId };
    if (type === "like") payload.like_status = 1;
    if (type === "share") payload.share_count = 1;
    if (type === "comment") {
      payload.comment = commentText.trim();
      setIsSubmitting(true);
    }

    try {
      await fetch("http://localhost/newsapi/news/active.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (type === "comment") {
        setCommentText(""); // clear input after posting
        // Refresh comments after posting
        setTimeout(() => {
          fetchComments();
          setIsSubmitting(false);
        }, 500);
      }
    } catch (error) {
      console.error("Activity error:", error);
      setIsSubmitting(false);
    }
  };

  const customFormatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (str: string) => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-blue-600",
      "bg-gradient-to-r from-green-500 to-green-600",
      "bg-gradient-to-r from-purple-500 to-purple-600",
      "bg-gradient-to-r from-pink-500 to-pink-600",
      "bg-gradient-to-r from-orange-500 to-orange-600",
      "bg-gradient-to-r from-teal-500 to-teal-600",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const isBlurred = !userId;

  return (
    <div className="bg-white min-h-screen mb-10">
      <DetailsHeader
        currentTitle={article.title}
        contentType="news"
        actions={
          <div
            className={`flex gap-2 items-center ${
              isBlurred ? "blur-sm pointer-events-none opacity-60" : ""
            }`}
          >
            {/* Use div wrapper as temporary fix */}
            <div 
              onClick={() => handleActivity("like")}
              className="cursor-pointer"
            >
              <LikeButton id={String(article.id)} />
            </div>
            <BookmarkButton
              id={String(article.id)}
              borderColor="#6b7280"
              backgroundColor="#f9fafb"
              savedBackgroundColor="#f9fafb"
              iconColor="#6b7280"
              savedIconColor="#6f42c2"
            />
            {/* Use div wrapper as temporary fix */}
            <div 
              onClick={() => handleActivity("share")}
              className="cursor-pointer"
            >
              <ShareButton item={article} linkBase="/news" />
            </div>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 mt-6">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-8">
          <div className="w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-2xl mb-6">
            <img
              src={`http://localhost/newsapi/${article.image}`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-gray-200 md:hidden">
            <div className="flex w-full justify-between">
              <CategoryBadge
                category={category ? category.tname : "General"}
                icon={<FaRegNewspaper className="text-white w-3 h-3" />}
              />
              <DateBadge
                date={article.created_at}
                formatDate={customFormatDate}
              />
            </div>
          </div>

          <div className="prose max-w-none mt-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight mt-2">
              {article.tname}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {article.content}
            </p>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            {(() => {
              try {
                const tags = JSON.parse(article.tags ?? "[]");
                return Array.isArray(tags)
                  ? tags.map((tag: string) => `#${tag}`).join("   ")
                  : `#${article.tags}`;
              } catch {
                return `#${article.tags ?? ""}`;
              }
            })()}
          </p>

          {/* COMMENT SECTION */}
          <div
            className={`mt-8 border-t border-gray-200 pt-6 transition-all ${
              isBlurred ? "blur-sm pointer-events-none opacity-60" : ""
            }`}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              Leave a Comment
            </h4>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 resize-none transition-all duration-200"
              rows={4}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {commentText.length}/500 characters
              </span>
              <button
                onClick={() => handleActivity("comment")}
                disabled={!commentText.trim() || isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  "Post Comment"
                )}
              </button>
            </div>

            {/* COMMENTS LIST */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  Comments ({comments.length})
                </h4>
              </div>

              {comments.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No comments yet</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                <>
                  {/* Show limited comments */}
                  <div className="space-y-6">
                    {comments.slice(0, visibleCount).map((comment, index) => (
                      <div
                        key={index}
                        className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-green-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Avatar */}
                            <div
                              className={`w-12 h-12 ${getRandomColor(
                                comment.user.name
                              )} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                            >
                              {getInitials(comment.user.name)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h5 className="font-semibold text-gray-900 text-lg">
                                  {comment.user.name}
                                </h5>
                                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                                  Verified Reader
                                </span>
                              </div>
                              <p className="text-gray-700 leading-relaxed text-base mb-3 whitespace-pre-line">
                                {comment.comment}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{formatCommentDate(comment.created_at)}</span>
                                <button className="hover:text-green-600 transition-colors">
                                  Reply
                                </button>
                                <button className="hover:text-red-600 transition-colors">
                                  Like
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Read More button */}
                  {visibleCount < comments.length && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 3)}
                        className="px-6 py-2 text-green-600 font-semibold border border-green-300 rounded-full hover:bg-green-50 transition-colors"
                      >
                        Read More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {!userId && (
            <div className="text-center py-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 mt-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-700 text-lg font-medium mb-2">
                Join the Conversation
              </p>
              <p className="text-gray-500">
                🔒 Please log in to like, comment or share this article.
              </p>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div 
          ref={sidebarRef}
          className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start transition-all duration-300"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <SectionHeaderSidebar subtitle="Insights" title="" size="large" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                icon={<Eye />}
                label="Views"
                value={activity.total_views}
                color="blue"
              />
              <StatCard
                icon={<Heart />}
                label="Likes"
                value={activity.total_likes}
                color="gray"
              />
              <StatCard
                icon={<MessageCircle />}
                label="Comments"
                value={activity.total_comments}
                color="green"
              />
              <StatCard
                icon={<Share2 />}
                label="Shares"
                value={activity.total_shares}
                color="gray"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <AdvertisementSidebar />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 mb-10">
        <SectionHeader
          subtitle="Editorials"
          title="Related News"
          showButton={true}
          buttonText="View All"
          buttonUrl="/news"
        />
        <CardView />
      </div>

      <DetailFooter />
    </div>
  );
}

// ✅ StatCard Component
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactElement;
  label: string;
  value: number;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-600",
    green: "bg-green-50 border-green-200 hover:bg-green-100 text-green-600",
    gray: "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600",
  };

  const bgColorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
  };

  return (
    <div
      className={`text-center p-2 rounded-lg border hover:transition ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 text-white ${bgColorClasses[color as keyof typeof bgColorClasses]}`}
      >
        <div className="text-[2px] sm:text-[2px]">{icon}</div>
      </div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
      <div className={`text-xs font-medium ${colorClasses[color as keyof typeof colorClasses].split(' ')[4]}`}>
        {label}
      </div>
    </div>
  );
}