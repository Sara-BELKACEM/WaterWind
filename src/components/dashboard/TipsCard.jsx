import { Card } from '../ui'

function TipsCard() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 bg-gradient-to-r from-emerald-50 to-sky-50 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:from-emerald-950/30 dark:to-sky-950/40">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">Tip of the day</p>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Keep crop and soil information updated to improve recommendation quality.
      </p>
    </Card>
  )
}

export default TipsCard
