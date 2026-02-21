'use client'

import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
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
        <div className="min-h-screen flex items-center justify-center bg-ocean-dark p-4">
            <div className="bg-ocean-teal p-8 rounded-xl border border-wob-gold/15 w-full max-w-md shadow-2xl">
                <h1 className="text-3xl font-heading text-text-light mb-6 text-center">Create Account</h1>

                {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-text-muted text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-wob-gold/20 rounded-lg px-4 py-3 text-text-light focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-wob-gold/20 rounded-lg px-4 py-3 text-text-light focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-wob-gold/20 rounded-lg px-4 py-3 text-text-light focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gold hover:bg-gold-light text-ocean-dark font-semibold py-3 px-4 rounded-lg uppercase tracking-wide transition-all hover:-translate-y-0.5"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <span className="border-b border-wob-gold/15 w-1/5 lg:w-1/4"></span>
                    <span className="text-xs text-center text-text-muted uppercase">or continue with</span>
                    <span className="border-b border-wob-gold/15 w-1/5 lg:w-1/4"></span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full mt-6 bg-transparent border border-wob-gold/40 text-gold hover:bg-wob-gold/10 py-3 px-4 rounded-lg font-medium transition-all"
                >
                    Google
                </button>

                <p className="mt-8 text-center text-text-muted text-sm">
                    Already have an account? <Link href="/auth/login" className="text-gold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
