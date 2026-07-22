const badgeVariants = {
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100',
  sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-100',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-100',
}

function Badge({ children, variant = 'emerald', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeVariants[variant] ?? badgeVariants.emerald} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
