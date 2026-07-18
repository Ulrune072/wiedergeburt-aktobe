import { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import PartnersSection from '../components/PartnersSection';
import { fetchNews } from '../lib/api';
import type { NewsArticle, Partner } from '../types';

  const partners: Partner[] = [
  { id: 1, name: 'Wiedergeburt.kz', logoUrl: '/partner1.png', websiteUrl: 'https://wiedergeburt-kasachstan.de/' },
  { id: 2, name: 'Daz Asia', logoUrl: '/partner2.png', websiteUrl: 'https://daz.asia/' },
  ];

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8">Загрузка...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Новости</h1>
      <NewsList articles={news} />
      <h2 className="text-xl font-bold mt-10 mb-4">Партнёры</h2>
      <PartnersSection partners={partners} />
    </div>
  );
}