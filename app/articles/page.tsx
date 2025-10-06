import { getAllArticles } from '../../lib/getData'
import CardList from '../../components/Common/CardList'

export default function ArticlesPage() {
  const articles = getAllArticles()
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <CardList items={articles} linkBase="/articles" />
    </div>
  )
}
