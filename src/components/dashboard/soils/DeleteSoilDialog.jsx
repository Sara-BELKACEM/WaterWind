import { AnimatePresence, motion } from 'framer-motion'
import { Button, Modal } from '../../ui'

function DeleteSoilDialog({ isOpen, onClose, soil, onDelete }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            className="w-full max-w-md rounded-[24px] border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <Modal isOpen={true} onClose={onClose} title="Delete soil type">
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Are you sure you want to delete this soil type?
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={onClose} className="rounded-[18px]">
                    Cancel
                  </Button>
                  <Button onClick={() => onDelete(soil)} className="rounded-[18px] bg-rose-600 hover:bg-rose-700">
                    Delete
                  </Button>
                </div>
              </div>
            </Modal>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default DeleteSoilDialog
