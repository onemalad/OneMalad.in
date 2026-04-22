'use client';

import { useEffect } from 'react';
import { FiX, FiMapPin, FiPhone, FiClock, FiStar, FiInstagram, FiGlobe } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Business, categoryIcons } from '@/data/businesses';

interface Props {
  business: Business;
  onClose: () => void;
}

export default function BusinessDetailSheet({ business, onClose }: Props) {
  const icon = categoryIcons[business.category] || '📌';
  const waMsg = encodeURIComponent(
    `Hi! I found ${business.name} on OneMalad.in — wanted to know more.`
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        className="relative w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] animate-modal-in"
        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 flex justify-center pt-3 pb-1 sm:hidden" style={{ background: 'var(--bg-secondary)' }}>
          <span className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-surface flex items-center justify-center text-white active:scale-90 transition-all"
          aria-label="Close"
        >
          <FiX className="text-lg" />
        </button>

        {/* Hero */}
        <div className={`relative h-48 overflow-hidden ${!business.image ? `cat-bg-${business.category}` : ''}`}>
          {business.image ? (
            <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[120px] opacity-30">{icon}</span>
              </div>
            </>
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(20,20,22,1) 100%)' }} />
          <div className="absolute left-5 right-5 bottom-4">
            {business.featured && (
              <span className="badge-featured inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                ⭐ Featured
              </span>
            )}
            <h2 className="text-2xl font-extrabold leading-tight text-white tracking-tight">
              {business.name}
            </h2>
            <p className="text-sm text-white/80 italic">{business.tagline}</p>
          </div>
        </div>

        <div className="px-5 py-5 space-y-5">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <FiStar className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-white">{business.rating}</span>
            </div>
            <span className="text-white/30">·</span>
            <span className="font-bold text-emerald-300">{business.priceRange}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/70 capitalize">{icon} {business.category}</span>
          </div>

          <p className="text-[14.5px] leading-relaxed text-white/80">{business.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {business.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: 'var(--surface-elevated)', color: 'var(--text-secondary)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="rounded-2xl p-4 space-y-3"
            style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}
          >
            <Info icon={<FiMapPin />} text={business.address} />
            <Info icon={<FiClock />} text={business.timing} />
            {business.phone && (
              <Info
                icon={<FiPhone />}
                text={<a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="hover:underline text-emerald-300">{business.phone}</a>}
              />
            )}
            {business.instagram && (
              <Info icon={<FiInstagram />} text={business.instagram} />
            )}
            {business.website && (
              <Info
                icon={<FiGlobe />}
                text={<a href={business.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-300">Visit Website</a>}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {business.whatsapp && (
              <a
                href={`https://wa.me/${business.whatsapp}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm active:scale-[0.98] transition-transform"
                style={{ background: 'var(--accent-whatsapp)' }}
              >
                <FaWhatsapp className="text-lg" />
                WhatsApp
              </a>
            )}
            {business.phone && (
              <a
                href={`tel:${business.phone.replace(/\s+/g, '')}`}
                className="h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm active:scale-[0.98] transition-transform"
                style={{ background: 'var(--accent-call)', color: '#041816' }}
              >
                <FiPhone className="text-lg" />
                Call
              </a>
            )}
          </div>

          {business.menuHighlights && business.menuHighlights.length > 0 && (
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-3">
                {business.category === 'gym' ? 'Plans & Pricing' : 'Menu Highlights'}
              </h3>
              <div className="space-y-1.5">
                {business.menuHighlights.map((item) => {
                  const parts = item.split(' - ');
                  return (
                    <div
                      key={item}
                      className="flex items-center justify-between py-2.5 px-4 rounded-xl text-[13.5px]"
                      style={{ background: 'var(--surface-elevated)' }}
                    >
                      <span className="text-white/85">{parts[0]}</span>
                      {parts[1] && <span className="font-bold text-orange-400">{parts[1]}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-[13.5px]">
      <span className="mt-0.5 text-orange-400">{icon}</span>
      <span className="text-white/80">{text}</span>
    </div>
  );
}
