import { motion } from 'framer-motion'
import { Download, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from '../../ui'

function StatisticsHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/70 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">Dashboard / Statistics</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Statistics Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Monitor platform performance, recommendation quality, and system activity through immersive analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="rounded-[18px]">
            <Download size={16} />
            Export PDF
          </Button>
          <Button variant="outline" className="rounded-[18px]">
            <Download size={16} />
            Export CSV
          </Button>
          <Button className="rounded-[18px]">
            <RefreshCw size={16} />
            Refresh Dashboard
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

export default StatisticsHeader
