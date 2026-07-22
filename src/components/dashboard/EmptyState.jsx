import { Card } from '../ui'

function EmptyState({ title = 'No data available', description = 'This module will be implemented in the next step.' }) {
  return (
    <Card className="border-dashed border-slate-300 bg-slate-50/70 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </Card>
  )
}

export default EmptyState
