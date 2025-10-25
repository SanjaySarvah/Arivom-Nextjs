'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import SectionHeader from "@/components/Common/SectionHeader";
import Image from 'next/image';

const Login: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value.trim();

    setTimeout(() => {
      setIsLoading(false);
      const user = email === 'test@example.com' && password === '123456';

      if (user) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          router.push('/');
        }, 2000);
      } else {
        setError('Invalid email or password.');
      }
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* ✅ LEFT COLUMN (Desktop GIF) */}
      <div className="hidden lg:flex w-1/2 bg-white relative">
        <Image
          src="/assets/login.png"
          alt="Login Illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 text-center px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">Welcome Back!</h2>
          <p className="text-gray-600 text-base max-w-md">
            Log in to continue managing your account and explore the latest updates.
          </p>
        </div>
      </div>


      {/* ✅ RIGHT COLUMN (Login Form) */}
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-12 relative overflow-hidden">

        {/* ✅ Mobile Header */}
        <div className="sm:hidden relative flex flex-col items-center mb-8">
          {/* Back Arrow */}
          <button
            onClick={() => router.back()}
            className="absolute left-4 top-2 text-gray-700"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/assets/arivom-logo-latest.png"
              alt="Logo"
              width={110}
              height={110}
              className="object-contain"
              priority
            />
          </div>

          {/* Breadcrumbs */}
          <nav className="mt-3 text-sm font-medium text-gray-600 text-center">
            <ol className="flex justify-center items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-200"
                >
                  Home
                </Link>

              </li>
              <li><span className="text-gray-400">&gt;</span></li>
              <li><span className="text-gray-700">Sign In</span></li>
            </ol>
          </nav>
        </div>


        <nav className="hidden sm:flex w-full max-w-7xl mx-auto mb-8 text-sm font-medium text-gray-600 justify-center">
          <ol className="flex items-center space-x-2 text-center">
            <li>
              <Link
                href="/"
                className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li><span className="text-gray-400">&gt;</span></li>
            <li><span className="text-gray-700">Sign In</span></li>
          </ol>
        </nav>


        {/* ✅ Login Card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 ">
            <SectionHeader
              subtitle="Sign in to your account"
              title=""
              showButton={false}
              buttonText=""
              buttonUrl=""
            />

            {error && (
              <div className="bg-red-50 border border-red-400 text-red-600 text-sm sm:text-base p-3 rounded mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-[#0F172A] transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-[#0F172A] transition"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--primary)] text-white py-3 rounded-md text-sm font-medium hover:bg-[var(--secondary)] transition disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/forgot_password" className="text-xs text-gray-400 hover:underline">
                Forgot your password?
              </Link>
            </div>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-400 text-sm">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <p className="text-center text-gray-600 text-xs ">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-[var(--primary)] hover:text-[var(--secondary)] ">
                Sign Up Now!
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center border border-gray-200"
            >
              <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-[#0F172A] mb-2">Login Successful</h2>
              <p className="text-gray-500 text-sm mb-2">
                Redirecting to your home page...
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 2, ease: 'easeInOut' }}
                className="mt-5 h-1 bg-green-500 rounded-full origin-left"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
