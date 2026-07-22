import { motion } from 'framer-motion'
import { LoadingSpinner } from '../ui'

function LoadingOverlay({ label = 'Loading dashboard module...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[280px] items-center justify-center rounded-[24px] border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/70"
    >
      <LoadingSpinner label={label} />
    </motion.div>
  )
}

export default LoadingOverlay
