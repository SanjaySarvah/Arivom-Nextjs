import { getArticleById } from '../../../lib/getData'
import DetailView from '../../../components/Common/DetailView'

type Props = { params: { id: string } }

export default function ArticleDetail({ params }: Props) {
  const item = getArticleById(Number(params.id))
  if(!item) return <p>Article not found</p>
  return <DetailView data={item} />
}
