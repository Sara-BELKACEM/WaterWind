import { AnimatePresence, motion } from 'framer-motion'

function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
        >
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            className="w-full max-w-lg rounded-[20px] border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Modal
