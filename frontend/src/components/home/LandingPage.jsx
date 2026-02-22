'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LandingPage({ onEnter }) {
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginWithEmail, loginWithGoogle } = useAuth();
    const router = useRouter();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await loginWithEmail(email, password);
            router.push('/home');
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            router.push('/home');
        } catch (err) {
            setError(err.message || 'Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="fixed inset-0 z-100 w-full min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-4 overflow-hidden font-landing-heading text-white">

            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video autoPlay loop muted playsInline
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover object-center scale-105">
                    <source src="/videos/Realistic_Sunset_Video_Generation.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-linear-to-t from-[#0b0704]/90 via-[#0b0704]/60 to-[#0b0704]/70 z-10" />
            </div>

            {/* Central Content — glassmorphic card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-20 flex flex-col items-center"
            >
                {/* Glass Card */}
                <div className="flex flex-col items-center bg-black/5 backdrop-blur-[2px] rounded-3xl border border-white/10 shadow-2xl px-10 py-8">

                    {/* Logo */}
                    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg px-2 flex justify-center">
                        <Image
                            src="/images/Wave of Bengal Logo.png"
                            alt="Wave of Bengal Logo"
                            width={1920} height={1080} quality={100} unoptimized
                            className="object-contain w-full h-auto max-h-[48vh] mix-blend-screen"
                            priority
                        />
                    </div>

                    {/* Buttons — snug under logo */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-0 w-full justify-center">
                        <button
                            onClick={onEnter}
                            className="w-full sm:w-auto font-body font-semibold py-3.5 px-12 rounded-full uppercase tracking-widest text-sm text-white bg-[#d97736] hover:bg-[#c0612a] transition-all duration-300 hover:scale-105 shadow-[0_0_24px_rgba(217,119,54,0.45)] hover:shadow-[0_0_36px_rgba(217,119,54,0.7)]"
                        >
                            Dive In
                        </button>
                        <button
                            onClick={() => setShowLogin(true)}
                            className="w-full sm:w-auto font-body font-semibold py-3.5 px-12 rounded-full uppercase tracking-widest text-sm text-white/80 hover:text-white border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </button>
                    </div>

                </div>
            </motion.div>

            {/* Login Modal */}
            <AnimatePresence>
                {showLogin && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLogin(false)}
                            className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="absolute z-40 w-full max-w-md mx-auto glass-card p-8"
                        >
                            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <h2 className="text-2xl font-heading font-black text-white mb-6 text-center">Welcome Back</h2>

                            {error && (
                                <div className="bg-red-500/20 border border-red-400/40 text-red-200 p-3 rounded-xl mb-5 text-sm font-medium font-body">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div>
                                    <label className="block text-white/70 text-sm font-semibold mb-1.5 font-body">Email</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-[#d97736] focus:ring-2 focus:ring-[#d97736]/30 transition-all font-body"
                                        required />
                                </div>
                                <div>
                                    <label className="block text-white/70 text-sm font-semibold mb-1.5 font-body">Password</label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-[#d97736] focus:ring-2 focus:ring-[#d97736]/30 transition-all font-body"
                                        required />
                                </div>
                                <button type="submit" disabled={loading}
                                    className="w-full font-body font-bold py-3.5 rounded-xl uppercase tracking-widest text-sm text-white bg-[#d97736] hover:bg-[#c0612a] transition-all shadow-[0_0_20px_rgba(217,119,54,0.4)] disabled:opacity-50 mt-2">
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>

                            <div className="flex items-center gap-3 my-5">
                                <div className="flex-1 h-px bg-white/20" />
                                <span className="text-white/40 text-xs font-body uppercase tracking-widest">or</span>
                                <div className="flex-1 h-px bg-white/20" />
                            </div>

                            <button onClick={handleGoogleLogin} disabled={loading}
                                className="w-full font-body font-semibold py-3 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all flex items-center justify-center gap-3">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>

                            <p className="mt-6 text-center text-white/40 text-sm font-body">
                                New here?{' '}
                                <a href="/auth/register" className="text-[#d97736] hover:text-[#f0a060] font-semibold transition-colors">
                                    Create an account
                                </a>
                            </p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
