import { Activity, Database, Server, ShieldCheck } from 'lucide-react'
import { Card } from '../ui'

const items = [
  { label: 'API', value: 'Online', icon: Activity },
  { label: 'Database', value: 'Connected', icon: Database },
  { label: 'AI Recommendation Engine', value: 'Active', icon: ShieldCheck },
  { label: 'Server', value: 'Healthy', icon: Server },
]

function SystemStatus() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">System Status</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Infrastructure health</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.label} className="flex items-center justify-between rounded-[18px] bg-slate-50 px-3 py-3 dark:bg-slate-800/70">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <Icon size={16} />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default SystemStatus
