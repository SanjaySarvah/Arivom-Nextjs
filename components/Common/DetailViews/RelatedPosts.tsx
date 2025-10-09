import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedPost {
  id: number;
  image: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  author: string;
  date: string;
  timeAgo: string;
}

const relatedPostsData: RelatedPost[] = [
  {
    id: 1,
    image: '/assets/banners/arivom-news-default-banner.jpg',
    category: 'அறிவியல்',
    subcategory: 'பொதுவுடமை',
    title: 'புதுவை: அரசியல் நிலவரங்கள் மாற்றம் அடையும் என்ற கூறுகள்',
    description: 'புதுவை: அரசியல் நிலவரங்கள் மாற்றம் அடையும் என்ற கூறுகள் குவிகின்றன. தேசிய தேர்தல் முடிவுகள் பிரதிபலிப்பைத் தவிர்க்காது...',
    author: 'அதிகாரி',
    date: 'செப்டம்பர் 6, 2025',
    timeAgo: '(1 மாதம் முன்)'
  },
  {
    id: 2,
    image: '/assets/banners/arivom-news-default-banner.jpg',
    category: 'அறிவியல்',
    subcategory: 'பொதுவுடமை',
    title: 'BREAKING: புதிய அரசியல் நடவடிக்கைகள் ஆரம்பம் ஆகின்றன',
    description: 'BREAKING: புதிய அரசியல் நடவடிக்கைகள் ஆரம்பம் ஆகின்றன. இதன் மூலம் நாடு முழுவதும் பெரிய மாற்றங்கள் உண்டாகலாம்...',
    author: 'அதிகாரி',
    date: 'செப்டம்பர் 6, 2025',
    timeAgo: '(1 மாதம் முன்)'
  }
];


const RelatedPosts: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Related Posts
        </h2>

        {/* Posts Grid */}
        <div className="space-y-8">
          {relatedPostsData.map((post) => (
            <Link
              href={`/news/${post.id}`}
              key={post.id}
              className="block"
            >
              <div className="flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg">
                {/* Image */}
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="relative w-full h-64 md:h-48 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 flex flex-col justify-center">
                  {/* Categories */}
                  <div className="flex gap-3 mb-3">
                    <span className="bg-[#2ecc71] text-white px-4 py-1 rounded text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-blue-600 font-medium text-sm flex items-center">
                      {post.subcategory}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 hover:text-[#2ecc71] transition-colors">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                      
 {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      =P {post.date} {post.timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
