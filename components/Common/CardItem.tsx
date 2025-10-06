import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function CardItem({ item, linkBase }: { item: any; linkBase: string }) {
  if (!item) {
    notFound() 
  }

  return (
    <div className="card hover:shadow-lg transition">
      <div className="h-40 w-full bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
        <span className="text-sm text-gray-500">Image</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{item.excerpt}</p>
      <Link href={`${linkBase}/${item.id}`}>
        <span className="text-blue-600 cursor-pointer">Read More →</span>
      </Link>
    </div>
  )
}
