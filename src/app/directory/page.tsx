'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { businesses, businessCategories } from '@/data/businesses';
import BusinessCard from '@/components/ui/BusinessCard';
import { useAuth } from '@/context/AuthContext';
import { FiSearch, FiLock, FiArrowRight } from 'react-icons/fi';

export default function DirectoryPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  // Auth gate — redirect to signup if not logged in
  if (!user) {
    return (
      <>
        <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Malad Local</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Famous Local Businesses</h1>
            <p className="text-sm opacity-90 max-w-lg mx-auto">
              Your go-to directory for the best food stalls, cafes, salons, gyms, and hidden gems across Malad
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiLock className="text-orange-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Sign Up to Explore</h2>
            <p className="text-gray-500 text-sm mb-8">
              Create a free account to access all {businesses.length} local businesses in Malad — food, cafes, salons, gyms & more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/directory/signup"
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl inline-flex items-center justify-center gap-2 text-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Create Free Account <FiArrowRight />
              </Link>
              <Link
                href="/directory/login"
                className="px-8 py-3.5 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-200 inline-flex items-center justify-center gap-2 text-sm hover:border-orange-300 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const filteredBusinesses = businesses.filter((biz) => {
    const matchesSearch =
      biz.name.toLowerCase().includes(search.toLowerCase()) ||
      biz.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || biz.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  return (
    <>
      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Malad Local</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Famous Local Businesses</h1>
          <p className="text-sm opacity-90 max-w-lg mx-auto">
            Your go-to directory for the best food stalls, cafes, salons, gyms, and hidden gems across Malad
          </p>
          <div className="max-w-md mx-auto mt-8 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search businesses, food, places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <p className="text-xs opacity-70">{businesses.length} businesses listed</p>
            <span className="text-xs opacity-50">·</span>
            <button onClick={() => { logout(); router.push('/directory/login'); }} className="text-xs opacity-70 hover:opacity-100 underline">
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[70px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {businessCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {sortedBusinesses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-lg font-bold text-gray-700 mb-2">No businesses found</h3>
              <p className="text-sm text-gray-400">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedBusinesses.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
