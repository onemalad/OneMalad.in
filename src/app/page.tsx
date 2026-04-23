'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FiArrowRight, FiArrowUpRight, FiMapPin, FiStar, FiCheck, FiMenu, FiX,
  FiChevronDown, FiHeart, FiPhone, FiUsers, FiZap, FiSearch,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { businesses, businessCategories, categoryIcons } from '@/data/businesses';

export default function HomePage() {
  return (
    <div className="directory-root min-h-screen" style={{ background: '#0a0a0b', color: '#ffffff' }}>
      <DarkNav />
      <Hero />
      <FeedPreview />
      <CategoriesStrip />
      <FeaturedCarousel />
      <ForBusinessesSection />
      <CommunityStrip />
      <DarkFooter />
    </div>
  );
}

/* ---------------- NAV ---------------- */

function DarkNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const communityLinks = [
    { href: '/our-work', label: 'Our Work' },
    { href: '/wards', label: 'Wards' },
    { href: '/events', label: 'Events' },
    { href: '/helplines', label: 'Helplines' },
    { href: '/blood-donors', label: 'Blood Donors' },
    { href: '/corporators', label: 'Corporators' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/volunteer', label: 'Volunteer' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-surface border-b' : 'bg-transparent border-b border-transparent'
      }`}
      style={scrolled ? { borderColor: 'rgba(255,255,255,0.08)' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg"
              style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)', boxShadow: '0 8px 24px -8px rgba(255,107,53,0.5)' }}
            >
              1
            </div>
            <div className="leading-tight">
              <div className="text-white font-black text-[17px] tracking-tight">
                One<span className="text-orange-400">Malad</span>
              </div>
              <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/50">
                Local Directory
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/directory" className="px-3.5 h-9 flex items-center text-[14px] font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Discover
            </Link>
            <Link href="/list-business" className="px-3.5 h-9 flex items-center text-[14px] font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              For Businesses
            </Link>
            <div className="relative" onMouseEnter={() => setCommunityOpen(true)} onMouseLeave={() => setCommunityOpen(false)}>
              <button className="px-3.5 h-9 flex items-center gap-1 text-[14px] font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                Community <FiChevronDown className={`text-sm transition-transform ${communityOpen ? 'rotate-180' : ''}`} />
              </button>
              {communityOpen && (
                <div className="absolute top-full right-0 pt-2 w-56">
                  <div className="glass-surface rounded-xl overflow-hidden py-1.5" style={{ background: 'rgba(20,20,22,0.9)' }}>
                    {communityLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="block px-4 py-2 text-[13.5px] text-white/80 hover:text-white hover:bg-white/5 transition-all">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/list-business"
              className="ml-2 px-4 h-9 rounded-full text-[13.5px] font-bold text-white btn-cta flex items-center gap-1.5 active:scale-95"
            >
              List Your Business <FiArrowRight className="text-sm" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white glass-surface rounded-full"
            aria-label="Menu"
          >
            {mobileOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1">
            <Link href="/directory" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-white/90 font-semibold text-[14px] hover:bg-white/5">Discover</Link>
            <Link href="/list-business" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-white/90 font-semibold text-[14px] hover:bg-white/5">For Businesses</Link>
            <div className="px-3 pt-2 text-[11px] uppercase tracking-widest font-bold text-white/40">Community</div>
            {communityLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-white/70 text-[13.5px] hover:bg-white/5 hover:text-white">
                {l.label}
              </Link>
            ))}
            <Link
              href="/list-business"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 btn-cta h-11 rounded-full text-center leading-[44px] text-white font-bold text-[14px]"
            >
              List Your Business
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phrases = ['cafes.', 'waffles.', 'salons.', 'gyms.', 'biryani.', 'everything.'];

  useEffect(() => {
    const t = setInterval(() => setPhraseIdx((i) => (i + 1) % phrases.length), 2200);
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <section className="relative min-h-[100dvh] pt-28 pb-16 overflow-hidden flex items-center">
      {/* Ambient glows */}
      <div className="absolute -top-20 -left-20 w-[55%] h-[55%] rounded-full blur-3xl opacity-40 bokeh-1"
        style={{ background: 'radial-gradient(circle, #ff6b35 0%, transparent 65%)' }} />
      <div className="absolute -bottom-10 -right-10 w-[60%] h-[60%] rounded-full blur-3xl opacity-30 bokeh-2"
        style={{ background: 'radial-gradient(circle, #b06ab3 0%, transparent 65%)' }} />
      <div className="absolute top-[30%] right-[10%] w-64 h-64 rounded-full blur-3xl opacity-25 bokeh-3"
        style={{ background: 'radial-gradient(circle, #f5c451 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface text-[11px] uppercase tracking-[0.18em] font-bold text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {businesses.length}+ local businesses · Malad
            </div>
            <h1 className="font-black text-[44px] sm:text-[58px] lg:text-[72px] leading-[0.95] tracking-[-0.03em] text-white">
              Scroll your<br />neighborhood for
              <br />
              <span
                key={phraseIdx}
                className="inline-block bg-clip-text text-transparent animate-fade-in-up"
                style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #f5c451 100%)' }}
              >
                {phrases[phraseIdx]}
              </span>
            </h1>
            <p className="mt-6 text-white/70 text-[16px] sm:text-[17px] leading-relaxed max-w-[520px]">
              TikTok-style discovery for Malad. Swipe through hand-picked cafes, salons, gyms,
              and hidden gems. Save favourites. Message them on WhatsApp in one tap.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/directory"
                className="btn-cta h-14 px-7 rounded-full text-white font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                Start Exploring <FiArrowRight className="text-lg" />
              </Link>
              <Link
                href="/list-business"
                className="h-14 px-7 rounded-full glass-surface text-white font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                List your business <FiArrowUpRight />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-5 text-[12px] text-white/50">
              <span className="flex items-center gap-1.5"><FiCheck className="text-emerald-400" /> Free for users</span>
              <span className="flex items-center gap-1.5"><FiCheck className="text-emerald-400" /> Hyper-local</span>
              <span className="flex items-center gap-1.5"><FiCheck className="text-emerald-400" /> WhatsApp ready</span>
            </div>
          </div>

          {/* Phone mockup preview */}
          <PhonePreview />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[11px] uppercase tracking-[0.2em] font-semibold flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '2.4s' }}>
        Scroll
        <span className="w-px h-6 bg-white/30" />
      </div>
    </section>
  );
}

function PhonePreview() {
  const picks = businesses.filter((b) => b.featured).slice(0, 3);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (picks.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % picks.length), 3200);
    return () => clearInterval(t);
  }, [picks.length]);
  if (picks.length === 0) return null;
  const b = picks[idx];
  const icon = categoryIcons[b.category] || '📌';

  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px] aspect-[9/19.5] rounded-[48px] overflow-hidden"
      style={{
        border: '10px solid #1a1a1d',
        boxShadow: '0 40px 80px -20px rgba(255,107,53,0.35), 0 20px 40px rgba(0,0,0,0.6)',
      }}
    >
      <div className={`absolute inset-0 cat-bg-${b.category} transition-all duration-700`}>
        <div className="absolute top-[15%] left-[20%] w-40 h-40 rounded-full bg-white/10 blur-3xl bokeh-1" />
        <div className="absolute bottom-[25%] right-[15%] w-48 h-48 rounded-full bg-white/10 blur-3xl bokeh-2" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[140px] opacity-30">{icon}</span>
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)' }} />
      </div>

      {/* Top chip */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white"
            style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)' }}>1</div>
          <span className="text-white text-[11px] font-black tracking-tight">onemalad.in</span>
        </div>
        <span className="glass-surface w-7 h-7 rounded-full flex items-center justify-center text-white">
          <FiSearch className="text-xs" />
        </span>
      </div>

      {/* Action rail */}
      <div className="absolute right-3 bottom-[140px] flex flex-col gap-3.5 items-center">
        <span className="w-9 h-9 rounded-full glass-surface flex items-center justify-center text-white"><FiHeart className="text-sm" /></span>
        <span className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: '#25d366' }}><FaWhatsapp className="text-sm" /></span>
        <span className="w-9 h-9 rounded-full flex items-center justify-center text-[#041816]" style={{ background: '#4ecdc4' }}><FiPhone className="text-xs" /></span>
      </div>

      {/* Bottom info */}
      <div className="absolute left-3 right-14 bottom-4 space-y-1.5">
        {b.featured && (
          <span className="badge-featured inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">⭐ Featured</span>
        )}
        <h3 className="text-white font-extrabold text-[15px] leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          {b.name}
        </h3>
        <div className="flex items-center gap-2 text-[10px] text-white/80">
          <FiStar className="fill-yellow-400 text-yellow-400" />
          <span className="font-bold">{b.rating}</span>
          <span className="text-white/50">·</span>
          <span>{b.area}</span>
        </div>
        <div className="btn-cta h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold mt-2">
          Get Details →
        </div>
      </div>
    </div>
  );
}

/* ---------------- FEED PREVIEW (horizontal scroll) ---------------- */

function FeedPreview() {
  const picks = businesses.slice(0, 8);
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">Malad · Live feed</span>
          <h2 className="text-white font-black text-[28px] sm:text-[40px] tracking-[-0.02em] mt-2 leading-tight">
            What&apos;s on in Malad, right now.
          </h2>
        </div>
        <Link href="/directory" className="hidden sm:inline-flex items-center gap-1 text-[13.5px] font-semibold text-white/70 hover:text-white">
          See all <FiArrowRight />
        </Link>
      </div>

      <div
        ref={scrollerRef}
        className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5 sm:px-6"
        style={{ scrollPadding: '0 24px' }}
      >
        {picks.map((b) => (
          <MiniReelCard key={b.id} business={b} />
        ))}
        <div className="w-[2px] flex-shrink-0" />
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 btn-cta h-12 px-6 rounded-full text-white font-bold text-[14px] active:scale-[0.98]"
        >
          Open the Feed <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}

function MiniReelCard({ business }: { business: typeof businesses[number] }) {
  const icon = categoryIcons[business.category] || '📌';
  return (
    <Link
      href={`/directory#${business.id}`}
      className={`cat-bg-${business.category} snap-start flex-shrink-0 relative w-[240px] sm:w-[260px] aspect-[9/16] rounded-3xl overflow-hidden group active:scale-[0.98] transition-transform`}
    >
      <div className="absolute top-[15%] left-[15%] w-32 h-32 rounded-full bg-white/10 blur-3xl bokeh-1" />
      <div className="absolute bottom-[25%] right-[10%] w-40 h-40 rounded-full bg-white/10 blur-3xl bokeh-2" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[110px] opacity-30">{icon}</span>
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)' }} />

      {business.featured && (
        <span className="badge-featured absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
          ⭐ Featured
        </span>
      )}

      <div className="absolute left-4 right-4 bottom-4 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-semibold uppercase tracking-wider">
          <span>{icon} {business.category}</span>
          <span className="text-white/40">·</span>
          <span className="flex items-center gap-0.5">
            <FiStar className="fill-yellow-400 text-yellow-400 text-[10px]" /> {business.rating}
          </span>
        </div>
        <h3 className="text-white font-extrabold text-[17px] leading-tight">{business.name}</h3>
        <div className="flex items-center gap-1 text-[11px] text-white/60">
          <FiMapPin className="text-[10px]" /> {business.area}
        </div>
      </div>
    </Link>
  );
}

/* ---------------- CATEGORIES ---------------- */

function CategoriesStrip() {
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">Categories</span>
          <h2 className="text-white font-black text-[28px] sm:text-[40px] tracking-[-0.02em] mt-2 leading-tight">
            Find everything in Malad.
          </h2>
          <p className="text-white/60 text-[14.5px] mt-2 max-w-[520px]">
            Pick what you&apos;re in the mood for. We&apos;ll show you the best within 3 km.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {businessCategories.map((cat) => {
            const count = businesses.filter((b) => b.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/directory`}
                className={`cat-bg-${cat.id} relative aspect-[4/3] sm:aspect-square rounded-3xl p-5 flex flex-col justify-between group overflow-hidden hover:scale-[1.02] transition-transform`}
              >
                <div className="absolute top-[20%] left-[20%] w-24 h-24 rounded-full bg-white/15 blur-2xl bokeh-1" />
                <div className="absolute bottom-[20%] right-[10%] w-20 h-20 rounded-full bg-white/10 blur-2xl bokeh-2" />
                <div className="relative text-[44px] opacity-90 drop-shadow-lg">{cat.icon}</div>
                <div className="relative">
                  <div className="text-white font-extrabold text-[16px] leading-tight drop-shadow">{cat.label}</div>
                  <div className="text-white/70 text-[11px] font-semibold mt-1">{count} listed</div>
                </div>
                <FiArrowUpRight className="absolute top-4 right-4 text-white/60 group-hover:text-white text-lg transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURED ---------------- */

function FeaturedCarousel() {
  const featured = businesses.filter((b) => b.featured);
  if (featured.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 relative">
      <div
        className="absolute inset-x-0 inset-y-8 blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(245,196,81,0.3) 0%, transparent 60%)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#f5c451' }}>
              ⭐ Top of Malad
            </span>
            <h2 className="text-white font-black text-[28px] sm:text-[40px] tracking-[-0.02em] mt-2 leading-tight">
              Hand-picked by locals.
            </h2>
          </div>
        </div>

        <div className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 sm:-mx-6 px-5 sm:px-6">
          {featured.map((b) => (
            <FeaturedCard key={b.id} business={b} />
          ))}
          <div className="w-[2px] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ business }: { business: typeof businesses[number] }) {
  const icon = categoryIcons[business.category] || '📌';
  return (
    <Link
      href={`/directory#${business.id}`}
      className={`cat-bg-${business.category} snap-start flex-shrink-0 relative w-[280px] sm:w-[320px] aspect-[3/4] rounded-[28px] overflow-hidden group active:scale-[0.98] transition-transform`}
      style={{
        border: '1px solid rgba(245,196,81,0.3)',
        boxShadow: '0 20px 50px -10px rgba(245,196,81,0.12), 0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div className="absolute top-[15%] left-[15%] w-32 h-32 rounded-full bg-white/10 blur-3xl bokeh-1" />
      <div className="absolute bottom-[25%] right-[10%] w-40 h-40 rounded-full bg-white/10 blur-3xl bokeh-2" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[130px] opacity-30">{icon}</span>
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)' }} />

      <span className="badge-featured absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
        ⭐ Featured
      </span>

      <div className="absolute left-5 right-5 bottom-5 space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
          {icon} {business.category} · {business.priceRange}
        </div>
        <h3 className="text-white font-black text-[20px] leading-tight tracking-tight">{business.name}</h3>
        <p className="text-white/70 text-[12.5px] italic line-clamp-2">{business.tagline}</p>
        <div className="flex items-center gap-3 text-[12px] text-white/80 pt-1">
          <span className="flex items-center gap-1"><FiStar className="fill-yellow-400 text-yellow-400" />{business.rating}</span>
          <span className="text-white/30">·</span>
          <span className="flex items-center gap-1"><FiMapPin className="text-xs" />{business.area}</span>
        </div>
      </div>
    </Link>
  );
}

/* ---------------- FOR BUSINESSES ---------------- */

function ForBusinessesSection() {
  const stats = [
    { k: '10,000+', v: 'Malad locals / month' },
    { k: `${businesses.length}+`, v: 'active listings' },
    { k: '1-tap', v: 'to WhatsApp' },
    { k: '₹299', v: 'to start' },
  ];
  const benefits = [
    'Showcase your business to 10,000+ Malad locals',
    'Direct WhatsApp & call buttons — every view is a potential customer',
    'Featured placement in the Reels-style feed',
    'Offer banner with expiry — drive limited-time urgency',
    'Real-time analytics (views, saves, WhatsApp clicks)',
    'No commission on orders — 100% is yours',
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, #ff6b35 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #b06ab3 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">For Business Owners</span>
            <h2 className="text-white font-black text-[30px] sm:text-[44px] tracking-[-0.02em] mt-3 leading-[0.95]">
              Your shop,<br />in front of Malad.
            </h2>
            <p className="text-white/70 text-[15.5px] mt-5 leading-relaxed max-w-[480px]">
              Every day, hundreds of people in Malad search for where to eat, get their hair cut, or find a gym.
              Put your business where they&apos;re already looking.
            </p>

            <ul className="mt-7 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-white/80">
                  <span className="w-5 h-5 mt-0.5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)' }}>
                    <FiCheck className="text-white text-xs" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/list-business" className="btn-cta h-[52px] px-7 rounded-full text-white font-bold text-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.98]">
                See Plans & Pricing <FiArrowRight />
              </Link>
              <a
                href="https://wa.me/919820455678?text=Hi%2C%20I%20want%20to%20list%20my%20business%20on%20OneMalad.in"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[52px] px-7 rounded-full glass-surface text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <FaWhatsapp /> Talk to us
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.v}
                className="glass-surface rounded-2xl p-6 text-center"
                style={{ background: 'rgba(20,20,22,0.6)' }}
              >
                <div className="text-white font-black text-[28px] sm:text-[32px] tracking-tight"
                  style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35, #f5c451)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.k}
                </div>
                <div className="text-white/60 text-[12px] font-semibold uppercase tracking-wider mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMMUNITY STRIP ---------------- */

function CommunityStrip() {
  const links = [
    { href: '/our-work', label: 'Our Work', desc: 'Foundation activities & drives' },
    { href: '/wards', label: '5 Wards', desc: 'Local ward updates & corporators' },
    { href: '/helplines', label: 'Helplines', desc: 'Emergency numbers' },
    { href: '/blood-donors', label: 'Blood Donors', desc: 'Find donors in your area' },
    { href: '/volunteer', label: 'Volunteer', desc: 'Serve your community' },
    { href: '/events', label: 'Events', desc: 'Community events calendar' },
  ];
  return (
    <section className="py-16 sm:py-20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface text-[11px] uppercase tracking-[0.18em] font-bold text-white/70">
            <FiHeart className="text-orange-400" />
            Also powered by OneMalad
          </div>
          <h2 className="text-white font-black text-[24px] sm:text-[34px] tracking-[-0.02em] mt-4 leading-tight max-w-2xl mx-auto">
            Born from civic work. Built for Malad.
          </h2>
          <p className="text-white/60 text-[14px] mt-3 max-w-xl mx-auto">
            OneMalad started as a community foundation. We still serve Malad&apos;s families, wards, and neighbourhoods — alongside building this directory.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="glass-surface rounded-2xl p-4 sm:p-5 group hover:bg-white/[0.03] transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-white font-bold text-[14.5px]">{l.label}</div>
                  <div className="text-white/50 text-[12px] mt-0.5">{l.desc}</div>
                </div>
                <FiArrowUpRight className="text-white/40 group-hover:text-white flex-shrink-0 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function DarkFooter() {
  return (
    <footer className="pt-16 pb-10 border-t border-white/5" style={{ background: '#070708' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-sm"
                style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)' }}>
                1
              </div>
              <span className="text-white font-black text-[17px] tracking-tight">
                One<span className="text-orange-400">Malad</span>
              </span>
            </div>
            <p className="text-white/60 text-[13.5px] leading-relaxed">
              The local directory for Malad. Discover, connect, and support your neighbourhood — one swipe at a time.
            </p>
          </div>
          <div>
            <h4 className="text-white/90 font-bold text-[12px] uppercase tracking-widest mb-4">Directory</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href="/directory" className="text-white/60 hover:text-white">Discover</Link></li>
              <li><Link href="/list-business" className="text-white/60 hover:text-white">List your business</Link></li>
              <li><Link href="/directory/signup" className="text-white/60 hover:text-white">Sign up</Link></li>
              <li><Link href="/directory/login" className="text-white/60 hover:text-white">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/90 font-bold text-[12px] uppercase tracking-widest mb-4">Community</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href="/our-work" className="text-white/60 hover:text-white">Our Work</Link></li>
              <li><Link href="/wards" className="text-white/60 hover:text-white">Wards</Link></li>
              <li><Link href="/helplines" className="text-white/60 hover:text-white">Helplines</Link></li>
              <li><Link href="/volunteer" className="text-white/60 hover:text-white">Volunteer</Link></li>
              <li><Link href="/blood-donors" className="text-white/60 hover:text-white">Blood Donors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/90 font-bold text-[12px] uppercase tracking-widest mb-4">Connect</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><a href="https://wa.me/919820455678" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">WhatsApp</a></li>
              <li><a href="https://instagram.com/onemalad" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">Instagram</a></li>
              <li><Link href="/corporators" className="text-white/60 hover:text-white">Corporators</Link></li>
              <li><Link href="/events" className="text-white/60 hover:text-white">Events</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
          <span>© {new Date().getFullYear()} OneMalad. Built in Mumbai.</span>
          <span>Made with <FiHeart className="inline text-orange-400" /> for Malad.</span>
        </div>
      </div>
    </footer>
  );
}
