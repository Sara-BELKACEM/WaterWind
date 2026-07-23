import { Palette, Moon, Sun, Monitor } from 'lucide-react'
import { Badge, Card } from '../ui'
import SettingsCard from './SettingsCard'

function AppearanceSettings() {
  return (
    <SettingsCard title="Appearance" description="Customize the visual tone and interface density of your workspace." icon={Palette} accent="amber">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Light Mode', icon: Sun },
              { label: 'Dark Mode', icon: Moon },
              { label: 'System Theme', icon: Monitor },
            ].map((option) => {
              const Icon = option.icon
              return (
                <button key={option.label} type="button" className="rounded-[20px] border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900">
                  <Icon size={16} className="text-emerald-600" />
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{option.label}</p>
                </button>
              )
            })}
          </div>

          <div className="rounded-[22px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Accent Color</h4>
              <Badge variant="emerald">Emerald</Badge>
            </div>
            <div className="flex gap-2">
              {['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b'].map((color) => (
                <button key={color} type="button" className="h-8 w-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Card className="rounded-[22px] border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Live Preview</p>
              <Badge variant="sky">Premium</Badge>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/70">
                <div className="h-2 w-20 rounded-full bg-emerald-500" />
                <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="mt-2 h-2 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="rounded-[18px] border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Card style preview</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Rounded corners, subtle shadows, and a premium finish.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SettingsCard>
  )
}

export default AppearanceSettings
