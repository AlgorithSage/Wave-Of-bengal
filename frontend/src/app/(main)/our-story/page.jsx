'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

const timeline = [
    {
        year: "1982",
        title: "The First Trawler",
        description: "Our grandfather, Apu, launched our first wooden trawler into the Bay of Bengal, establishing a small local supply chain."
    },
    {
        year: "2005",
        title: "Scaling with Sustainability",
        description: "As demand grew, we modernized our fleet while committing to sustainable, quota-based fishing to protect our waters."
    },
    {
        year: "2020",
        title: "Direct to Consumer",
        description: "During the global shift, we pivoted from supplying luxury restaurants to delivering restaurant-grade seafood directly to homes."
    },
    {
        year: "Present",
        title: "Wave of Bengal",
        description: "Today, we stand as the premier luxury seafood provider, marrying our rich heritage with modern, cold-chain logistics."
    }
];

export default function OurStory() {
    return (
        <div className="bg-ocean-dark min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-text-light mb-6"
                    >
                        A Legacy of the <span className="text-gold italic">Deep Sea</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-text-muted leading-relaxed"
                    >
                        For generations, our family has braved the tempestuous waters of the Bay of Bengal.
                        Wave of Bengal is not just a brand; it is three generations of ocean-faring expertise,
                        condensed into the finest catch delivered right to your kitchen.
                    </motion.p>
                </div>

                {/* Timeline Section */}
                <div className="relative py-12">
                    {/* Vertical line connecting nodes */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-wob-gold/20 -translate-x-[0.5px]"></div>

                    <div className="space-y-24">
                        {timeline.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Node marker */}
                                <div className="absolute left-[16px] md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-[0.5px] shadow-[0_0_10px_rgba(201,169,98,0.8)] z-10"></div>

                                {/* Empty div for spacing on Desktop */}
                                <div className="hidden md:block md:w-5/12"></div>

                                {/* Content */}
                                <div className="w-full pl-12 md:pl-0 md:w-5/12">
                                    <div className={`bg-ocean-teal/60 backdrop-blur border border-wob-gold/15 p-8 rounded-xl ${idx % 2 === 0 ? 'md:mr-8 text-left md:text-right' : 'md:ml-8 text-left'}`}>
                                        <span className="text-gold font-heading text-2xl font-bold mb-2 block">{item.year}</span>
                                        <h3 className="text-xl font-semibold text-text-light mb-3">{item.title}</h3>
                                        <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
