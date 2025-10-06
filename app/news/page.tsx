import { getAllNews } from "../../lib/getData";
import CardList from "../../components/Common/CardList";
import Link from "next/link";

export default function NewsPage() {
  const news = getAllNews();

  // Extract unique categories from news
  const categories = Array.from(new Set(news.map(n => n.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-center text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Latest News & Insights
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Stay informed with our most recent articles, updates, and expert opinions.
        </p>
      </section>

      {/* Category Links */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/news/category/${cat}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 capitalize transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            All News
          </h2>
          <div className="hidden sm:flex items-center gap-3">
            <input
              type="text"
              placeholder="Search news..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-60"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Cards */}
        <CardList items={news} linkBase="/news" />
      </section>
    </div>
  );
}
