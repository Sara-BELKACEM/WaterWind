import { Card } from '../../ui'

function GeoDistributionCard() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Geographic Distribution</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Mock regional activity across field clusters.</p>
      </div>
      <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-emerald-50 via-sky-50 to-slate-100 p-4 dark:border-slate-800 dark:from-emerald-950/30 dark:via-sky-950/30 dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_30%),radial-gradient(circle_at_80%_25%,rgba(14,165,233,0.18),transparent_30%)]" />
        <div className="relative h-64 rounded-[22px] border border-white/50 bg-white/50 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-900/40">
          <div className="absolute left-[15%] top-[28%] h-10 w-10 rounded-full bg-emerald-500/70" />
          <div className="absolute left-[45%] top-[40%] h-12 w-12 rounded-full bg-sky-500/70" />
          <div className="absolute right-[18%] top-[18%] h-8 w-8 rounded-full bg-violet-500/70" />
          <div className="absolute bottom-[12%] left-[30%] h-9 w-9 rounded-full bg-amber-500/70" />
          <div className="absolute right-[10%] bottom-[20%] h-11 w-11 rounded-full bg-rose-500/70" />
          <div className="absolute left-[6%] bottom-[8%] h-7 w-7 rounded-full bg-slate-500/60" />
          <div className="mt-4 rounded-[18px] border border-white/60 bg-white/70 p-3 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
            <p className="font-semibold">North Valley • 84 analyses • 95% avg score • AquaPulse</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default GeoDistributionCard
