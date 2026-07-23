import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Droplets, RotateCcw, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, Card } from '../../ui'

const cropOptions = ['Tomato', 'Potato', 'Rice', 'Corn']
const soilOptions = ['Clay', 'Loamy', 'Sandy', 'Silty']

function AnalysisForm({ onGenerate, onReset, initialValues, isLoading }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  })

  const humidity = watch('humidity')
  const windSpeed = watch('windSpeed')

  const humidityLabel = useMemo(() => `${humidity}%`, [humidity])
  const windLabel = useMemo(() => `${windSpeed} m/s`, [windSpeed])

  const submitForm = (values) => onGenerate(values)

  const resetForm = () => {
    reset(initialValues)
    onReset()
  }

  return (
    <Card className="rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">Analysis Parameters</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Configure the recommendation engine</h2>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
          <Sparkles size={18} />
        </div>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span className="font-medium">Crop</span>
            <input
              list="crop-options"
              aria-label="Crop"
              className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:focus:bg-slate-900"
              {...register('crop', { required: 'Please select a crop' })}
            />
            <datalist id="crop-options">
              {cropOptions.map((item) => <option key={item} value={item} />)}
            </datalist>
            {errors.crop ? <span className="text-xs text-rose-500">{errors.crop.message}</span> : null}
          </label>

          <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span className="font-medium">Soil Type</span>
            <input
              list="soil-options"
              aria-label="Soil type"
              className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:focus:bg-slate-900"
              {...register('soil', { required: 'Please select a soil type' })}
            />
            <datalist id="soil-options">
              {soilOptions.map((item) => <option key={item} value={item} />)}
            </datalist>
            {errors.soil ? <span className="text-xs text-rose-500">{errors.soil.message}</span> : null}
          </label>
        </div>

        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <span className="font-medium">Surface Area</span>
          <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950">
            <input
              type="number"
              min="50"
              aria-label="Surface area"
              className="w-full bg-transparent outline-none"
              {...register('surfaceArea', {
                required: 'Surface area is required',
                min: { value: 50, message: 'Minimum area is 50 m²' },
              })}
            />
            <span className="text-xs font-semibold text-slate-500">m²</span>
          </div>
          {errors.surfaceArea ? <span className="text-xs text-rose-500">{errors.surfaceArea.message}</span> : null}
        </label>

        <div className="space-y-3 rounded-[20px] bg-slate-50 p-4 dark:bg-slate-950/70">
          <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>Humidity</span>
            <span>{humidityLabel}</span>
          </div>
          <motion.input
            type="range"
            min="0"
            max="100"
            whileTap={{ scale: 1.02 }}
            className="w-full accent-emerald-500"
            {...register('humidity', { required: true, min: 0, max: 100 })}
          />
        </div>

        <div className="space-y-3 rounded-[20px] bg-slate-50 p-4 dark:bg-slate-950/70">
          <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>Wind Speed</span>
            <span>{windLabel}</span>
          </div>
          <motion.input
            type="range"
            min="0"
            max="25"
            step="0.5"
            whileTap={{ scale: 1.02 }}
            className="w-full accent-sky-500"
            {...register('windSpeed', { required: true, min: 0, max: 25 })}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" disabled={isLoading} className="flex-1 rounded-[18px]">
            <Droplets size={15} />
            {isLoading ? 'Generating…' : 'Generate Recommendation'}
          </Button>
          <Button type="button" variant="outline" onClick={resetForm} className="rounded-[18px]">
            <RotateCcw size={15} />
            Reset Form
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default AnalysisForm
