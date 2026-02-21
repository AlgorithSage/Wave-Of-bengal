'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);

    // Parallax effects
    const bgY = useTransform(scrollY, [0, 800], ['0%', '20%']);
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const textY = useTransform(scrollY, [0, 300], ['0%', '50%']);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevent hydration errors with framer-motion

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            {/* Background Image/Video Container with Parallax */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
            >
                <div className="absolute inset-0 bg-ocean-dark/40 z-10"></div>
                <div className="absolute inset-0 bg-linear-to-b from-ocean-dark/60 via-transparent to-ocean-dark z-10"></div>

                {/* Placeholder for high-quality video or image */}
                <div className="w-full h-full bg-linear-to-tr from-[#05141e] to-[#0a2530]" />
            </motion.div>

            {/* Hero Content */}
            <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-[-10vh]"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-light tracking-tight mb-6 drop-shadow-lg"
                >
                    Fresh From Ocean to <br className="hidden md:block" />
                    <span className="text-gold italic">Your Doorstep</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    className="text-lg md:text-xl text-text-light/90 mb-10 max-w-2xl mx-auto font-light"
                >
                    Premium, wild-caught and sustainably sourced seafood. Delivered exactly how you want it, exactly when you need it.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                >
                    <Link
                        href="/products"
                        className="inline-block bg-gold hover:bg-gold-light text-ocean-dark font-semibold py-4 px-10 rounded uppercase tracking-widest transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(201,169,98,0.2)] hover:shadow-[0_0_30px_rgba(201,169,98,0.4)]"
                    >
                        Explore Fresh Catch
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll indicator down arrow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
            >
                <span className="text-xs uppercase tracking-widest text-gold mb-2 font-medium">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-px h-12 bg-linear-to-b from-gold to-transparent"
                />
            </motion.div>
        </section>
    );
}
