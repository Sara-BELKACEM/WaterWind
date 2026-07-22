import { BarChart3, Droplets, Gauge, Leaf, MessageSquare, Sprout } from 'lucide-react'
import DashboardContainer from '../../components/dashboard/DashboardContainer'
import DashboardWelcome from '../../components/dashboard/DashboardWelcome'
import StatCard from '../../components/dashboard/StatCard'
import QuickActionCard from '../../components/dashboard/QuickActionCard'
import AnalyticsSection from '../../components/dashboard/AnalyticsSection'
import RecentAnalysisTable from '../../components/dashboard/RecentAnalysisTable'
import RecentActivity from '../../components/dashboard/RecentActivity'
import SystemStatus from '../../components/dashboard/SystemStatus'
import WeatherWidget from '../../components/dashboard/WeatherWidget'
import PerformanceCard from '../../components/dashboard/PerformanceCard'
import TipsCard from '../../components/dashboard/TipsCard'

const stats = [
  { title: 'Total Crops', value: 25, suffix: '', icon: Sprout, trend: '+8.4%', accent: 'emerald' },
  { title: 'Soil Types', value: 15, suffix: '', icon: Leaf, trend: '+3.1%', accent: 'sky' },
  { title: 'Total Analyses', value: 320, suffix: '', icon: Droplets, trend: '+12.6%', accent: 'violet' },
  { title: 'Recommended Devices', value: 2, suffix: '', icon: Gauge, trend: '+1', accent: 'amber' },
  { title: 'Recommendation Accuracy', value: 98, suffix: '%', icon: BarChart3, trend: '+0.7%', accent: 'emerald' },
  { title: 'Contact Messages', value: 18, suffix: '', icon: MessageSquare, trend: '+4', accent: 'sky' },
]

const quickActions = [
  {
    title: 'New Analysis',
    description: 'Run a fresh recommendation cycle for a crop or field.',
    path: '/dashboard/analysis',
    icon: Droplets,
  },
  {
    title: 'Manage Crops',
    description: 'Review crop records and update active production plans.',
    path: '/dashboard/crops',
    icon: Sprout,
  },
  {
    title: 'Manage Soils',
    description: 'Inspect soil profiles and adjust field conditions.',
    path: '/dashboard/soils',
    icon: Leaf,
  },
  {
    title: 'View Statistics',
    description: 'Open the snapshot of historical platform performance.',
    path: '/dashboard/statistics',
    icon: BarChart3,
  },
]

function DashboardHomePage() {
  return (
    <DashboardContainer className="space-y-6">
      <DashboardWelcome />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((item) => (
          <QuickActionCard key={item.title} {...item} />
        ))}
      </div>

      <AnalyticsSection />

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-6">
          <RecentAnalysisTable />

          <div className="grid gap-6 md:grid-cols-2">
            <WeatherWidget />
            <TipsCard />
          </div>
        </div>

        <div className="space-y-6">
          <RecentActivity />
          <SystemStatus />
          <PerformanceCard />
        </div>
      </div>
    </DashboardContainer>
  )
}

export default DashboardHomePage
