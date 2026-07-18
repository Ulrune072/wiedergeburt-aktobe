import { Link } from 'react-router-dom';
import type { NewsArticle } from '../types';

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      to={`/news/${article.id}`}
      className="block bg-white border border-ink/10 rounded-xl overflow-hidden hover:shadow-lg transition"
    >
    {article.images.length > 0 && (
      <img src={article.images[0]} alt={article.title} className="w-full h-40 object-cover" />
    )}
      <div className="p-4">
        <h3 className="font-black text-lg text-ink">{article.title}</h3>
        <p className="text-sm text-ink/60 mt-1">{article.excerpt}</p>
        <span className="text-xs text-gold font-bold mt-3 block">
          {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
        </span>
      </div>
    </Link>
  );
}