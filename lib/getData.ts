import news from "../data/news.json";
import articles from "../data/articles.json";
import newsvideos from "../data/newsvideos.json"; // ✅ NEW import

// --------------------
// Type Definitions
// --------------------
export type Comment = {
  UserName: string;
  ProfileImage: string;
  comment: string;
  sub_comments?: Comment[];
};

export type NewsItem = {
  id: number;
  title: string;
  category: string;
  tname?: string;
  subcategory?: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  created_at: string;
  days_ago: number;
  likes?: number;
  totalComments?: number;
  comments?: Comment[];
};

export type ArticleItem = {
  id: number;
  title: string;
  category: string;
  tname?: string;
  subcategory?: string;
  subsubcategory?: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  created_at: string;
  days_ago: number;
  likes?: number;
  totalComments?: number;
  comments?: Comment[];
};

// ✅ NEW: News Video Type
export type NewsVideoItem = {
  id: number;
  title: string;
  category: string;
  tname?: string;
  excerpt: string;
  content: string;
  videoUrl: string;
  thumbnail: string;
  author: string;
  slug: string;
  created_at: string;
  days_ago: number;
  likes?: number;
  totalComments?: number;
  comments?: Comment[];
};

// --------------------
// NEWS ACCESSORS
// --------------------
export const getAllNews = (): NewsItem[] => news as NewsItem[];

export const getNewsByCategory = (cat: string): NewsItem[] =>
  (news as NewsItem[]).filter(
    (n) => n.category.toLowerCase() === cat.toLowerCase()
  );

export const getNewsBySubcategory = (subcat: string): NewsItem[] =>
  (news as NewsItem[]).filter(
    (n) => n.subcategory?.toLowerCase() === subcat.toLowerCase()
  );

export const getNewsById = (id: number): NewsItem | undefined =>
  (news as NewsItem[]).find((n) => n.id === id);

export const getNewsBySlug = (slug: string): NewsItem | undefined =>
  (news as NewsItem[]).find((n) => n.slug === slug);

export const getLatestNews = (limit?: number): NewsItem[] => {
  const sorted = (news as NewsItem[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

// --------------------
// ARTICLES ACCESSORS
// --------------------
export const getAllArticles = (): ArticleItem[] => articles as ArticleItem[];

export const getArticleByCategory = (cat: string): ArticleItem[] =>
  (articles as ArticleItem[]).filter(
    (a) => a.category.toLowerCase() === cat.toLowerCase()
  );

export const getArticleBySubcategory = (subcat: string): ArticleItem[] =>
  (articles as ArticleItem[]).filter(
    (a) => a.subcategory?.toLowerCase() === subcat.toLowerCase()
  );

export const getArticleBySubsubcategory = (subsubcat: string): ArticleItem[] =>
  (articles as ArticleItem[]).filter(
    (a) => a.subsubcategory?.toLowerCase() === subsubcat.toLowerCase()
  );

export const getArticleById = (id: number): ArticleItem | undefined =>
  (articles as ArticleItem[]).find((a) => a.id === id);

export const getArticleBySlug = (slug: string): ArticleItem | undefined =>
  (articles as ArticleItem[]).find((a) => a.slug === slug);

export const getLatestArticles = (limit?: number): ArticleItem[] => {
  const sorted = (articles as ArticleItem[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

// --------------------
// NEWS VIDEOS ACCESSORS ✅
// --------------------
export const getAllNewsVideos = (): NewsVideoItem[] =>
  newsvideos as NewsVideoItem[];

export const getNewsVideoByCategory = (cat: string): NewsVideoItem[] =>
  (newsvideos as NewsVideoItem[]).filter(
    (v) => v.category.toLowerCase() === cat.toLowerCase()
  );

export const getNewsVideoById = (id: number): NewsVideoItem | undefined =>
  (newsvideos as NewsVideoItem[]).find((v) => v.id === id);

export const getNewsVideoBySlug = (slug: string): NewsVideoItem | undefined =>
  (newsvideos as NewsVideoItem[]).find((v) => v.slug === slug);

export const getLatestNewsVideos = (limit?: number): NewsVideoItem[] => {
  const sorted = (newsvideos as NewsVideoItem[]).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

// --------------------
// UTILITY FUNCTIONS
// --------------------
export const getItemsByAuthor = (
  author: string
): (NewsItem | ArticleItem | NewsVideoItem)[] => {
  const newsByAuthor = (news as NewsItem[]).filter((n) =>
    n.author.toLowerCase().includes(author.toLowerCase())
  );
  const articlesByAuthor = (articles as ArticleItem[]).filter((a) =>
    a.author.toLowerCase().includes(author.toLowerCase())
  );
  const videosByAuthor = (newsvideos as NewsVideoItem[]).filter((v) =>
    v.author.toLowerCase().includes(author.toLowerCase())
  );
  return [...newsByAuthor, ...articlesByAuthor, ...videosByAuthor];
};

export const searchItems = (
  query: string
): (NewsItem | ArticleItem | NewsVideoItem)[] => {
  const searchLower = query.toLowerCase();

  const newsResults = (news as NewsItem[]).filter(
    (n) =>
      n.title.toLowerCase().includes(searchLower) ||
      n.content.toLowerCase().includes(searchLower) ||
      n.excerpt.toLowerCase().includes(searchLower)
  );

  const articleResults = (articles as ArticleItem[]).filter(
    (a) =>
      a.title.toLowerCase().includes(searchLower) ||
      a.content.toLowerCase().includes(searchLower) ||
      a.excerpt.toLowerCase().includes(searchLower)
  );

  const videoResults = (newsvideos as NewsVideoItem[]).filter(
    (v) =>
      v.title.toLowerCase().includes(searchLower) ||
      v.content.toLowerCase().includes(searchLower) ||
      v.excerpt.toLowerCase().includes(searchLower)
  );

  return [...newsResults, ...articleResults, ...videoResults];
};

// --------------------
// TRANSFORM FOR GENERALPOST COMPONENT
// --------------------
export type GeneralPostItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  image: string;
  badge: string;
};

export const transformToGeneralPost = (
  items: (NewsItem | ArticleItem | NewsVideoItem)[]
): GeneralPostItem[] => {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.excerpt,
    category: item.category,
    author: item.author,
    date: item.created_at,
    image: "thumbnail" in item ? item.thumbnail : (item as any).image,
    badge: item.days_ago <= 1 ? "TRENDING" : item.days_ago <= 3 ? "HOT" : "NEWS",
  }));
};

// --------------------
// ✅ CATEGORY HELPERS FOR ARTICLES
// --------------------

// ✅ Get unique main categories
export const getArticleCategories = (): {
  category: string;
  tname?: string;
}[] => {
  const seen = new Set<string>();
  const categories = (articles as ArticleItem[])
    .filter((a) => {
      if (!a.category || seen.has(a.category.toLowerCase())) return false;
      seen.add(a.category.toLowerCase());
      return true;
    })
    .map((a) => ({
      category: a.category,
      tname: a.tname || a.category,
    }));
  return categories;
};

// ✅ Get unique subcategories for a given category
export const getArticleSubcategories = (
  category: string
): {
  subcategory: string;
  tname?: string;
}[] => {
  const seen = new Set<string>();
  const subcategories = (articles as ArticleItem[])
    .filter(
      (a) =>
        a.category.toLowerCase() === category.toLowerCase() && a.subcategory
    )
    .filter((a) => {
      if (seen.has(a.subcategory!.toLowerCase())) return false;
      seen.add(a.subcategory!.toLowerCase());
      return true;
    })
    .map((a) => ({
      subcategory: a.subcategory!,
      tname: a.tname || a.subcategory!,
    }));
  return subcategories;
};

// ✅ Get unique sub-subcategories for a given subcategory
export const getArticleSubsubcategories = (
  subcategory: string
): {
  subsubcategory: string;
  tname?: string;
}[] => {
  const seen = new Set<string>();
  const subsubcategories = (articles as ArticleItem[])
    .filter(
      (a) =>
        a.subcategory?.toLowerCase() === subcategory.toLowerCase() &&
        a.subsubcategory
    )
    .filter((a) => {
      if (seen.has(a.subsubcategory!.toLowerCase())) return false;
      seen.add(a.subsubcategory!.toLowerCase());
      return true;
    })
    .map((a) => ({
      subsubcategory: a.subsubcategory!,
      tname: a.tname || a.subsubcategory!,
    }));
  return subsubcategories;
};
