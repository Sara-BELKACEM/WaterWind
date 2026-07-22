import { CalendarDays, Sparkles } from 'lucide-react'
import { Card } from '../ui'

function DashboardWelcome() {
  const now = new Date()
  const dateLabel = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card className="rounded-[24px] border border-slate-200/80 bg-gradient-to-r from-emerald-500 to-sky-500 p-[1px] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      <div className="rounded-[23px] bg-slate-950/95 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-emerald-200">Dashboard</p>
            <h1 className="mt-1 text-2xl font-bold">Welcome back, Omar 👋</h1>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 text-emerald-200">
            <Sparkles size={18} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
          <CalendarDays size={16} />
          <span>{dateLabel}</span>
        </div>

        <p className="mt-4 text-sm text-slate-300">Everything looks healthy across your WaterWind operations today.</p>
      </div>
    </Card>
  )
}

export default DashboardWelcome
