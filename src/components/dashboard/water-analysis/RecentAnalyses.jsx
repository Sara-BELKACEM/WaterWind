import { Card } from '../../ui'
import { recentAnalyses } from '../../../data/mockData'

function RecentAnalyses() {
  return (
    <Card className="rounded-[24px] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Recent analyses</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">Latest recommendation cycles</h3>
        </div>
      </div>

      <div className="space-y-3">
        {recentAnalyses.map((analysis) => (
          <div key={analysis.id} className="flex items-center justify-between rounded-[18px] bg-slate-50 px-3 py-3 dark:bg-slate-950/70">
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-white">{analysis.crop}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{analysis.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-950 dark:text-white">Score {analysis.score}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{analysis.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RecentAnalyses
