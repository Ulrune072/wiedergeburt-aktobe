import { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import PartnersSection from '../components/PartnersSection';
import { fetchNews } from '../lib/api';
import type { NewsArticle, Partner } from '../types';

const partners: Partner[] = [
  { id: 1, name: 'Wiedergeburt.kz', logoUrl: '/partner1.png', websiteUrl: 'http://www.wiedergeburt.kz' },
  { id: 2, name: 'Wiedergeburt Pavlodar', logoUrl: '/partner2.png', websiteUrl: 'http://www.wiedergeburt-pavlodar.kz' },
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

  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-dark text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-start gap-4">
          <span className="text-gold text-sm font-bold uppercase tracking-widest">Актюбинское областное общество</span>
          <h1 className="text-3xl md:text-4xl font-black leading-tight max-w-2xl">
            Немецкое общество «Возрождение» — сохраняя язык, культуру и традиции
          </h1>
          <p className="text-white/70 max-w-xl">
            Курсы немецкого языка, культурные мероприятия и поддержка немецкой диаспоры в Актобе.
          </p>
        </div>
      </section>

      {/* News */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black mb-6">Новости</h2>
        {loading ? (
          <p className="text-ink/50">Загрузка...</p>
        ) : news.length === 0 ? (
          <p className="text-ink/50">Пока нет новостей.</p>
        ) : (
          <NewsList articles={news} />
        )}
      </section>

      {/* Partners */}
      <section className="bg-blue-light/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-6 text-center">Партнёры</h2>
          <PartnersSection partners={partners} />
        </div>
      </section>
    </div>
  );
}