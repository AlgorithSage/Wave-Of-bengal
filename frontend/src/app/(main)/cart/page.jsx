'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTS = {
    'black-tiger-prawns': {
        id: 'black-tiger-prawns',
        name: 'King Prawns',
        displayName: 'King Prawns (250g)',
        subtitle: 'Large Size | Super Quality',
        description: 'Succulent, jumbo-sized tiger prawns caught daily from the deep waters of the Bay of Bengal. Known for their firm texture and sweet, oceanic flavor.',
        weight: '250g',
        price: 1200,
        image: '/images/black tiger.jpeg',
        sizes: [
            { id: '250g', label: '250g', price: 1200 },
            { id: '500g', label: '500g', price: 2200 },
            { id: '1kg', label: '1kg', price: 4200 }
        ]
    },
    'butter-prawns': {
        id: 'butter-prawns',
        name: 'Bengali Fish Fry',
        displayName: 'Bengali Fish Fry (500g)',
        subtitle: 'Long Size | Super Quality',
        description: 'Authentic Bengali style fish fry, breaded with secret spices and ready to be golden-fried to perfection. A coastal street food delicacy.',
        weight: '500g',
        price: 950,
        image: '/images/butter prawns .jpeg',
        sizes: [
            { id: '250g', label: '250g', price: 500 },
            { id: '500g', label: '500g', price: 950 },
            { id: '1kg', label: '1kg', price: 1800 }
        ]
    }
};

const ATTRIBUTES = ['Fresh', 'Safe', '100%', 'Tax'];

export default function CartPage() {
    const { cart, addToCart } = useCart();
    const [productsDict, setProductsDict] = useState(PRODUCTS);
    const [selectedProductId, setSelectedProductId] = useState('black-tiger-prawns');
    const [selectedSizeId, setSelectedSizeId] = useState('250g');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Load all catalog products and merge them so any product can be viewed
        try {
            const stored = localStorage.getItem('wob_products');
            if (stored) {
                const parsed = JSON.parse(stored);
                const updatedDict = { ...PRODUCTS };
                parsed.forEach(p => {
                    if (!updatedDict[p.id]) {
                        updatedDict[p.id] = {
                            ...p,
                            displayName: `${p.name} (${p.weight || '500g'})`,
                            subtitle: 'Premium Selection',
                            sizes: [
                                { id: '250g', label: '250g', price: p.price * 0.55 },
                                { id: '500g', label: '500g', price: p.price },
                                { id: '1kg', label: '1kg', price: p.price * 1.8 }
                            ]
                        };
                    }
                });
                setProductsDict(updatedDict);
            }
        } catch (e) { console.error(e); }

        // Read URL param
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const productId = params.get('product');
            if (productId) {
                setSelectedProductId(productId);
            }
        }
    }, []);

    const currentProduct = productsDict[selectedProductId] || productsDict['black-tiger-prawns'];
    const currentPrice = currentProduct.sizes.find(s => s.id === selectedSizeId)?.price || currentProduct.price;

    const handleAddToCart = () => {
        const cartItem = {
            id: currentProduct.id,
            name: currentProduct.name,
            size: selectedSizeId,
            price: currentPrice,
            image: currentProduct.image
        };
        addToCart(cartItem, 1);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#0a1628] text-white pt-24 pb-12 font-body px-4 md:px-8">

            {/* Header / Logo (Simplified for the page) */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                    <Image src="/images/wob-crest.png" alt="Logo" width={40} height={40} />
                    <span className="text-xl font-heading font-black tracking-widest uppercase text-[#FFFDD0]">Wave of Bengal</span>
                </div>
                <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-white/60">
                    <Link href="/home" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
                    <Link href="/our-story" className="hover:text-white transition-colors">Story</Link>
                    <div className="relative">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#c5a061] text-[#0a1628] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Side: Product Selection List (8 cols) */}
                <div className="lg:col-span-7 space-y-8">
                    {Object.values(PRODUCTS).map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setSelectedProductId(product.id)}
                            className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col md:flex-row gap-8 items-center ${selectedProductId === product.id ? 'bg-white/10 border-[#c5a061]/50 shadow-2xl' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                            {/* Circular Swirl Image Container */}
                            <div className="relative w-48 h-48 shrink-0">
                                <div className="absolute inset-0 bg-[#c5a061]/20 rounded-full blur-2xl group-hover:bg-[#c5a061]/30 transition-all duration-700" title="glow" />
                                <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-700">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Swirl Overlays */}
                                    <div className="absolute inset-0 bg-linear-to-tr from-[#0a1628]/40 to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 border-10 border-white/5 rounded-full" />
                                </div>
                                {/* Top right check icon for selection */}
                                {selectedProductId === product.id && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#c5a061] rounded-full flex items-center justify-center shadow-lg border-2 border-[#0a1628]">
                                        <svg className="w-3 h-3 text-[#0a1628]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="grow">
                                <h3 className="text-2xl md:text-3xl font-playfair font-black text-white mb-2 tracking-tight">
                                    {product.displayName}
                                </h3>
                                <p className="text-[#c5a061] text-sm font-medium italic mb-4 uppercase tracking-widest opacity-80">
                                    {product.subtitle}
                                </p>
                                <p className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-md line-clamp-3 md:line-clamp-none">
                                    {product.description}
                                </p>

                                <div className="mt-6 flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Image src="/images/wob-crest.png" alt="WOB" width={20} height={20} className="opacity-40" />
                                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Premium II</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white/40">₹</div>
                                        <span className="text-xs font-bold text-white/40">INR Base</span>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="btn-gold px-4 py-2 text-xs rounded-full shadow-md">
                                            Select
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Side: Product Configuration Panel (4 cols) */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 space-y-10">

                        {/* Title & Static Attribute Chips */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-fraunces font-black text-white mb-2 leading-[0.9]">
                                {currentProduct.name}
                            </h2>
                            <p className="text-[#c5a061] text-lg font-medium italic mb-8 opacity-90">
                                {currentProduct.subtitle}
                            </p>

                            <div className="flex gap-3">
                                {ATTRIBUTES.map((attr) => (
                                    <div key={attr} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold uppercase text-white/40 hover:border-[#c5a061]/40 hover:text-[#c5a061] transition-all cursor-default">
                                        {attr}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Weight Selector Table */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#c5a061]">Weight Selector</h3>
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10 text-white/30 uppercase tracking-widest text-[10px]">
                                            <th className="px-6 py-3 font-bold">Variations</th>
                                            <th className="px-6 py-3 font-bold">Source</th>
                                            <th className="px-6 py-3 font-bold">Weight</th>
                                            <th className="px-6 py-3 font-bold">Select</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {currentProduct.sizes.map((size) => (
                                            <tr
                                                key={size.id}
                                                onClick={() => setSelectedSizeId(size.id)}
                                                className={`group cursor-pointer hover:bg-white/5 transition-colors ${selectedSizeId === size.id ? 'bg-white/10' : ''}`}
                                            >
                                                <td className="px-6 py-4 font-medium text-white/80">Premium</td>
                                                <td className="px-6 py-4 font-medium text-white/80">Bay</td>
                                                <td className="px-6 py-4 font-bold text-[#c5a061]">{size.label}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className={`w-4 h-4 rounded-full border-2 transition-all ${selectedSizeId === size.id ? 'bg-[#c5a061] border-[#c5a061] scale-110' : 'border-white/20'}`} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-[10px] text-white/30 font-medium italic tracking-wide">
                                * Freshness guaranteed through our 100% verified cold-chain infrastructure.
                            </p>
                        </div>

                        {/* Summary & Checkout */}
                        <div className="pt-8 border-t border-white/10">
                            <div className="flex justify-between items-end mb-8">
                                <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Running Total</div>
                                <div className="text-4xl font-heading font-black text-[#FFFDD0]">₹{currentPrice.toLocaleString('en-IN')}</div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                className="w-full py-6 bg-linear-to-r from-[#c5a061] to-[#d4b070] text-[#0a1628] font-black text-xl uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(197,160,97,0.3)] hover:shadow-[0_15px_40px_rgba(197,160,97,0.4)] transition-all flex items-center justify-center gap-4"
                            >
                                <span>Add to Cart</span>
                                <svg className="w-6 h-6 -translate-y-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                            </motion.button>

                            <div className="mt-6 text-center">
                                <Link href="/checkout" className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">Complete Order & Proceed</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="btn-gold fixed bottom-8 right-8 px-8 py-5 rounded-2xl flex items-center gap-4 z-50 shadow-2xl border border-[#FFFDD0]/30"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#0a1628] flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-[#c5a061]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-black text-lg leading-tight uppercase tracking-tight">Success!</span>
                            <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Added to your selection</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
