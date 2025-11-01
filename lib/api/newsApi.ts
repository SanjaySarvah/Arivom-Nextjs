import { NewsItem } from "@/types/news";

const BASE_URL = "http://localhost/newsapi/news";

/**
 * Fetch all news items
 */
export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/get.php`);
    const data = await res.json();

    if (data.status === "success" && Array.isArray(data.news)) {
      return data.news;
    } else {
      console.error("Invalid API response:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching news:", err);
    return [];
  }
}

/**
 * Fetch single news item by ID
 */
export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  try {
    const news = await fetchAllNews();
    const item = news.find((n) => n.id === id);
    return item || null;
  } catch (err) {
    console.error("Error fetching news by ID:", err);
    return null;
  }
}
