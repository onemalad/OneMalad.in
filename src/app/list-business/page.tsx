'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiArrowRight, FiCheck, FiMenu, FiX, FiZap, FiTrendingUp, FiStar,
  FiArrowUpRight, FiMessageCircle, FiShield, FiClock, FiHeart,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { businesses } from '@/data/businesses';

const WHATSAPP = '919820455678';
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const plans = [
  {
    id: 'basic',
    name: 'Starter',
    price: 299,
    period: '/month',
    tagline: 'Get discovered',
    cta: 'Start with Starter',
    msg: 'Hi, I want to subscribe to the Starter plan (₹299/mo) on OneMalad.in.',
    features: [
      'Listed in the OneMalad directory',
      'Business profile with photos',
      'WhatsApp + Call buttons',
      'Category + tags',
      'Menu / services section',
      'Verified tick after approval',
    ],
    featured: false,
  },
  {
    id: 'featured',
    name: 'Featured',
    price: 999,
    period: '/month',
    tagline: 'Most popular',
    cta: 'Go Featured',
    msg: 'Hi, I want to subscribe to the Featured plan (₹999/mo) on OneMalad.in.',
    features: [
      'Everything in Starter',
      '⭐ Featured badge on your card',
      'Priority placement in the Reels feed',
      'Appear in "Top of Malad" carousel',
      'Up to 3 short videos on your listing',
      'Offer banner (20% off / festive) support',
      'Monthly performance report',
    ],
    featured: true,
  },
  {
    id: 'promotion',
    name: 'Promotion',
    price: 1999,
    period: '/month',
    tagline: 'Maximum reach',
    cta: 'Promote my business',
    msg: 'Hi, I want to subscribe to the Promotion plan (₹1999/mo) on OneMalad.in.',
    features: [
      'Everything in Featured',
      'Homepage hero placement (rotating)',
      'WhatsApp broadcast feature (1x/month)',
      'Unlimited videos + photo gallery',
      'Dedicated account manager',
      'Custom offer campaigns',
      'Instagram cross-promotion',
    ],
    featured: false,
  },
];

const faqs = [
  {
    q: 'How do I list my business?',
    a: 'Pick a plan below, hit the button — it opens a WhatsApp chat with our team. Share your business photos, menu, and details. We build the listing for you in 24 hours.',
  },
  {
    q: 'Do you charge any commission on my orders?',
    a: 'No. We don\'t take a cut of your sales. You pay the monthly subscription, and 100% of what you earn is yours. Customers WhatsApp or call you directly.',
  },
  {
    q: 'Can I upgrade or cancel later?',
    a: 'Yes — cancel anytime, no lock-in. Upgrades are pro-rated. Downgrades kick in at the next billing cycle.',
  },
  {
    q: 'Who sees my listing?',
    a: 'Everyone in Malad and nearby neighbourhoods (Borivali, Goregaon, Malwani, Kandivali). The more engagement your listing gets (WhatsApp clicks, saves), the higher it appears in the feed.',
  },
  {
    q: 'What if my category isn\'t listed?',
    a: 'We cover Food, Cafes, Salons, Gyms, Shops, Services, Entertainment, and more. If you run something unique, WhatsApp us — we\'ll categorize you correctly.',
  },
  {
    q: 'How do I pay?',
    a: 'UPI, net banking, or card — all through our payment partner. We send you a WhatsApp invoice at the start of each cycle.',
  },
];

export default function ListBusinessPage() {
  return (
    <div className="directory-root min-h-screen" style={{ background: '#0a0a0b', color: '#ffffff' }}>
      <DarkNav />
      <Hero />
      <WhyUs />
      <Plans />
      <Process />
      <FAQ />
      <FinalCTA />
      <MiniFooter />
    </div>
  );
}

/* ---------------- NAV (same as homepage, reused) ---------------- */

function DarkNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)' }}>1</div>
            <div className="leading-tight">
              <div className="text-white font-black text-[17px] tracking-tight">
                One<span className="text-orange-400">Malad</span>
              </div>
              <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/50">
                For Business
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/directory" className="px-3.5 h-9 flex items-center text-[14px] font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all">Discover</Link>
            <Link href="/list-business" className="px-3.5 h-9 flex items-center text-[14px] font-semibold text-white rounded-lg bg-white/5 transition-all">For Businesses</Link>
            <Link href="/" className="px-3.5 h-9 flex items-center text-[14px] font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all">Home</Link>
            <a
              href={wa('Hi, I want to list my business on OneMalad.in.')}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 h-9 rounded-full text-[13.5px] font-bold text-white btn-cta flex items-center gap-1.5 active:scale-95"
            >
              <FaWhatsapp /> Talk to us
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white glass-surface rounded-full"
            aria-label="Menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1">
            <Link href="/directory" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-white/90 font-semibold text-[14px] hover:bg-white/5">Discover</Link>
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-white/90 font-semibold text-[14px] hover:bg-white/5">Home</Link>
            <a
              href={wa('Hi, I want to list my business on OneMalad.in.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 btn-cta h-11 rounded-full text-center leading-[44px] text-white font-bold text-[14px]"
            >
              WhatsApp us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pb-20 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-[55%] h-[55%] rounded-full blur-3xl opacity-30 bokeh-1"
        style={{ background: 'radial-gradient(circle, #ff6b35 0%, transparent 65%)' }} />
      <div className="absolute -bottom-10 -right-10 w-[60%] h-[60%] rounded-full blur-3xl opacity-25 bokeh-2"
        style={{ background: 'radial-gradient(circle, #f5c451 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-surface text-[11px] uppercase tracking-[0.18em] font-bold text-white/70 mb-6">
          <FiTrendingUp className="text-orange-400" />
          For Business Owners
        </div>
        <h1 className="font-black text-[38px] sm:text-[56px] lg:text-[68px] leading-[0.98] tracking-[-0.03em] text-white">
          Put your business<br />in front of{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #f5c451 100%)' }}>
            Malad.
          </span>
        </h1>
        <p className="mt-6 text-white/70 text-[16px] sm:text-[17.5px] leading-relaxed max-w-[620px] mx-auto">
          Start at ₹299/month. Get discovered by 10,000+ Malad locals searching for where to eat, shop, and spend. One-tap WhatsApp. Zero commissions. You keep 100%.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#plans" className="btn-cta h-[52px] px-7 rounded-full text-white font-bold text-[15px] inline-flex items-center gap-2 active:scale-[0.98]">
            See Plans <FiArrowRight />
          </a>
          <a
            href={wa('Hi, I want to list my business on OneMalad.in.')}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[52px] px-7 rounded-full glass-surface text-white font-semibold text-[15px] inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <FaWhatsapp className="text-emerald-400" /> Chat with us
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Stat k="10K+" v="Monthly locals" />
          <Stat k={`${businesses.length}+`} v="Active listings" />
          <Stat k="0%" v="Commission" />
          <Stat k="24h" v="To go live" />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="glass-surface rounded-2xl py-5 px-3" style={{ background: 'rgba(20,20,22,0.6)' }}>
      <div className="text-white font-black text-[28px] tracking-tight"
        style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35, #f5c451)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {k}
      </div>
      <div className="text-white/60 text-[11px] font-semibold uppercase tracking-wider mt-1">{v}</div>
    </div>
  );
}

/* ---------------- WHY US ---------------- */

function WhyUs() {
  const items = [
    { icon: FiZap, title: 'Reels-style feed', body: 'Customers scroll your business like they scroll Instagram. Addictive, not intrusive.' },
    { icon: FaWhatsapp, title: 'Direct to WhatsApp', body: 'Every view is one tap from chatting with you. No middle-man, no forms.' },
    { icon: FiStar, title: 'Trust built in', body: 'Verified tick, reviews, and location tags — customers buy from businesses they can trust.' },
    { icon: FiTrendingUp, title: 'Real analytics', body: 'See exactly how many people viewed, saved, and WhatsApp\'d you — every week.' },
    { icon: FiShield, title: 'No commission', body: 'You pay a flat monthly fee. Every rupee you earn stays with you.' },
    { icon: FiHeart, title: 'Hyper-local', body: 'Built only for Malad. No noise from Andheri, no tourists — just your actual customers.' },
  ];
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">Why OneMalad</span>
          <h2 className="text-white font-black text-[28px] sm:text-[38px] tracking-[-0.02em] mt-3 leading-tight">
            Designed for local owners,<br />not for big-budget chains.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass-surface rounded-2xl p-6" style={{ background: 'rgba(20,20,22,0.6)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(245,196,81,0.15))', border: '1px solid rgba(255,107,53,0.3)' }}>
                <Icon className="text-orange-400 text-lg" />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-2">{title}</h3>
              <p className="text-white/65 text-[13.5px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PLANS ---------------- */

function Plans() {
  return (
    <section id="plans" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-x-0 inset-y-10 blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.3) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">Pricing</span>
          <h2 className="text-white font-black text-[30px] sm:text-[44px] tracking-[-0.02em] mt-3 leading-tight">
            Pick a plan. Go live in 24 hours.
          </h2>
          <p className="text-white/60 text-[14.5px] mt-3 max-w-xl mx-auto">
            All plans include WhatsApp + Call buttons, dashboard access, and support. No commission, no hidden fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p) => <PlanCard key={p.id} plan={p} />)}
        </div>

        <p className="text-center text-white/50 text-[12.5px] mt-8">
          Prices exclude GST. All plans are month-to-month. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: typeof plans[number] }) {
  const isFeatured = plan.featured;
  return (
    <div
      className={`relative rounded-3xl p-7 flex flex-col ${isFeatured ? 'scale-[1.03]' : ''}`}
      style={{
        background: isFeatured
          ? 'linear-gradient(160deg, rgba(255,107,53,0.12) 0%, rgba(20,20,22,0.9) 60%)'
          : 'rgba(20,20,22,0.6)',
        border: isFeatured ? '1px solid rgba(245,196,81,0.4)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isFeatured ? '0 30px 70px -20px rgba(245,196,81,0.2), 0 4px 20px rgba(0,0,0,0.3)' : undefined,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {isFeatured && (
        <span className="badge-featured absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
          ⭐ Most Popular
        </span>
      )}

      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-widest text-white/50">{plan.tagline}</div>
        <h3 className="text-white font-black text-[26px] tracking-tight mt-1">{plan.name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-white font-black text-[42px] tracking-tight">₹{plan.price}</span>
          <span className="text-white/50 text-[14px] font-medium">{plan.period}</span>
        </div>
      </div>

      <ul className="flex-1 space-y-2.5 mb-7">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/80">
            <span className="w-4 h-4 mt-0.5 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: isFeatured ? 'linear-gradient(135deg, #ff6b35, #f5c451)' : 'rgba(255,107,53,0.2)' }}>
              <FiCheck className={`text-[11px] ${isFeatured ? 'text-white' : 'text-orange-400'}`} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={wa(plan.msg)}
        target="_blank"
        rel="noopener noreferrer"
        className={`h-12 rounded-2xl flex items-center justify-center gap-2 font-bold text-[14px] active:scale-[0.98] transition-transform ${
          isFeatured ? 'btn-cta text-white' : 'glass-surface text-white'
        }`}
      >
        {plan.cta} <FiArrowRight />
      </a>
    </div>
  );
}

/* ---------------- PROCESS ---------------- */

function Process() {
  const steps = [
    { n: '01', title: 'Pick a plan', body: 'Choose Starter, Featured, or Promotion. Click the button — opens WhatsApp.' },
    { n: '02', title: 'Share your details', body: 'Send us business photos, menu, contact, timing. Takes 5 minutes over WhatsApp.' },
    { n: '03', title: 'Go live in 24 hours', body: 'We build your listing, verify it, and push it live. Start getting WhatsApp leads immediately.' },
  ];
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">How it works</span>
          <h2 className="text-white font-black text-[28px] sm:text-[40px] tracking-[-0.02em] mt-3 leading-tight">
            Three steps. No forms.
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl p-7 glass-surface" style={{ background: 'rgba(20,20,22,0.6)' }}>
              <div className="font-black text-[48px] tracking-tight"
                style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35, #f5c451)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.n}
              </div>
              <h3 className="text-white font-bold text-[17px] mt-2">{s.title}</h3>
              <p className="text-white/65 text-[13.5px] leading-relaxed mt-2">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">FAQ</span>
          <h2 className="text-white font-black text-[28px] sm:text-[40px] tracking-[-0.02em] mt-3 leading-tight">
            Common questions.
          </h2>
        </div>
        <div className="space-y-2.5">
          {faqs.map((f, i) => (
            <div key={i} className="glass-surface rounded-2xl overflow-hidden" style={{ background: 'rgba(20,20,22,0.6)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
              >
                <span className="text-white font-semibold text-[14.5px]">{f.q}</span>
                <FiArrowRight className={`text-white/50 flex-shrink-0 transition-transform ${open === i ? 'rotate-90' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 -mt-1 text-white/70 text-[13.5px] leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */

function FinalCTA() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, #ff6b35 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, #f5c451 0%, transparent 50%)' }} />

      <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center relative">
        <h2 className="text-white font-black text-[34px] sm:text-[54px] tracking-[-0.03em] leading-[0.95]">
          Ready to be{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35, #f5c451)' }}>
            discovered?
          </span>
        </h2>
        <p className="mt-5 text-white/70 text-[15.5px] max-w-lg mx-auto leading-relaxed">
          Join 30+ Malad businesses already getting WhatsApp leads every day.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={wa('Hi, I want to list my business on OneMalad.in.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta h-[52px] px-7 rounded-full text-white font-bold text-[15px] inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <FaWhatsapp /> List my business on WhatsApp
          </a>
          <Link href="/directory" className="h-[52px] px-7 rounded-full glass-surface text-white font-semibold text-[15px] inline-flex items-center gap-2 active:scale-[0.98]">
            See the directory <FiArrowUpRight />
          </Link>
        </div>
        <p className="text-white/40 text-[12px] mt-6 uppercase tracking-widest font-semibold">
          We reply within minutes · 9 AM – 9 PM
        </p>
      </div>
    </section>
  );
}

/* ---------------- MINI FOOTER ---------------- */

function MiniFooter() {
  return (
    <footer className="py-10 border-t border-white/5" style={{ background: '#070708' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-[11px]"
            style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)' }}>1</div>
          <span>OneMalad · Local Directory</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/directory" className="hover:text-white">Directory</Link>
          <Link href="/our-work" className="hover:text-white">Community</Link>
        </div>
      </div>
    </footer>
  );
}
