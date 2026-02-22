'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Products', path: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Orders', path: '/admin/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'Analytics', path: '/admin/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <>
            <div className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white/20 backdrop-blur-md border-r border-white/40 shadow-xl z-40">
                <div className="p-6">
                    <Link href="/">
                        <h2 className="text-2xl font-heading font-bold text-ocean-deep mb-8 flex items-center gap-2">
                            <svg className="w-8 h-8 text-oceanic-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Admin Panel
                        </h2>
                    </Link>
                    <nav className="space-y-3">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path
                            return (
                                <Link key={item.path} href={item.path}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                ? 'bg-oceanic-blue text-white shadow-md'
                                                : 'text-ocean-muted hover:bg-white/40 hover:text-ocean-deep'
                                            }`}
                                    >
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                        <span className="font-medium tracking-wide">{item.name}</span>
                                    </motion.div>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-6 border-t border-white/30">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm text-ocean-muted">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        System Online
                    </div>
                </div>
            </div>

            {/* Mobile nav placeholder - can expand later if needed */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/30 backdrop-blur-xl border-t border-white/40 z-50 p-4 flex justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.path
                    return (
                        <Link key={item.path} href={item.path}>
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-oceanic-blue text-white' : 'text-ocean-muted'}`}>
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
