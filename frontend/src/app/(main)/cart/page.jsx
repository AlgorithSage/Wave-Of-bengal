'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

// Mirroring the Product Database from the existing product view
const PRODUCTS = {
    'black-tiger-prawns': {
        id: 'black-tiger-prawns',
        name: 'PREMIUM TIGER PRAWNS',
        displayName: 'Black Tiger Prawns (Signature)',
        subtitle: 'Exquisite Flavour from the Bay of Bengal',
        description: 'Our flagship variety - large, succulent prawns with distinctive black stripes. Wild-caught from the pristine waters of Bay of Bengal, these premium tiger prawns are perfect for grilling, elegant presentations, or gourmet preparations.',
        weight: '500g',
        price: 1200,
        badge: 'Premium Selection',
        image: '/images/black tiger.jpeg',
        sizes: {
            '250g': 650,
            '500g': 1200,
            '1kg': 2200
        }
    },
    'butter-prawns': {
        id: 'butter-prawns',
        name: 'BUTTER PRAWNS',
        displayName: 'Butter Prawns',
        subtitle: 'Rich Garlic Butter Perfection',
        description: 'Marinated in rich garlic butter and aromatic herbs. These ready-to-cook prawns deliver an instant gourmet experience. Simply sauté or grill for 5-7 minutes for restaurant-quality results at home.',
        weight: '500g',
        price: 950,
        badge: "Chef's Special",
        image: '/images/butter prawns .jpeg',
        sizes: {
            '250g': 500,
            '500g': 950,
            '1kg': 1800
        }
    },
    'prawn-skewers': {
        id: 'prawn-skewers',
        name: 'PRAWN SKEWERS',
        displayName: 'Prawn Skewers',
        subtitle: 'Perfect for BBQ & Grilling',
        description: 'Expertly threaded and seasoned prawns on bamboo skewers. Perfect for BBQ, grilling, or tandoor preparations. Pre-marinated with our signature spice blend for maximum flavor.',
        weight: '400g (6 skewers)',
        price: 850,
        badge: "Chef's Special",
        image: '/images/skewers.jpeg',
        sizes: {
            '200g (3 skewers)': 450,
            '400g (6 skewers)': 850,
            '600g (9 skewers)': 1200
        }
    },
    'vannamei-prawns': {
        id: 'vannamei-prawns',
        name: 'VANNAMEI PRAWNS',
        displayName: 'Vannamei Prawns',
        subtitle: 'Delicate Sweet Flavor',
        description: 'Premium white prawns with delicate, sweet flavor. Versatile for all cooking methods - curry, fry, steam, or grill. These tender prawns are perfect for everyday gourmet meals.',
        weight: '500g',
        price: 750,
        badge: 'Best Seller',
        image: '/images/black tiger.jpeg', // Fallback
        sizes: {
            '250g': 400,
            '500g': 750,
            '1kg': 1400
        }
    }
};

const DEFAULT_PRODUCT = 'black-tiger-prawns';

export default function CartPage() {
    const { cart, addToCart, removeFromCart } = useCart();
    const [currentProduct, setCurrentProduct] = useState(PRODUCTS[DEFAULT_PRODUCT]);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('500g');
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    // Initial load logic matching standalone HTML
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('product') || localStorage.getItem('waveOfBengal_selectedProduct') || DEFAULT_PRODUCT;

        if (!PRODUCTS[productId]) {
            productId = DEFAULT_PRODUCT;
        }

        const initialProduct = PRODUCTS[productId];
        setCurrentProduct(initialProduct);

        // Find middle size
        const sizes = Object.keys(initialProduct.sizes);
        const midSize = sizes[Math.floor(sizes.length / 2)];
        setSelectedSize(midSize);
    }, []);

    const handleProductChange = (e) => {
        const productId = e.target.value;
        const newProduct = PRODUCTS[productId];

        if (newProduct) {
            setCurrentProduct(newProduct);
            const sizes = Object.keys(newProduct.sizes);
            setSelectedSize(sizes[Math.floor(sizes.length / 2)]);

            // Update URL without reload
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('product', productId);
            window.history.pushState({}, '', newUrl);
            localStorage.setItem('waveOfBengal_selectedProduct', productId);
            setQty(1);
        }
    };

    const updateQty = (change) => {
        setQty(Math.max(1, qty + change));
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: currentProduct.id,
            name: currentProduct.displayName,
            size: selectedSize,
            price: currentProduct.sizes[selectedSize],
        };
        addToCart(cartItem, qty);

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(currentProduct.id);
    };

    const inCart = cart.some(item => item.id === currentProduct.id);

    // Get unique items array for the dropdown (from cart data)
    const uniqueCartItems = Array.from(new Set(cart.map(item => item.id)))
        .map(id => cart.find(item => item.id === id));

    return (
        <div className="min-h-screen bg-sky-light text-ocean-deep font-body flex flex-col relative py-12 md:py-20 overflow-hidden">
            {/* Background elements to match the new theme styling */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-oceanic-blue/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-blue/30 blur-[120px] rounded-full pointer-events-none" />

            <main className="grow flex items-center justify-center p-4 md:p-8 lg:p-12 z-10 relative">
                <div className="max-w-7xl w-full flex flex-col lg:flex-row glass-card shadow-xl relative border border-oceanic-blue/20 rounded-3xl overflow-hidden">

                    {/* Left Column - Product Image */}
                    <section className="w-full lg:w-1/2 relative bg-sky-blue/30 min-h-[400px] lg:min-h-[700px]">
                        <Image
                            id="product-image"
                            alt={currentProduct.displayName}
                            className="w-full h-full object-cover mix-blend-multiply"
                            src={currentProduct.image}
                            fill
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-sky-light/80 to-transparent lg:bg-linear-to-r"></div>
                    </section>

                    {/* Right Column - Product Details */}
                    <section className="w-full lg:w-1/2 bg-sky-light/40 backdrop-blur-3xl p-8 md:p-12 lg:p-16 flex flex-col justify-between relative">
                        <div className="relative z-10 flex flex-col items-center text-center">

                            {/* Theme-adapted Logo Area */}
                            <div className="mb-6 flex flex-col items-center">
                                <Image alt="Wave of Bengal Logo" width={80} height={80} className="mb-4 drop-shadow-sm" src="/images/WOB-black-4.png" />
                            </div>

                            {/* Cart Navigation (Only shows if > 1 items in cart) */}
                            {uniqueCartItems.length > 1 && (
                                <div className="mb-8 w-full max-w-sm mx-auto">
                                    <label className="block text-ocean-deep text-xs font-bold uppercase tracking-widest mb-2 text-left">
                                        Select Item from Cart
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={currentProduct.id}
                                            onChange={handleProductChange}
                                            className="w-full py-3 px-4 bg-white/30 backdrop-blur-md border border-oceanic-blue/30 text-ocean-deep font-bold text-sm tracking-wider uppercase appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 rounded-xl shadow-sm transition-all"
                                        >
                                            {!inCart && <option value={currentProduct.id} disabled>Select item from cart...</option>}
                                            {uniqueCartItems.map(item => {
                                                const prod = PRODUCTS[item.id];
                                                return (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name || (prod ? prod.displayName : item.id)}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-oceanic-blue">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Product Title */}
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ocean-deep font-bold mb-4 leading-tight tracking-tight">
                                {currentProduct.name}
                            </h1>
                            <p className="text-ocean-muted text-lg font-medium italic border-b border-oceanic-blue/20 pb-4 inline-block px-4 mb-12">
                                {currentProduct.subtitle}
                            </p>

                            {/* Details Grid */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                                <div className="space-y-4">
                                    <h3 className="text-ocean-deep text-sm font-bold uppercase tracking-wider border-b border-oceanic-blue/20 pb-2">
                                        Description
                                    </h3>
                                    <p className="text-ocean-muted leading-relaxed font-medium text-sm md:text-base">
                                        {currentProduct.description}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-ocean-deep text-sm font-bold uppercase tracking-wider border-b border-oceanic-blue/20 pb-2">
                                        Why We Love It
                                    </h3>
                                    <div className="space-y-4">
                                        <article className="flex items-start gap-4">
                                            <div className="shrink-0 w-10 h-10 bg-oceanic-blue/10 rounded-full flex items-center justify-center">
                                                <svg className="h-5 w-5 text-oceanic-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </div>
                                            <div>
                                                <h4 className="text-ocean-deep text-xs font-bold uppercase tracking-wider mb-1">Wild Caught</h4>
                                                <p className="text-xs text-ocean-muted leading-relaxed">Sourced directly from artisanal fishermen. 100% sustainable.</p>
                                            </div>
                                        </article>
                                        <article className="flex items-start gap-4">
                                            <div className="shrink-0 w-10 h-10 bg-oceanic-blue/10 rounded-full flex items-center justify-center">
                                                <svg className="h-5 w-5 text-oceanic-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                            </div>
                                            <div>
                                                <h4 className="text-ocean-deep text-xs font-bold uppercase tracking-wider mb-1">Freshness Guarantee</h4>
                                                <p className="text-xs text-ocean-muted leading-relaxed">Flash-frozen at -40°C to lock in flavor and nutrition.</p>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="w-full mt-auto">
                                {/* Size Selector */}
                                <div className="mb-6">
                                    <label className="block text-ocean-deep text-xs font-bold uppercase tracking-widest mb-2 text-left">Size</label>
                                    <div className="relative">
                                        <select
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                            className="w-full py-3 px-4 bg-white/30 backdrop-blur-md border border-oceanic-blue/30 text-ocean-deep font-bold text-sm tracking-wider appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 rounded-xl transition-all"
                                        >
                                            {Object.keys(currentProduct.sizes).map(size => (
                                                <option key={size} value={size}>
                                                    {size} - ₹{currentProduct.sizes[size].toLocaleString('en-IN')}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-oceanic-blue">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="mb-8">
                                    <label className="block text-ocean-deep text-xs font-bold uppercase tracking-widest mb-2 text-left">Quantity</label>
                                    <div className="flex items-center justify-between border border-oceanic-blue/30 rounded-xl bg-white/30 backdrop-blur-md overflow-hidden">
                                        <button onClick={() => updateQty(-1)} className="w-16 h-12 flex items-center justify-center text-ocean-deep hover:bg-oceanic-blue/10 transition-colors text-xl font-medium focus:outline-none">−</button>
                                        <span className="w-20 h-12 flex items-center justify-center text-ocean-deep font-bold text-lg border-x border-oceanic-blue/20 bg-white/50">{qty}</span>
                                        <button onClick={() => updateQty(1)} className="w-16 h-12 flex items-center justify-center text-ocean-deep hover:bg-oceanic-blue/10 transition-colors text-xl font-medium focus:outline-none">+</button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mb-8">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        className={`flex-1 py-4 px-6 rounded-xl text-lg font-heading font-bold tracking-widest transition-all duration-300 uppercase shadow-md flex items-center justify-center gap-2 ${isAdded ? 'bg-wob-green text-white cursor-default' : 'bg-ocean-deep text-sky-light hover:bg-oceanic-blue hover:text-ocean-deep'}`}
                                    >
                                        {isAdded ? 'Added!' : (
                                            <>
                                                Add to Cart <span className="text-sm border-l border-current pl-2 ml-2">₹{currentProduct.sizes[selectedSize].toLocaleString('en-IN')}</span>
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Remove Button (if in cart) */}
                                    {inCart && (
                                        <button
                                            onClick={handleRemoveFromCart}
                                            className="w-14 h-14 border border-rose-200 text-rose-500 bg-rose-50 flex items-center justify-center hover:bg-rose-100 transition-colors rounded-xl shrink-0"
                                            title="Remove from Cart"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    )}

                                    {/* Heart Button */}
                                    <button
                                        onClick={() => setIsHeartActive(!isHeartActive)}
                                        className={`w-14 h-14 border flex items-center justify-center rounded-xl transition-colors shrink-0 ${isHeartActive ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white/50 border-oceanic-blue/30 text-ocean-deep hover:bg-oceanic-blue/10'}`}
                                    >
                                        <svg className={`w-6 h-6 transition-all duration-300 ${isHeartActive ? 'fill-current scale-110' : 'fill-none'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    </button>
                                </div>

                                {/* Sub Links */}
                                <div className="flex justify-center items-center space-x-4 text-xs font-bold tracking-widest uppercase text-ocean-muted">
                                    <Link className="hover:text-oceanic-blue transition-colors" href="/products">View List</Link>
                                    <span className="text-oceanic-blue/30">•</span>
                                    <Link className="hover:text-oceanic-blue transition-colors text-ocean-deep" href="/checkout">Checkout</Link>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
