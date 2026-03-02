'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';

// Product Data
const DEFAULT_PRODUCTS = [
    {
        id: 'black-tiger-prawns',
        name: 'Black Tiger Prawns',
        description: 'Our flagship variety - large, succulent prawns with distinctive black stripes.',
        weight: '500g',
        price: 1200,
        category: 'Prawns',
        stock: 100,
        status: 'active',
        image: '/images/black tiger.jpeg',
        rating: 5
    },
    {
        id: 'butter-prawns',
        name: 'Butter Prawns',
        description: 'Marinated in rich garlic butter and aromatic herbs. Ready to sauté or grill.',
        weight: '500g',
        price: 950,
        category: 'Prawns',
        stock: 80,
        status: 'active',
        image: '/images/butter prawns .jpeg',
        rating: 4
    },
    {
        id: 'prawn-skewers',
        name: 'Prawn Skewers',
        description: 'Expertly threaded and seasoned prawns on bamboo skewers for BBQ & grilling.',
        weight: '400g (6 skewers)',
        price: 850,
        category: 'Ready-to-Cook',
        stock: 60,
        status: 'active',
        image: '/images/skewers.jpeg',
        rating: 5
    },
    {
        id: 'vannamei-prawns',
        name: 'Vannamei Prawns',
        description: 'Premium white prawns with delicate, sweet flavor for all cooking methods.',
        weight: '500g',
        price: 750,
        category: 'Prawns',
        stock: 120,
        status: 'active',
        image: '/images/black tiger.jpeg',
        rating: 4
    },
    {
        id: 'headless-peeled-shrimp',
        name: 'Headless Peeled Shrimp',
        description: 'Cleaned, deveined and ready to cook. Saves prep time with premium freshness.',
        weight: '500g',
        price: 800,
        category: 'Prawns',
        stock: 90,
        status: 'active',
        image: '/images/butter prawns .jpeg',
        rating: 3
    },
    {
        id: 'shrimp-ebi-fry',
        name: 'Shrimp Ebi Fry',
        description: 'Japanese-style breaded prawns, pre-seasoned and ready to fry to crispy perfection.',
        weight: '400g (10 pieces)',
        price: 900,
        category: 'Ready-to-Cook',
        stock: 70,
        status: 'active',
        image: '/images/skewers.jpeg',
        rating: 5
    },
    {
        id: 'connoisseurs-collection',
        name: "Connoisseur's Collection",
        description: 'Experience our signature trio: Black Tiger (250g), Vannamei (250g), Butter Prawns (250g).',
        weight: '750g Total',
        price: 1350,
        category: 'Fish',
        stock: 50,
        status: 'active',
        image: '/images/black tiger.jpeg',
        rating: 5
    },
    {
        id: 'chefs-starter-pack',
        name: "Chef's Starter Pack",
        description: 'Ready-to-cook premium selections: Butterfly Cut (250g), Marinated Shrimp (250g), Skewers (200g).',
        weight: '700g Total',
        price: 1250,
        category: 'Fish',
        stock: 40,
        status: 'active',
        image: '/images/butter prawns .jpeg',
        rating: 4
    }
];

const CATEGORIES = ['All', 'Prawns', 'Fish', 'Ready-to-Cook'];

// Star rating component
function StarRating({ rating }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-amber-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function ProductsPage() {
    const { addToCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const storedProducts = localStorage.getItem('wob_products');
        if (storedProducts) {
            try {
                const parsed = JSON.parse(storedProducts);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setProducts(parsed.map(p => ({
                        ...p,
                        image: p.image || '/images/black tiger.jpeg',
                        rating: p.rating || 4
                    })));
                }
            } catch (e) {
                console.error("Failed to parse wob_products", e);
            }
        }
    }, []);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            size: product.weight,
            price: product.price
        }, 1);
        triggerToast(`${product.name} added to cart!`);
    };

    const activeProducts = products.filter(p => p.status === 'active');
    const filteredProducts = activeProducts.filter(p =>
        activeCategory === 'All' || p.category === activeCategory
    );

    return (
        <div className="min-h-screen relative">
            {/* Paper Texture Background */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: "url('/bg/overall-background.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}
            />
            {/* Subtle warm overlay for consistency */}
            <div className="fixed inset-0 bg-amber-50/20 z-0" />

            {/* Content */}
            <div className="relative z-10 pt-28 pb-20">

                {/* Hero Header */}
                <div className="text-center mb-12 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Decorative line */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-16 h-px bg-amber-800/30" />
                            <svg className="w-6 h-6 text-amber-700/60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <div className="w-16 h-px bg-amber-800/30" />
                        </div>

                        <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-4 uppercase tracking-widest font-bold">
                            Our Signature Selection
                        </h1>


                        <p className="text-stone-500 text-base md:text-lg max-w-xl mx-auto italic font-light">
                            Explore our finest selection of export-grade seafood, instantly frozen lock in time.
                        </p>
                    </motion.div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex justify-center gap-3 mb-14 px-4">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${activeCategory === category
                                ? 'btn-gold border-[#c5a061] shadow-md'
                                : 'bg-white/70 text-stone-600 border-stone-300 hover:bg-stone-100 hover:border-stone-400'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.4 }}
                                        className="group bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 overflow-hidden"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-64 overflow-hidden bg-stone-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-stone-800 mb-1">
                                                {product.name}
                                            </h3>

                                            <p className="text-stone-500 text-xs mb-3 font-medium">
                                                Starting at <span className="text-stone-800 font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                                            </p>

                                            {/* Star Rating */}
                                            {product.rating && (
                                                <div className="mb-4">
                                                    <StarRating rating={product.rating} />
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/cart?product=${product.id}`}
                                                    className="btn-gold flex-1 py-2.5 text-center text-sm rounded-full"
                                                >
                                                    Select Options
                                                </Link>
                                                <Link
                                                    href={`/cart?product=${product.id}`}
                                                    className="btn-gold w-11 h-11 flex items-center justify-center rounded-full"
                                                    title="Add to Cart"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-stone-200"
                        >
                            <svg className="w-16 h-16 text-stone-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <h3 className="text-2xl text-stone-700 mb-3 font-bold">No products found</h3>
                            <p className="text-stone-400 mb-8">Try selecting a different category.</p>
                            <button
                                onClick={() => setActiveCategory('All')}
                                className="btn-gold px-8 py-3 rounded-full"
                            >
                                View All
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Trust Badges - Inline Bar */}
                <div className="max-w-5xl mx-auto mt-20 px-4">
                    <div className="flex items-center justify-center flex-wrap divide-x divide-stone-300">

                        {/* IQF */}
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <div>
                                <span className="text-sm font-bold text-stone-700 tracking-wide">IQF</span>
                                <p className="text-[11px] text-stone-400 italic">Individually Quick Frozen</p>
                            </div>
                        </div>

                        {/* Export Quality */}
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                                <span className="text-sm font-bold text-stone-700 tracking-wide">Export Quality</span>
                                <p className="text-[11px] text-stone-400 italic">Only the best export-grade seafood</p>
                            </div>
                        </div>

                        {/* Cold Chain */}
                        <div className="flex items-center gap-2 px-6 py-2">
                            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                            <div>
                                <span className="text-sm font-bold text-stone-700 tracking-wide">Cold Chain</span>
                                <p className="text-[11px] text-stone-400 italic">Maintained at optimal temperatures</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 right-8 bg-stone-800 text-white px-6 py-4 rounded-xl flex items-center gap-3 z-50 shadow-2xl border border-stone-600"
                    >
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="font-medium text-sm tracking-wide">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
