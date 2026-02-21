'use client'

import { motion } from 'framer-motion';

const certifications = [
    {
        category: "Safety & Hygiene",
        items: [
            {
                name: "FSSAI Registered",
                desc: "Food Safety and Standards Authority of India certified for hygienic processing and packaging.",
                icon: (
                    <svg className="w-12 h-12 text-gold opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                )
            },
            {
                name: "HACCP Certified",
                desc: "Hazard Analysis Critical Control Point system applied across our entire cold chain logistics flow.",
                icon: (
                    <svg className="w-12 h-12 text-gold opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                )
            }
        ]
    },
    {
        category: "Quality Assurance",
        items: [
            {
                name: "Antibiotic Free",
                desc: "Our catch is 100% wild and free from any synthetic antibiotics or growth hormones often found in farmed fish.",
                icon: (
                    <svg className="w-12 h-12 text-gold opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                )
            },
            {
                name: "Lab Tested Batches",
                desc: "Randomized batches are sent for heavy metal and toxin testing to ensure absolute consumption safety.",
                icon: (
                    <svg className="w-12 h-12 text-gold opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /></svg>
                )
            }
        ]
    }
];

export default function Certifications() {
    return (
        <div className="bg-ocean-dark min-h-screen pt-24 pb-20">

            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-text-light mb-6"
                    >
                        Uncompromising <span className="text-gold italic">Quality</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-text-muted leading-relaxed"
                    >
                        Trust isn't given; it's earned. We back our commitment to premium seafood with
                        rigorous testing, industry-leading certifications, and absolute transparency.
                    </motion.p>
                </div>

                {/* Categories */}
                <div className="space-y-20">
                    {certifications.map((section, sectionIdx) => (
                        <div key={sectionIdx} className="relative">

                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-2xl font-heading font-semibold text-text-light whitespace-nowrap">{section.category}</h2>
                                <div className="w-full h-px bg-wob-gold/20"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {section.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={itemIdx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: itemIdx * 0.15 }}
                                        className="flex flex-col sm:flex-row gap-6 bg-ocean-teal/60 border border-wob-gold/15 p-8 rounded-xl hover:bg-ocean-teal/80 hover:border-wob-gold/30 transition-colors"
                                    >
                                        <div className="shrink-0">
                                            <div className="w-20 h-20 rounded-full bg-ocean-dark border border-wob-gold/20 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-semibold text-text-light mb-2">{item.name}</h3>
                                            <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

                {/* Footer Guarantee */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 p-10 bg-linear-to-r from-wob-gold/5 via-ocean-teal/50 to-wob-gold/5 border border-wob-gold/20 rounded-xl text-center"
                >
                    <h3 className="text-2xl font-heading font-semibold text-gold mb-4">The Wave of Bengal Guarantee</h3>
                    <p className="text-text-light/90 max-w-2xl mx-auto leading-relaxed">
                        If you are ever unsatisfied with the freshness or quality of our catch,
                        contact us within 12 hours of delivery for a complete replacement or refund.
                        No questions asked.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
