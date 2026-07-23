import { motion } from 'framer-motion'
import { Card } from '../../ui'
import AreaAnalyticsChart from './AreaAnalyticsChart'
import PieAnalyticsChart from './PieAnalyticsChart'
import BarAnalyticsChart from './BarAnalyticsChart'
import LineAnalyticsChart from './LineAnalyticsChart'
import ScatterAnalyticsChart from './ScatterAnalyticsChart'
import HeatmapCard from './HeatmapCard'
import GeoDistributionCard from './GeoDistributionCard'
import TrendTimeline from './TrendTimeline'
import LeaderboardCard from './LeaderboardCard'
import ExecutiveSummary from './ExecutiveSummary'

function AnalyticsGrid() {
  return (
    <div className="grid gap-6 xl:grid-cols-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="xl:col-span-8">
        <AreaAnalyticsChart />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="xl:col-span-4">
        <PieAnalyticsChart />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="xl:col-span-6">
        <BarAnalyticsChart />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="xl:col-span-6">
        <LineAnalyticsChart />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="xl:col-span-7">
        <ScatterAnalyticsChart />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="xl:col-span-5">
        <ExecutiveSummary />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="xl:col-span-7">
        <HeatmapCard />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="xl:col-span-5">
        <GeoDistributionCard />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="xl:col-span-6">
        <TrendTimeline />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="xl:col-span-6">
        <LeaderboardCard />
      </motion.div>
    </div>
  )
}

export default AnalyticsGrid
