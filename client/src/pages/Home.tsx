import { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import PartnersSection from '../components/PartnersSection';
import { fetchNews } from '../lib/api';
import type { NewsArticle, Partner } from '../types';

const partners: Partner[] = [
  {
    id: 1,
    name: 'Wiedergeburt Kasachstan',
    logoUrl: 'http://wiedergeburt.kz/wp-content/uploads/2020/06/logo-official.jpg',
    websiteUrl: 'https://wiedergeburt-kasachstan.de',
  },
  {
    id: 2,
    name: 'DAZ — Deutsche Allgemeine Zeitung',
    logoUrl: 'https://daz.asia/wp-content/uploads/2018/06/daz_logo_again.png',
    websiteUrl: 'https://daz.asia',
  },
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
      <section className="bg-blue-light/30 py-0.5">
        <div className="max-w-4xl mx-auto px-2">
          <h2 className="text-2xl font-black mb-4 text-center">Партнёры</h2>
          <PartnersSection partners={partners} />
        </div>
      </section>
    </div>
  );
}