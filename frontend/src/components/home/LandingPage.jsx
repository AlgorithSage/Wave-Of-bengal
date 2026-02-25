'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LandingPage({ onEnter }) {
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);

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
                            onClick={() => setShowLoginModal(true)}
                            className="w-full sm:w-auto font-body font-semibold py-3.5 px-12 rounded-full uppercase tracking-widest text-sm text-white/80 hover:text-white border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </button>
                    </div>

                </div>
            </motion.div>

            {/* Login Demarcation Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#050B14]/90 border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-sm relative flex flex-col items-center gap-6"
                        >
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="absolute top-4 right-5 text-white/50 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <h3 className="text-2xl font-heading font-medium tracking-wide text-white mb-2">Select Portal</h3>

                            <div className="flex flex-col gap-4 w-full">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <svg className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-body font-semibold tracking-wider text-white">User Portal</span>
                                </button>

                                <button
                                    onClick={() => router.push('/admin-login')}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#d97736]/10 hover:bg-[#d97736]/30 border border-[#d97736]/30 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <svg className="w-6 h-6 text-[#d97736] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4V6a2 2 0 00-2-2H7a2 2 0 00-2 2v2h4m-4 8v1a2 2 0 002 2h6a2 2 0 002-2v-1M7 4V2M14 4V2M5 10H3M21 10h-2M5 14H3M21 14h-2M5 18H3M21 18h-2" />
                                    </svg>
                                    <span className="font-body font-semibold tracking-wider text-[#d97736] group-hover:text-white transition-colors">Admin Portal</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
