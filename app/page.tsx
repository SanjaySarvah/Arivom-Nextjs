"use client";

import { getAllNews, getAllArticles } from "@/lib/getData";
import CardList from "@/components/Common/CardList";
import RelatedSlider from "@/components/Common/RelatedSlider";
import SectionwiseImportantNews from "@/components/Common/SectionwiseImportantNews";
import Sidebar from "@/components/Common/Sidebar";
import MasonryGrid from "@/components/News/Masonry";
import MagazineLayout from "@/components/News/MagazineLayout";
import TrendingCards from "@/components/Common/TrendingCards";
import Popular from "@/components/Common/Sidebar/Popular";
import SectionHeader from "@/components/Common/SectionHeader";

import related from "@/data/RelatedSlider.json";
import CardView from "@/components/Common/CardView";

export default function Home() {
  const news = getAllNews().slice(0, 10);
  const articles = getAllArticles().slice(0, 3);

  return (
    <main className="min-h-screen ">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 py-0">
        {/* 🔥 Trending + Top Sliders */}
        <section className="mb-10 lg:mb-16">
          <TrendingCards title="Trending News" items={related} linkBase="/news" />

          <div className="mt-8">
            <RelatedSlider
              title="முக்கிய செய்திகள்"
              items={related}
              linkBase="/news"
              viewAllLink="/news"
            />
          </div>

          {/* <MagazineLayout /> */}
       <div className="mt-18">
          <MasonryGrid />
          </div>
        </section>

        {/* 📰 Popular Section */}
        <section className="mb-10 lg:mb-16">
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
                viewAllLink="/news"
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
