'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import Image from 'next/image';

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
    // Adding more mock products to fill the catalog
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

    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-sky-light min-h-screen pt-24 pb-20">
            {/* Header / Parallax bg */}
            <div className="relative py-20 bg-sky-light overflow-hidden mb-12 border-b border-oceanic-blue/10">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-sky-light opacity-90 z-10" />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-ocean-deep mb-6"
                    >
                        Our <span className="text-oceanic-blue italic">Fresh Catch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-ocean-muted max-w-2xl mx-auto font-medium"
                    >
                        Explore our premium selection of wild-caught, sustainably sourced seafood.
                        Delivered from the bay to your kitchen.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/60 backdrop-blur-md p-4 rounded-xl border border-oceanic-blue/10 shadow-sm">

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-oceanic-blue text-sky-light shadow-[0_4px_12px_rgba(14,165,233,0.3)]'
                                    : 'bg-white text-ocean-muted hover:text-ocean-deep border border-oceanic-blue/20 hover:border-oceanic-blue/40'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search fresh catch..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-oceanic-blue/20 rounded-full py-3 pl-5 pr-12 text-ocean-deep font-medium focus:outline-none focus:border-oceanic-blue focus:ring-2 focus:ring-oceanic-blue/20 transition-all shadow-sm"
                        />
                        <svg className="w-5 h-5 absolute right-4 top-3.5 text-ocean-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="group flex flex-col rounded-xl overflow-hidden bg-linear-to-br from-ocean-teal/80 to-ocean-dark border border-wob-gold/15 shadow-xl hover:border-wob-gold/40 hover:-translate-y-2 transition-all duration-400"
                                >
                                    {/* Image Area */}
                                    <div className="relative h-72 overflow-hidden bg-sky-light/50">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Tags */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {product.tags.map(tag => (
                                                <span key={tag} className="bg-white/90 backdrop-blur-md border border-oceanic-blue/20 text-oceanic-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col grow bg-white">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-heading font-black text-ocean-deep group-hover:text-oceanic-blue transition-colors pr-2">
                                                {product.name}
                                            </h3>
                                            <span className="text-xl font-black text-ocean-deep whitespace-nowrap">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </div>

                                        <span className="text-oceanic-blue text-sm font-bold mb-3">{product.weight}</span>
                                        <p className="text-ocean-muted text-sm leading-relaxed mb-6 grow font-medium">
                                            {product.description}
                                        </p>

                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full py-3 border-2 border-oceanic-blue text-oceanic-blue hover:bg-oceanic-blue/10 font-bold rounded-md uppercase tracking-wider transition-all duration-300 flex justify-center items-center gap-2"
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
                        className="text-center py-20 bg-white rounded-xl border border-oceanic-blue/10 shadow-sm"
                    >
                        <svg className="w-16 h-16 text-ocean-muted mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h3 className="text-xl font-heading text-ocean-deep font-bold mb-2">No catch found</h3>
                        <p className="text-ocean-muted font-medium">Try adjusting your category or search term.</p>
                        <button
                            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                            className="mt-6 text-oceanic-blue font-bold hover:text-ocean-deep underline underline-offset-4 transition-colors"
                        >
                            View all selection
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
