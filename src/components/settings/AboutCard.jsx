import { BookOpen, Bug, Cpu, Database, Server, ShieldCheck } from 'lucide-react'
import { Badge, Button } from '../ui'
import SettingsCard from './SettingsCard'

function AboutCard() {
  return (
    <SettingsCard title="About Platform" description="Build details and engineering stack for WaterWind." icon={Cpu} accent="violet">
      <div className="rounded-[22px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="emerald">WaterWind</Badge>
          <Badge variant="sky">Version 1.0.0</Badge>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ['Framework', 'React + Vite'],
            ['Backend', 'Laravel API'],
            ['Database', 'MySQL'],
            ['Developer', 'WaterWind Team'],
            ['License', 'MVP'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[18px] border border-slate-200 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-[18px]">
            <BookOpen size={16} />
            View Documentation
          </Button>
          <Button variant="outline" className="rounded-[18px]">
            <Bug size={16} />
            Report Issue
          </Button>
        </div>
      </div>
    </SettingsCard>
  )
}

export default AboutCard
