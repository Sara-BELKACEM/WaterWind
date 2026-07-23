import { motion } from 'framer-motion'
import { Card } from '../../ui'

function ExecutiveKPICard({ item }) {
  const Icon = item.icon

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.18 }}>
      <Card className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100/70 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{item.value}</p>
          </div>
          <div className={`rounded-2xl p-3 ${item.tint}`}>
            <Icon size={18} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-300">{item.delta}</span>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
            <span className="h-1.5 w-4 rounded-full bg-emerald-400" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ExecutiveKPICard
