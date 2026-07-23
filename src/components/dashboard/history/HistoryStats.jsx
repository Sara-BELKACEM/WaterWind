import { motion } from 'framer-motion'
import HistoryKPICard from './HistoryKPICard'

function HistoryStats({ metrics }) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index }}
        >
          <HistoryKPICard metric={metric} />
        </motion.div>
      ))}
    </div>
  )
}

export default HistoryStats
