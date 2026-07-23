import { motion } from 'framer-motion'

function MineralChips({ minerals = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {minerals.map((mineral, index) => (
        <motion.span
          key={mineral}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.04 }}
          className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
        >
          {mineral}
        </motion.span>
      ))}
    </div>
  )
}

export default MineralChips
