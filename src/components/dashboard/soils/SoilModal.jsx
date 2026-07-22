import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { PlusCircle, X } from 'lucide-react'
import { Button, Input } from '../../ui'

function SoilModal({ isOpen, onClose, mode = 'add', defaultValues, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const onSubmit = (data) => {
    onSave({ ...data, waterRetention: Number(data.waterRetention) })
  }

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
            className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{mode === 'edit' ? 'Edit Soil' : 'Add Soil'}</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Soil profile</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Soil Name"
                  placeholder="Loamy"
                  {...register('name', { required: 'Soil name is required' })}
                  error={errors.name?.message}
                />
                <Input
                  label="Water Retention (%)"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="75"
                  {...register('waterRetention', { required: 'Water retention is required', min: 0, max: 100 })}
                  error={errors.waterRetention?.message}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Drainage Level</span>
                  <select
                    {...register('drainage', { required: 'Drainage is required' })}
                    className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Status</span>
                  <select
                    {...register('status', { required: 'Status is required' })}
                    className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Description</span>
                <textarea
                  rows="4"
                  {...register('description', { required: 'Description is required' })}
                  className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                />
                {errors.description?.message ? <span className="text-xs text-rose-500">{errors.description.message}</span> : null}
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={onClose} className="rounded-[18px]">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-[18px]">
                  <PlusCircle size={15} />
                  Save Soil
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default SoilModal
