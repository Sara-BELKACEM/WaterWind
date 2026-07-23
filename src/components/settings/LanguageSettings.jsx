import { Globe2 } from 'lucide-react'
import SettingsCard from './SettingsCard'

function LanguageSettings() {
  return (
    <SettingsCard title="Language & Region" description="Set your preferred language, timezone, and measurement format." icon={Globe2} accent="sky">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <span className="font-medium">Language</span>
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </label>

        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <span className="font-medium">Timezone</span>
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900">
            <option>UTC-05:00 (New York)</option>
            <option>UTC+00:00 (London)</option>
            <option>UTC+01:00 (Berlin)</option>
          </select>
        </label>

        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <span className="font-medium">Date Format</span>
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </label>

        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <span className="font-medium">Measurement Units</span>
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900">
            <option>Metric</option>
            <option>Imperial</option>
          </select>
        </label>

        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <span className="font-medium">Currency</span>
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </label>
      </div>
    </SettingsCard>
  )
}

export default LanguageSettings
