'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartSlideOut() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-ocean-deep/40 backdrop-blur-sm z-50"
                    />

                    {/* Cart Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-oceanic-blue/20"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-oceanic-blue/10 bg-sky-light/50">
                            <h2 className="text-2xl font-fraunces font-black text-ocean-deep">Your Catch</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-ocean-muted hover:text-ocean-deep hover:bg-oceanic-blue/10 p-2 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <svg className="w-16 h-16 text-ocean-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    <p className="text-xl font-heading font-bold text-ocean-deep">Your net is empty</p>
                                    <p className="text-ocean-muted font-medium">Looks like you haven't added any fresh catches yet.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-oceanic-blue font-bold hover:text-ocean-deep underline underline-offset-4"
                                    >
                                        Continue Exploring
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex gap-4 p-4 bg-sky-light/30 rounded-xl border border-oceanic-blue/10"
                                    >
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-oceanic-blue/20">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-playfair font-bold text-ocean-deep line-clamp-2 pr-4">{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-ocean-muted hover:text-red-500 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                                <p className="text-oceanic-blue font-bold text-sm mt-1">{item.weight}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center bg-white border border-oceanic-blue/20 rounded-lg overflow-hidden shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 text-ocean-deep hover:bg-sky-light transition-colors font-bold"
                                                    >-</button>
                                                    <span className="px-3 py-1 font-bold text-ocean-deep border-x border-oceanic-blue/10 min-w-10 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 text-ocean-deep hover:bg-sky-light transition-colors font-bold"
                                                    >+</button>
                                                </div>
                                                <p className="font-black text-ocean-deep">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer & Checkout */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-oceanic-blue/10 bg-sky-light/50 space-y-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-heading font-bold text-ocean-deep">Subtotal</span>
                                    <span className="font-black text-ocean-deep">${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-ocean-muted text-sm font-medium">Shipping & taxes calculated at checkout.</p>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="block w-full py-4 text-center bg-ocean-deep text-sky-light hover:bg-oceanic-blue font-bold rounded-lg uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(8,47,73,0.2)] hover:shadow-[0_8px_20px_rgba(14,165,233,0.3)]"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
