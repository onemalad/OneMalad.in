'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { businesses as allBusinesses, type Business } from '@/data/businesses';
import { useAuth } from '@/context/AuthContext';
import FeedTopBar from './FeedTopBar';
import CategoryChips from './CategoryChips';
import ReelsCard from './ReelsCard';
import BusinessDetailSheet from './BusinessDetailSheet';

const SAVED_KEY = 'malad_saved_businesses';

export default function ReelsFeed() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [detailFor, setDetailFor] = useState<Business | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (raw) setSaved(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem(SAVED_KEY, JSON.stringify(Array.from(next))); } catch {}
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = allBusinesses.filter((b) => {
      const inCategory = activeCategory === 'all' || b.category === activeCategory;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.area.toLowerCase().includes(q)
      );
    });
    return list.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.rating - a.rating;
    });
  }, [activeCategory, search]);

  const handleAuthAction = async () => {
    if (user) {
      await logout();
      router.push('/');
    } else {
      router.push('/directory/login');
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      <FeedTopBar
        search={search}
        onSearchChange={setSearch}
        authLabel={user ? 'Sign Out' : 'Sign In'}
        onAuthAction={handleAuthAction}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((v) => !v)}
      />

      {/* Category chips — below top bar */}
      <div className="absolute left-0 right-0 z-20" style={{ top: showSearch ? 108 : 60 }}>
        <CategoryChips active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Feed */}
      {filtered.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-60">🔍</div>
            <h3 className="text-white font-bold text-lg mb-1">Nothing found</h3>
            <p className="text-white/60 text-sm">Try a different category or search</p>
          </div>
        </div>
      ) : (
        <div className="feed-scroll hide-scrollbar absolute inset-0 h-[100dvh] overflow-y-scroll">
          {filtered.map((b) => (
            <ReelsCard
              key={b.id}
              business={b}
              saved={saved.has(b.id)}
              onToggleSave={() => toggleSave(b.id)}
              onOpenDetail={() => setDetailFor(b)}
            />
          ))}
          {/* Tail card: end-of-feed message */}
          <div className="feed-item relative w-full h-[100dvh] flex items-center justify-center px-6">
            <div className="text-center max-w-xs">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-extrabold text-xl mb-2">That&apos;s all for now</h3>
              <p className="text-white/60 text-sm mb-6">
                You&apos;ve seen every local business we&apos;ve curated in Malad.
                New ones drop every week.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearch('');
                  document.querySelector('.feed-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-cta h-11 px-6 rounded-full text-white font-bold text-sm"
              >
                Back to the top
              </button>
            </div>
          </div>
        </div>
      )}

      {detailFor && <BusinessDetailSheet business={detailFor} onClose={() => setDetailFor(null)} />}
    </div>
  );
}
