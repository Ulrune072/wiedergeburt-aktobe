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
          className="border rounded-lg p-4 hover:shadow-md transition flex items-center justify-center"
        >
          <img src={p.logoUrl} alt={p.name} className="h-16 object-contain" />
        </a>
      ))}
    </div>
  );
}