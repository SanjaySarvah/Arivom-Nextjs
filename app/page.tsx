"use client";

import { getAllNews, getAllArticles } from '../lib/getData'
import CardList from '../components/Common/CardList'
import related from "@/data/RelatedSlider.json"
import RelatedSlider from "@/components/Common/RelatedSlider"
import SectionwiseImportantNews from '@/components/Common/SectionwiseImportantNews'
import Sidebar from '@/components/Common/Sidebar'
import MasonryGrid from '@/components/News/Masonry'
import MagazineLayout from '@/components/News/MagazineLayout';
import TrendingCards from '@/components/Common/TrendingCards';

export default function Home() {
  const news = getAllNews().slice(0, 10)
  const articles = getAllArticles().slice(0, 3)
return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 py-6">
        <section className="mb-8 lg:mb-14">
          <TrendingCards title={'Trending News'} items={related} linkBase="/news" />
          <div className="mb-6 lg:mb-8">
            <RelatedSlider title="முக்கிய செய்திகள்" items={related} linkBase="/news" />
          </div>
  <MasonryGrid />
          <MagazineLayout/>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - 8/12 width on desktop */}
            <div className="lg:col-span-8">
              <SectionwiseImportantNews
                items={news}
                linkBase="/news"
                title="பிரிவு வாரியாக முக்கிய செய்திகள்"
                subtitle="ஒவ்வொரு பிரிவிலும் இருந்து கேர்நெடுக்கப்பட்ட முக்கிய அப்டேட்கள்"
                categoryLabel="தமிழகம்"
                viewAllLink="/news"
              />
            </div>

            {/* Right Column - 4/12 width on desktop */}
            <div className="lg:col-span-4">
              <Sidebar />
            </div>
          </div>
        </section>

        <section className="mb-8 lg:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Recent Articles</h2>
          <CardList items={articles} linkBase="/articles" />
        </section>

        <section>
        


        </section>
      </div>
    </div>
  )
}
