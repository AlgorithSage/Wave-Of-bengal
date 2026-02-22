'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LandingPage({ onEnter }) {
    const router = useRouter();

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
                            onClick={() => router.push('/login')}
                            className="w-full sm:w-auto font-body font-semibold py-3.5 px-12 rounded-full uppercase tracking-widest text-sm text-white/80 hover:text-white border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </button>
                    </div>

                </div>
            </motion.div>

        </section>
    );
}
