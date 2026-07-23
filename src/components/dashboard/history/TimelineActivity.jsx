import { motion } from 'framer-motion'
import { Activity, CheckCircle2, Download, Sparkles, Wrench } from 'lucide-react'

const items = [
  { icon: Sparkles, title: 'Analysis Created', subtitle: 'New irrigation profile generated for Tomato', time: '2m ago' },
  { icon: CheckCircle2, title: 'Recommendation Generated', subtitle: 'Water balance and mineral fit prepared', time: '18m ago' },
  { icon: Download, title: 'Report Downloaded', subtitle: 'Executive summary exported to PDF', time: '54m ago' },
  { icon: Wrench, title: 'Device Recommended', subtitle: 'DripSmart selected for field optimization', time: '1h ago' },
]

function TimelineActivity() {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-2">
        <div className="rounded-2xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <Activity size={16} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest workflow events across the analysis archive.</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className="flex gap-3 rounded-[18px] border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div className="mt-1 rounded-2xl bg-white p-2 text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.subtitle}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default TimelineActivity
