import ExtraContent from "@/components/Common/ExtraContent";

interface NewsItem {
  id: string;
  category_id: string;
  title: string;
  tname: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  highlights: string;
  created_at: string;
  tags?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  tname: string;
  slug?: string;
  created_at?: string;
}

interface ActivitySummary {
  total_comments: number;
  total_likes: number;
  total_shares: number;
  total_views: number;
}

export default async function NewsIdPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    // 📰 Fetch all news
    const res = await fetch("http://localhost/newsapi/news/get.php", {
      next: { revalidate: 10 },
    });
    const data = await res.json();

    const article: NewsItem | undefined = data.news.find(
      (item: NewsItem) => item.id === params.id
    );

    if (!article) {
      return (
        <div className="max-w-3xl mx-auto py-20 text-center text-red-500">
          <h2>404 - Article not found</h2>
          <p>The news article you are looking for does not exist.</p>
        </div>
      );
    }

    // 🏷️ Fetch category info
    let category: CategoryItem | null = null;
    try {
      const categoryRes = await fetch(
        `http://localhost/newsapi/categories/get.php?category_id=${article.category_id}`,
        { next: { revalidate: 60 } }
      );
      const categoryData = await categoryRes.json();
      if (categoryData.status === "success" && categoryData.category) {
        category = categoryData.category;
      }
    } catch (err) {
      console.error("Error fetching category:", err);
    }

    // 📊 Fetch activity summary (POST)
    let activitySummary: ActivitySummary = {
      total_comments: 0,
      total_likes: 0,
      total_shares: 0,
      total_views: 0,
    };

    try {
      const activityRes = await fetch(
        "http://localhost/newsapi/news/getactive.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ news_id: article.id }),
          next: { revalidate: 5 },
        }
      );

      const activityData = await activityRes.json();

      if (activityData.success && activityData.summary) {
        activitySummary = activityData.summary;
      }
    } catch (err) {
      console.error("Error fetching activity summary:", err);
    }

    // ✅ Pass article, category, and activitySummary to component
    return (
      <ExtraContent
        article={article}
        category={category}
        activitySummary={activitySummary}
      />
    );
  } catch (error) {
    console.error("Error loading article:", error);
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-red-500">
        <h2>Something went wrong</h2>
        <p>Unable to load the news article. Please try again later.</p>
      </div>
    );
  }
}
