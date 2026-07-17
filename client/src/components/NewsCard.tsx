import type { NewsArticle } from '../types';

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{article.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{article.excerpt}</p>
        <span className="text-xs text-gray-400 mt-2 block">
          {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
        </span>
      </div>
    </div>
  );
}