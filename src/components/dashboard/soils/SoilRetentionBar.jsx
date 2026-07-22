function SoilRetentionBar({ value }) {
  const normalizedValue = Math.max(0, Math.min(100, Number(value) || 0))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>Water Retention</span>
        <span className="font-semibold text-slate-900 dark:text-white">{normalizedValue}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  )
}

export default SoilRetentionBar
