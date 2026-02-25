'use client'

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginWithEmail } = useAuth();
    const router = useRouter();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // For now passing it onto email login, can be modified later to admin auth exclusively
            await loginWithEmail(email, password);
            router.push('/admin');
        } catch (err) {
            setError(err.message || 'Failed to login as admin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen text-[#f0ead6] selection:bg-oceanic-blue/20">
            {/* Cinematic Glassmorphic Background Layer - Starry Night Ocean from layout */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#02070e]">
                <div className="absolute inset-0 opacity-100">
                    <Image
                        src="/images/bg/Image8.jpeg"
                        alt="Admin Portal Background"
                        fill
                        className="object-cover object-center"
                        quality={100}
                        priority
                        unoptimized
                    />
                </div>
                {/* Subtle transparent layer */}
                <div className="absolute inset-0 bg-[#02070e]/15" />
            </div>

            {/* Interactive Admin Login UI */}
            <div className="relative z-10 flex w-full h-full min-h-screen items-center justify-center p-4 lg:p-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <Link href="/" className="mb-6 hover:opacity-80 transition-opacity">
                            <Image
                                src="/images/WOB-black-4.png"
                                alt="Wave of Bengal Logo"
                                width={180} height={60} quality={100} unoptimized
                                className="object-contain h-10 w-auto invert drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
                                priority
                            />
                        </Link>
                        <h1 className="text-3xl font-heading font-medium tracking-wide text-white drop-shadow-md">Admin Portal</h1>
                        <p className="text-white/60 mt-2 text-sm text-center">Secure access for system administrators.</p>
                    </div>

                    {error && (
                        <div className="bg-rose-500/10 text-rose-400 text-sm p-3 rounded-xl mb-6 text-center border border-rose-500/20 font-medium tracking-wide">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailLogin} className="space-y-6 flex-grow">
                        {/* Email */}
                        <div>
                            <label className="block text-white/50 text-[11px] uppercase tracking-widest font-bold mb-2.5 pl-4">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@waveofbengal.com"
                                className="w-full bg-white/5 border border-white/10 shadow-inner rounded-2xl py-4 px-6 text-white placeholder-white/30 focus:ring-1 focus:ring-white/30 focus:border-white/30 outline-none transition-all duration-300 text-sm tracking-wide"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-white/50 text-[11px] uppercase tracking-widest font-bold mb-2.5 pl-4">Secure Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className="w-full bg-white/5 border border-white/10 shadow-inner rounded-2xl py-4 pl-6 pr-12 text-white placeholder-white/30 focus:ring-1 focus:ring-white/30 focus:border-white/30 outline-none transition-all duration-300 text-sm tracking-[0.2em]"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-5 flex items-center text-white/40 hover:text-white transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium tracking-wide py-4 rounded-2xl shadow-lg transition-all duration-300 ease-out flex justify-center items-center gap-2 hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : 'Authenticate'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 flex justify-center">
                        <Link href="/" className="text-white/40 hover:text-white text-xs tracking-wider uppercase font-medium transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Return to Website
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
