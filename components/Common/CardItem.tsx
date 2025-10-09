import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiUser, FiClock, FiChevronRight } from "react-icons/fi";
interface CardItemProps {
  item: {
    id: number | string;
    title: string;
    excerpt: string;
    image?: string;
    author?: string;
    created_at?: string;
    category?: string;
    tname?: string;
  };
  linkBase: string;
}
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
export default function CardItem({ item, linkBase }: CardItemProps) {
  if (!item) notFound();

  return (
    <Link
      href={`${linkBase}/${item.id}`}
      className="group block h-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm"
    >

      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm bg-gray-100">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            TRENDING
          </div>
        </div>
        {item.category && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-gray-900 font-bold text-xs uppercase tracking-wide">
              {item.tname || item.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col justify-between h-[260px]">
        <div>
          <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 leading-tight text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {item.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {item.author && (
              <span className="flex items-center gap-1.5">
                <FiUser className="w-3 h-3 text-blue-500" />
                <span className="font-medium">{item.author}</span>
              </span>
            )}
            {item.created_at && (
              <span className="flex items-center gap-1.5">
                <FiClock className="w-3 h-3 text-purple-500" />
                <span>{formatDate(item.created_at)}</span>
              </span>
            )}
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
            <FiChevronRight className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
