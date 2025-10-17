"use client";
import { getNewsByCategory } from "@/lib/getData";
import PopularNews from '@/components/Common/DetailViews/PopularNews';
import PopularArticles from '@/components/Common/DetailViews/PopularArticles';
import Updates from '@/components/Common/DetailViews/Updates';
import ViewAllGrid from "@/components/Common/ViewAllGrid";

type Props = { params: { category: string } };

export default function CategoryPage({ params }: Props) {
  const allPosts = getNewsByCategory(params.category);
  const category = decodeURIComponent(params.category);
  const linkBase = "/news";

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content - 2/3 width */}
          <div className="lg:w-2/3">
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{category} News</h1>
              <p className="text-gray-600 mt-2">Latest updates and stories in {category}</p>
            </div>

            {/* News Grid */}
            <section>
              <ViewAllGrid
                items={allPosts}
                linkBase={linkBase}
                initialVisibleCount={9}
                loadMoreIncrement={9}
                showInteractiveButtons={false}
                showTaggingBadge={false}
                showPopularTag={true}
              />
            </section>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:w-1/3">
            <div className="space-y-8 sticky top-4">
              {/* Popular News Section */}
              <PopularNews />
              
              {/* Popular Articles Section */}
              <PopularArticles />
              
              {/* Updates Section */}
              <Updates />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}