// app/articles/category/[category]/[subcategory]/page.tsx

import { getArticleByCategory } from "../../../../../lib/getData";
import CardList from "../../../../../components/Common/CardList";

type Props = { params: { category: string; subcategory: string } };

export default function SubcategoryPage({ params }: Props) {
  const { category, subcategory } = params;
  const decodedSubcategory = decodeURIComponent(subcategory);

  // Get articles from category and filter by subcategory
  const data = getArticleByCategory(category).filter(
    (a) => a.subcategory === decodedSubcategory
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category} — {decodedSubcategory} Articles
      </h1>
      {data.length > 0 ? (
        <CardList items={data} linkBase="/articles" />
      ) : (
        <p className="text-gray-500">No articles found in this subcategory.</p>
      )}
    </div>
  );
}
