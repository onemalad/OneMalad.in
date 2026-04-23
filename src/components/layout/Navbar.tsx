'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FiLogOut, FiGrid, FiSettings, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  if (pathname === '/directory' || pathname === '/' || pathname === '/list-business') return null;

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

  const isCommunity = communityLinks.some((l) => pathname.startsWith(l.href));

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'rgba(10, 10, 11, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8e53)', boxShadow: '0 8px 24px -8px rgba(255,107,53,0.5)' }}
            >
              1
            </div>
            <div className="leading-tight">
              <div className="text-white font-black text-[17px] tracking-tight">
                One<span className="text-orange-400">Malad</span>
              </div>
              <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/50">
                {isCommunity ? 'Community' : 'Local Directory'}
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/directory"
              className="px-3.5 h-9 flex items-center text-[14px] font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              Discover
            </Link>
            <Link
              href="/list-business"
              className="px-3.5 h-9 flex items-center text-[14px] font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              For Businesses
            </Link>
            <div className="relative" onMouseEnter={() => setCommunityOpen(true)} onMouseLeave={() => setCommunityOpen(false)}>
              <button
                className={`px-3.5 h-9 flex items-center gap-1 text-[14px] font-semibold rounded-lg transition-all ${
                  isCommunity ? 'text-white bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                Community <FiChevronDown className={`text-sm transition-transform ${communityOpen ? 'rotate-180' : ''}`} />
              </button>
              {communityOpen && (
                <div className="absolute top-full right-0 pt-2 w-56">
                  <div
                    className="rounded-xl overflow-hidden py-1.5"
                    style={{
                      background: 'rgba(20,20,22,0.95)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {communityLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={`block px-4 py-2 text-[13.5px] transition-all ${
                          pathname.startsWith(l.href) ? 'text-white bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/list-business"
              className="ml-2 px-4 h-9 rounded-full text-[13.5px] font-bold text-white flex items-center gap-1.5 active:scale-95 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                boxShadow: '0 10px 30px -10px rgba(255, 107, 53, 0.5)',
              }}
            >
              List Your Business <FiArrowRight className="text-sm" />
            </Link>

            {user && (
              <div className="relative ml-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-12 w-56 rounded-xl py-2 z-50"
                    style={{
                      background: 'rgba(20,20,22,0.95)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="font-semibold text-sm text-white">{user.displayName}</p>
                      <p className="text-xs text-white/50">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-orange-500/15 text-orange-400 text-xs font-medium rounded-full capitalize">
                        {user.role}
                      </span>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiGrid className="text-base" /> Dashboard
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiSettings className="text-base" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        router.push('/');
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors w-full"
                    >
                      <FiLogOut className="text-base" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Menu"
          >
            {mobileOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-white/5">
            <Link
              href="/directory"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-white/90 font-semibold text-[14px] hover:bg-white/5"
            >
              Discover
            </Link>
            <Link
              href="/list-business"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-white/90 font-semibold text-[14px] hover:bg-white/5"
            >
              For Businesses
            </Link>
            <div className="px-3 pt-2 text-[11px] uppercase tracking-widest font-bold text-white/40">Community</div>
            {communityLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-[13.5px] hover:bg-white/5 hover:text-white ${
                  pathname.startsWith(l.href) ? 'text-white' : 'text-white/70'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/list-business"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 h-11 rounded-full text-center leading-[44px] text-white font-bold text-[14px]"
              style={{
                background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                boxShadow: '0 10px 30px -10px rgba(255, 107, 53, 0.5)',
              }}
            >
              List Your Business
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 rounded-lg mt-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                    router.push('/');
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
