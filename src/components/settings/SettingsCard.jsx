import { motion } from 'framer-motion'
import { Card } from '../ui'

function SettingsCard({ children, title, description, icon: Icon, className = '', accent = 'emerald' }) {
  const accentClasses = {
    emerald: 'from-emerald-500/10 to-sky-500/10 text-emerald-600 dark:text-emerald-300',
    sky: 'from-sky-500/10 to-cyan-500/10 text-sky-600 dark:text-sky-300',
    amber: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-300',
    rose: 'from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-300',
    violet: 'from-violet-500/10 to-fuchsia-500/10 text-violet-600 dark:text-violet-300',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      <Card className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.07)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-start gap-3">
          <div className={`rounded-2xl bg-gradient-to-br ${accentClasses[accent] ?? accentClasses.emerald} p-2`}>
            {Icon ? <Icon size={18} /> : null}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
            {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
          </div>
        </div>
        <div className="mt-5 space-y-4">{children}</div>
      </Card>
    </motion.div>
  )
}

export default SettingsCard
