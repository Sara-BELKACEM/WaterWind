import { Activity, Clock3, ShieldCheck } from 'lucide-react'
import { Card } from '../../ui'

function ExecutiveSummary() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Report Summary</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Executive overview built from live mock trends.</p>
      </div>
      <div className="space-y-3">
        <div className="rounded-[18px] border border-emerald-100 bg-emerald-50/70 p-3 dark:border-emerald-900/30 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck size={16} />
            <span className="font-semibold">Platform Health</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Excellent</p>
        </div>
        <div className="rounded-[18px] border border-sky-100 bg-sky-50/70 p-3 dark:border-sky-900/30 dark:bg-sky-950/30">
          <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300">
            <Activity size={16} />
            <span className="font-semibold">Recommendation Engine</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">98%</p>
        </div>
        <div className="rounded-[18px] border border-amber-100 bg-amber-50/70 p-3 dark:border-amber-900/30 dark:bg-amber-950/30">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <Clock3 size={16} />
            <span className="font-semibold">Average Analysis Time</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">2.3 sec</p>
        </div>
        <div className="rounded-[18px] border border-violet-100 bg-violet-50/70 p-3 dark:border-violet-900/30 dark:bg-violet-950/30">
          <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
            <Activity size={16} />
            <span className="font-semibold">Monthly Activity</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">+18%</p>
        </div>
      </div>
    </Card>
  )
}

export default ExecutiveSummary
