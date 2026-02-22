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
            case 'Delivered': return 'bg-green-100 text-green-700'
            case 'Processing': return 'bg-yellow-100 text-yellow-700'
            case 'Shipped': return 'bg-blue-100 text-blue-700'
            case 'Cancelled': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="glass-card bg-white/40 rounded-2xl overflow-hidden h-full">
            <div className="p-6 border-b border-white/30 flex justify-between items-center">
                <h2 className="text-xl font-heading font-bold text-ocean-deep">Recent Orders</h2>
                <button className="text-oceanic-blue font-medium hover:text-ocean-deep transition-colors text-sm">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/20 text-ocean-muted text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Order ID</th>
                            <th className="px-6 py-4 font-medium">Customer</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                        {MOCK_ORDERS.map((order) => (
                            <tr key={order.id} className="hover:bg-white/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-ocean-deep">{order.id}</td>
                                <td className="px-6 py-4 text-ocean-deep">{order.customer}</td>
                                <td className="px-6 py-4 text-ocean-muted">{order.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-ocean-deep">{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
