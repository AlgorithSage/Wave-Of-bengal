'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LandingPage({ onEnter }) {
    return (
        <section className="fixed inset-0 z-100 w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-heading text-white">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                {/* Restaurant Background Image */}
                <Image
                    src="/images/gemini_bg_reference.png"
                    alt="Wave of Bengal Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Main Content inside the frame */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-12 sm:pb-24">
                {/* Version Badge & Button */}
                <div className="flex flex-col items-center">
                    <button
                        onClick={onEnter}
                        className="mb-4 bg-[#d97736] hover:bg-[#b85b20] text-white font-bold py-3 px-12 rounded-full uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(217,119,54,0.4)]"
                    >
                        Dive In
                    </button>
                    <div className="font-bold tracking-widest text-lg md:text-xl text-white/80 drop-shadow-md">
                        V-1.6
                    </div>
                </div>
            </div>
        </section>
    );
}
