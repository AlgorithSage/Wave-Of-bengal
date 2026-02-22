'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';

// Mock data mapped to actual uploaded product media
const MOCK_FEATURED = [
    {
        id: "tiger-prawns-1",
        name: "Jumbo Black Tiger Prawns",
        price: 24.99,
        weight: "1 lb",
        image: "/images/black tiger.jpeg"
    },
    {
        id: "pomfret-1",
        name: "Fresh Butter Prawns",
        price: 28.50,
        weight: "1 lb",
        image: "/images/butter prawns .jpeg"
    },
    {
        id: "salmon-1",
        name: "Ocean Skewers",
        price: 18.99,
        weight: "4 Skewers",
        image: "/images/skewers.jpeg"
    }
];

export default function FeaturedProducts() {
    const { addToCart } = useCart();

    return (
        <section className="py-24 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-heading font-black text-[#FFFDD0] mb-4"
                    >
                        Today's Fresh Catch
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gold mx-auto"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {MOCK_FEATURED.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="group flex flex-col rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 hover:border-white/30 hover:-translate-y-2 transition-all duration-400"
                        >
                            {/* Product Image Wrapper */}
                            <div className="relative h-64 overflow-hidden bg-white/5">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                />
                            </div>

                            {/* Product Details */}
                            <div className="p-6 flex flex-col grow">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl font-heading font-bold text-[#FFFDD0]">{product.name}</h3>
                                    <span className="text-white/80 font-bold bg-white/10 border border-white/20 px-2 py-1 rounded text-sm">{product.weight}</span>
                                </div>

                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-4 rounded transition-all group-hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold tracking-wide transition-colors"
                    >
                        View Full Catalog
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}
