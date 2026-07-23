import { Card } from '../../ui'
import { Sparkles } from 'lucide-react'

function AIInsights({ insights = [] }) {
  return (
    <Card className="rounded-[24px] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
        <Sparkles size={16} className="text-emerald-500" />
        AI insights
      </div>

      <ul className="mt-4 space-y-3">
        {insights.map((insight) => (
          <li key={insight} className="rounded-[18px] bg-slate-50 px-3 py-3 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">
            {insight}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default AIInsights
