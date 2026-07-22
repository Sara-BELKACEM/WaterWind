import { Card } from '../../ui'

function CropSkeleton() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-0 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800">
      <div className="overflow-hidden">
        <div className="grid grid-cols-8 gap-2 bg-slate-100 p-4 dark:bg-slate-800/70">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-3 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
          ))}
        </div>
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="grid grid-cols-8 gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
            {Array.from({ length: 8 }).map((_, cell) => (
              <div key={cell} className="h-3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            ))}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default CropSkeleton
