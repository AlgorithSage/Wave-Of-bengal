const MOCK_SEARCHES = [
    { term: 'Ilish', count: 428, trend: '+12%' },
    { term: 'Prawns', count: 356, trend: '+8%' },
    { term: 'Rui', count: 284, trend: '-3%' },
    { term: 'Bhetki', count: 215, trend: '+15%' },
    { term: 'Crab', count: 189, trend: '+2%' },
]

export default function AnalyticsPanel() {
    return (
        <div className="glass-card bg-white/40 rounded-2xl p-6 h-full">
            <h2 className="text-xl font-heading font-bold text-ocean-deep mb-6">Top Search Queries</h2>

            <div className="space-y-4">
                {MOCK_SEARCHES.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/30 hover:bg-white/50 transition-colors border border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-oceanic-blue/10 flex items-center justify-center text-oceanic-blue font-bold text-sm">
                                #{index + 1}
                            </div>
                            <div>
                                <p className="font-bold text-ocean-deep">{search.term}</p>
                                <p className="text-xs text-ocean-muted tracking-wide uppercase">{search.count} searches</p>
                            </div>
                        </div>
                        <div className={`text-sm font-semibold ${search.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                            {search.trend}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl border border-oceanic-blue/30 text-oceanic-blue font-medium hover:bg-oceanic-blue hover:text-white transition-all shadow-sm">
                Export Full Report
            </button>
        </div>
    )
}
