import type { Partner } from '../types';

export default function PartnersSection({ partners }: { partners: Partner[] }) {
  return (
    <div className="flex gap-6 justify-center py-6">
      {partners.map((p) => (
        <a
          key={p.id}
          href={p.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-brass/40 rounded-md p-4 hover:border-brass hover:shadow-sm transition flex items-center justify-center bg-white/60"
        >
          <img src={p.logoUrl} alt={p.name} className="h-16 object-contain" />
        </a>
      ))}
    </div>
  );
}