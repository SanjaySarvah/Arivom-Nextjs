// app/articles/category/[category]/page.tsx
import { getArticleByCategory } from '../../../../lib/getData'
import CardList from '../../../../components/Common/CardList'

type Props = { params: { category: string } }

export default function CategoryPage({ params }: Props) {
  const data = getArticleByCategory(params.category)
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{params.category} Articles</h1>
      <CardList items={data} linkBase="/articles" />
    </div>
  )
}
