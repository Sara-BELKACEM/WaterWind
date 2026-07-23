import { BellRing } from 'lucide-react'
import SettingsCard from './SettingsCard'
import SettingsToggle from './SettingsToggle'

function NotificationSettings() {
  return (
    <SettingsCard title="Notifications" description="Choose which updates and alerts you want to receive." icon={BellRing} accent="violet">
      <div className="space-y-2">
        {[
          ['Analysis Completed', 'Receive a summary when a water analysis is finished.', true],
          ['System Updates', 'Be notified about platform maintenance and improvements.', true],
          ['Security Alerts', 'Instant alerts for suspicious activity or login changes.', true],
          ['Product Announcements', 'Stay informed about new WaterWind features and releases.', false],
          ['Weekly Reports', 'Get a concise summary of key performance metrics every week.', true],
          ['Marketing Emails', 'Receive occasional offers and product education content.', false],
        ].map(([label, description, checked]) => (
          <SettingsToggle key={label} label={label} description={description} checked={checked} onChange={() => {}} />
        ))}
      </div>
    </SettingsCard>
  )
}

export default NotificationSettings
