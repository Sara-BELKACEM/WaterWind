import { AlertTriangle, Trash2, RotateCcw, LogOut, HardDrive } from 'lucide-react'
import { Button } from '../ui'
import SettingsCard from './SettingsCard'

function DangerZone() {
  return (
    <SettingsCard title="Danger Zone" description="Sensitive actions and destructive operations for your workspace." icon={AlertTriangle} accent="rose">
      <div className="rounded-[22px] border border-rose-200 bg-rose-50/70 p-4 dark:border-rose-900/40 dark:bg-rose-950/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-300">
          <AlertTriangle size={16} />
          Irreversible actions
        </div>
        <p className="mt-2 text-sm text-rose-700/80 dark:text-rose-300/80">These actions are UI only in the current prototype and do not affect your data.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-[18px] border-rose-200 text-rose-700 hover:bg-rose-100 dark:border-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-950/40">
            <HardDrive size={16} />
            Clear Cache
          </Button>
          <Button variant="outline" className="rounded-[18px] border-rose-200 text-rose-700 hover:bg-rose-100 dark:border-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-950/40">
            <RotateCcw size={16} />
            Reset Settings
          </Button>
          <Button variant="outline" className="rounded-[18px] border-rose-200 text-rose-700 hover:bg-rose-100 dark:border-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-950/40">
            <LogOut size={16} />
            Logout
          </Button>
          <Button variant="outline" className="rounded-[18px] border-rose-200 text-rose-700 hover:bg-rose-100 dark:border-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-950/40" disabled>
            <Trash2 size={16} />
            Delete Account
          </Button>
        </div>
      </div>
    </SettingsCard>
  )
}

export default DangerZone
