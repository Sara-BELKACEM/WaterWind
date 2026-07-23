import { Card } from '../../ui'

function AnalysisSkeleton() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="rounded-[28px] p-5 animate-pulse">
        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-7 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="h-16 rounded-[18px] bg-slate-200 dark:bg-slate-800" />
          <div className="h-16 rounded-[18px] bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="mt-4 h-16 rounded-[18px] bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-10 rounded-[18px] bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-10 rounded-[18px] bg-slate-200 dark:bg-slate-800" />
      </Card>

      <Card className="rounded-[28px] p-5 animate-pulse">
        <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-10 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-24 rounded-[20px] bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="h-24 rounded-[20px] bg-slate-200 dark:bg-slate-800" />
          <div className="h-24 rounded-[20px] bg-slate-200 dark:bg-slate-800" />
        </div>
      </Card>
    </div>
  )
}

export default AnalysisSkeleton
