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
        <div className="relative min-h-screen bg-[#0a1628] text-white">

            {/* ═══════════ SPLIT SCREEN HERO ═══════════ */}
            <div className="relative flex flex-col lg:flex-row min-h-screen pt-16 lg:pt-0">

                {/* Left Side: Atmospheric Image */}
                <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen overflow-hidden">
                    <Image
                        src="/images/boat-story.png"
                        alt="Fishing boat at night"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Atmospheric lighting dots (Particles) */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/20 rounded-full blur-[1px]"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0.2, 0.7, 0.2],
                                    scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                    {/* Shadow overlay to blend with right side */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0a1628]/40 lg:to-[#0a1628]" />
                </div>

                {/* Right Side: Content Area */}
                <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-screen bg-[#0a1628] flex items-center justify-center p-8 lg:p-24 flex-col text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white mb-8 tracking-tight drop-shadow-md">
                            Brand Story
                        </h1>

                        <div className="space-y-6 text-lg md:text-xl text-[#f5f0e8]/80 font-light leading-relaxed">
                            <p>
                                Since 1952, Wave of Bengal has been more than just a name—it's a testament to the relationship between man and the deep sea. Our story began with our grandfather's wooden trawler and a promise to honor the ocean.
                            </p>
                            <p>
                                For three generations, we have perfected the art of sustainable fishing, ensuring that every catch is not only premium in quality but also ethically sourced. We believe that true freshness has no shortcut.
                            </p>
                            <p>
                                Today, we combine traditional wisdom with state-of-the-art cold chain technology to bring the finest treasures of the Bay of Bengal directly to your doorstep, exactly as nature intended.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Link
                                href="/products"
                                className="inline-block px-10 py-4 border-2 border-white/40 text-white font-bold uppercase tracking-widest text-sm rounded-md hover:bg-white/10 hover:border-white transition-all duration-300 shadow-sm"
                            >
                                Shop Fresh Catch
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Pagination dots (Visual only, per reference) */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-3/4 flex gap-3 z-20">
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
            </div>

            {/* ═══════════ TIMELINE / HERITAGE SECTION ═══════════ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-[#c5a061] uppercase tracking-[0.25em] text-sm font-bold mb-4 block">Legacy</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-white drop-shadow-lg leading-tight uppercase tracking-widest">
                        A Journey of Decades
                    </h2>
                    <div className="w-24 h-px bg-[#c5a061] mx-auto mt-8" />
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 h-full w-px bg-white/10 -translate-x-px"></div>

                    <div className="space-y-32">
                        {timeline.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Year Marker */}
                                <div className="absolute left-[10px] md:left-1/2 w-5 h-5 bg-[#c5a061] rounded-full -translate-x-px border-4 border-[#0a1628] z-10 shadow-[0_0_15px_rgba(197,160,97,0.4)]"></div>

                                {/* Content Card */}
                                <div className="hidden md:block w-5/12 text-center md:text-left">
                                    <span className="text-6xl lg:text-8xl font-heading font-black text-white/5 opacity-40 select-none">{item.year}</span>
                                </div>

                                <div className="w-full pl-12 md:pl-0 md:w-5/12 mt-4 md:mt-0">
                                    <div className="p-8 border-l border-white/10 bg-white/5 backdrop-blur-md rounded-r-2xl md:rounded-2xl md:border-l-0 hover:bg-white/10 transition-colors">
                                        <h3 className="text-2xl font-heading font-bold text-[#c5a061] mb-2">{item.title}</h3>
                                        <p className="text-[#f5f0e8]/70 leading-relaxed italic mb-4 text-sm uppercase tracking-widest">{item.highlight}</p>
                                        <p className="text-[#f5f0e8]/90 leading-relaxed font-light">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════ VALUES SECTION ═══════════ */}
            <div className="bg-white/2 py-24 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-4xl font-heading font-black text-white uppercase tracking-widest">Our Guiding Values</h2>
                    <div className="w-16 h-px bg-[#c5a061] mx-auto mt-6" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:border-[#c5a061]/30 transition-all duration-300"
                        >
                            <span className="text-4xl block mb-6">{value.icon}</span>
                            <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide">{value.title}</h3>
                            <p className="text-[#f5f0e8]/70 font-light leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer space */}
            <div className="py-20" />

        </div>
    );
}
