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
  slug?: string;
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

// ✅ Matches folder structure [id]/[slug]
export default async function NewsIdPage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  try {
    console.log("🟡 Incoming params:", params);

    // 📰 Fetch all news
    const res = await fetch("http://localhost/newsapi/news/get.php", {
      next: { revalidate: 10 },
    });

    console.log("🟢 Response status:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const data = await res.json();

    console.log("📦 Raw API data:", data);

    if (!data || !data.news || !Array.isArray(data.news)) {
      throw new Error("Invalid news data received from API");
    }

    // ✅ Find article by ID only
    const article: NewsItem | undefined = data.news.find(
      (item: NewsItem) => String(item.id) === String(params.id)
    );

    console.log("📰 Matched article:", article);

    if (!article) {
      console.warn("⚠️ No article found with ID:", params.id);
      return (
        <div className="max-w-3xl mx-auto py-20 text-center text-red-500">
          <h2>404 - Article not found</h2>
          <p>The news article you are looking for does not exist.</p>
        </div>
      );
    }

    // ✅ Optional: fill in slug if missing
    if (!article.slug) {
      console.log("🟠 No slug found in API, using from params:", params.slug);
      article.slug = params.slug;
    }

    // 🏷️ Fetch category info
    let category: CategoryItem | null = null;
    try {
      const categoryRes = await fetch(
        `http://localhost/newsapi/categories/get.php?category_id=${article.category_id}`,
        { next: { revalidate: 60 } }
      );

      console.log("📁 Category response status:", categoryRes.status);

      if (categoryRes.ok) {
        const categoryData = await categoryRes.json();
        console.log("📁 Category data:", categoryData);
        if (categoryData.status === "success" && categoryData.category) {
          category = categoryData.category;
        }
      }
    } catch (err) {
      console.error("❌ Error fetching category:", err);
    }

    // 📊 Fetch activity summary
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

      console.log("📊 Activity response status:", activityRes.status);

      if (activityRes.ok) {
        const activityData = await activityRes.json();
        console.log("📊 Activity summary data:", activityData);
        if (activityData.success && activityData.summary) {
          activitySummary = activityData.summary;
        }
      }
    } catch (err) {
      console.error("❌ Error fetching activity summary:", err);
    }

    console.log("✅ Final render data:", {
      article,
      category,
      activitySummary,
    });

    // ✅ Render the ExtraContent component
    return (
      <ExtraContent
        article={article}
        category={category}
        activitySummary={activitySummary}
      />
    );
  } catch (error) {
    console.error("🔥 Error loading article:", error);

    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-red-500">
        <h2>Something went wrong</h2>
        <p>Unable to load the news article. Please try again later.</p>
      </div>
    );
  }
}
