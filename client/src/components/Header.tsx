import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b px-4 py-3 flex gap-4 flex-wrap">
      <Link to="/" className="font-bold">Возрождение</Link>
      <Link to="/about">О нас</Link>
      <Link to="/activities">Деятельность</Link>
      <Link to="/projects">Проекты</Link>
      <Link to="/gallery">Галерея</Link>
      <div className="relative group">
      <span className="cursor-pointer">История</span>
      <div className="absolute hidden group-hover:flex flex-col bg-white border shadow-md">
        <Link to="/history/germans-kz" className="px-3 py-2">Немцев в Казахстане</Link>
        <Link to="/history/organization" className="px-3 py-2">Организации</Link>
      </div>
    </div>
      <Link to="/contacts">Контакты</Link>
    </header>
  );
}