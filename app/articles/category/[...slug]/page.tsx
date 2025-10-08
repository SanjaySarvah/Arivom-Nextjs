// app/articles/category/[...slug]/page.tsx
import { getAllArticles } from "@/lib/getData";
import CardList from "@/components/Common/CardList";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function CategoryPage({ params }: Props) {
  // ✅ Await params (required in Next.js 15+)
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const [category, subcategory, subsubcategory] = slug.map(decodeURIComponent);
  const articles = getAllArticles();

  // ✅ Filtering logic
  let filtered = articles;

  if (category) {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (subcategory) {
    filtered = filtered.filter(
      (a) => a.subcategory?.toLowerCase() === subcategory.toLowerCase()
    );
  }

  if (subsubcategory) {
    filtered = filtered.filter(
      (a) => a.subsubcategory?.toLowerCase() === subsubcategory.toLowerCase()
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {slug.join(" / ")} Articles
      </h1>

      {filtered.length > 0 ? (
        <CardList items={filtered} linkBase="/articles" />
      ) : (
        <p>No articles found in this category.</p>
      )}
    </div>
  );
}
