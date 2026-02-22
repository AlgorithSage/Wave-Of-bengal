'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

// MOCK_PRODUCTS and CATEGORIES are unchanged
const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Jumbo Black Tiger Shrimp',
        description: 'Wild-caught from the deep waters of the Bay of Bengal. Firm texture and sweet flavor, perfect for grilling.',
        price: 24.99,
        category: 'Shrimp',
        weight: '1 lb (16-20 count)',
        image: '/images/black tiger.jpeg',
        tags: ['Wild Caught', 'Best Seller']
    },
    {
        id: '2',
        name: 'Premium Butter Prawns',
        description: 'Delicately shelled and marinated in a rich, artisanal garlic herb butter. Ready to pan-sear in minutes.',
        price: 28.50,
        category: 'Prawns',
        weight: '1 lb',
        image: '/images/butter prawns .jpeg',
        tags: ['Pre-Marinated', 'Chef Choice']
    },
    {
        id: '3',
        name: 'Ocean Skewers',
        description: 'Perfectly portioned tiger prawn skewers, interlaced with organic bell peppers and mild spices for effortless entertaining.',
        price: 18.99,
        category: 'Ready to Cook',
        weight: '4 Skewers (12oz)',
        image: '/images/skewers.jpeg',
        tags: ['Party Ready']
    },
    {
        id: '4',
        name: 'Colossal King Prawns',
        description: 'The crown jewel of our catch. Massive, meaty prawns with unparalleled sweetness. Shell-on for maximum flavor retention.',
        price: 38.00,
        category: 'Prawns',
        weight: '1 lb (8-12 count)',
        image: '/images/black tiger.jpeg',
        tags: ['Limited Availability']
    },
    {
        id: '5',
        name: 'Peeled & Deveined Medium Shrimp',
        description: 'Everyday premium shrimp, peeled, deveined, and tail-off for ultimate convenience in pastas and stir-fries.',
        price: 19.99,
        category: 'Shrimp',
        weight: '1 lb (31-40 count)',
        image: '/images/butter prawns .jpeg',
        tags: ['Convenience']
    },
    {
        id: '6',
        name: 'Spicy Tandoori Skewers',
        description: 'Our signature ocean skewers generously coated in authentic, aromatic tandoori spices. A fusion of land and sea.',
        price: 19.50,
        category: 'Ready to Cook',
        weight: '4 Skewers (12oz)',
        image: '/images/skewers.jpeg',
        tags: ['Spicy']
    }
];

const CATEGORIES = ['All', 'Shrimp', 'Prawns', 'Ready to Cook'];

export default function ProductsPage() {
    const { addToCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Using native HTML video loop attribute for performance and stability

    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
            {/* Standard Background Video Loop */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="fixed inset-0 w-full h-full object-cover z-0"
            >
                <source src="/bg/productg.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay for better text legibility */}
            <div className="fixed inset-0 bg-black/50 z-0" />

            {/* Main Content Container (relative to sit above video/overlay) */}
            <div className="relative z-10">
                {/* Header Section */}
                <div className="relative py-16 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-6 drop-shadow-xl text-white"
                        >
                            Our <span className="text-gold italic">Fresh Catch</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md"
                        >
                            Explore our premium selection of wild-caught, sustainably sourced seafood.
                            Delivered from the bay to your kitchen.
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Search & Filter Bar - Glassmorphic */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-3">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === category
                                        ? 'bg-gold text-white shadow-[0_4px_12px_rgba(245,158,11,0.4)] border border-transparent'
                                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search Input - Glassmorphic */}
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Search fresh catch..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-full py-3 pl-5 pr-12 text-white font-medium focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all placeholder:text-white/50 shadow-inner"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        className="group flex flex-col glass-card hover:border-gold/50 hover:-translate-y-2 z-10"
                                    >
                                        {/* Image Area - Glass styling */}
                                        <div className="relative h-72 overflow-hidden bg-black/20">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 mix-blend-overlay"
                                            />
                                            {/* Inner gradient for smooth blend with content area */}
                                            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent z-10" />

                                            {/* Tags - Glassmorphic */}
                                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                                                {product.tags.map(tag => (
                                                    <span key={tag} className="bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Content Area - Glassmorphic */}
                                        <div className="p-6 flex flex-col grow relative z-20 bg-linear-to-b from-black/60 to-black/40 text-white border-t border-white/10">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-2xl font-heading font-black group-hover:text-gold transition-colors pr-2 drop-shadow-md text-sky-300">
                                                    {product.name}
                                                </h3>
                                                <span className="text-2xl font-black text-gold drop-shadow-lg whitespace-nowrap">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                            </div>

                                            <span className="text-white/70 text-sm font-bold mb-4 uppercase tracking-wider">{product.weight}</span>
                                            <p className="text-white/80 text-sm leading-relaxed mb-8 grow font-medium">
                                                {product.description}
                                            </p>

                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full py-4 border border-white/30 text-white hover:bg-gold hover:border-gold hover:text-ocean-deep font-bold rounded-xl uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl text-white"
                        >
                            <svg className="w-16 h-16 text-white/50 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h3 className="text-2xl font-heading font-black mb-3 text-gold">No catch found</h3>
                            <p className="text-white/70 font-medium mb-8">Try adjusting your category or search term to discover our fresh selection.</p>
                            <button
                                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold transition-all shadow-sm"
                            >
                                View All Seafood
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
