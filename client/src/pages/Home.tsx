import NewsList from '../components/NewsList';
import PartnersSection from '../components/PartnersSection';
import type { NewsArticle, Partner } from '../types';

const mockNews: NewsArticle[] = [
  {
    id: 1,
    title: 'Пример новости',
    excerpt: 'Краткое описание новости...',
    content: 'Полный текст новости.',
    publishedAt: new Date().toISOString(),
  },
];

const mockPartners: Partner[] = [
  { id: 1, name: 'Wiedergeburt.kz', logoUrl: '/partner1.png', websiteUrl: 'http://www.wiedergeburt.kz' },
  { id: 2, name: 'Wiedergeburt Pavlodar', logoUrl: '/partner2.png', websiteUrl: 'http://www.wiedergeburt-pavlodar.kz' },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Новости</h1>
      <NewsList articles={mockNews} />
      <h2 className="text-xl font-bold mt-10 mb-4">Партнёры</h2>
      <PartnersSection partners={mockPartners} />
    </div>
  );
}