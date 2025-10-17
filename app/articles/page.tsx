"use client";

import { getAllArticles } from "@/lib/getData";
import TrendingCards from "@/components/Common/TrendingCards";
import SectionHeader from "@/components/Common/SectionHeader";
import Popular from "@/components/Common/Sidebar/Popular";
import SectionwiseImportantNews from "@/components/Common/SectionwiseImportantNews";
import ViewAllGrid from "@/components/Common/ViewAllGrid";

export default function ArticlesPage() {
  const articles = getAllArticles();
  const linkBase = "/articles";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 py-6 lg:py-10">

        {/* Hero Banner Section with Large Carousel */}
        <section className="mb-12 lg:mb-16">
          <TrendingCards
            title="Breaking Articles"
            items={articles.slice(0, 8)}
            linkBase="/articles"
          />
        </section>

        {/* Popular Section */}
        <section className="mb-10 lg:mb-16">
          <SectionHeader
            subtitle="Happening Now"
            title="Fresh Updates"
            showButton={true}
            buttonText="View All"
            buttonUrl="/articles/all"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column */}
            <div className="lg:col-span-8">
              <SectionwiseImportantNews
                items={articles}
                linkBase="/articles"
                title="பிரிவு வாரியாக முக்கிய கட்டுரைகள்"
                subtitle="ஒவ்வொரு பிரிவிலும் இருந்து தேர்ந்தெடுக்கப்பட்ட முக்கிய அப்டேட்கள்"
                categoryLabel="தமிழகம்"
                viewAllLink="/articles/all"
              />
            </div>

            {/* Right Column */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <Popular />
              </div>
            </aside>
          </div>
        </section>

        {/* Featured + Top Articles Grid */}
        <section className="mb-12 lg:mb-16">
          <SectionHeader
            subtitle="Editor's Pick"
            title="Featured Articles"
            showButton={true}
            buttonText="View All"
            buttonUrl="/articles/all"
          />

          <div className="mt-8">
            <ViewAllGrid
              items={articles}
              linkBase={linkBase}
              initialVisibleCount={9}
              loadMoreIncrement={9}
              showInteractiveButtons={false}
              showTaggingBadge={false}
              showPopularTag={true}
            />
          </div>
        </section>

      </div>
    </main>
  );
}
