import { motion } from 'framer-motion'
import { Card } from '../../ui'

function EnvironmentCard({ label, value, tone = 'emerald' }) {
  const toneClass = {
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200',
    sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-200',
    violet: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-200',
  }[tone]

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[20px] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
        <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${toneClass}`}>{value}</div>
      </Card>
    </motion.div>
  )
}

export default EnvironmentCard
