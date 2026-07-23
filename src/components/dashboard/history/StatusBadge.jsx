function StatusBadge({ status }) {
  const variants = {
    Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100',
    Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-100',
    Archived: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[status] ?? variants.Archived}`}>
      {status}
    </span>
  )
}

export default StatusBadge
