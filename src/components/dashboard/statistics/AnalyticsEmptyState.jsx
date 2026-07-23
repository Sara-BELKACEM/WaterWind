import { Sparkles } from 'lucide-react'
import { Button } from '../../ui'

function AnalyticsEmptyState() {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-[0_16px_40px_rgba(15,23,42,0.05)] dark:border-slate-700 dark:bg-slate-900/70">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20">
        <Sparkles size={24} />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">No analytics available.</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Generate mock analytics to populate your executive insights workspace.</p>
      <Button className="mt-4 rounded-[18px]">Generate Mock Analytics</Button>
    </div>
  )
}

export default AnalyticsEmptyState
