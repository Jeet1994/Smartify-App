
export interface NewsArticle {
  headline: string;
  summary: string;
}

export interface NewsCategory {
  categoryName: string;
  news: NewsArticle[];
}
