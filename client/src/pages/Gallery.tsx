import { useEffect, useState } from 'react';
import { fetchGallery } from '../lib/api';
import type { GalleryImage } from '../types';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery().then(setImages);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-ink mb-6">Галерея</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img) => (
          <button key={img.id} onClick={() => setActive(img.url)}>
            <img src={img.url} className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition" />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setActive(null)}
        >
          <img src={active} className="max-h-[90vh] max-w-full rounded-lg" />
        </div>
      )}
    </div>
  );
}