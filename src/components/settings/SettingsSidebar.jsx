import { motion } from 'framer-motion'
import { AlertCircle, Bell, BrushCleaning, Clock3, Globe2, Info, Lock, Palette, Settings2, Shield, UserRound } from 'lucide-react'

const items = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'language', label: 'Language & Region', icon: Globe2 },
  { id: 'system', label: 'System Preferences', icon: Settings2 },
  { id: 'about', label: 'About Platform', icon: Info },
]

function SettingsSidebar({ activeSection, onSelect }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="rounded-[28px] border border-slate-200/80 bg-white/85 p-3 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85"
    >
      <div className="mb-3 rounded-[20px] bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-3 dark:from-emerald-950/40 dark:to-sky-950/40">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <Shield size={16} />
          Workspace Controls
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Organize access, appearance, and preferences in one place.</p>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeSection

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 rounded-[18px] px-3 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-4 rounded-[20px] border border-amber-200 bg-amber-50/70 p-3 text-sm text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
        <div className="flex items-center gap-2 font-semibold">
          <AlertCircle size={15} />
          Quick tip
        </div>
        <p className="mt-2">Preferences update instantly in the preview so you can review changes before saving.</p>
      </div>
    </motion.aside>
  )
}

export default SettingsSidebar
