import news from "../data/news.json";
import articles from "../data/articles.json";

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
  tname?: string; // optional Tamil name
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
  tname?: string; // optional Tamil name
  subcategory?: string;
  subsubcategory?: string; // ✅ NEW field for deeper hierarchy
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
// UTILITY FUNCTIONS
// --------------------
export const getItemsByAuthor = (
  author: string
): (NewsItem | ArticleItem)[] => {
  const newsByAuthor = (news as NewsItem[]).filter((n) =>
    n.author.toLowerCase().includes(author.toLowerCase())
  );
  const articlesByAuthor = (articles as ArticleItem[]).filter((a) =>
    a.author.toLowerCase().includes(author.toLowerCase())
  );
  return [...newsByAuthor, ...articlesByAuthor];
};

export const searchItems = (query: string): (NewsItem | ArticleItem)[] => {
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

  return [...newsResults, ...articleResults];
};
