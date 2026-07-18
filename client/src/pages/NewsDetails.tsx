import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsById } from '../lib/api';
import type { NewsArticle } from '../types';

export default function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsById(Number(id))
      .then((data) => {
        setArticle(data);
        setActiveImage(data.images?.[0] || null);
      })
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12">Загрузка...</div>;
  if (!article) return <div className="max-w-3xl mx-auto px-4 py-12">Новость не найдена.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-blue text-sm font-bold hover:underline">← Назад к новостям</Link>
      <h1 className="text-3xl font-black text-ink mt-4">{article.title}</h1>
      <span className="text-sm text-gold font-bold block mt-2">
        {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
      </span>

      {activeImage && (
        <img src={activeImage} alt={article.title} className="w-full rounded-xl mt-6 max-h-[480px] object-cover" />
      )}

      {article.images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {article.images.map((url) => (
            <button
              key={url}
              onClick={() => setActiveImage(url)}
              className={`shrink-0 rounded-lg overflow-hidden border-2 transition ${
                activeImage === url ? 'border-gold' : 'border-transparent'
              }`}
            >
              <img src={url} className="h-16 w-16 object-cover" />
            </button>
          ))}
        </div>
      )}

      <div
        className="text-ink/80 leading-relaxed mt-6 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}