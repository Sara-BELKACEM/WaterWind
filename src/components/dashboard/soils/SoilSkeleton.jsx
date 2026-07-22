import { Card } from '../../ui'

function SoilSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="rounded-[22px] border border-slate-200/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-10 w-10 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-2.5 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-12 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default SoilSkeleton
