import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

function Drawer({ open, onClose, title, subtitle, children, className = '' }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: 32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 28, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`absolute right-0 top-0 h-full w-full max-w-xl border-l border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 ${className}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                {subtitle ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">{subtitle}</p> : null}
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={16} />
              </button>
            </div>

            <div className="mt-6 overflow-y-auto pb-4">{children}</div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Drawer
