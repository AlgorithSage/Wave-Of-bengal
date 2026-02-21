'use client'

import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, profile, isAdmin, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-ocean-dark/95 backdrop-blur border-b border-wob-gold/15 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    <div className="shrink-0">
                        <Link href="/" className="font-heading text-2xl font-bold text-gold tracking-wider">
                            Wave of Bengal
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            <Link href="/products" className="text-text-light hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Products
                            </Link>
                            <Link href="/our-story" className="text-text-muted hover:text-gold px-3 py-2 rounded-md text-sm transition-colors">
                                Our Story
                            </Link>
                            <Link href="/sustainability" className="text-text-muted hover:text-gold px-3 py-2 rounded-md text-sm transition-colors">
                                Sustainability
                            </Link>
                            <Link href="/certifications" className="text-text-muted hover:text-gold px-3 py-2 rounded-md text-sm transition-colors">
                                Certifications
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/cart" className="text-text-light hover:text-gold relative p-2 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {/* Note: Cart item count will be added here in Phase 3 */}
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/account" className="text-sm font-medium text-text-light hover:text-gold transition-colors hidden sm:block">
                                    {profile?.name || user.displayName || user.email.split('@')[0]}
                                </Link>
                                {isAdmin && (
                                    <Link href="/admin" className="text-xs font-bold uppercase tracking-wider text-ocean-dark bg-gold px-2 py-1 rounded">
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="text-sm border border-wob-gold/40 text-gold hover:bg-wob-gold/10 px-4 py-2 rounded-md transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="text-sm bg-gold text-ocean-dark hover:bg-gold-light font-semibold px-5 py-2.5 rounded-md transition-transform hover:-translate-y-0.5"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
