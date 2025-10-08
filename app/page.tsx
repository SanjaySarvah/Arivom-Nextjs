import { getAllNews, getAllArticles } from '../lib/getData'
import CardList from '../components/Common/CardList'
import related from "@/data/RelatedSlider.json"
import RelatedSlider from "@/components/Common/RelatedSlider"
import SectionwiseImportantNews from '@/components/Common/SectionwiseImportantNews'
import PopularArticles from '@/components/Common/DetailViews/PopularArticles'
import PopularNews from '@/components/Common/DetailViews/PopularNews'
import Updates from '@/components/Common/DetailViews/Updates'

export default function Home() {
  const news = getAllNews().slice(0, 10)
  const articles = getAllArticles().slice(0, 3)
return (
    <div className="min-h-screen ">
      <div className="max-w-[90rem] mx-auto  sm:px-8 lg:px-12 ">
        <section className="mb-14">
          <div className="mb-8">
            <RelatedSlider title="முக்கிய செய்திகள்" items={related} linkBase="/news" />
          </div>

          {/* <CardList items={news} linkBase="/news" /> */}
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
              <div className="lg:sticky lg:top-4 space-y-6">
                <PopularNews />
                <PopularArticles />
                <Updates />
              </div>
            </div>
          </div>
        </section> 
        <section className="mb-14">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Articles</h2>
          <CardList items={articles} linkBase="/articles" />
        </section>
      </div>
    </div>
  )
}
