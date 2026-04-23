'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiArrowRight, FiCheck, FiMenu, FiX, FiZap, FiTrendingUp, FiStar,
  FiArrowUpRight, FiMessageCircle, FiShield, FiClock, FiHeart,
} from 'react-icons/fi';
import { FaWhatsapp, FaGoogle } from 'react-icons/fa';
import { businesses } from '@/data/businesses';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

const WHATSAPP = '919820455678';
const EMAIL = 'connectonemalad@gmail.com';
// TODO: replace with the user's real Google Form URL once created
const GOOGLE_FORM_URL = 'https://forms.gle/your-form-id-here';
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const plans = [
  {
    id: '1mo',
    name: '1 Month',
    price: 300,
    period: 'total',
    perMonth: 300,
    tagline: 'Try it out',
    cta: 'Pick 1 Month',
    msg: 'Hi, I want the 1-month plan (₹300) on OneMalad.in after my free trial week.',
    features: [
      'Listed in the OneMalad directory',
      'Full business profile + photos',
      'WhatsApp + Call + directions buttons',
      'Category + tags + menu/services',
      'Verified tick after approval',
      '1 week free trial first',
    ],
    featured: false,
  },
  {
    id: '3mo',
    name: '3 Months',
    price: 800,
    period: 'total',
    perMonth: 267,
    tagline: 'Most popular · Save 11%',
    cta: 'Pick 3 Months',
    msg: 'Hi, I want the 3-month plan (₹800) on OneMalad.in after my free trial week.',
    features: [
      'Everything in 1 Month',
      '⭐ Featured badge on your card',
      'Priority in the Reels feed',
      'Appear in "Top of Malad" carousel',
      'Up to 5 photos + 1 short video',
      'Offer banner (limited-time deals)',
      'Free renewal reminder on WhatsApp',
    ],
    featured: true,
  },
  {
    id: '6mo',
    name: '6 Months',
    price: 1500,
    period: 'total',
    perMonth: 250,
    tagline: 'Best value · Save 17%',
    cta: 'Pick 6 Months',
    msg: 'Hi, I want the 6-month plan (₹1500) on OneMalad.in after my free trial week.',
    features: [
      'Everything in 3 Months',
      'Homepage hero placement (rotating)',
      'Unlimited photos + 2 videos',
      'Custom offer campaigns (2x)',
      'Instagram cross-promotion',
      'Priority WhatsApp support',
      'Quarterly performance report',
    ],
    featured: false,
  },
];

const faqs = [
  {
    q: 'How do I list my business?',
    a: 'Click "Start Your Free Week" below. Sign in with your Google account, then fill a short form with your business details, menu, and photos (logo, shop, menu items). Your listing goes live in 24 hours. First week is free.',
  },
  {
    q: 'Is the free trial really free? Do I need a card?',
    a: 'Yes — no card, no commitment. You list for 7 days at zero cost. On day 5-6, we WhatsApp you with the paid plan options. If you like the results, you pick 1/3/6 months. If not, your listing goes down. No charge either way.',
  },
  {
    q: 'Do you charge any commission on my orders?',
    a: 'No. We don\'t take a cut. You pay the flat subscription once (1, 3 or 6 months) and 100% of what you earn is yours. Customers WhatsApp or call you directly.',
  },
  {
    q: 'How do I pay after the trial?',
    a: 'UPI, net banking, or card. We send you a WhatsApp link for payment. One-time payment for the plan you choose — no monthly auto-debit, no surprises.',
  },
  {
    q: 'Can I renew or upgrade later?',
    a: 'Yes — we send a WhatsApp reminder 3 days before your listing expires. You can renew the same plan, upgrade to a longer one, or let it lapse. Zero lock-in.',
  },
  {
    q: 'Who sees my listing?',
    a: 'Everyone in Malad and nearby neighbourhoods (Borivali, Goregaon, Malwani, Kandivali). The more engagement your listing gets (WhatsApp clicks, saves), the higher it appears in the feed.',
  },
  {
    q: 'What if my category isn\'t listed?',
    a: 'We cover Food, Cafes, Salons, Gyms, Shops, Services, Entertainment, and more. If you run something unique, WhatsApp us first — we\'ll categorise you correctly.',
  },
  {
    q: 'I just want to ask questions first, not commit.',
    a: 'Totally fine — hit "Talk to us" above and WhatsApp us directly. We\'ll explain the plan, answer questions, and only invite you to sign up when you\'re ready.',
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
          First week{' '}
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #f5c451 100%)' }}>
            free.
          </span>
          <br />No card, no commitment.
        </h1>
        <p className="mt-6 text-white/70 text-[16px] sm:text-[17.5px] leading-relaxed max-w-[620px] mx-auto">
          Get your business in front of 10,000+ Malad locals for 7 days — at zero cost. Keep going for ₹300 a month, or walk away. We don&apos;t take a commission. You keep 100%.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <StartFreeWeekCta />
          <a
            href={wa('Hi, I want to list my business on OneMalad.in. Can you tell me more?')}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[52px] px-7 rounded-full glass-surface text-white font-semibold text-[15px] inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <FaWhatsapp className="text-emerald-400" /> Talk to us first
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Stat k="7 days" v="Free trial" />
          <Stat k={`${businesses.length}+`} v="Active listings" />
          <Stat k="0%" v="Commission" />
          <Stat k="24h" v="To go live" />
        </div>
      </div>
    </section>
  );
}

/** Sign in with Google, then redirect to the Google Form for listing details */
function StartFreeWeekCta({ size = 'lg' }: { size?: 'lg' | 'md' }) {
  const { user, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const go = async () => {
    try {
      if (!user) {
        setLoading(true);
        await signInWithGoogle();
      }
      if (GOOGLE_FORM_URL.includes('your-form-id-here')) {
        toast('Listing form is being finalized — WhatsApp us and we\'ll get you listed today.', { duration: 5000 });
        window.open(wa('Hi, I signed in to list my business on OneMalad.in. Can you help me complete the listing form?'), '_blank');
      } else {
        window.open(GOOGLE_FORM_URL, '_blank');
      }
    } catch {
      // auth context already shows toast
    } finally {
      setLoading(false);
    }
  };

  const sizing = size === 'lg' ? 'h-[52px] px-7 text-[15px]' : 'h-12 px-6 text-[14px]';
  return (
    <button
      onClick={go}
      disabled={loading}
      className={`btn-cta ${sizing} rounded-full text-white font-bold inline-flex items-center gap-2 active:scale-[0.98] disabled:opacity-60`}
    >
      <FaGoogle className="text-white text-sm" />
      {user ? 'Continue to listing form' : 'Start Your Free Week'}
      <FiArrowRight />
    </button>
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
            After your free week.
          </h2>
          <p className="text-white/60 text-[14.5px] mt-3 max-w-xl mx-auto">
            The first 7 days are free. After that, pick any plan below to keep your listing live. One-time payment. No auto-debit. Cancel anytime.
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
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-white font-black text-[42px] tracking-tight">₹{plan.price}</span>
          <span className="text-white/50 text-[13px] font-medium">total</span>
        </div>
        <div className="text-white/50 text-[12px] mt-1">
          ≈ ₹{plan.perMonth}/month{plan.perMonth < 300 ? ' · save vs monthly' : ''}
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
    { n: '01', title: 'Sign in with Google', body: 'One-click sign-in. No passwords, no signup form. We use your Google account only to send you a confirmation.' },
    { n: '02', title: 'Fill the listing form', body: 'Share your business name, photos (logo, shop, menu), timing, category, and pricing. Takes 5 minutes.' },
    { n: '03', title: 'Free for a week', body: 'We build and publish your listing within 24 hours. Get WhatsApp leads for 7 full days at zero cost.' },
    { n: '04', title: 'Continue for ₹300/mo', body: 'On day 5–6 we WhatsApp you to pick 1/3/6 months. Pay via UPI. Or walk away, no charge.' },
  ];
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">How it works</span>
          <h2 className="text-white font-black text-[28px] sm:text-[40px] tracking-[-0.02em] mt-3 leading-tight">
            Four simple steps.
          </h2>
          <p className="text-white/60 text-[14px] mt-3 max-w-xl mx-auto">
            From sign-in to a live listing in 24 hours.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl p-6 glass-surface" style={{ background: 'rgba(20,20,22,0.6)' }}>
              <div className="font-black text-[42px] tracking-tight"
                style={{ backgroundImage: 'linear-gradient(135deg, #ff6b35, #f5c451)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.n}
              </div>
              <h3 className="text-white font-bold text-[16px] mt-2">{s.title}</h3>
              <p className="text-white/65 text-[13px] leading-relaxed mt-2">{s.body}</p>
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
          <StartFreeWeekCta />
          <a
            href={wa('Hi, I want to list my business on OneMalad.in.')}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[52px] px-7 rounded-full glass-surface text-white font-semibold text-[15px] inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <FaWhatsapp /> WhatsApp us
          </a>
        </div>
        <p className="text-white/40 text-[12px] mt-6 uppercase tracking-widest font-semibold">
          We reply within minutes · 9 AM – 9 PM · Or email <a href={`mailto:${EMAIL}`} className="underline hover:text-white">{EMAIL}</a>
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
