'use client'

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { registerWithEmail, loginWithGoogle } = useAuth();
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await registerWithEmail(name, email, password);
            router.push('/');
        } catch (err) {
            setError(err.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            router.push('/');
        } catch (err) {
            setError(err.message || 'Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-light p-4">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl border border-oceanic-blue/20 w-full max-w-md shadow-lg">
                <h1 className="text-3xl font-heading font-black text-ocean-deep mb-6 text-center">Create Account</h1>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 text-sm font-medium">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-ocean-deep font-bold text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white border border-oceanic-blue/20 rounded-lg px-4 py-3 text-ocean-deep font-medium focus:border-oceanic-blue focus:ring-2 focus:ring-oceanic-blue/20 outline-none transition-all shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-ocean-deep font-bold text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-oceanic-blue/20 rounded-lg px-4 py-3 text-ocean-deep font-medium focus:border-oceanic-blue focus:ring-2 focus:ring-oceanic-blue/20 outline-none transition-all shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-ocean-deep font-bold text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border border-oceanic-blue/20 rounded-lg px-4 py-3 text-ocean-deep font-medium focus:border-oceanic-blue focus:ring-2 focus:ring-oceanic-blue/20 outline-none transition-all shadow-sm"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ocean-deep hover:bg-oceanic-blue text-sky-light font-bold py-3 px-4 rounded-lg uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-md"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <span className="border-b border-oceanic-blue/20 w-1/5 lg:w-1/4"></span>
                    <span className="text-xs text-center font-bold text-ocean-muted uppercase tracking-wider">or continue with</span>
                    <span className="border-b border-oceanic-blue/20 w-1/5 lg:w-1/4"></span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full mt-6 bg-white border-2 border-oceanic-blue/20 text-ocean-deep hover:border-oceanic-blue hover:text-oceanic-blue py-3 px-4 rounded-lg font-bold transition-all shadow-sm flex justify-center items-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </button>

                <p className="mt-8 text-center text-ocean-muted font-medium text-sm">
                    Already have an account? <Link href="/auth/login" className="text-oceanic-blue hover:text-ocean-deep font-bold hover:underline transition-colors">Log in</Link>
                </p>
            </div>
        </div>
    );
}
