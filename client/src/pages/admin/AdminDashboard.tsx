import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchNews, createNews, updateNews, deleteNews, uploadImages,
  fetchGallery, addGalleryImage, deleteGalleryImage,
} from '../../lib/api';
import type { NewsArticle, GalleryImage } from '../../types';
import RichTextEditor from '../../components/RichTextEditor';

export default function AdminDashboard() {
  const [tab, setTab] = useState<'news' | 'gallery'>('news');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', images: [] as string[] });
  const [uploading, setUploading] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin/login');
      return;
    }
    loadNews();
    loadGallery();
  }, []);

  async function loadNews() { setNews(await fetchNews()); }
  async function loadGallery() { setGallery(await fetchGallery()); }

  function resetForm() {
    setForm({ title: '', excerpt: '', content: '', images: [] });
    setEditingId(null);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      await updateNews(editingId, form);
    } else {
      await createNews(form);
    }
    resetForm();
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
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm('Удалить новость?')) return;
    await deleteNews(id);
    loadNews();
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const { urls } = await uploadImages(files);
      await Promise.all(urls.map((url) => addGalleryImage(url)));
      loadGallery();
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryDelete(id: number) {
    if (!confirm('Удалить фото?')) return;
    await deleteGalleryImage(id);
    loadGallery();
  }

  const isDirty =
    form.title !== '' || form.excerpt !== '' || form.content !== '' || form.images.length > 0;

  function attemptClose() {
    if (isDirty) {
      setShowDiscardConfirm(true);
      return;
    }
    resetForm();
  }

  function confirmDiscard() {
    setShowDiscardConfirm(false);
    resetForm();
  }

  function handleBackdropClick() {
    attemptClose();
  }

  function logout() {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-black text-ink">Панель администратора</h1>
        <button onClick={logout} className="text-sm text-red-500 font-bold">Выйти</button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-ink/10">
        <button onClick={() => setTab('news')}
          className={`px-4 py-2 text-sm font-bold ${tab === 'news' ? 'border-b-2 border-blue text-blue' : 'text-ink/50'}`}>
          Новости
        </button>
        <button onClick={() => setTab('gallery')}
          className={`px-4 py-2 text-sm font-bold ${tab === 'gallery' ? 'border-b-2 border-blue text-blue' : 'text-ink/50'}`}>
          Галерея
        </button>
      </div>

      {tab === 'news' && (
        <>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mb-6 bg-blue text-white font-bold rounded-full px-5 py-2.5 hover:bg-blue/90 transition"
            >
              + Новая новость
            </button>
          )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-3 border border-ink/10 rounded-xl p-5 bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-black text-ink">
              {editingId ? 'Редактировать новость' : 'Новая новость'}
            </h2>
            <input
              placeholder="Заголовок"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border rounded-lg p-2.5"
              required
            />
            <input
              placeholder="Краткое описание"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="border rounded-lg p-2.5"
              required
            />
            <RichTextEditor
              content={form.content}
              onChange={(html) => setForm((f) => ({ ...f, content: html }))}
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
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue text-white font-bold rounded-lg px-4 py-2.5 flex-1">
                {editingId ? 'Сохранить изменения' : 'Опубликовать'}
              </button>
              <button type="button" onClick={attemptClose} className="border rounded-lg px-4 py-2.5 text-ink/60">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-black text-ink text-lg mb-2">Отменить изменения?</h3>
            <p className="text-ink/60 text-sm mb-5">Несохранённые изменения будут потеряны.</p>
            <div className="flex gap-2">
              <button
                onClick={confirmDiscard}
                className="flex-1 bg-red-500 text-white text-sm font-bold rounded-lg px-3 py-1.0 hover:bg-red-600 transition"
              >
                Отменить изменения
              </button>
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="flex-1 border border-ink/20 rounded-lg px-3 py-1.0 text-sm text-ink/70 hover:bg-ink/5 transition"
              >
                Продолжить редактирование
              </button>
            </div>
          </div>
        </div>
      )}

          <div className="flex flex-col gap-3">
            {news.map((article) => (
              <div key={article.id} className="border border-ink/10 rounded-xl p-4 flex justify-between items-start bg-white">
                <div>
                  <h3 className="font-bold text-ink">{article.title}</h3>
                  <p className="text-sm text-ink/60">{article.excerpt}</p>
                </div>
                <div className="flex gap-3 shrink-0 ml-4">
                  <button onClick={() => startEdit(article)} className="text-sm text-blue font-bold">Ред.</button>
                  <button onClick={() => handleDelete(article.id)} className="text-sm text-red-500 font-bold">Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'gallery' && (
        <>
          <div className="border border-ink/10 rounded-xl p-4 mb-6 bg-white">
            <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
            {uploading && <span className="text-sm text-gray-500 block mt-2">Загрузка...</span>}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {gallery.map((img) => (
              <div key={img.id} className="relative group">
                <img src={img.url} className="w-full h-24 object-cover rounded-lg" />
                <button
                  onClick={() => handleGalleryDelete(img.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}