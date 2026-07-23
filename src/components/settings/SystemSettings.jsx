import { Settings2 } from 'lucide-react'
import SettingsCard from './SettingsCard'
import SettingsToggle from './SettingsToggle'

function SystemSettings() {
  return (
    <SettingsCard title="System Preferences" description="Fine-tune workspace behavior and interface ergonomics." icon={Settings2} accent="emerald">
      <div className="space-y-2">
        {[
          ['Compact Sidebar', 'Reduce spacing and tighten the dashboard shell.', true],
          ['Enable Animations', 'Smooth transitions and polished motion effects.', true],
          ['Auto Refresh Dashboard', 'Refresh key summaries automatically while you work.', false],
          ['Remember Filters', 'Preserve your latest table and chart filters.', true],
          ['Show Tooltips', 'Display contextual tips throughout the interface.', true],
          ['Display Skeleton Loaders', 'Use loading placeholders while content is preparing.', true],
          ['Enable Keyboard Shortcuts', 'Unlock fast actions for power users.', false],
        ].map(([label, description, checked]) => (
          <SettingsToggle key={label} label={label} description={description} checked={checked} onChange={() => {}} />
        ))}
      </div>
    </SettingsCard>
  )
}

export default SystemSettings
