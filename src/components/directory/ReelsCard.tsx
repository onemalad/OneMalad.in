'use client';

import { useState, useRef } from 'react';
import { FiMapPin, FiStar, FiArrowRight, FiHeart } from 'react-icons/fi';
import { Business, categoryIcons } from '@/data/businesses';
import ActionRail from './ActionRail';

interface Props {
  business: Business;
  saved: boolean;
  onToggleSave: () => void;
  onOpenDetail: () => void;
}

export default function ReelsCard({ business, saved, onToggleSave, onOpenDetail }: Props) {
  const icon = categoryIcons[business.category] || '📌';
  const [burstKey, setBurstKey] = useState(0);
  const lastTap = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!saved) onToggleSave();
      setBurstKey((k) => k + 1);
    }
    lastTap.current = now;
  };

  const hasImage = Boolean(business.image);

  return (
    <section
      id={business.id}
      className="feed-item relative w-full h-[100dvh] overflow-hidden"
      onClick={handleTap}
    >
      {/* Visual layer */}
      <div className="absolute inset-0 overflow-hidden">
        {hasImage ? (
          <>
            <img
              src={business.image}
              alt={business.name}
              className="absolute inset-0 w-full h-full object-cover ken-burns"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.85) 100%)' }} />
          </>
        ) : (
          <div className={`absolute inset-0 cat-bg-${business.category}`}>
            {/* Animated bokeh glow dots for depth */}
            <div className="absolute top-[15%] left-[20%] w-48 h-48 rounded-full bg-white/10 blur-3xl bokeh-1" />
            <div className="absolute bottom-[25%] right-[15%] w-64 h-64 rounded-full bg-white/10 blur-3xl bokeh-2" />
            <div className="absolute top-[50%] left-[60%] w-32 h-32 rounded-full bg-white/15 blur-3xl bokeh-3" />
            {/* Big soft emoji as centerpiece */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[180px] opacity-25 select-none"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4))' }}
              >
                {icon}
              </span>
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)' }} />
          </div>
        )}
      </div>

      {/* Double-tap heart burst */}
      {burstKey > 0 && (
        <FiHeart
          key={burstKey}
          className="absolute top-1/2 left-1/2 text-[140px] text-rose-400 fill-rose-400 pointer-events-none animate-heart-burst"
          style={{ filter: 'drop-shadow(0 8px 30px rgba(244, 63, 94, 0.6))' }}
        />
      )}

      {/* Featured badge top */}
      {business.featured && (
        <div className="absolute top-[72px] left-4 z-20">
          <span className="badge-featured inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Right action rail */}
      <div
        className="absolute right-3 z-20"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 110px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <ActionRail business={business} saved={saved} onToggleSave={onToggleSave} />
      </div>

      {/* Bottom info card */}
      <div
        className="absolute left-3 right-20 z-20"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/80">
            <span>{icon} {business.category}</span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1">
              <FiStar className="fill-yellow-400 text-yellow-400" /> {business.rating}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-emerald-300 font-bold">{business.priceRange}</span>
          </div>

          <h2
            className="text-white font-extrabold text-[24px] leading-[1.15] tracking-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            {business.name}
          </h2>

          <p className="text-white/85 text-[14px] italic line-clamp-2" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
            {business.tagline}
          </p>

          <div className="flex items-center gap-1.5 text-[12px] text-white/70">
            <FiMapPin className="text-white/60" />
            <span>Malad · {business.area}</span>
          </div>

          <button
            onClick={onOpenDetail}
            className="btn-cta w-full h-12 rounded-2xl text-white font-bold text-[15px] flex items-center justify-center gap-2 mt-3 active:scale-[0.98] transition-transform"
          >
            Get Details
            <FiArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}
