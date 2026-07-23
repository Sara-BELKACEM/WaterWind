import { Skeleton } from '../../ui'

function HistorySkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28" />
        ))}
      </div>
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Skeleton className="h-12 w-full" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="mt-3 h-12 w-full" />
        ))}
      </div>
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  )
}

export default HistorySkeleton
