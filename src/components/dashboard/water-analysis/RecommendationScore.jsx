import { motion } from 'framer-motion'

function RecommendationScore({ score = 96 }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg className="absolute inset-0 h-32 w-32 -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} stroke="currentColor" strokeWidth="10" fill="none" className="text-slate-200 dark:text-slate-800" />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            cx="70"
            cy="70"
            r={radius}
            stroke="url(#scoreGradient)"
            strokeLinecap="round"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>

        <div className="text-center">
          <p className="text-3xl font-bold text-slate-950 dark:text-white">{score}%</p>
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">Excellent Match</p>
        </div>
      </div>
    </div>
  )
}

export default RecommendationScore
