import { Card } from '../../ui'

function AnalysisSummary({ crop, soil, humidity, windSpeed, surfaceArea, recommendedLiter }) {
  return (
    <Card className="rounded-[24px] p-4 dark:border-slate-800">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Crop</p>
          <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{crop}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Soil</p>
          <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{soil}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Humidity</p>
          <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{humidity}%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Wind</p>
          <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{windSpeed} m/s</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Area</p>
          <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{surfaceArea} m²</p>
        </div>
      </div>

      <div className="mt-4 rounded-[18px] bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
        Recommended delivery: {recommendedLiter}
      </div>
    </Card>
  )
}

export default AnalysisSummary
