const buttonVariants = {
  primary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20',
  secondary: 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        buttonVariants[variant] ?? buttonVariants.primary,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
