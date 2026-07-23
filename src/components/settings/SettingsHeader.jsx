import { motion } from 'framer-motion'
import { RotateCcw, Save } from 'lucide-react'
import { Badge, Button } from '../ui'

function SettingsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/70 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">Enterprise</Badge>
            <Badge variant="sky">UI only</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Settings</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Dashboard / Settings</p>
          <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Manage your account preferences and application settings with a premium, production-ready experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-[18px]">
            <RotateCcw size={16} />
            Reset Defaults
          </Button>
          <Button variant="primary" className="rounded-[18px]">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsHeader
