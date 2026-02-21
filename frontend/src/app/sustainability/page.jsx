'use client'

import { motion } from 'framer-motion';

const pillars = [
    {
        title: "Quota-Based Sourcing",
        description: "We work strictly within government and ecological quotas. When a species needs time to replenish, we remove it from our catalog. No exceptions.",
        icon: (
            <svg className="w-10 h-10 text-wob-green mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        )
    },
    {
        title: "Zero Bycatch Policy",
        description: "Our fishers utilize selective gear designed to target specific species, drastically reducing the unintended capture of marine life.",
        icon: (
            <svg className="w-10 h-10 text-wob-green mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
        )
    },
    {
        title: "Fair Trade Communities",
        description: "Sustainability applies to people, too. We guarantee fair wages and direct trade with local fishing communities, removing exploitative middlemen.",
        icon: (
            <svg className="w-10 h-10 text-wob-green mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        )
    }
];

export default function Sustainability() {
    return (
        <div className="bg-ocean-dark min-h-screen pt-24 pb-20">

            {/* Hero Section */}
            <div className="relative py-20 overflow-hidden bg-ocean-teal/40 border-b border-wob-gold/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-text-light mb-6"
                    >
                        Protecting Our <span className="text-wob-green italic">Oceans</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto"
                    >
                        We take only what nature can replenish. Our commitment to sustainability isn't just a label—it's the core operational principle of Wave of Bengal.
                    </motion.p>
                </div>
            </div>

            {/* Pillars Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-heading font-bold mb-4 text-gold">The Three Pillars</h2>
                    <div className="w-16 h-1 bg-wob-green mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="bg-ocean-dark rounded-xl p-8 border border-wob-gold/10 hover:border-wob-green/50 transition-colors shadow-lg shadow-wob-green/5 group"
                        >
                            <div className="flex justify-center transform group-hover:-translate-y-2 transition-transform duration-300">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-heading font-semibold text-text-light mb-4">{pillar.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">{pillar.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Impact Numbers */}
            <div className="bg-wob-green/10 border-y border-wob-green/20 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <p className="text-4xl md:text-5xl font-bold text-wob-green mb-2">100%</p>
                            <p className="text-text-light font-medium uppercase tracking-wider text-sm">Traceable Catch</p>
                        </div>
                        <div className="p-6">
                            <p className="text-4xl md:text-5xl font-bold text-wob-green mb-2">0</p>
                            <p className="text-text-light font-medium uppercase tracking-wider text-sm">Protected Species Harvested</p>
                        </div>
                        <div className="p-6">
                            <p className="text-4xl md:text-5xl font-bold text-wob-green mb-2">45+</p>
                            <p className="text-text-light font-medium uppercase tracking-wider text-sm">Local Families Supported</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
