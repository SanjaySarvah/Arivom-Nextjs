// app/news/[id]/page.tsx
import { getNewsById } from '../../../lib/getData'
import DetailView from '../../../components/Common/DetailView'

type Props = { params: { id: string } }

export default function NewsDetail({ params }: Props) {
  const item = getNewsById(Number(params.id))
  if (!item) return <p>News not found</p>

  const transformedData = {
    title: item.title,
    content: item.content,
    image: item.image,
    category: item.category,
    author: {
      name: item.author || 'Unknown Author',
      role: 'Author at Our Blog',
    },
    stats: {
      likes: item.likes ?? 0,
      views: 2340,
      comments: item.totalComments ?? 0,
    },
    date: item.created_at,
  }

  return <DetailView data={transformedData} />
}
