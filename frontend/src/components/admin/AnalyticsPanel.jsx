const MOCK_SEARCHES = [
    { term: 'Ilish', count: 428, trend: '+12%' },
    { term: 'Prawns', count: 356, trend: '+8%' },
    { term: 'Rui', count: 284, trend: '-3%' },
    { term: 'Bhetki', count: 215, trend: '+15%' },
    { term: 'Crab', count: 189, trend: '+2%' },
]

export default function AnalyticsPanel() {
    return (
        <div className="bg-[#0f172a]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full shadow-xl">
            <h2 className="text-xl font-heading font-medium tracking-wide text-[#f0ead6] mb-6">Top Search Queries</h2>

            <div className="space-y-4">
                {MOCK_SEARCHES.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#c9a962]/10 flex items-center justify-center text-[#c9a962] font-semibold text-sm border border-[#c9a962]/20 shadow-[inset_0_0_8px_rgba(201,169,98,0.2)]">
                                #{index + 1}
                            </div>
                            <div>
                                <p className="font-semibold tracking-wide text-[#f0ead6] group-hover:text-white transition-colors">{search.term}</p>
                                <p className="text-[10px] text-[#8a9bae] font-bold tracking-[0.15em] uppercase mt-1">{search.count} searches</p>
                            </div>
                        </div>
                        <div className={`text-sm tracking-wide font-bold ${search.trend.startsWith('+') ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]'}`}>
                            {search.trend}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-3.5 rounded-xl border border-[#c9a962]/30 text-[#c9a962] font-semibold tracking-wide hover:bg-[#c9a962]/10 hover:border-[#c9a962]/50 hover:text-white transition-all shadow-sm">
                Export Full Report
            </button>
        </div>
    )
}
