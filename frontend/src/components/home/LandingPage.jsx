'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LandingPage({ onEnter }) {
    return (
        <section className="fixed inset-0 z-100 w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 overflow-hidden font-heading text-white">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                {/* A high-quality placeholder image for a dark elegant restaurant */}
                <Image
                    src="/images/gemini_bg_reference.png"
                    alt="Restaurant Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Vignette Gradients to match the mood */}
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black/90 z-10"></div>
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-black/80 z-10"></div>
            </div>

            {/* Vintage Frame / Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-20 w-full max-w-6xl h-auto min-h-[80vh] flex flex-col items-center justify-center border-[1.5px] border-white/20 rounded-[40px] p-6 lg:p-16 shadow-2xl backdrop-blur-[2px] bg-black/20"
            >
                {/* Corner Ornaments */}
                <div className="absolute top-6 left-6 w-16 h-16 border-t-[1.5px] border-l-[1.5px] border-white/40 rounded-tl-3xl opacity-70 hidden sm:block"></div>
                <div className="absolute top-6 right-6 w-16 h-16 border-t-[1.5px] border-r-[1.5px] border-white/40 rounded-tr-3xl opacity-70 hidden sm:block"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 border-b-[1.5px] border-l-[1.5px] border-white/40 rounded-bl-3xl opacity-70 hidden sm:block"></div>
                <div className="absolute bottom-6 right-6 w-16 h-16 border-b-[1.5px] border-r-[1.5px] border-white/40 rounded-br-3xl opacity-70 hidden sm:block"></div>

                {/* Top Subtle Ornament Icon */}
                <div className="absolute top-10 text-white/40 hidden sm:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.4 7.6H22l-6.4 4.8 2.4 7.6-6.4-4.8-6.4 4.8 2.4-7.6-6.4-4.8h7.6z" className="drop-shadow-lg" />
                    </svg>
                </div>

                {/* Main Content inside the frame */}
                <div className="flex flex-col items-center justify-center text-center space-y-8 mt-4 sm:mt-12 mb-8">

                    {/* Logo Area */}
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold italic tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'var(--font-heading)' }}>
                            WantEat
                        </h1>
                        <h2 className="text-[#d97736] text-sm md:text-lg tracking-[0.4em] font-sans font-bold uppercase drop-shadow-md mt-4">
                            Restaurant
                        </h2>
                    </div>

                    {/* Subtitle / Description */}
                    <div className="mt-8 border-t border-b border-white/20 py-4 px-8 w-full max-w-2xl bg-black/20 backdrop-blur-sm rounded-lg sm:border-none sm:bg-transparent sm:backdrop-blur-none sm:px-0">
                        <p className="text-base sm:text-xl md:text-[1.4rem] tracking-[0.2em] md:tracking-[0.3em] font-medium drop-shadow-lg uppercase text-white/90 leading-relaxed">
                            Restaurant - Cafe - Pub <span className="text-white/60 mx-2">|</span> Template
                        </p>
                    </div>

                    {/* Stars Area */}
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-12 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-5 h-5 sm:w-6 sm:h-6 text-[#d97736] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>

                    {/* Version Badge & Button */}
                    <div className="absolute bottom-6 sm:bottom-10 flex flex-col items-center">
                        <button
                            onClick={onEnter}
                            className="mb-4 bg-[#d97736] hover:bg-[#b85b20] text-white font-bold py-3 px-10 rounded-full uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(217,119,54,0.4)]"
                        >
                            Dive In
                        </button>
                        <div className="font-bold tracking-widest text-lg md:text-xl text-white/80 drop-shadow-md">
                            V-1.6
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
