// types/index.ts
export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
}

export interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}