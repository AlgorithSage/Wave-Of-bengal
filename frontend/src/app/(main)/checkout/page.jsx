'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Form mapping
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const freeDeliveryThreshold = 2000;
    const isFreeDelivery = cartTotal >= freeDeliveryThreshold;
    const shipping = isFreeDelivery ? 0 : (cartTotal > 0 ? 100 : 0);
    const tax = Math.round(cartTotal * 0.05);
    const grandTotal = cartTotal + shipping + tax;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checkout.');
            return;
        }

        // Basic validation
        const required = ['email', 'phone', 'fullName', 'address1', 'city', 'state', 'zip', 'country', 'cardNumber', 'expiry', 'cvv'];
        const missing = required.filter(field => !formData[field].trim());

        if (missing.length > 0) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsProcessing(true);

        try {
            // Mock backend call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store order details for confirmation page
            localStorage.setItem('waveOfBengal_lastOrder', JSON.stringify({
                orderNumber: '#WOB' + Math.floor(Math.random() * 9000000 + 1000000),
                address: `${formData.address1}, ${formData.city}, ${formData.state} ${formData.zip}`,
                timeSlot: 'morning',
                email: formData.email,
                total: grandTotal
            }));

            router.push('/checkout/confirmation');
        } catch (error) {
            console.error('Order error:', error);
            alert('Failed to place order. Please try again.');
            setIsProcessing(false);
        }
    };

    const inputClasses = "w-full px-5 py-4 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a061]/40 focus:border-[#c5a061]/50 transition-all placeholder:text-white/30 backdrop-blur-sm";

    return (
        <div className="min-h-screen bg-[#0a1628] text-white font-body pt-24 pb-20 relative overflow-hidden">

            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/bg/admin-bg.jpeg"
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-[#0a1628]/60" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 mb-12 pb-8 border-b border-white/10"
                >
                    <Link href="/" className="shrink-0 bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-sm hover:border-[#c5a061]/30 transition-all">
                        <Image src="/images/WOB-black-4.png" alt="Wave of Bengal" width={48} height={48} className="object-contain invert" />
                    </Link>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-cinzel font-black text-[#FFFDD0] tracking-tight uppercase">Checkout</h1>
                        <p className="text-sm font-medium italic text-white/50 mt-1">Secure and fast checkout</p>
                    </div>
                    <div className="ml-auto hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2 text-white/30">
                            <svg className="w-4 h-4 text-[#c5a061]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            <span className="text-xs uppercase tracking-widest font-bold">Secure</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/30">
                            <svg className="w-4 h-4 text-[#c5a061]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            <span className="text-xs uppercase tracking-widest font-bold">Verified</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 lg:gap-16 items-start">

                    {/* Left side: Checkout Form */}
                    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-10">

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8"
                        >
                            <h2 className="text-lg font-fraunces font-bold uppercase tracking-widest mb-6 text-[#FFFDD0] border-b border-white/10 pb-3">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className={inputClasses} />
                                </div>
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Phone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" required className={inputClasses} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Shipping Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8"
                        >
                            <h2 className="text-lg font-fraunces font-bold uppercase tracking-widest mb-6 text-[#FFFDD0] border-b border-white/10 pb-3">Shipping Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className={inputClasses} />
                                </div>
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Address Line 1</label>
                                    <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Street, Area" required className={inputClasses} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 mb-5">
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Address Line 2 (Optional)</label>
                                    <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Landmark, Building" className={inputClasses} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className={inputClasses} />
                                </div>
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">State</label>
                                    <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State / Province" required className={inputClasses} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">ZIP Code</label>
                                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="560001" required className={inputClasses} />
                                </div>
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Country</label>
                                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="India" required className={inputClasses} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Method */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8"
                        >
                            <h2 className="text-lg font-fraunces font-bold uppercase tracking-widest mb-6 text-[#FFFDD0] border-b border-white/10 pb-3">Payment Method</h2>
                            <div className="grid grid-cols-1 gap-5 mb-5">
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Card Number</label>
                                    <div className="relative">
                                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" required className={`${inputClasses} pr-12`} />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <svg className="w-5 h-5 text-[#c5a061]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">Expiry</label>
                                    <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" required className={inputClasses} />
                                </div>
                                <div>
                                    <label className="block text-[#c5a061] text-[11px] uppercase tracking-[0.2em] font-bold mb-2 pl-1">CVV</label>
                                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="•••" required className={inputClasses} />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isProcessing}
                                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                                whileTap={{ scale: isProcessing ? 1 : 0.97 }}
                                className={`btn-gold w-full py-5 px-6 rounded-2xl text-lg tracking-widest flex items-center justify-center gap-3 ${isProcessing ? 'bg-white/10! text-white/40! cursor-wait shadow-none!' : ''}`}
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Place Order
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </>
                                )}
                            </motion.button>
                        </motion.div>

                    </form>

                    {/* Right side: Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="sticky top-24"
                    >
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-[#c5a061]/20 p-6 md:p-8 shadow-[0_10px_50px_rgba(197,160,97,0.08)]">
                            <h2 className="text-xl font-fraunces font-bold uppercase tracking-widest mb-6 text-[#FFFDD0]">Order Summary</h2>

                            <div className="flex flex-col gap-5 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                                {cart.length === 0 ? (
                                    <div className="text-center py-8 text-white/40 italic text-sm">
                                        <p className="mb-2">Your cart is empty</p>
                                        <Link href="/products" className="text-[#c5a061] font-bold hover:underline not-italic">Browse Products</Link>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <div key={`${item.id}-${item.size}`} className="grid grid-cols-[50px_1fr_auto] gap-4 items-center">
                                            <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                                                <svg className="w-6 h-6 text-[#c5a061]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-sm font-bold text-white leading-tight truncate">{item.name || item.id}</div>
                                                <div className="text-xs text-white/40 font-medium">{item.size || '500g'} × {item.quantity}</div>
                                            </div>
                                            <div className="text-sm font-bold text-[#FFFDD0]">
                                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="flex flex-col gap-3 pt-6 border-t border-white/10 mb-6">
                                <div className="flex justify-between text-sm font-medium text-white/70">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-white/70">
                                    <span>Shipping</span>
                                    <span>{isFreeDelivery ? <span className="text-[#c5a061] font-bold">FREE</span> : `₹${shipping}`}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-white/70">
                                    <span>Tax (5%)</span>
                                    <span className="text-white">₹{tax.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-2xl font-heading font-black text-[#FFFDD0] pt-6 border-t-2 border-[#c5a061]/30">
                                <span className="uppercase tracking-widest text-lg">Grand Total</span>
                                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                            </div>

                            {/* Trust badges */}
                            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/5">
                                <div className="flex flex-col items-center gap-1">
                                    <svg className="w-5 h-5 text-[#c5a061]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Secure</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <svg className="w-5 h-5 text-[#c5a061]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Verified</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <svg className="w-5 h-5 text-[#c5a061]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Cold Chain</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
