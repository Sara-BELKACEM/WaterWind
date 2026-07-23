import { Camera, Mail, Building2, UserRound } from 'lucide-react'
import { Button, Input } from '../ui'
import SettingsCard from './SettingsCard'

function ProfileSettings() {
  return (
    <SettingsCard title="Profile" description="Update your personal information and workspace identity." icon={UserRound} accent="emerald">
      <div className="flex flex-col gap-4 rounded-[22px] border border-slate-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-sky-50/70 p-4 dark:border-slate-800 dark:from-emerald-950/20 dark:via-slate-900 dark:to-sky-950/20 md:flex-row md:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-emerald-500 to-sky-500 text-xl font-semibold text-white">
          AO
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-slate-950 dark:text-white">Omar Admin</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Administrator • Platform Lead</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 dark:bg-slate-800/70"><Mail size={14} /> omar@waterwind.io</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 dark:bg-slate-800/70"><Building2 size={14} /> WaterWind HQ</span>
          </div>
        </div>
        <Button variant="outline" className="rounded-[18px]">
          <Camera size={16} />
          Change Avatar
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Full Name" defaultValue="Omar Admin" />
        <Input label="Email" type="email" defaultValue="omar@waterwind.io" />
        <Input label="Phone Number" defaultValue="+1 555 0147" />
        <Input label="Company" defaultValue="WaterWind HQ" />
        <Input label="Department" defaultValue="Platform Operations" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" className="rounded-[18px]">Save Profile</Button>
      </div>
    </SettingsCard>
  )
}

export default ProfileSettings
