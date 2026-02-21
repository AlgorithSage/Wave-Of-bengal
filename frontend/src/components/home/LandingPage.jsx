'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
export default function LandingPage({ onEnter }) {
    return (
        <section className="fixed inset-0 z-100 w-full min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-4 overflow-hidden font-heading text-white">
            
            {/* Background Video Setup */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover object-center scale-105"
                >
                    <source src="/videos/Realistic_Sunset_Video_Generation.mp4" type="video/mp4" />
                </video>
                {/* Dark, subtle warm gradient overlay to let the golden sunset pop while keeping the text highly legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0704]/90 via-[#0b0704]/60 to-[#0b0704]/70 z-10"></div>
            </div>

            {/* Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-20 w-full h-full max-w-7xl max-h-[95vh] p-6 sm:p-12 lg:p-20 flex flex-col items-center justify-center"
            >
                {/* Main Brand Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-none">
                    {/* The Official Wave of Bengal Logo */}
                    <div className="w-full max-w-3xl md:max-w-5xl lg:max-w-6xl px-4 flex justify-center items-center pointer-events-auto">
                        <Image 
                            src="/images/Wave of Bengal Logo.png" 
                            alt="Wave of Bengal Logo" 
                            width={1920} 
                            height={1080} 
                            quality={100}
                            unoptimized
                            className="object-contain w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] mix-blend-screen"
                            priority
                        />
                    </div>
                </div>

                {/* Bottom Action Area */}
                <div className="absolute bottom-8 sm:bottom-12 flex flex-col items-center z-40">
                    <button
                        onClick={onEnter}
                        className="mb-6 bg-[#d97736] hover:bg-[#b85b20] text-white font-bold py-3.5 px-12 rounded-full uppercase tracking-[0.2em] text-sm transition-all hover:scale-105 hover:shadow-[0_4px_24px_rgba(217,119,54,0.5)] border border-[#d97736]/50"
                    >
                        Dive In
                    </button>
                    <div className="font-bold tracking-[0.2em] text-sm text-white/50 relative">
                        <span className="opacity-0 group-hover:opacity-100 absolute -inset-2 blur-md bg-[#d97736]/20 transition-opacity"></span>
                        V-1.6
                    </div>
                </div>

            </motion.div>
        </section>
    );
}
