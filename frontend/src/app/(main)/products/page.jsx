'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';

// Updated Default Products Dataset
const DEFAULT_PRODUCTS = [
    {
        id: 'black-tiger-prawns',
        name: 'Black Tiger Prawns (Signature)',
        description: 'Our flagship variety - large, succulent prawns with distinctive black stripes. Perfect for grilling or elegant presentations.',
        weight: '500g',
        price: 1200,
        category: 'chef',
        stock: 100,
        status: 'active',
        image: '/images/black tiger.jpeg'
    },
    {
        id: 'butter-prawns',
        name: 'Butter Prawns',
        description: 'Marinated in rich garlic butter and aromatic herbs. Ready to sauté or grill for an instant gourmet experience.',
        weight: '500g',
        price: 950,
        category: 'chef',
        stock: 80,
        status: 'active',
        image: '/images/butter prawns .jpeg'
    },
    {
        id: 'prawn-skewers',
        name: 'Prawn Skewers',
        description: 'Expertly threaded and seasoned prawns on bamboo skewers. Perfect for BBQ, grilling or tandoor preparations.',
        weight: '400g (6 skewers)',
        price: 850,
        category: 'chef',
        stock: 60,
        status: 'active',
        image: '/images/skewers.jpeg'
    },
    {
        id: 'vannamei-prawns',
        name: 'Vannamei Prawns',
        description: 'Premium white prawns with delicate, sweet flavor. Versatile for all cooking methods - curry, fry, or steam.',
        weight: '500g',
        price: 750,
        category: 'best',
        stock: 120,
        status: 'active',
        image: '/images/black tiger.jpeg'
    },
    {
        id: 'headless-peeled-shrimp',
        name: 'Headless Peeled Shrimp',
        description: 'Cleaned, deveined and ready to cook. Saves prep time while maintaining premium freshness and taste.',
        weight: '500g',
        price: 800,
        category: 'best',
        stock: 90,
        status: 'active',
        image: '/images/butter prawns .jpeg'
    },
    {
        id: 'shrimp-ebi-fry',
        name: 'Shrimp Ebi Fry',
        description: 'Japanese-style breaded prawns, pre-seasoned and ready to fry. Crispy perfection in minutes.',
        weight: '400g (10 pieces)',
        price: 900,
        category: 'best',
        stock: 70,
        status: 'active',
        image: '/images/skewers.jpeg'
    },
    {
        id: 'connoisseurs-collection',
        name: "The Connoisseur's Collection",
        description: 'Experience our three signature varieties in one exquisite package: Black Tiger Prawns (250g), Vannamei Prawns (250g), Butter Prawns (250g)',
        weight: '750g Total',
        price: 1350,
        category: 'trial',
        stock: 50,
        status: 'active',
        image: '/images/black tiger.jpeg'
    },
    {
        id: 'chefs-starter-pack',
        name: "The Chef's Starter Pack",
        description: 'Perfect introduction to our ready-to-cook premium selections: Butterfly Cut Prawns (250g), Marinated Shrimp (250g), Prawn Skewers (200g)',
        weight: '700g Total',
        price: 1250,
        category: 'trial',
        stock: 40,
        status: 'active',
        image: '/images/butter prawns .jpeg'
    }
];

const CATEGORIES = [
    { id: 'all', label: 'All Products' },
    { id: 'chef', label: "Chef's Special" },
    { id: 'best', label: 'Best Sellers' },
    { id: 'trial', label: 'Trial Packs' }
];

export default function ProductsPage() {
    const { addToCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Optional: Load products from local storage to sync with admin adjustments if required
    useEffect(() => {
        const storedProducts = localStorage.getItem('wob_products');
        if (storedProducts) {
            try {
                const parsed = JSON.parse(storedProducts);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setProducts(parsed.map(p => ({
                        // Ensure images have fallbacks if missing
                        ...p,
                        image: p.image || '/images/black tiger.jpeg'
                    })));
                }
            } catch (e) {
                console.error("Failed to parse wob_products", e);
            }
        } else {
            localStorage.setItem('wob_products', JSON.stringify(DEFAULT_PRODUCTS));
        }
    }, []);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleAddToCart = (product) => {
        // Map product to cart format
        addToCart({
            id: product.id,
            name: product.name,
            size: product.weight,
            price: product.price
        }, 1);
        triggerToast(`${product.name} added to cart!`);
    };

    // Derived properties
    const activeProducts = products.filter(p => p.status === 'active');

    // Setup category sections
    const sections = ['chef', 'best', 'trial'];

    const getCategoryTitle = (category) => {
        const titles = {
            chef: "Chef's Special Selection",
            best: 'Best Sellers',
            trial: 'Trial Packs'
        };
        return titles[category] || category;
    };

    const getCategoryDescription = (category) => {
        const descriptions = {
            chef: 'Handpicked premium varieties, curated by our master chefs',
            best: 'Our most loved varieties, trusted by thousands of seafood enthusiasts',
            trial: 'Discover our finest varieties with curated tasting collections'
        };
        return descriptions[category] || '';
    };

    const getCategoryLabel = (category) => {
        const labels = {
            chef: "Chef's Special",
            best: 'Best Seller',
            trial: 'Trial Pack'
        };
        return labels[category] || category;
    };

    return (
        <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-sky-light">
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

            {/* Dark Overlay for better text legibility (adjusted for theme) */}
            <div className="fixed inset-0 bg-ocean-deep/60 z-0" />

            {/* Main Content Container */}
            <div className="relative z-10">
                {/* Header Section */}
                <div className="relative py-16 mb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sky-light">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-4 drop-shadow-xl tracking-tight uppercase"
                        >
                            PREMIUM <span className="text-gold italic">PRAWN</span> COLLECTION
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-sky-light/90 max-w-2xl mx-auto font-medium drop-shadow-md italic"
                        >
                            Sustainably sourced from the pristine waters of the Bay of Bengal
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search & Filter Bar - Glassmorphic */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-3">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-gold text-sky-light shadow-[0_4px_12px_rgba(245,158,11,0.4)] border border-transparent'
                                        : 'bg-white/10 text-sky-light hover:bg-white/20 border border-white/20 hover:border-gold/50 hover:text-gold'
                                        }`}
                                >
                                    {category.label}
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
                                className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-full py-3 pl-5 pr-12 text-sky-light font-medium focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all placeholder:text-sky-light/50 shadow-inner"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-3.5 text-sky-light/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>

                    {/* Sectioned Product Grid */}
                    <div className="space-y-20">
                        {sections.map(section => {
                            // Filter products for this section, considering global activeCategory and searchQuery
                            const sectionProducts = activeProducts.filter(p => {
                                const matchesCategory = p.category === section;
                                const isSectionActive = activeCategory === 'all' || activeCategory === section;
                                const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    p.description.toLowerCase().includes(searchQuery.toLowerCase());
                                return matchesCategory && isSectionActive && matchesSearch;
                            });

                            if (sectionProducts.length === 0) return null; // Don't render empty sections

                            return (
                                <div key={section} className="animate-fade-in">
                                    {/* Section Header */}
                                    <div className="mb-10 pt-4 border-t border-white/20">
                                        <h2 className="text-3xl md:text-4xl font-heading font-black tracking-widest uppercase mb-3 text-gold drop-shadow-md">
                                            {getCategoryTitle(section)}
                                        </h2>
                                        <p className="text-lg text-sky-light/80 font-medium italic">
                                            {getCategoryDescription(section)}
                                        </p>
                                    </div>

                                    {/* Section Grid */}
                                    <motion.div
                                        layout
                                        className={`grid gap-8 ${section === 'trial' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                                    >
                                        <AnimatePresence>
                                            {sectionProducts.map((product) => (
                                                <motion.div
                                                    key={product.id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`group flex flex-col glass-card hover:-translate-y-2 z-10 transition-all duration-400 ${section === 'trial' ? 'border-2 border-gold/60 hover:border-gold hover:shadow-[0_20px_50px_rgba(197,160,101,0.2)]' : 'border border-white/20 hover:border-gold/50'}`}
                                                >
                                                    {/* Badge - Top Right */}
                                                    <div className="absolute top-4 right-4 z-30">
                                                        <span className="bg-linear-to-r from-gold to-[#e0c088] text-sky-light px-4 py-1.5 text-xs tracking-widest uppercase font-bold rounded-full shadow-lg">
                                                            {getCategoryLabel(product.category)}
                                                        </span>
                                                    </div>

                                                    {/* Image Area */}
                                                    <div className="relative h-64 overflow-hidden bg-white/5">
                                                        <Image
                                                            src={product.image || '/images/black tiger.jpeg'}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 mix-blend-overlay"
                                                        />
                                                        {/* Inner gradient */}
                                                        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/60 to-transparent z-10" />
                                                    </div>

                                                    {/* Content Area */}
                                                    <div className="p-6 flex flex-col grow relative z-20 bg-black/40 backdrop-blur-md text-sky-light border-t border-white/10">
                                                        <h3 className="text-2xl font-heading font-black group-hover:text-gold transition-colors pr-2 drop-shadow-md mb-2">
                                                            {product.name}
                                                        </h3>

                                                        <p className="text-sky-light/80 text-sm leading-relaxed mb-6 grow font-medium line-clamp-3">
                                                            {product.description}
                                                        </p>

                                                        <div className="flex justify-between items-center py-4 border-t border-b border-white/20 mb-6">
                                                            <span className="text-sky-light/70 text-sm font-bold uppercase tracking-wider">{product.weight}</span>
                                                            <span className="text-3xl font-black text-gold drop-shadow-lg">
                                                                ₹{product.price.toLocaleString('en-IN')}
                                                            </span>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() => handleAddToCart(product)}
                                                                className="flex-1 py-4 border border-transparent bg-linear-to-br from-gold to-[#e0c088] hover:to-gold text-sky-light font-bold rounded-xl uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(197,160,101,0.5)] flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                                                            >
                                                                <span className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2.5s_infinite_linear]"></span>
                                                                Add to Cart
                                                            </button>
                                                            <Link
                                                                href={`/cart?product=${product.id}`}
                                                                className="flex-1 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-sky-light font-bold rounded-xl uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 text-center"
                                                            >
                                                                View
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            );
                        })}

                        {/* Fallback Empty State */}
                        {sections.every(section => {
                            const sectionProducts = activeProducts.filter(p => {
                                const matchesCategory = p.category === section;
                                const isSectionActive = activeCategory === 'all' || activeCategory === section;
                                const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    p.description.toLowerCase().includes(searchQuery.toLowerCase());
                                return matchesCategory && isSectionActive && matchesSearch;
                            });
                            return sectionProducts.length === 0;
                        }) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl text-sky-light"
                                >
                                    <svg className="w-20 h-20 text-gold/50 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <h3 className="text-2xl font-heading font-black mb-3 text-gold uppercase tracking-widest">No products available</h3>
                                    <p className="text-sky-light/70 font-medium mb-8">Try adjusting your category or search term to discover our fresh selection.</p>
                                    <button
                                        onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                                        className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sky-light font-bold uppercase tracking-widest transition-all shadow-sm"
                                    >
                                        View All Seafood
                                    </button>
                                </motion.div>
                            )}
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed bottom-8 right-8 bg-ocean-deep border-2 border-gold text-sky-light px-6 py-4 rounded-xl flex items-center gap-4 z-50 shadow-2xl"
                    >
                        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"></path></svg>
                        <span className="font-medium tracking-wide">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
