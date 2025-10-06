import news from '../data/news.json'
import articles from '../data/articles.json'

export type NewsItem = {
  id: number
  title: string
  category: string
  excerpt: string
  content: string
}

export type ArticleItem = {
  id: number
  title: string
  category: string   // make it required if you want all articles categorized
  excerpt: string
  content: string
}

export const getAllNews = (): NewsItem[] => news as NewsItem[]

export const getNewsByCategory = (cat: string): NewsItem[] =>
  (news as NewsItem[]).filter(n => n.category.toLowerCase() === cat.toLowerCase())

export const getNewsById = (id: number): NewsItem | undefined =>
  (news as NewsItem[]).find(n => n.id === id)

export const getAllArticles = (): ArticleItem[] => articles as ArticleItem[]

export const getArticleByCategory = (cat: string): ArticleItem[] =>
  (articles as ArticleItem[]).filter(a => a.category.toLowerCase() === cat.toLowerCase())

export const getArticleById = (id: number): ArticleItem | undefined =>
  (articles as ArticleItem[]).find(a => a.id === id)
