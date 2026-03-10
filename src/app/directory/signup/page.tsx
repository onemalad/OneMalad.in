'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiArrowRight, FiCheck, FiShield } from 'react-icons/fi';
import { businesses } from '@/data/businesses';

export default function DirectorySignupPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // If already signed in, redirect to directory
  if (user) {
    router.push('/directory');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // After showing success, redirect to directory
    setTimeout(() => {
      router.push('/directory');
    }, 1500);
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      router.push('/directory');
    } catch {
      // Error handled by auth context
    }
  };

  if (submitted) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">You&apos;re In!</h2>
          <p className="text-gray-500">Redirecting to the full directory...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Free Access</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Explore {businesses.length} Local Businesses
          </h1>
          <p className="text-sm opacity-90 max-w-md mx-auto">
            Sign up once to browse the full Malad business directory — food joints, cafes, salons, gyms & more
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignup}
                className="w-full py-3.5 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-3 text-sm hover:border-gray-300 hover:shadow-md transition-all mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">or enter your details</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Quick Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Area in Malad</label>
                  <select
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  >
                    <option value="">Select your area</option>
                    <option value="malad-west">Malad West</option>
                    <option value="malad-east">Malad East</option>
                    <option value="malwani">Malwani</option>
                    <option value="evershine-nagar">Evershine Nagar</option>
                    <option value="orlem">Orlem</option>
                    <option value="marve">Marve / Erangal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Get Free Access <FiArrowRight />
                </button>
              </form>

              <div className="flex items-center justify-center gap-4 mt-5 text-[11px] text-gray-400">
                <span className="flex items-center gap-1"><FiShield className="text-green-500" /> No spam</span>
                <span className="flex items-center gap-1"><FiCheck className="text-green-500" /> 100% free</span>
                <span className="flex items-center gap-1"><FiCheck className="text-green-500" /> Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
