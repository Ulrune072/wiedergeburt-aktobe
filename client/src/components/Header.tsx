import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-blue z-20 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
        <img 
          src={logo} 
          alt="Company Logo" 
          // h-8 sets a fixed height, w-auto keeps the aspect ratio
          className="h-12 w-12 rounded-full object-cover border-2 border-blue-500 shadow-sm" 
        />
          <span className="font-black text-white text-lg tracking-tight">Актюбинское областное общество немцев "Возрождение"</span>
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

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Меню"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-blue border-t border-white/10 px-4 py-3 flex flex-col gap-1 text-sm font-bold uppercase tracking-wide">
          <Link to="/about" onClick={() => setMenuOpen(false)} className="py-2.5 text-white/80 hover:text-white">О нас</Link>
          <Link to="/activities" onClick={() => setMenuOpen(false)} className="py-2.5 text-white/80 hover:text-white">Деятельность</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)} className="py-2.5 text-white/80 hover:text-white">Проекты</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)} className="py-2.5 text-white/80 hover:text-white">Галерея</Link>
          <Link to="/history/germans-kz" onClick={() => setMenuOpen(false)} className="py-2.5 text-white/80 hover:text-white">История немцев в Казахстане</Link>
          <Link to="/history/organization" onClick={() => setMenuOpen(false)} className="py-2.5 text-white/80 hover:text-white">История организации</Link>
          <Link to="/contacts" onClick={() => setMenuOpen(false)} className="py-2.5 text-white/80 hover:text-white">Контакты</Link>
        </nav>
      )}
    </header>
  );
}