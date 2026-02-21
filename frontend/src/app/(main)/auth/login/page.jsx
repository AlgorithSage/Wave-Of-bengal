'use client'

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
            router.push('/');
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
            router.push('/');
        } catch (err) {
            setError(err.message || 'Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] relative overflow-hidden p-4">
            {/* Soft Radial Glow Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-light/80 via-[#FAFAFA] to-[#FAFAFA]"></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 bg-white p-8 md:p-10 rounded-2xl border-[0.5px] border-ocean-muted/20 w-full max-w-md shadow-[0_24px_50px_-12px_rgba(10,31,46,0.06)]"
            >
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                    <motion.h1 variants={itemVariants} className="text-3xl font-heading font-black text-ocean-deep mb-8 text-center tracking-tight">
                        Welcome Back
                    </motion.h1>

                    {error && (
                        <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium flex items-start gap-2">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleEmailLogin} className="space-y-5">
                        <motion.div variants={itemVariants}>
                            <label className="block text-ocean-deep font-bold text-sm mb-1.5 ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ocean-muted group-focus-within:text-oceanic-blue transition-colors">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border-transparent rounded-xl py-3.5 pl-11 pr-4 text-ocean-deep font-medium placeholder-ocean-muted/50 focus:bg-white focus:border-oceanic-blue focus:ring-2 focus:ring-oceanic-blue/20 outline-none transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <label className="block text-ocean-deep font-bold text-sm mb-1.5 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ocean-muted group-focus-within:text-oceanic-blue transition-colors">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border-transparent rounded-xl py-3.5 pl-11 pr-12 text-ocean-deep font-medium placeholder-ocean-muted/50 focus:bg-white focus:border-oceanic-blue focus:ring-2 focus:ring-oceanic-blue/20 outline-none transition-all"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-ocean-muted hover:text-ocean-deep transition-colors">
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full overflow-hidden bg-ocean-deep hover:bg-oceanic-blue text-white font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(10,31,46,0.39)] hover:shadow-[0_6px_20px_rgba(10,31,46,0.23)] disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : 'Sign In'}
                            </button>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="mt-7 flex items-center justify-between">
                        <span className="border-b border-ocean-muted/20 w-1/4"></span>
                        <span className="text-[11px] text-center font-bold text-ocean-muted uppercase tracking-[0.15em]">or login with</span>
                        <span className="border-b border-ocean-muted/20 w-1/4"></span>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full mt-7 bg-white border border-ocean-muted/20 text-ocean-deep hover:bg-slate-50 py-3.5 px-4 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Continue with Google
                        </button>
                    </motion.div>

                    <motion.p variants={itemVariants} className="mt-8 text-center text-ocean-muted font-medium text-sm">
                        New to Wave of Bengal? <Link href="/auth/register" className="text-oceanic-blue font-bold hover:text-ocean-deep hover:underline transition-colors ml-1">Create an account</Link>
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    );
}
