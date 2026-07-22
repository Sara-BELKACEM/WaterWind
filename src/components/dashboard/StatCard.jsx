import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '../ui'

function StatCard({ title, value, suffix = '', icon: Icon, trend, accent = 'emerald' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.45 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 700
    const startTime = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      const nextValue = Math.round(value * eased)
      setDisplayValue(nextValue)

      if (progress < 1) {
        start = requestAnimationFrame(animate)
      }
    }

    start = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(start)
  }, [isInView, value])

  const accentClasses = {
    emerald: 'from-emerald-500/15 to-emerald-500/5 text-emerald-600',
    sky: 'from-sky-500/15 to-sky-500/5 text-sky-600',
    violet: 'from-violet-500/15 to-violet-500/5 text-violet-600',
    amber: 'from-amber-500/15 to-amber-500/5 text-amber-600',
  }

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card ref={ref} className="relative overflow-hidden rounded-[24px] border border-slate-200/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-slate-800">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentClasses[accent].split(' ').slice(0, 2).join(' ')}`} />

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {displayValue.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{suffix}</span>
            </div>
          </div>

          <div className={`rounded-2xl bg-gradient-to-br p-3 ${accentClasses[accent]}`}>
            <Icon size={20} />
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">
          <ArrowUpRight size={14} />
          {trend}
        </div>
      </Card>
    </motion.div>
  )
}

export default StatCard
