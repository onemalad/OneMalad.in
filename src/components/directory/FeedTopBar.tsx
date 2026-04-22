'use client';

import Link from 'next/link';
import { FiSearch, FiX } from 'react-icons/fi';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onSignOut: () => void;
  showSearch: boolean;
  onToggleSearch: () => void;
}

export default function FeedTopBar({ search, onSearchChange, onSignOut, showSearch, onToggleSearch }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 pt-safe">
      <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2">
        <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-[13px] shadow-lg shadow-emerald-500/30">
            1
          </div>
          <div className="leading-tight">
            <div className="text-white font-black text-[15px] tracking-tight drop-shadow">
              malad<span className="text-orange-400">.in</span>
            </div>
            <div className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/50">
              Local Directory
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSearch}
            aria-label={showSearch ? 'Close search' : 'Open search'}
            className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-white active:scale-90 transition-all"
          >
            {showSearch ? <FiX className="text-lg" /> : <FiSearch className="text-lg" />}
          </button>
          <button
            onClick={onSignOut}
            className="text-[11px] font-semibold text-white/70 hover:text-white uppercase tracking-wider px-2"
          >
            Sign Out
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="px-4 pb-3">
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 text-sm" />
            <input
              autoFocus
              type="text"
              placeholder="Search businesses, food, places..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full glass-surface pl-10 pr-4 h-11 rounded-full text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
            />
          </div>
        </div>
      )}
    </div>
  );
}
