import type { NewsArticle } from '../types';
import NewsCard from './NewsCard';

export default function NewsList({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((a) => (
        <NewsCard key={a.id} article={a} />
      ))}
    </div>
  );
}