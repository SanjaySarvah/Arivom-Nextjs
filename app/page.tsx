import { getAllNews, getAllArticles } from '../lib/getData'
import CardList from '../components/Common/CardList'

export default function Home() {
  const news = getAllNews().slice(0, 3)
  const articles = getAllArticles().slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Latest News</h2>
        <CardList items={news} linkBase="/news" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Articles</h2>
        <CardList items={articles} linkBase="/articles" />
      </section>
    </div>
  )
}
