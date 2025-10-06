
// app/news/category/[category]/page.tsx
import { getNewsByCategory } from '../../../../lib/getData'
import CardList from '../../../../components/Common/CardList'

type Props = { params: { category: string } }

export default function CategoryPage({ params }: Props) {
  const data = getNewsByCategory(params.category)
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{params.category} Newssssss</h1>
      <CardList items={data} linkBase="/news" />
    </div>
  )
}
