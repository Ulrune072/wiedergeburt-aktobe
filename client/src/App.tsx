import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Activities from './pages/Activities';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import HistoryGermanyKz from './pages/history/HistoryGermanyKz';
import HistoryOrg from './pages/history/HistoryOrg';
import Contacts from './pages/Contacts';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/history/germans-kz" element={<HistoryGermanyKz />} />
          <Route path="/history/organization" element={<HistoryOrg />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}