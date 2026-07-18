import type { NewsArticle } from '../types';

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="bg-white/60 border border-brass/30 rounded-md overflow-hidden hover:border-brass transition">
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-display font-bold text-lg">{article.title}</h3>
        <p className="text-sm text-ink/70 mt-1">{article.excerpt}</p>
        <span className="text-xs text-brick mt-3 block">
          {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
        </span>
      </div>
    </div>
  );
}