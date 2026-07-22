import { Activity, FileText, Leaf, LogIn, Sprout } from 'lucide-react'
import { Card } from '../ui'

const activities = [
  { title: 'New crop added', detail: 'Maize block A2 was registered', icon: Sprout },
  { title: 'Soil updated', detail: 'North Plot moisture profile refreshed', icon: Leaf },
  { title: 'Analysis completed', detail: 'Recommendation engine finished the latest run', icon: FileText },
  { title: 'Recommendation generated', detail: 'AquaPulse suggestion published to operators', icon: Activity },
  { title: 'Administrator login', detail: 'Omar signed in from the secure admin console', icon: LogIn },
]

function RecentActivity() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Recent Activity</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Key platform events</p>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((item, index) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
                  <Icon size={16} />
                </div>
                {index !== activities.length - 1 ? <div className="mt-2 h-8 w-px bg-slate-200 dark:bg-slate-700" /> : null}
              </div>
              <div className="pt-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default RecentActivity
