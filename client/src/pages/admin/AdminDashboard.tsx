import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNews, createNews, updateNews, deleteNews, uploadImages } from '../../lib/api';
import type { NewsArticle } from '../../types';

export default function AdminDashboard() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', images: [] as string[] });
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
      return;
    }
    loadNews();
  }, []);

  async function loadNews() {
    const data = await fetchNews();
    setNews(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      await updateNews(editingId, form);
    } else {
      await createNews(form);
    }
    setForm({ title: '', excerpt: '', content: '', images: [] });
    setEditingId(null);
    loadNews();
  }

  function startEdit(article: NewsArticle) {
    setEditingId(article.id);
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      images: article.images,
    });
  }

  async function handleDelete(id: number) {
    if (!confirm('Удалить новость?')) return;
    await deleteNews(id);
    loadNews();
  }

  function logout() {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Панель администратора</h1>
        <button onClick={logout} className="text-sm text-red-500">Выйти</button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8 border rounded-lg p-4">
        <input
          placeholder="Заголовок"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded p-2"
          required
        />
        <input
          placeholder="Краткое описание"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="border rounded p-2"
          required
        />
        <textarea
          placeholder="Полный текст"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border rounded p-2"
          rows={4}
          required
        />
        <div className="flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files || []);
            if (files.length === 0) return;
            setUploading(true);
            try {
              const { urls } = await uploadImages(files);
              setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
            } catch (err) {
              console.error(err);
            } finally {
              setUploading(false);
            }
          }}
        />
        {uploading && <span className="text-sm text-gray-500">Загрузка...</span>}
        <div className="flex gap-2 flex-wrap">
          {form.images.map((url) => (
            <img key={url} src={url} className="h-16 object-contain border rounded" />
          ))}
        </div>
        <button type="submit" className="bg-black text-white rounded p-2">
          {editingId ? 'Сохранить изменения' : 'Добавить новость'}
        </button>
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {news.map((article) => (
          <div key={article.id} className="border rounded-lg p-4 flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.excerpt}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(article)} className="text-sm text-blue-500">Ред.</button>
              <button onClick={() => handleDelete(article.id)} className="text-sm text-red-500">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}