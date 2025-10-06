import { getNewsById } from '../../../lib/getData'
import DetailView from '../../../components/Common/DetailView'

type Props = { params: { id: string } }

export default function NewsDetail({ params }: Props) {
  const item = getNewsById(Number(params.id))
  if(!item) return <p>Newssssss not found</p>
  return <DetailView data={item} />
}
