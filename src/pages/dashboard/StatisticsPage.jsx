import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Droplets, Gauge, Leaf, MessageSquare, Sprout, TrendingUp } from 'lucide-react'
import DashboardContainer from '../../components/dashboard/DashboardContainer'
import StatisticsHeader from '../../components/dashboard/statistics/StatisticsHeader'
import ExecutiveKPICard from '../../components/dashboard/statistics/ExecutiveKPICard'
import AnalyticsGrid from '../../components/dashboard/statistics/AnalyticsGrid'
import AnalyticsSkeleton from '../../components/dashboard/statistics/AnalyticsSkeleton'
import AnalyticsEmptyState from '../../components/dashboard/statistics/AnalyticsEmptyState'

const metricCards = [
  { label: 'Total Analyses', value: '320', delta: '+18.2%', icon: BarChart3, tint: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
  { label: 'Crop Types', value: '20', delta: '+6.4%', icon: Sprout, tint: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' },
  { label: 'Soil Types', value: '8', delta: '+2.1%', icon: Leaf, tint: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300' },
  { label: 'Recommendation Accuracy', value: '98%', delta: '+0.7%', icon: TrendingUp, tint: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' },
  { label: 'Average Match Score', value: '94%', delta: '+3.4%', icon: Gauge, tint: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' },
  { label: 'WaterWind Pro Recommendations', value: '184', delta: '+11.8%', icon: Droplets, tint: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300' },
  { label: 'Monthly Growth', value: '+18%', delta: '+4.2%', icon: TrendingUp, tint: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300' },
  { label: 'Contact Requests', value: '24', delta: '+7.5%', icon: MessageSquare, tint: 'bg-lime-100 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300' },
]

function StatisticsPage() {
  const [isLoading] = useState(false)

  const cards = useMemo(() => metricCards, [])

  return (
    <DashboardContainer className="space-y-6">
      <StatisticsHeader />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item, index) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * index }}>
            <ExecutiveKPICard item={item} />
          </motion.div>
        ))}
      </div>

      {isLoading ? <AnalyticsSkeleton /> : <AnalyticsGrid />}
    </DashboardContainer>
  )
}

export default StatisticsPage
