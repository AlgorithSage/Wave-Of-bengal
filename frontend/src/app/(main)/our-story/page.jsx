'use client'

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const storyFrames = [
    {
        label: 'Brand Story',
        year: 'Est. 1952',
        heading: 'Brand Story',
        body: [
            "Since 1952, Wave of Bengal has been more than just a name — it's a testament to the relationship between man and the deep sea.",
            "Our story began with our grandfather's wooden trawler and a promise to honor the ocean that had sustained generations of fishermen before him.",
            "Today, we combine traditional wisdom with state-of-the-art cold chain technology to bring the finest treasures directly to your doorstep.",
        ],
        cta: { label: 'Shop Fresh Catch', href: '/products' },
        scrollHint: true,
    },
    {
        label: 'The Beginning',
        year: '1952',
        heading: 'The Beginning',
        highlight: 'Where it all began',
        body: [
            "Our grandfather first set sail in the Bay of Bengal, learning the ancient art of sustainable fishing from generations before him.",
            "With a small wooden boat and big dreams, he began a legacy that would span over seven decades.",
        ],
    },
    {
        label: 'Expanding Horizons',
        year: '1978',
        heading: 'Expanding Horizons',
        highlight: 'Growth & tradition',
        body: [
            "The second generation took the helm, modernizing our fleet while preserving traditional fishing methods.",
            "We began supplying to local markets, building relationships that last to this day.",
        ],
    },
    {
        label: 'Premium Quality Focus',
        year: '2005',
        heading: 'Premium Quality Focus',
        highlight: 'Excellence redefined',
        body: [
            "We invested in cold chain infrastructure and quality control, ensuring that every catch reaches customers at peak freshness.",
            "Our reputation for premium seafood began to spread across regions.",
        ],
    },
    {
        label: 'Digital Transformation',
        year: '2020',
        heading: 'Digital Transformation',
        highlight: 'A new chapter',
        body: [
            "Wave of Bengal was born — bringing our 70-year heritage directly to your doorstep.",
            "Same quality, same values, now accessible to seafood lovers across India through technology.",
        ],
    },
    {
        label: 'Ocean to Doorstep',
        year: 'Today',
        heading: 'Ocean to Doorstep',
        highlight: 'Legacy lives on',
        body: [
            "We continue to honor our grandfather's vision — sustainable fishing, uncompromising quality, and a deep respect for the ocean.",
            "The journey continues.",
        ],
        cta: { label: 'Shop Fresh Catch', href: '/products' }
    },
];

function StoryFrame({ frame, scrollYProgress, index, total }) {
    const start = index / total;
    const end = (index + 1) / total;
    // Frame 0 must be fully visible at scroll=0 (no fade-in delay)
    const opacityInput = index === 0
        ? [0, end - 0.05, end]
        : [start, start + 0.05, end - 0.05, end];
    const opacityOutput = index === 0
        ? [1, 1, 0]
        : [0, 1, 1, 0];
    const yInput = index === 0
        ? [0, end - 0.05, end]
        : [start, start + 0.05, end - 0.05, end];
    const yOutput = index === 0
        ? [0, 0, -40]
        : [40, 0, 0, -40];
    const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
    const y = useTransform(scrollYProgress, yInput, yOutput);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col justify-center px-12 lg:px-20 py-16"
        >
            <span className="text-[#c5a061] text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                {frame.year}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-black text-white mb-3 tracking-tight leading-tight">
                {frame.heading}
            </h2>
            {frame.highlight && (
                <p className="text-[#f5f0e8]/50 italic uppercase tracking-widest text-xs mb-7">{frame.highlight}</p>
            )}
            <div className="space-y-4 text-base md:text-lg text-[#f5f0e8]/75 font-light leading-relaxed max-w-lg">
                {frame.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {frame.cta && (
                <div className="mt-10">
                    <Link
                        href={frame.cta.href}
                        className="inline-block px-8 py-3.5 border-2 border-white/40 text-white font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 hover:border-white transition-all duration-300"
                    >
                        {frame.cta.label}
                    </Link>
                </div>
            )}
            {frame.scrollHint && (
                <div className="mt-12 flex items-center gap-3 text-white/30">
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                    <span className="text-xs uppercase tracking-widest font-semibold">Scroll to explore our journey</span>
                </div>
            )}
        </motion.div>
    );
}

function StoryDot({ scrollYProgress, index, total, label }) {
    const start = index / total;
    const mid = (index + 0.5) / total;
    const end = (index + 1) / total;
    const opacity = useTransform(scrollYProgress, [start, mid, end], [0.25, 1, 0.25]);
    const scale = useTransform(scrollYProgress, [start, mid, end], [0.7, 1.4, 0.7]);
    return (
        <motion.div
            style={{ opacity, scale }}
            className="w-2 h-2 rounded-full bg-[#c5a061]"
            title={label}
        />
    );
}

function StoryHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const numFrames = storyFrames.length;

    return (
        <div
            ref={containerRef}
            className="relative z-10 pt-16"
            style={{ height: `${numFrames * 100}vh` }}
        >
            {/* Sticky wrapper — left and right both stick */}
            <div className="sticky top-0 h-screen flex overflow-hidden">

                {/* LEFT: constant boat image */}
                <div className="relative w-1/2 h-full shrink-0 overflow-hidden">
                    <Image
                        src="/images/boat-story.png"
                        alt="Fishing boat at night"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Atmospheric particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(14)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-white/25 rounded-full blur-[1px]"
                                style={{
                                    top: `${(i * 17 + 5) % 95}%`,
                                    left: `${(i * 13 + 8) % 92}%`,
                                }}
                                animate={{ opacity: [0.15, 0.65, 0.15], scale: [0.7, 1.3, 0.7] }}
                                transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                            />
                        ))}
                    </div>
                    {/* Gradient edge to blend */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0a1628]" />
                </div>

                {/* RIGHT: parallax frames */}
                <div className="relative w-1/2 h-full bg-[#0a1628]">
                    {storyFrames.map((frame, i) => (
                        <StoryFrame
                            key={i}
                            frame={frame}
                            scrollYProgress={scrollYProgress}
                            index={i}
                            total={numFrames}
                        />
                    ))}

                    {/* Dot nav indicator */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                        {storyFrames.map((f, i) => (
                            <StoryDot
                                key={i}
                                scrollYProgress={scrollYProgress}
                                index={i}
                                total={numFrames}
                                label={f.label}
                            />
                        ))}
                    </div>

                    {/* Scroll progress bar along bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
                        <motion.div
                            className="h-full bg-[#c5a061]/60"
                            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}





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




export default function OurStory() {
    return (
        <div className="relative min-h-screen bg-[#0a1628] text-white">

            {/* ═══════════ STICKY LEFT / PARALLAX RIGHT — full journey ═══════════ */}
            <StoryHero />


            {/* Fixed Background Image (below hero) */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/bg/admin-bg.jpeg"
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-[#0a1628]/60" />
            </div>



            {/* ═══════════ VALUES SECTION ═══════════ */}
            <div className="relative z-10 bg-white/2 py-24 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-4xl font-fraunces font-black text-white uppercase tracking-widest">Our Guiding Values</h2>
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
                            <h3 className="text-xl font-playfair font-bold text-white mb-4 uppercase tracking-wide">{value.title}</h3>
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
