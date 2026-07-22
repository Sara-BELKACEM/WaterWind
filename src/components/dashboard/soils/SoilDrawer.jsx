import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import DrainageBadge from './DrainageBadge'
import SoilRetentionBar from './SoilRetentionBar'

function SoilDrawer({ isOpen, soil, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && soil ? (
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
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">Soil profile</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{soil.name}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={16} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Water Retention</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{soil.waterRetention}%</span>
                </div>
              </div>

              <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Drainage Level</span>
                  <DrainageBadge drainage={soil.drainage} />
                </div>
              </div>

              <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                <span className="font-medium text-slate-700 dark:text-slate-200">Description</span>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{soil.description}</p>
              </div>

              <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                <span className="font-medium text-slate-700 dark:text-slate-200">Compatible Crops</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {soil.compatibleCrops?.map((crop) => (
                    <span key={crop} className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">{crop}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Created Date</span>
                  <span className="text-sm text-slate-900 dark:text-white">{soil.createdDate}</span>
                </div>
              </div>

              <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Status</span>
                  <span className="text-sm text-slate-900 dark:text-white">{soil.status}</span>
                </div>
              </div>

              <div className="rounded-[20px] bg-slate-100 p-4 dark:bg-slate-800/80">
                <SoilRetentionBar value={soil.waterRetention} />
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default SoilDrawer
