import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 bg-navy z-20 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-md">
            <span className="text-navy font-black text-base">W</span>
          </div>
          <span className="font-black text-white text-lg tracking-tight">Wiedergeburt</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-bold uppercase tracking-wide">
          <Link to="/about" className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">О нас</Link>
          <Link to="/activities" className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">Деятельность</Link>
          <Link to="/projects" className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">Проекты</Link>
          <Link to="/gallery" className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">Галерея</Link>
          <div className="relative group">
            <span className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer inline-block">История</span>
            <div className="absolute top-full pt-2 hidden group-hover:block normal-case font-normal tracking-normal">
              <div className="flex flex-col bg-white border border-ink/10 shadow-xl rounded-xl min-w-56 py-2 overflow-hidden">
                <Link to="/history/germans-kz" className="px-4 py-2.5 text-sm text-ink hover:bg-blue-light/50 transition">Немцев в Казахстане</Link>
                <Link to="/history/organization" className="px-4 py-2.5 text-sm text-ink hover:bg-blue-light/50 transition">Организации</Link>
              </div>
            </div>
          </div>
          <Link to="/contacts" className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition">Контакты</Link>
        </nav>
      </div>
    </header>
  );
}