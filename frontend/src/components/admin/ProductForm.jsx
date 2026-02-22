'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProductForm({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mock save functionality
        console.log('Saving product:', formData)
        if (onClose) onClose()
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card bg-white/50 p-6 md:p-8 rounded-2xl max-w-2xl mx-auto w-full"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-ocean-deep">Add New Product</h2>
                {onClose && (
                    <button onClick={onClose} className="p-2 text-ocean-muted hover:text-ocean-deep rounded-full hover:bg-white/40 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Premium Ilish"
                            required
                            className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-3 text-ocean-deep focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-ocean-muted/60 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-3 text-ocean-deep focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-ocean-muted/60 transition-all font-medium appearance-none"
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="fresh-water">Fresh Water Fish</option>
                            <option value="sea-water">Sea Water Fish</option>
                            <option value="shellfish">Shellfish & Prawns</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                            className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-3 text-ocean-deep focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-ocean-muted/60 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Stock / Quantity (kg)</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="0"
                            required
                            className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-3 text-ocean-deep focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-ocean-muted/60 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-ocean-deep tracking-wide uppercase">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell us about the source, weight range, and taste notes..."
                        required
                        className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-3 text-ocean-deep focus:outline-none focus:ring-2 focus:ring-oceanic-blue/50 placeholder:text-ocean-muted/60 transition-all font-medium resize-none"
                    ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-full font-bold text-ocean-muted hover:text-ocean-deep hover:bg-white/40 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-oceanic-blue text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(56,189,248,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(56,189,248,0.5)] transition-all duration-300 uppercase tracking-wider"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </motion.div>
    )
}
