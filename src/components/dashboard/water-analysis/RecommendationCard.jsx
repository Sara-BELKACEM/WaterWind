import { motion } from 'framer-motion'
import { Droplets, Leaf, ShieldCheck } from 'lucide-react'
import { Card } from '../../ui'
import MineralChips from './MineralChips'

function RecommendationCard({ title, description, amount, tone = 'emerald', minerals = [] }) {
  const toneClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    sky: 'from-sky-500 to-sky-600',
    violet: 'from-violet-500 to-violet-600',
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-[24px] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{title}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{description}</h3>
          </div>
          <div className={`rounded-2xl bg-gradient-to-br px-3 py-2 text-white ${toneClasses[tone] ?? toneClasses.emerald}`}>
            <Droplets size={16} />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[18px] bg-slate-50 p-3 dark:bg-slate-950/70">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Leaf size={14} />
              Nutrient blend
            </div>
            <div className="mt-3">
              <MineralChips minerals={minerals} />
            </div>
          </div>

          <div className="rounded-[18px] bg-slate-50 p-3 dark:bg-slate-950/70">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <ShieldCheck size={14} />
              Irrigation target
            </div>
            <div className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{amount}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default RecommendationCard
