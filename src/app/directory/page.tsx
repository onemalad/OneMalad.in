'use client';

import Link from 'next/link';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { businesses } from '@/data/businesses';
import ReelsFeed from '@/components/directory/ReelsFeed';

export default function DirectoryPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-orange-400 animate-spin" />
      </div>
    );
  }

  if (!user) return <AuthGate />;

  return <ReelsFeed />;
}

function AuthGate() {
  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden flex flex-col"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Ambient gradient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-40 blur-3xl" style={{ background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, #b06ab3 0%, transparent 70%)' }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <Link href="/" className="mb-10 flex items-center gap-2.5 active:scale-95 transition-transform">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-emerald-500/30">
            1
          </div>
          <div className="leading-tight text-left">
            <div className="text-white font-black text-base tracking-tight">
              malad<span className="text-orange-400">.in</span>
            </div>
            <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/50">
              Local Directory
            </div>
          </div>
        </Link>

        <div className="max-w-sm">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 glass-surface text-orange-400">
            <FiLock className="text-2xl" />
          </div>

          <h1 className="text-white font-extrabold text-[28px] leading-tight tracking-tight mb-3">
            Malad, on loop.
          </h1>
          <p className="text-white/70 text-[14.5px] leading-relaxed mb-8">
            Scroll through {businesses.length}+ hand-picked local businesses — food, cafes, salons, gyms, and more. Save your favourites. Message them on WhatsApp in one tap.
          </p>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/directory/signup"
              className="btn-cta h-12 rounded-2xl inline-flex items-center justify-center gap-2 text-white font-bold text-[15px]"
            >
              Create Free Account
              <FiArrowRight />
            </Link>
            <Link
              href="/directory/login"
              className="h-12 rounded-2xl glass-surface inline-flex items-center justify-center text-white font-semibold text-[15px] active:scale-[0.98] transition-transform"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-8 text-white/40 text-[11px] uppercase tracking-widest font-semibold">
            Free · No spam · 30-second signup
          </p>
        </div>
      </div>
    </div>
  );
}
