import { Skeleton } from '../../ui'

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Skeleton className="h-80" />
        </div>
        <div className="xl:col-span-4">
          <Skeleton className="h-80" />
        </div>
        <div className="xl:col-span-6">
          <Skeleton className="h-72" />
        </div>
        <div className="xl:col-span-6">
          <Skeleton className="h-72" />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsSkeleton
