'use client';

import { FiHeart, FiPhone, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { Business } from '@/data/businesses';

interface Props {
  business: Business;
  saved: boolean;
  onToggleSave: () => void;
}

export default function ActionRail({ business, saved, onToggleSave }: Props) {
  const waMessage = encodeURIComponent(
    `Hi! I found ${business.name} on OneMalad.in — wanted to ask about your services/menu.`
  );
  const waUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${waMessage}`
    : null;
  const telUrl = business.phone ? `tel:${business.phone.replace(/\s+/g, '')}` : null;

  const share = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/directory#${business.id}` : '';
    if (navigator.share) {
      try {
        await navigator.share({ title: business.name, text: business.tagline, url });
      } catch { /* user cancelled */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center select-none">
      <button
        onClick={onToggleSave}
        aria-label={saved ? 'Unsave' : 'Save'}
        className="flex flex-col items-center gap-1 group"
      >
        <span
          className={`w-12 h-12 rounded-full glass-surface flex items-center justify-center transition-all active:scale-90 ${
            saved ? 'text-rose-400' : 'text-white'
          }`}
        >
          <FiHeart className={`text-2xl transition-all ${saved ? 'fill-rose-400' : ''}`} />
        </span>
        <span className="text-[11px] font-semibold text-white/80 drop-shadow">
          {saved ? 'Saved' : 'Save'}
        </span>
      </button>

      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message on WhatsApp"
          className="flex flex-col items-center gap-1"
        >
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center text-white active:scale-90 transition-all"
            style={{ background: 'var(--accent-whatsapp)', boxShadow: '0 8px 24px -6px rgba(37, 211, 102, 0.5)' }}
          >
            <FaWhatsapp className="text-2xl" />
          </span>
          <span className="text-[11px] font-semibold text-white/80 drop-shadow">WhatsApp</span>
        </a>
      )}

      {telUrl && (
        <a
          href={telUrl}
          aria-label="Call"
          className="flex flex-col items-center gap-1"
        >
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center text-[#041816] active:scale-90 transition-all"
            style={{ background: 'var(--accent-call)', boxShadow: '0 8px 24px -6px rgba(78, 205, 196, 0.5)' }}
          >
            <FiPhone className="text-xl" />
          </span>
          <span className="text-[11px] font-semibold text-white/80 drop-shadow">Call</span>
        </a>
      )}

      <button
        onClick={share}
        aria-label="Share"
        className="flex flex-col items-center gap-1"
      >
        <span className="w-12 h-12 rounded-full glass-surface flex items-center justify-center text-white active:scale-90 transition-all">
          <FiShare2 className="text-xl" />
        </span>
        <span className="text-[11px] font-semibold text-white/80 drop-shadow">Share</span>
      </button>
    </div>
  );
}
