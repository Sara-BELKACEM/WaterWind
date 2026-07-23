import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Archive, BarChart3, CalendarRange, Cpu, Droplets, Sparkles, TrendingUp } from 'lucide-react'
import DashboardContainer from '../../components/dashboard/DashboardContainer'
import HistoryToolbar from '../../components/dashboard/history/HistoryToolbar'
import AnalysisTable from '../../components/dashboard/history/AnalysisTable'
import AnalysisDrawer from '../../components/dashboard/history/AnalysisDrawer'
import TimelineActivity from '../../components/dashboard/history/TimelineActivity'
import HistoryStats from '../../components/dashboard/history/HistoryStats'
import HistorySkeleton from '../../components/dashboard/history/HistorySkeleton'
import HistoryEmptyState from '../../components/dashboard/history/HistoryEmptyState'
import { Button } from '../../components/ui'

const mockAnalyses = Array.from({ length: 24 }, (_, index) => {
  const crops = ['Tomato', 'Maize', 'Rice', 'Wheat', 'Carrot']
  const soils = ['Loamy', 'Clay', 'Silty', 'Sandy']
  const devices = ['WaterWind Micro', 'WaterWind Pro']
  const statuses = ['Completed', 'Pending', 'Archived']
  const waterTypes = ['Balanced Drip', 'High Saturation', 'Low Pulse', 'Adaptive Flow']
  const crop = crops[index % crops.length]
  const soil = soils[index % soils.length]
  const date = new Date(Date.now() - index * 86400000).toISOString().slice(0, 10)
  const score = 86 + ((index * 3) % 12)

  return {
    id: `AN-${1000 + index}`,
    date,
    crop,
    soil,
    surfaceArea: `${(180 + index * 12).toFixed(0)} ha`,
    humidity: `${(58 + (index % 6) * 4)}%`,
    windSpeed: `${(6.2 + (index % 5) * 0.8).toFixed(1)} m/s`,
    waterType: waterTypes[index % waterTypes.length],
    recommendedDevice: devices[index % devices.length],
    matchScore: score,
    status: statuses[index % statuses.length],
    recommendedPh: `${(5.8 + (index % 4) * 0.2).toFixed(1)}`,
    recommendationSummary: `${crop} analysis recommends a ${waterTypes[index % waterTypes.length].toLowerCase()} schedule with targeted mineral supplementation.`,
    environmentSummary: `${soil} terrain conditions indicate stable moisture retention with moderate wind exposure and ${crop.toLowerCase()}-specific nutrient balance.`,
  }
})

function AnalysisHistoryPage() {
  const [analyses, setAnalyses] = useState(mockAnalyses)
  const [search, setSearch] = useState('')
  const [soilFilter, setSoilFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deviceFilter, setDeviceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)
  const [isLoading] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filteredAnalyses = useMemo(() => {
    const query = search.trim().toLowerCase()

    const list = analyses.filter((analysis) => {
      const matchesQuery =
        query.length === 0 ||
        analysis.id.toLowerCase().includes(query) ||
        analysis.crop.toLowerCase().includes(query) ||
        analysis.soil.toLowerCase().includes(query) ||
        analysis.recommendedDevice.toLowerCase().includes(query)

      const matchesSoil = soilFilter === 'all' || analysis.soil === soilFilter
      const matchesStatus = statusFilter === 'all' || analysis.status === statusFilter
      const matchesDevice = deviceFilter === 'all' || analysis.recommendedDevice === deviceFilter

      return matchesQuery && matchesSoil && matchesStatus && matchesDevice
    })

    const sorted = [...list].sort((left, right) => {
      if (sortBy === 'oldest') return left.date.localeCompare(right.date)
      if (sortBy === 'score') return right.matchScore - left.matchScore
      if (sortBy === 'score-low') return left.matchScore - right.matchScore
      return right.date.localeCompare(left.date)
    })

    return sorted
  }, [analyses, search, soilFilter, statusFilter, deviceFilter, sortBy])

  const stats = useMemo(
    () => [
      {
        label: 'Total Analyses',
        value: '320',
        caption: 'Archived across all managed regions',
        icon: BarChart3,
        tint: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
      },
      {
        label: "Today's Analyses",
        value: '12',
        caption: 'Fresh reports created this morning',
        icon: CalendarRange,
        tint: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
      },
      {
        label: 'Average Match Score',
        value: '94%',
        caption: 'Consistent recommendation accuracy',
        icon: TrendingUp,
        tint: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
      },
      {
        label: 'Recommended Devices',
        value: '2',
        caption: 'Primary systems selected by analysts',
        icon: Cpu,
        tint: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
      },
    ],
    [],
  )

  const quickStats = useMemo(() => {
    const cropFrequency = analyses.reduce((acc, item) => {
      acc[item.crop] = (acc[item.crop] ?? 0) + 1
      return acc
    }, {})

    const soilFrequency = analyses.reduce((acc, item) => {
      acc[item.soil] = (acc[item.soil] ?? 0) + 1
      return acc
    }, {})

    const deviceFrequency = analyses.reduce((acc, item) => {
      acc[item.recommendedDevice] = (acc[item.recommendedDevice] ?? 0) + 1
      return acc
    }, {})

    const topCrop = Object.entries(cropFrequency).sort((left, right) => right[1] - left[1])[0]?.[0] ?? 'Tomato'
    const topSoil = Object.entries(soilFrequency).sort((left, right) => right[1] - left[1])[0]?.[0] ?? 'Loamy'
    const topDevice = Object.entries(deviceFrequency).sort((left, right) => right[1] - left[1])[0]?.[0] ?? 'WaterWind Micro'

    return [
      { label: 'Most Analyzed Crop', value: topCrop },
      { label: 'Most Common Soil', value: topSoil },
      { label: 'Highest Recommendation Score', value: '97%' },
      { label: 'Most Recommended Device', value: topDevice },
    ]
  }, [analyses])

  const handleView = (analysis) => {
    setSelectedAnalysis(analysis)
    setIsDrawerOpen(true)
  }

  const handleDelete = (id) => {
    setAnalyses((current) => current.filter((analysis) => analysis.id !== id))
  }

  const handleDownload = () => {
    setSelectedAnalysis(null)
  }

  const handleClearFilters = () => {
    setSearch('')
    setSoilFilter('all')
    setStatusFilter('all')
    setDeviceFilter('all')
    setSortBy('newest')
  }

  const handleRefresh = () => {
    setAnalyses(mockAnalyses)
  }

  return (
    <DashboardContainer className="space-y-6">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/70 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">Dashboard / Analysis History</div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Analysis History</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Review previous agricultural analyses and generated recommendations with an enterprise-grade reporting workflow.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-[18px]">
              <Sparkles size={16} />
              Export History
            </Button>
          </div>
        </div>
      </motion.header>

      <HistoryStats metrics={stats} />

      <HistoryToolbar
        search={search}
        onSearchChange={setSearch}
        soilFilter={soilFilter}
        onSoilFilterChange={setSoilFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        deviceFilter={deviceFilter}
        onDeviceFilterChange={setDeviceFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClear={handleClearFilters}
        onRefresh={handleRefresh}
      />

      {isLoading ? (
        <HistorySkeleton />
      ) : filteredAnalyses.length === 0 ? (
        <HistoryEmptyState onCreate={handleRefresh} />
      ) : (
        <>
          <AnalysisTable analyses={filteredAnalyses} onView={handleView} onDelete={handleDelete} onDownload={handleDownload} />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <TimelineActivity />
            <div className="grid gap-4 sm:grid-cols-2">
              {quickStats.map((item) => (
                <div key={item.label} className="rounded-[22px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <AnalysisDrawer open={isDrawerOpen} analysis={selectedAnalysis} onClose={() => setIsDrawerOpen(false)} />
    </DashboardContainer>
  )
}

export default AnalysisHistoryPage
