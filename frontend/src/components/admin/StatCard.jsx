export default function StatCard({ title, value, trend, trendUp, icon }) {
    return (
        <div className="glass-card p-6 rounded-2xl bg-white/40">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-ocean-muted text-sm font-medium tracking-wide mb-1 uppercase">{title}</p>
                    <h3 className="text-3xl font-heading font-black text-ocean-deep">{value}</h3>
                </div>
                <div className="p-3 bg-oceanic-blue/10 text-oceanic-blue rounded-xl">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm">
                <span className={`font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trendUp ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                    </svg>
                    {trend}
                </span>
                <span className="text-ocean-muted">vs last month</span>
            </div>
        </div>
    )
}
