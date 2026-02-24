const MOCK_ORDERS = [
    { id: 'ORD-8942', customer: 'Rahul Sharma', date: 'Oct 24, 2024', status: 'Delivered', amount: '₹ 1,850' },
    { id: 'ORD-8943', customer: 'Priya Patel', date: 'Oct 24, 2024', status: 'Processing', amount: '₹ 2,400' },
    { id: 'ORD-8944', customer: 'Amit Kumar', date: 'Oct 23, 2024', status: 'Shipped', amount: '₹ 950' },
    { id: 'ORD-8945', customer: 'Sneha Gupta', date: 'Oct 23, 2024', status: 'Delivered', amount: '₹ 3,200' },
    { id: 'ORD-8946', customer: 'Vikram Singh', date: 'Oct 22, 2024', status: 'Cancelled', amount: '₹ 1,100' },
]

export default function OrdersTable() {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            case 'Processing': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            case 'Shipped': return 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
            case 'Cancelled': return 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            default: return 'bg-white/10 text-[#8a9bae] border border-white/20'
        }
    }

    return (
        <div className="bg-[#0f172a]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full shadow-xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-heading font-medium tracking-wide text-[#f0ead6]">Recent Orders</h2>
                <button className="text-[#c9a962] font-semibold hover:text-white transition-colors text-sm tracking-wide">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-[#8a9bae] text-xs font-semibold uppercase tracking-[0.15em]">
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {MOCK_ORDERS.map((order) => (
                            <tr key={order.id} className="hover:bg-white/10 transition-colors group cursor-pointer">
                                <td className="px-6 py-5 font-medium tracking-wide text-[#f0ead6] group-hover:text-white transition-colors">{order.id}</td>
                                <td className="px-6 py-5 text-[#f0ead6] opacity-90">{order.customer}</td>
                                <td className="px-6 py-5 text-[#8a9bae] font-mono text-sm">{order.date}</td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 font-heading text-lg font-bold tracking-wide text-[#c9a962]">{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
