import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Card } from '../../ui'

const entries = [
  { title: 'Recommendation accuracy increased by 4%', detail: 'The engine improved confidence in high-humidity conditions.', tint: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
  { title: 'Clay soil usage decreased', detail: 'Operators are shifting toward loamy and silty profiles.', tint: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' },
  { title: 'Tomato remains the most analyzed crop', detail: 'Demand continues to lead across the platform.', tint: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' },
  { title: 'WaterWind Pro usage increased', detail: 'Premium recommendations are scaling across regions.', tint: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300' },
]

function TrendTimeline() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Trend Analysis</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Highlighted shifts across the operating environment.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Sparkles size={16} />
        </div>
      </div>
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.div key={entry.title} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} className="flex gap-3 rounded-[18px] border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <div className={`rounded-2xl p-2 ${entry.tint}`}>
              <ArrowUpRight size={14} />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{entry.title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

export default TrendTimeline
