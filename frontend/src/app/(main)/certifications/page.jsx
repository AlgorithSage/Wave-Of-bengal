'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

const certifications = [
    {
        category: "Safety & Hygiene",
        items: [
            {
                name: "FSSAI Registered",
                desc: "Food Safety and Standards Authority of India certified for hygienic processing and packaging. Our facilities meet the highest standards of food safety compliance.",
                icon: (
                    <svg className="w-12 h-12 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                )
            },
            {
                name: "HACCP Certified",
                desc: "Hazard Analysis Critical Control Point system applied across our entire cold chain logistics flow. Every step is monitored and documented rigorously.",
                icon: (
                    <svg className="w-12 h-12 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                )
            }
        ]
    },
    {
        category: "Quality Assurance",
        items: [
            {
                name: "Antibiotic Free",
                desc: "Our catch is 100% wild and free from any synthetic antibiotics or growth hormones often found in farmed fish. Pure ocean, pure nutrition.",
                icon: (
                    <svg className="w-12 h-12 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                )
            },
            {
                name: "Lab Tested Batches",
                desc: "Randomized batches are sent for heavy metal and toxin testing to ensure absolute consumption safety. Your health is our priority.",
                icon: (
                    <svg className="w-12 h-12 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /></svg>
                )
            }
        ]
    }
];

export default function Certifications() {
    return (
        <div className="relative min-h-screen pt-24 pb-20 text-white">

            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/bg/963b.jpg"
                    alt="Certifications background"
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
                            Standards & Compliance
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-8 drop-shadow-lg leading-[0.95]"
                        >
                            Uncompromising <span className="text-[#FFFDD0] italic">Quality</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium drop-shadow-md italic leading-relaxed"
                        >
                            Trust isn&apos;t given; it&apos;s earned. We back our commitment to premium seafood with
                            rigorous testing, industry-leading certifications, and absolute transparency.
                        </motion.p>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                            className="w-32 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent mx-auto mt-10"
                        />
                    </div>
                </div>

                {/* ═══════════ CERTIFICATIONS ═══════════ */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {certifications.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="relative">

                                {/* Category Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 mb-12"
                                >
                                    <h2 className="text-3xl md:text-4xl font-heading font-black text-[#FFFDD0] whitespace-nowrap drop-shadow-lg">{section.category}</h2>
                                    <div className="w-full h-[2px] bg-linear-to-r from-white/30 to-transparent"></div>
                                </motion.div>

                                {/* Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {section.items.map((item, itemIdx) => (
                                        <motion.div
                                            key={itemIdx}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.7, delay: itemIdx * 0.15 }}
                                            className="flex flex-col sm:flex-row gap-8 glass-card p-10 hover:border-gold/25 hover:-translate-y-2 transition-all duration-500 group"
                                        >
                                            <div className="shrink-0">
                                                <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-white/15 via-white/5 to-transparent border border-white/15 flex items-center justify-center group-hover:border-gold/30 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-500">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-heading font-bold text-[#FFFDD0] mb-3 group-hover:text-[#FFFDD0]/80 transition-colors">{item.name}</h3>
                                                <p className="text-white/60 text-base leading-relaxed group-hover:text-white/75 transition-colors">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ═══════════ GUARANTEE SECTION ═══════════ */}
                    <div className="relative py-24 mt-20 overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-y border-gold/15 rounded-3xl" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] rounded-3xl" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 text-center px-8"
                        >
                            <span className="text-[#FFFDD0] uppercase tracking-[0.25em] text-sm font-bold mb-6 block">Our Promise</span>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white mb-6 drop-shadow-lg">
                                The Wave of Bengal <span className="text-[#FFFDD0] italic">Guarantee</span>
                            </h3>
                            <div className="w-20 h-[3px] bg-linear-to-r from-gold via-gold-light to-gold mx-auto rounded-full mb-8" />
                            <p className="text-white/65 text-xl max-w-3xl mx-auto leading-relaxed">
                                If you are ever unsatisfied with the freshness or quality of our catch,
                                contact us within 12 hours of delivery for a complete replacement or refund.
                                <span className="block mt-3 text-gold-light font-heading font-bold text-lg tracking-wide">No questions asked.</span>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
