import { motion } from 'framer-motion'
import { Card } from '../../ui'

function HistoryKPICard({ metric }) {
  const Icon = metric.icon

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.18 }}>
      <Card className="rounded-[22px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100/70 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{metric.value}</p>
          </div>
          <div className={`rounded-2xl p-3 ${metric.tint}`}>
            <Icon size={18} />
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{metric.caption}</p>
      </Card>
    </motion.div>
  )
}

export default HistoryKPICard
