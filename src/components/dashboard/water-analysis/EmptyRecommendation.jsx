import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'
import { Card } from '../../ui'

function EmptyRecommendation() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white to-emerald-50/70 p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20">
          <Droplets size={30} />
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-slate-950 dark:text-white">Ready to Analyze</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300">
          Start by selecting a crop and soil type to generate an intelligent WaterWind recommendation.
        </p>
      </Card>
    </motion.div>
  )
}

export default EmptyRecommendation
