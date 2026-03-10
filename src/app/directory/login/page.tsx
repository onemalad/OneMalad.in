'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

export default function DirectoryLoginPage() {
  const { user, signInWithGoogle, signInWithEmail, forgotPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  if (user) {
    router.push('/directory');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      router.push('/directory');
    } catch {
      // Error shown by toast
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/directory');
    } catch {
      // Error handled by auth context
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return;
    try {
      await forgotPassword(email);
      setShowForgot(false);
    } catch {
      // Error shown by toast
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Welcome Back</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Sign In to Directory</h1>
          <p className="text-sm opacity-90 max-w-md mx-auto">
            Access the full Malad business directory with your account
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <button
                onClick={handleGoogleLogin}
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
                <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent pr-12"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-xs text-orange-500 font-medium mt-1.5 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {loading ? 'Signing In...' : 'Sign In'} {!loading && <FiArrowRight />}
                </button>
              </form>

              {showForgot && (
                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-xs text-gray-600 mb-2">Enter your email above and click below to reset your password.</p>
                  <button
                    onClick={handleForgotPassword}
                    disabled={!email}
                    className="text-sm font-semibold text-orange-500 hover:underline disabled:opacity-40"
                  >
                    Send Reset Email
                  </button>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Don&apos;t have an account?{' '}
                  <Link href="/directory/signup" className="text-orange-500 font-semibold hover:underline">
                    Sign Up Free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
