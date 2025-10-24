"use client";

import { getAllNews } from "@/lib/getData";
import TrendingCards from "@/app/news/Components/TrendingCards";
import SectionHeader from "@/components/Common/SectionHeader";
import Popular from "@/components/Common/Sidebar/Popular";
import SectionwiseImportantNews from "@/components/Common/SectionwiseImportantNews";
import CardView from "@/components/Common/CardView";
import ViewAllGrid from "@/components/Common/ViewAllGrid";

export default function NewsPage() {
  const news = getAllNews();
  const linkBase = "/news";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 ">

  

            {/* 📰 Popular Section */}
        <section className="mb-10 mt-10 lg:mb-16">
          <SectionHeader
            subtitle="Happening Now"
            title="Fresh Updates"
            showButton={true}
            buttonText="View All"
            buttonUrl="/news/all"
          />


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column */}
            <div className="lg:col-span-8">
              <SectionwiseImportantNews
                items={news}
                linkBase="/news"
                title="பிரிவு வாரியாக முக்கிய செய்திகள்"
                subtitle="ஒவ்வொரு பிரிவிலும் இருந்து தேர்ந்தெடுக்கப்பட்ட முக்கிய அப்டேட்கள்"
                categoryLabel="தமிழகம்"
                viewAllLink="/news/all"
              />
            </div>

            {/* Right Column */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <Popular />
                {/* You can add <Sidebar /> or ad sections here */}
              </div>
            </aside>
          </div>
        </section>

        {/* Featured + Top Stories Grid */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Editor's Pick"
            title="Featured Stories"
            showButton={true}
            buttonText="View All"
            buttonUrl="/news/all"
          />

          <div className="mt-8">
            <ViewAllGrid
              items={news}
              linkBase={linkBase}
              initialVisibleCount={9}
              loadMoreIncrement={9}
              showInteractiveButtons={false}
              showTaggingBadge={false}
              showPopularTag={true}
            />
          </div>
        </section>

        {/* Trending Sidebar Section */}
         <section className="mb-10 lg:mb-16">
          <SectionHeader
            subtitle="Editorials"
            title="Recent Articles"
            showButton={true}
            buttonText="View All"
            buttonUrl="/articles/all"
          />
         <CardView/>
        </section>
        
      </div>
    </main>
  );
}
