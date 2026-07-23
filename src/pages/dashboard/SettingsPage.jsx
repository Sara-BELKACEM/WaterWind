import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, CheckCircle2, Compass, Sparkles } from 'lucide-react'
import { Badge, Card } from '../../components/ui'
import SettingsHeader from '../../components/settings/SettingsHeader'
import SettingsSidebar from '../../components/settings/SettingsSidebar'
import ProfileSettings from '../../components/settings/ProfileSettings'
import SecuritySettings from '../../components/settings/SecuritySettings'
import AppearanceSettings from '../../components/settings/AppearanceSettings'
import NotificationSettings from '../../components/settings/NotificationSettings'
import LanguageSettings from '../../components/settings/LanguageSettings'
import SystemSettings from '../../components/settings/SystemSettings'
import AboutCard from '../../components/settings/AboutCard'
import DangerZone from '../../components/settings/DangerZone'

const sectionMap = {
  profile: <ProfileSettings key="profile" />,
  security: <SecuritySettings key="security" />,
  appearance: <AppearanceSettings key="appearance" />,
  notifications: <NotificationSettings key="notifications" />,
  language: <LanguageSettings key="language" />,
  system: <SystemSettings key="system" />,
  about: <AboutCard key="about" />,
}

function SettingsPage() {
  const { section } = useParams()
  const [activeSection, setActiveSection] = useState(section ?? 'profile')

  const currentSection = useMemo(() => sectionMap[activeSection] ?? sectionMap.profile, [activeSection])

  useMemo(() => {
    if (section && sectionMap[section]) {
      setActiveSection(section)
    }
  }, [section])

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
      <SettingsHeader />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <SettingsSidebar activeSection={activeSection} onSelect={setActiveSection} />
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {currentSection}
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <DangerZone />

            <Card className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                <Sparkles size={16} />
                Quick Tips
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ['Current Theme', 'Dark mode ready with polished contrast and accessibility-aware colors.'],
                  ['Current Version', 'WaterWind 1.0.0'],
                  ['Storage Usage', '2.8 GB / 8 GB Mock'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-slate-200 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <Activity size={16} />
                  System Status
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  All services running normally.
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Compass size={16} className="text-sky-600" />
                  Sync and alerts are live.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
