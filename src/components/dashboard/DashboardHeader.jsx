function DashboardHeader({ title, subtitle, breadcrumb }) {
  return (
    <header className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">
        {breadcrumb}
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
      </div>
    </header>
  )
}

export default DashboardHeader
