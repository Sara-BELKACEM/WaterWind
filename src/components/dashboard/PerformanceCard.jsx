import { motion } from 'framer-motion'
import { Card } from '../ui'

function CircularScore({ value, label, stroke = '#10b981' }) {
  const normalized = Math.min(Math.max(value, 0), 100)
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (normalized / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} stroke="rgba(148,163,184,0.2)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={stroke}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white">{value}%</div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}

function PerformanceCard() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Performance</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">System reliability snapshot</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <CircularScore value={98} label="Recommendation Accuracy" stroke="#10b981" />
        <CircularScore value={92} label="Server Health" stroke="#38bdf8" />
        <CircularScore value={88} label="System Performance" stroke="#8b5cf6" />
      </div>
    </Card>
  )
}

export default PerformanceCard
