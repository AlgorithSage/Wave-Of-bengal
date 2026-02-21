'use client'

import { motion } from 'framer-motion';

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
        <div className="bg-sky-light min-h-screen pt-24 pb-20">

            {/* Header — matches Products page */}
            <div className="relative py-20 bg-sky-light overflow-hidden mb-12 border-b border-oceanic-blue/10">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-sky-light opacity-90 z-10" />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-ocean-deep mb-6"
                    >
                        A Legacy of the <span className="text-oceanic-blue italic">Deep Sea</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-ocean-muted max-w-2xl mx-auto font-medium"
                    >
                        For generations, our family has braved the tempestuous waters of the Bay of Bengal.
                        Wave of Bengal is not just a brand; it is three generations of ocean-faring expertise.
                    </motion.p>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative py-12">
                    {/* Vertical line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-oceanic-blue/20 -translate-x-[0.5px]"></div>

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
                                <div className="absolute left-[16px] md:left-1/2 w-3 h-3 bg-oceanic-blue rounded-full -translate-x-[0.5px] shadow-[0_0_10px_rgba(14,165,233,0.5)] z-10"></div>

                                {/* Spacing */}
                                <div className="hidden md:block md:w-5/12"></div>

                                {/* Content */}
                                <div className="w-full pl-12 md:pl-0 md:w-5/12">
                                    <div className={`bg-white/70 backdrop-blur-sm border border-oceanic-blue/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow ${idx % 2 === 0 ? 'md:mr-8 text-left md:text-right' : 'md:ml-8 text-left'}`}>
                                        <span className="text-oceanic-blue font-heading text-2xl font-bold mb-2 block">{item.year}</span>
                                        <h3 className="text-xl font-heading font-bold text-ocean-deep mb-3">{item.title}</h3>
                                        <p className="text-ocean-muted text-sm leading-relaxed font-medium">{item.description}</p>
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
