'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

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

    return (
        <div className="min-h-screen bg-sky-light text-ocean-deep font-body py-12 md:py-20 relative overflow-hidden">
            {/* Background elements to match the new theme styling */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-oceanic-blue/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-blue/30 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

                {/* Header Logo Box (Optional if Navbar is present, but kept for standalone feel) */}
                <div className="flex items-center gap-4 mb-12 pb-8 border-b border-oceanic-blue/20">
                    <Link href="/" className="shrink-0 bg-white/50 p-2 rounded-xl border border-oceanic-blue/20 shadow-sm hover:shadow-md transition-shadow">
                        <img src="/images/WOB-black-4.png" alt="Wave of Bengal" className="w-12 h-12 object-contain" />
                    </Link>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-heading font-black text-ocean-deep tracking-tight uppercase">Checkout</h1>
                        <p className="text-sm font-medium italic text-ocean-muted mt-1">Secure and fast checkout</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 lg:gap-16 items-start">

                    {/* Left side: Checkout Form */}
                    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-10">

                        {/* Contact Info */}
                        <div className="glass-card p-6 md:p-8 bg-white/20 backdrop-blur-2xl">
                            <h2 className="text-lg font-heading font-bold uppercase tracking-widest mb-6 text-ocean-deep border-b border-oceanic-blue/20 pb-2">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="glass-card p-6 md:p-8 bg-white/20 backdrop-blur-2xl">
                            <h2 className="text-lg font-heading font-bold uppercase tracking-widest mb-6 text-ocean-deep border-b border-oceanic-blue/20 pb-2">Shipping Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                                <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                            </div>
                            <div className="grid grid-cols-1 gap-5 mb-5">
                                <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2 (Optional)" className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State/Province" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP/Postal Code" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="glass-card p-6 md:p-8 bg-white/20 backdrop-blur-2xl">
                            <h2 className="text-lg font-heading font-bold uppercase tracking-widest mb-6 text-ocean-deep border-b border-oceanic-blue/20 pb-2">Payment Method</h2>
                            <div className="grid grid-cols-1 gap-5 mb-5">
                                <div className="relative">
                                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card Number" required className="w-full px-5 py-4 pr-12 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-ocean-muted">
                                        <svg className="w-5 h-5 text-oceanic-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                                <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                                <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" required className="w-full px-5 py-4 bg-white/80 border border-ocean-muted/20 text-ocean-deep text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 focus:border-oceanic-blue/50 transition-all placeholder:text-ocean-muted/60" />
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-4 px-6 rounded-xl text-lg font-heading font-bold tracking-widest transition-all duration-300 uppercase shadow-md ${isProcessing ? 'bg-ocean-muted text-white cursor-wait' : 'bg-ocean-deep text-sky-light hover:bg-oceanic-blue hover:text-ocean-deep hover:shadow-lg'}`}
                            >
                                {isProcessing ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>

                    </form>

                    {/* Right side: Order Summary */}
                    <div className="sticky top-24 glass-card p-6 md:p-8 bg-sky-light/40 backdrop-blur-2xl border border-oceanic-blue/30 shadow-2xl">
                        <h2 className="text-xl font-heading font-bold uppercase tracking-widest mb-6 text-ocean-deep">Order Summary</h2>

                        <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="text-center py-8 text-ocean-muted italic text-sm">
                                    <p className="mb-2">Your cart is empty</p>
                                    <Link href="/products" className="text-oceanic-blue font-bold hover:underline not-italic">Browse Products</Link>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={`${item.id}-${item.size}`} className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[70px_1fr_auto] gap-4 items-center">
                                        <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center p-2 border border-oceanic-blue/20">
                                            <svg className="w-10 h-10 text-oceanic-blue opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" /></svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-sm md:text-base font-bold text-ocean-deep leading-tight truncate">{item.name || item.id}</div>
                                            <div className="text-xs text-ocean-muted font-medium">{item.size || '500g'} × {item.quantity}</div>
                                        </div>
                                        <div className="text-sm md:text-base font-bold text-ocean-deep">
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex flex-col gap-3 pt-6 border-t border-oceanic-blue/20 mb-6">
                            <div className="flex justify-between text-sm md:text-base font-medium text-ocean-deep">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-sm md:text-base font-medium text-ocean-deep">
                                <span>Shipping</span>
                                <span>{isFreeDelivery ? <span className="text-wob-green font-bold">FREE</span> : `₹${shipping}`}</span>
                            </div>
                            <div className="flex justify-between text-sm md:text-base font-medium text-ocean-deep">
                                <span>Tax (5%)</span>
                                <span>₹{tax.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xl md:text-2xl font-bold font-heading text-ocean-deep pt-6 border-t-2 border-ocean-deep">
                            <span className="uppercase tracking-widest">Grand Total</span>
                            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
