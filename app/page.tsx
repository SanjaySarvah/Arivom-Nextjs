import { getAllNews, getAllArticles } from '../lib/getData'
import CardList from '../components/Common/CardList'
import related from "@/data/RelatedSlider.json"
import RelatedSlider from "@/components/Common/RelatedSlider"

export default function Home() {
  const news = getAllNews().slice(0, 3)
  const articles = getAllArticles().slice(0, 3)
return (
    <div className="min-h-screen ">
      <div className="max-w-[90rem] mx-auto  sm:px-8 lg:px-12 ">
        <section className="mb-14">
          <div className="mb-8">
            <RelatedSlider title="Related Articles" items={related} linkBase="/news" />
          </div>

          <CardList items={news} linkBase="/news" />
        </section>
        <section className="mb-14">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Articles</h2>
          <CardList items={articles} linkBase="/articles" />
        </section>
      </div>
    </div>
  )
}
