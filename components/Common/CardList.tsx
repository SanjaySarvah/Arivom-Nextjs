import CardItem from "./CardItem";

export default function CardList({
  items,
  linkBase,
}: {
  items: any[];
  linkBase: string;
}) {
  if (!items || items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mb-3 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-medium">No items found</p>
        <p className="text-sm text-gray-400">Try adjusting your filters or check back later.</p>
      </div>
    );

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 border border-gray-100"
        >
          <CardItem item={item} linkBase={linkBase} />
          
          <div className="absolute "></div>
        </div>
      ))}
    </div>
  );
}
