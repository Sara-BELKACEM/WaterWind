function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-rose-500">{error}</span> : null}
    </label>
  )
}

export default Input
