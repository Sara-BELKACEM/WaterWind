import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { PlusCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Input } from '../../ui'

function CropModal({ isOpen, onClose, mode = 'add', defaultValues, onSave }) {
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
    onSave({ ...data, minerals: data.minerals?.split(',').map((item) => item.trim()).filter(Boolean) ?? [], compatibleSoils: data.compatibleSoils?.split(',').map((item) => item.trim()).filter(Boolean) ?? [] })
    onClose()
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
            className="w-full max-w-3xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{mode === 'edit' ? 'Edit Crop' : 'Add Crop'}</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Crop profile</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Crop Name"
                  placeholder="Tomato"
                  {...register('name', { required: 'Crop name is required' })}
                  error={errors.name?.message}
                />
                <Input
                  label="Recommended Water"
                  placeholder="Moderate"
                  {...register('recommendedWater', { required: 'Recommended water is required' })}
                  error={errors.recommendedWater?.message}
                />
                <Input
                  label="Recommended pH"
                  placeholder="6.2"
                  {...register('recommendedPh', { required: 'Recommended pH is required' })}
                  error={errors.recommendedPh?.message}
                />
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Recommended Device</span>
                  <select
                    {...register('recommendedDevice', { required: 'Recommended device is required' })}
                    className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="WaterWind Micro">WaterWind Micro</option>
                    <option value="WaterWind Pro">WaterWind Pro</option>
                  </select>
                  {errors.recommendedDevice?.message ? (
                    <p className="mt-2 text-sm text-rose-500">{errors.recommendedDevice.message}</p>
                  ) : null}
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Essential Minerals"
                  placeholder="Nitrogen, Potassium"
                  {...register('minerals', { required: 'Minerals are required' })}
                  error={errors.minerals?.message}
                />
                <Input
                  label="Compatible Soils"
                  placeholder="Loam, Clay"
                  {...register('compatibleSoils', { required: 'Compatible soils are required' })}
                  error={errors.compatibleSoils?.message}
                />
              </div>

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

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={onClose} className="rounded-[18px]">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-[18px]">
                  <PlusCircle size={15} />
                  {mode === 'edit' ? 'Save Crop' : 'Save Crop'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CropModal
