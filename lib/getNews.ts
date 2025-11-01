export interface NewsItem {
  id: string;
  category_id?: string;
  subcategory_id?: string;
  title: string;
  tname?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  slug: string;
  created_at?: string;
  seotitle?: string;
  seodescription?: string;
  seokeywords?: string;
}

export async function getAllNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("http://localhost/newsapi/news/get.php", {
      cache: "no-store",
    });

    const data = await res.json();
    console.log("🔍 API raw response:", data);

    // ✅ Your API directly returns an array, not an object with "news"
    if (Array.isArray(data)) {
      console.log("✅ Parsed news count:", data.length);
      return data;
    }

    // If backend returns {news: [...]}
    if (Array.isArray(data.news)) {
      return data.news;
    }

    console.error("⚠️ Unexpected API structure:", data);
    return [];
  } catch (err) {
    console.error("❌ Error fetching news:", err);
    return [];
  }
}
