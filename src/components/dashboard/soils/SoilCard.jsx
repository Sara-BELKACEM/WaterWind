import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2, LandPlot } from 'lucide-react'
import { Button, Card } from '../../ui'
import DrainageBadge from './DrainageBadge'
import SoilRetentionBar from './SoilRetentionBar'

function SoilCard({ soil, onView, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group"
    >
      <Card className="relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500" />
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20">
              <LandPlot size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{soil.name}</h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{soil.status}</p>
            </div>
          </div>
          <DrainageBadge drainage={soil.drainage} />
        </div>

        <div className="space-y-4 rounded-[18px] border border-white/60 bg-white/60 p-3 dark:border-slate-700 dark:bg-slate-800/50">
          <SoilRetentionBar value={soil.waterRetention} />

          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{soil.description}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 rounded-[18px] bg-slate-100/80 p-2 dark:bg-slate-800/70">
          <Button variant="ghost" onClick={() => onView(soil)} className="rounded-xl px-3 py-2 text-xs">
            <Eye size={14} />
            View
          </Button>
          <Button variant="ghost" onClick={() => onEdit(soil)} className="rounded-xl px-3 py-2 text-xs">
            <Pencil size={14} />
            Edit
          </Button>
          <Button variant="ghost" onClick={() => onDelete(soil)} className="rounded-xl px-3 py-2 text-xs text-rose-600 dark:text-rose-300">
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default SoilCard
