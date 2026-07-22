function EmptyState({ title = 'No data available', description = 'There is nothing to display yet.' }) {
  return (
    <div className="rounded-[20px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950/40">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}

export default EmptyState
