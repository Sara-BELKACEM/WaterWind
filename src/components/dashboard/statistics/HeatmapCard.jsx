import { motion } from 'framer-motion'
import { Card } from '../../ui'

const rows = ['Tomato', 'Maize', 'Rice', 'Wheat', 'Carrot']
const cols = ['Loamy', 'Clay', 'Silty', 'Sandy']
const values = [
  [92, 88, 84, 79],
  [86, 90, 82, 76],
  [81, 87, 91, 74],
  [77, 83, 79, 72],
  [90, 85, 80, 78],
]

function HeatmapCard() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Recommendation Intensity Heatmap</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">A visual overview of high-confidence crop and soil pairings.</p>
      </div>
      <div className="overflow-hidden rounded-[20px] border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-[90px_repeat(4,minmax(0,1fr))] bg-slate-100/80 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
          <div className="px-3 py-2">Crop</div>
          {cols.map((col) => <div key={col} className="px-3 py-2">{col}</div>)}
        </div>
        {rows.map((row, rowIndex) => (
          <div key={row} className="grid grid-cols-[90px_repeat(4,minmax(0,1fr))] border-t border-slate-200 dark:border-slate-800">
            <div className="px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">{row}</div>
            {values[rowIndex].map((value, colIndex) => (
              <motion.div
                key={`${row}-${cols[colIndex]}`}
                whileHover={{ scale: 1.04 }}
                className="m-2 flex items-center justify-center rounded-[12px] px-2 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: `rgba(16,185,129, ${0.45 + value / 220})` }}
              >
                {value}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default HeatmapCard
