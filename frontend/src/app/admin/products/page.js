'use client'

import { useState } from 'react'
import ProductForm from '@/components/admin/ProductForm'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_PRODUCTS = [
    { id: 1, name: 'Premium Padma Ilish', category: 'Fresh Water', price: 1800, stock: 45, status: 'Active' },
    { id: 2, name: 'Jumbo Tiger Prawns', category: 'Shellfish', price: 1200, stock: 12, status: 'Low Stock' },
    { id: 3, name: 'Rui Maach (Rohu)', category: 'Fresh Water', price: 400, stock: 85, status: 'Active' },
    { id: 4, name: 'Bhetki', category: 'Sea Water', price: 900, stock: 0, status: 'Out of Stock' },
]

export default function AdminProductsPage() {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="space-y-8 mb-20 md:mb-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <header>
                    <h1 className="text-4xl font-heading font-bold text-ocean-deep">Product Management</h1>
                    <p className="text-ocean-muted mt-2">Add, edit, and organize your fresh catch inventory.</p>
                </header>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-oceanic-blue text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(56,189,248,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(56,189,248,0.5)] transition-all duration-300 uppercase tracking-wider flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {showForm ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ProductForm onClose={() => setShowForm(false)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass-card bg-white/40 rounded-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-white/30 flex gap-4">
                            {/* Simple mock search input for styling */}
                            <div className="relative flex-1 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full bg-white/60 border border-white/40 rounded-full pl-12 pr-4 py-3 text-ocean-deep focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-ocean-muted/60 transition-all font-medium"
                                />
                                <svg className="w-5 h-5 text-ocean-muted absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/20 text-ocean-muted text-sm uppercase tracking-wider">
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Category</th>
                                        <th className="px-6 py-4 font-medium">Price</th>
                                        <th className="px-6 py-4 font-medium">Stock</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/20">
                                    {MOCK_PRODUCTS.map((product) => (
                                        <tr key={product.id} className="hover:bg-white/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-ocean-deep">{product.name}</td>
                                            <td className="px-6 py-4 text-ocean-muted">{product.category}</td>
                                            <td className="px-6 py-4 font-medium text-ocean-deep">₹ {product.price}</td>
                                            <td className="px-6 py-4 font-medium text-ocean-deep">{product.stock} kg</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-oceanic-blue hover:text-ocean-deep transition-colors p-2 bg-white/40 rounded-lg hover:bg-white/60">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
