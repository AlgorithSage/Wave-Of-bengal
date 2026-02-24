import StatCard from '@/components/admin/StatCard'
import OrdersTable from '@/components/admin/OrdersTable'
import AnalyticsPanel from '@/components/admin/AnalyticsPanel'
import Link from 'next/link'

export default function AdminDashboard() {
    return (
        <div className="space-y-8 mb-20 md:mb-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <header>
                    <h1 className="text-4xl font-heading font-medium tracking-wide text-white drop-shadow-md">Dashboard Overview</h1>
                    <p className="text-white/60 mt-2 text-lg">Welcome back. Here is what is happening today.</p>
                </header>
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to Homepage
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="₹ 1,24,500" trend="+14.5%" trendUp={true} icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <StatCard title="Total Orders" value="342" trend="+5.2%" trendUp={true} icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <StatCard title="Active Users" value="1,204" trend="-2.4%" trendUp={false} icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                <StatCard title="Avg. Order Value" value="₹ 645" trend="+1.2%" trendUp={true} icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders - Spans 2 columns on large screens */}
                <div className="lg:col-span-2">
                    <OrdersTable />
                </div>

                {/* Top Search Analytics */}
                <div>
                    <AnalyticsPanel />
                </div>
            </div>
        </div>
    )
}
