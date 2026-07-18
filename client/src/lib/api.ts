const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchNews() {
  const res = await fetch(`${API_URL}/api/news`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

function authHeaders() {
  const token = localStorage.getItem('adminToken');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function createNews(data: { title: string; excerpt: string; content: string; imageUrl?: string }) {
  const res = await fetch(`${API_URL}/api/news`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create news');
  return res.json();
}

export async function updateNews(id: number, data: { title: string; excerpt: string; content: string; imageUrl?: string }) {
  const res = await fetch(`${API_URL}/api/news/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update news');
  return res.json();
}

export async function deleteNews(id: number) {
  const res = await fetch(`${API_URL}/api/news/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete news');
  return res.json();
}

export async function uploadImage(file: File) {
  const token = localStorage.getItem('adminToken');
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json() as Promise<{ url: string }>;
}