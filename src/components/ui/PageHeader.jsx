function PageHeader({ title, description, breadcrumb }) {
  return (
    <header className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">
        {breadcrumb}
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          {description ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
        </div>
      </div>
    </header>
  )
}

export default PageHeader
