'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SustainabilityBanner() {
    return (
        <section className="relative overflow-hidden py-16 lg:py-24 bg-ocean-dark border-t border-b border-wob-gold/15">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-10">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-3/5"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <svg className="w-6 h-6 text-wob-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-wob-green uppercase tracking-widest text-sm font-semibold">Our Commitment</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-light mb-6">
                        Beyond the Catch
                    </h2>
                    <p className="text-lg text-text-light/80 font-light leading-relaxed max-w-2xl">
                        We believe that premium seafood originates from a thriving ocean. Our fishing
                        partners adhere to strict quotas, avoiding overfished zones and prioritizing
                        methods that eliminate bycatch. We bring you the ocean's finest without compromising its future.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-auto"
                >
                    <Link
                        href="/sustainability"
                        className="inline-flex items-center justify-center bg-transparent border-2 border-wob-green text-wob-green hover:bg-wob-green hover:text-ocean-dark font-semibold py-4 px-8 rounded transition-all w-full sm:w-auto shadow-[0_0_15px_rgba(45,138,78,0.15)] hover:shadow-[0_0_25px_rgba(45,138,78,0.3)]"
                    >
                        Learn Our Practices
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
