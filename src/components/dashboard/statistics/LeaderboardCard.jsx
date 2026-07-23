import { Award, Droplets, Leaf, Sprout } from 'lucide-react'
import { Card } from '../../ui'

const items = [
  { label: 'Top Crops', value: 'Tomato', icon: Sprout, progress: 86 },
  { label: 'Top Soils', value: 'Loamy', icon: Leaf, progress: 74 },
  { label: 'Top Devices', value: 'AquaPulse', icon: Droplets, progress: 68 },
]

function LeaderboardCard() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Recent Performance</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Current leaders across crops, soils, and device recommendations.</p>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-[18px] border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-2xl bg-white p-2 text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                  <Award size={14} />
                  #{index + 1}
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default LeaderboardCard
