import { CloudSun } from 'lucide-react'
import { Card } from '../ui'

function WeatherWidget() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-amber-50 to-sky-50 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Weather</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Field outlook</p>
        </div>
        <div className="rounded-2xl bg-white/70 p-2 text-amber-500 dark:bg-slate-800">
          <CloudSun size={18} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Temperature</p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">28°C</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Humidity</p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">64%</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Wind Speed</p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">12 km/h</p>
        </div>
      </div>
    </Card>
  )
}

export default WeatherWidget
