import CardItem from "./CardItem"
import { notFound } from "next/navigation"

export default function CardList({
  items,
  linkBase,
}: {
  items: any[]
  linkBase: string
}) {
 
  if (!items || items.length === 0) {
    notFound()
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 border border-gray-100"
        >
          <CardItem item={item} linkBase={linkBase} />
        </div>
      ))}
    </div>
  )
}
