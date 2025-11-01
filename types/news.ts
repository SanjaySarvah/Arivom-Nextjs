export interface NewsItem {
  id: string;
  title: string;
  tname: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  highlights: string;
  created_at: string;
  seotitle?: string;
  seodescription?: string;
  seokeywords?: string[];
}
