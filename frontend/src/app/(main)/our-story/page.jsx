'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const timeline = [
    {
        year: "1952",
        title: "The Beginning",
        description: "Our grandfather first set sail in the Bay of Bengal, learning the ancient art of sustainable fishing from generations before him. With a small wooden boat and big dreams, he began a legacy that would span over seven decades.",
        highlight: "Where it all began"
    },
    {
        year: "1978",
        title: "Expanding Horizons",
        description: "The second generation took the helm, modernizing our fleet while preserving traditional fishing methods. We began supplying to local markets, building relationships that last to this day.",
        highlight: "Growth & tradition"
    },
    {
        year: "2005",
        title: "Premium Quality Focus",
        description: "We invested in cold chain infrastructure and quality control, ensuring that every catch reaches customers at peak freshness. Our reputation for premium seafood began to spread across regions.",
        highlight: "Excellence redefined"
    },
    {
        year: "2020",
        title: "Digital Transformation",
        description: "Wave of Bengal was born — bringing our 70-year heritage directly to your doorstep. Same quality, same values, now accessible to seafood lovers across India through technology.",
        highlight: "A new chapter"
    },
    {
        year: "Today",
        title: "Ocean to Doorstep",
        description: "We continue to honor our grandfather's vision — sustainable fishing, uncompromising quality, and a deep respect for the ocean that provides for us all. The journey continues.",
        highlight: "Legacy lives on"
    }
];

const values = [
    {
        icon: "🦐",
        title: "Uncompromising Quality",
        description: "Every catch is hand-selected by our master inspectors. We reject anything that doesn't meet our exacting premium standards — because you deserve only the finest.",
        accent: "from-amber-400 to-orange-500"
    },
    {
        icon: "🌊",
        title: "Ocean Stewardship",
        description: "We practice sustainable fishing methods that protect marine ecosystems. Our commitment ensures thriving oceans for generations yet to come.",
        accent: "from-cyan-400 to-blue-500"
    },
    {
        icon: "🤝",
        title: "Community First",
        description: "We support local fishing communities, ensuring fair wages and sustainable livelihoods for the families who depend on the sea for their daily sustenance.",
        accent: "from-emerald-400 to-green-500"
    },
    {
        icon: "❄️",
        title: "Cold Chain Excellence",
        description: "From the moment of catch to your doorstep delivery, our seafood never breaks the cold chain. Absolute freshness is our non-negotiable guarantee.",
        accent: "from-sky-400 to-indigo-500"
    },
    {
        icon: "🔍",
        title: "Full Transparency",
        description: "Track every product back to its source. Know the exact waters, the fishing method, and the journey your seafood took to reach your table.",
        accent: "from-violet-400 to-purple-500"
    },
    {
        icon: "💚",
        title: "Customer Obsession",
        description: "Your satisfaction is our deepest mission. We're not satisfied until you're absolutely delighted with every order, every time.",
        accent: "from-rose-400 to-pink-500"
    }
];

const team = [
    { icon: "👨‍🍳", name: "Quality Team", role: "Ensuring every catch meets our exacting premium standards with rigorous inspection protocols" },
    { icon: "🚚", name: "Logistics Team", role: "Maintaining the perfect cold chain from the deep sea to your doorstep, guaranteed" },
    { icon: "🎣", name: "Fisher Partners", role: "Skilled artisans of the sea — our most trusted and valued partners in this journey" },
    { icon: "💬", name: "Support Team", role: "Always here to guide you through your premium seafood experience with care" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } }
};

export default function OurStory() {
    return (
        <div className="relative min-h-screen pt-24 pb-20 text-white">

            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/bg/untitled-design.png"
                    alt="Our story background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">

                {/* ═══════════ HERO HEADER ═══════════ */}
                <div className="relative py-28 overflow-hidden mb-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Decorative accent */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="w-32 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-10"
                        />
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block text-[#FFFDD0] uppercase tracking-[0.3em] text-sm font-bold mb-6"
                        >
                            Est. 1952 — Bay of Bengal
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-8 drop-shadow-lg leading-[0.95]"
                        >
                            Our <span className="text-[#FFFDD0] italic">Story</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium drop-shadow-md italic leading-relaxed"
                        >
                            From the fishing boats of Bengal to your table — a journey woven with
                            passion, tradition, and an unwavering pursuit of excellence
                        </motion.p>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                            className="w-32 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent mx-auto mt-10"
                        />
                    </div>
                </div>

                {/* ═══════════ TIMELINE SECTION ═══════════ */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-[#FFFDD0] uppercase tracking-[0.25em] text-sm font-bold mb-4 block">Heritage</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#FFFDD0] drop-shadow-lg">
                            Our Journey
                        </h2>
                        <div className="w-20 h-[3px] bg-linear-to-r from-gold via-gold-light to-gold mx-auto rounded-full mt-6" />
                    </motion.div>

                    <div className="relative py-8">
                        {/* Vertical line */}
                        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-gold via-gold/40 to-transparent -translate-x-[1px]"></div>

                        <div className="space-y-24">
                            {timeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.8 }}
                                    className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Glowing node marker */}
                                    <div className="absolute left-[18px] md:left-1/2 w-5 h-5 bg-gold rounded-full -translate-x-[1px] shadow-[0_0_20px_rgba(245,158,11,0.6),0_0_40px_rgba(245,158,11,0.2)] z-10 border-2 border-white/40"></div>

                                    {/* Spacing */}
                                    <div className="hidden md:block md:w-5/12"></div>

                                    {/* Content Card */}
                                    <div className="w-full pl-14 md:pl-0 md:w-5/12">
                                        <div className={`bg-white/8 backdrop-blur-2xl border border-white/15 p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-white/12 hover:border-gold/30 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(245,158,11,0.15)] transition-all duration-500 group ${idx % 2 === 0 ? 'md:mr-10 text-left md:text-right' : 'md:ml-10 text-left'}`}>
                                            <span className="text-[#FFFDD0]/60 uppercase tracking-[0.2em] text-xs font-bold mb-3 block group-hover:text-[#FFFDD0]/90 transition-colors">{item.highlight}</span>
                                            <span className="text-[#FFFDD0] font-heading text-4xl md:text-5xl font-black mb-3 block">{item.year}</span>
                                            <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-gold-light transition-colors">{item.title}</h3>
                                            <p className="text-white/60 text-base leading-relaxed group-hover:text-white/75 transition-colors">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ═══════════ QUOTE SECTION ═══════════ */}
                <div className="relative py-28 my-16 overflow-hidden">
                    {/* Glass strip background */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-y border-gold/15" />
                    {/* Decorative radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-[#FFFDD0] text-6xl block mb-8 opacity-60">&ldquo;</span>
                            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-heading italic text-white leading-snug mb-10 drop-shadow-lg font-light">
                                The sea has been our family&apos;s partner for three generations. We don&apos;t just fish — we nurture a relationship with the ocean that sustains us all.
                            </blockquote>
                            <div className="w-16 h-[2px] bg-gold/50 mx-auto mb-6" />
                            <p className="text-[#FFFDD0] font-heading text-lg tracking-wide">
                                — Third Generation Fisherman
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* ═══════════ OUR VALUES SECTION ═══════════ */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-[#FFFDD0] uppercase tracking-[0.25em] text-sm font-bold mb-4 block">What We Stand For</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#FFFDD0] drop-shadow-lg">
                            Our Values
                        </h2>
                        <div className="w-20 h-[3px] bg-linear-to-r from-gold via-gold-light to-gold mx-auto rounded-full mt-6" />
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-white/6 backdrop-blur-2xl border border-white/12 p-10 rounded-3xl text-center shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/10 hover:border-gold/25 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(245,158,11,0.12)] transition-all duration-500 group"
                            >
                                {/* Icon container with gradient ring */}
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${value.accent} opacity-15 group-hover:opacity-30 transition-opacity duration-500`} />
                                    <div className="relative w-full h-full rounded-2xl border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-[#FFFDD0] mb-4 group-hover:text-[#FFFDD0]/80 transition-colors">{value.title}</h3>
                                <p className="text-white/55 text-base leading-relaxed group-hover:text-white/70 transition-colors">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* ═══════════ TEAM SECTION ═══════════ */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-[#FFFDD0] uppercase tracking-[0.25em] text-sm font-bold mb-4 block">The Crew</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#FFFDD0] drop-shadow-lg">
                            The People Behind <br className="hidden md:block" />Wave of Bengal
                        </h2>
                        <div className="w-20 h-[3px] bg-linear-to-r from-gold via-gold-light to-gold mx-auto rounded-full mt-6 mb-8" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-white/60 text-xl max-w-4xl mx-auto mb-16 leading-relaxed"
                    >
                        We&apos;re a passionate team of seafood lovers, quality experts, and technology enthusiasts — united by a single mission: bringing the ocean&apos;s finest treasures to your table.
                    </motion.p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-white/6 backdrop-blur-2xl border border-white/12 p-10 rounded-3xl text-center shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/10 hover:border-gold/25 hover:-translate-y-3 hover:shadow-[0_16px_48px_rgba(245,158,11,0.1)] transition-all duration-500 group"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-linear-to-br from-gold/20 via-gold/10 to-transparent border-2 border-gold/30 flex items-center justify-center text-5xl group-hover:border-gold/60 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-500">
                                    {member.icon}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-[#FFFDD0] mb-3 group-hover:text-[#FFFDD0]/80 transition-colors">{member.name}</h3>
                                <p className="text-white/55 text-base leading-relaxed italic group-hover:text-white/70 transition-colors">{member.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* ═══════════ CTA SECTION ═══════════ */}
                <div className="relative py-28 mt-16 overflow-hidden">
                    {/* Glass background */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-t border-gold/15" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)]" />

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[#FFFDD0] uppercase tracking-[0.25em] text-sm font-bold mb-6 block">Join Our Journey</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 drop-shadow-lg">
                                Experience the <span className="text-[#FFFDD0] italic">Difference</span>
                            </h2>
                            <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                                Taste the heritage. Feel the freshness. Join thousands of satisfied customers who&apos;ve made Wave of Bengal their trusted choice.
                            </p>
                            <Link
                                href="/products"
                                className="inline-block px-14 py-5 bg-linear-to-r from-gold to-gold-light text-[#FFFDD0] font-bold text-lg uppercase tracking-[0.15em] rounded-2xl hover:-translate-y-2 hover:shadow-[0_16px_60px_rgba(245,158,11,0.35)] transition-all duration-500 shadow-[0_8px_30px_rgba(245,158,11,0.2)]"
                            >
                                Shop Fresh Seafood
                            </Link>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
}
