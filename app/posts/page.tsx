"use client";

import GeneralPost from "@/components/Common/GeneralPost";
import generalPostsData from "@/data/generalPosts.json";

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            அனைத்து பதிவுகள்
          </h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="பதிவுகளை தேடுங்கள்..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none flex-grow sm:w-60"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              தேடு
            </button>
          </div>
        </div>

        {/* General Post Component */}
        <GeneralPost
          posts={generalPostsData}
          initialDisplayCount={9}
          loadMoreCount={9}
        />
      </div>
    </div>
  );
}
