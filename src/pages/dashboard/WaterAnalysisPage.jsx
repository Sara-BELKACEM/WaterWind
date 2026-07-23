import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardContainer from '../../components/dashboard/DashboardContainer'
import AnalysisForm from '../../components/dashboard/water-analysis/AnalysisForm'
import RecommendationPanel from '../../components/dashboard/water-analysis/RecommendationPanel'
import AnalysisSkeleton from '../../components/dashboard/water-analysis/AnalysisSkeleton'
import RecentAnalyses from '../../components/dashboard/water-analysis/RecentAnalyses'
import { Button } from '../../components/ui'

const defaultValues = {
  crop: 'Tomato',
  soil: 'Loamy',
  surfaceArea: 420,
  humidity: 62,
  windSpeed: 8.5,
}

const recommendationCatalog = {
  Tomato: {
    title: 'WaterWind AI: Tomato hydration schedule',
    summary: 'Your crop profile is balanced for high-frequency drip irrigation with moderate nutrient supplementation.',
    score: 93,
    waterBalance: '86%',
    irrigationCycle: 'Every 3 hours',
    riskLevel: 'Low',
    planTitle: 'Drip rhythm + calcium boost',
    recommendedLiter: '4.8 kL / day',
    minerals: ['Calcium', 'Potassium', 'Magnesium'],
    insights: [
      'Humidity is within an ideal target band for stable root moisture distribution.',
      'Wind exposure is moderate; reduce evaporation by staggering irrigation windows during early afternoon.',
    ],
  },
  Potato: {
    title: 'WaterWind AI: Potato precision program',
    summary: 'The field requires careful moisture control with slightly reduced delivery during peak heat conditions.',
    score: 88,
    waterBalance: '84%',
    irrigationCycle: 'Every 4 hours',
    riskLevel: 'Medium',
    planTitle: 'Moderate drip pulse',
    recommendedLiter: '4.1 kL / day',
    minerals: ['Nitrogen', 'Phosphorus', 'Potassium'],
    insights: [
      'Tuber stress risk drops when irrigation cycles stay consistent overnight.',
      'Use a lower volume interval during wind peaks to preserve moisture retention.',
    ],
  },
  Rice: {
    title: 'WaterWind AI: Rice flood-ready strategy',
    summary: 'Water retention is strong, but the profile needs sustained delivery to avoid early-stage nutrient washout.',
    score: 91,
    waterBalance: '90%',
    irrigationCycle: 'Every 2.5 hours',
    riskLevel: 'Low',
    planTitle: 'High-volume saturation cycle',
    recommendedLiter: '6.2 kL / day',
    minerals: ['Nitrogen', 'Zinc', 'Sulfur'],
    insights: [
      'Recharge windows should align with lower wind exposure to minimize surface loss.',
      'A slightly higher water balance keeps soil conductivity stable in clay-rich fields.',
    ],
  },
  Corn: {
    title: 'WaterWind AI: Corn growth optimizer',
    summary: 'The current profile supports a balanced schedule with mild nutrient lift during the afternoon cycle.',
    score: 89,
    waterBalance: '82%',
    irrigationCycle: 'Every 3.5 hours',
    riskLevel: 'Medium',
    planTitle: 'Balanced moisture split',
    recommendedLiter: '5.1 kL / day',
    minerals: ['Nitrogen', 'Potassium', 'Calcium'],
    insights: [
      'A targeted supplement can improve leaf health while keeping runoff risk low.',
      'Average wind speed is acceptable but should be monitored for afternoon spikes.',
    ],
  },
}

function WaterAnalysisPage() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const statusLabel = useMemo(() => {
    if (isLoading) return 'Generating recommendation…'
    return result ? 'Recommendation ready' : 'Awaiting profile input'
  }, [isLoading, result])

  const handleGenerate = (values) => {
    setIsLoading(true)

    setTimeout(() => {
      const selection = recommendationCatalog[values.crop] ?? recommendationCatalog.Tomato
      setResult({
        ...selection,
        crop: values.crop,
        soil: values.soil,
        humidity: values.humidity,
        windSpeed: values.windSpeed,
        surfaceArea: values.surfaceArea,
        recommendedLiter: `${Math.round(values.surfaceArea * 0.012 * 100) / 100} kL / day`,
      })
      setIsLoading(false)
    }, 900)
  }

  const handleReset = () => {
    setResult(null)
    setIsLoading(false)
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
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">Dashboard / Water Analysis</div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Water Analysis</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Run AI-inspired irrigation and mineral recommendations with a polished, production-ready workflow.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-[18px] bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
              {statusLabel}
            </div>
            <Button variant="outline" className="rounded-[18px]">
              Export Snapshot
            </Button>
          </div>
        </div>
      </motion.header>

      {isLoading ? (
        <AnalysisSkeleton />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <AnalysisForm
            onGenerate={handleGenerate}
            onReset={handleReset}
            initialValues={defaultValues}
            isLoading={isLoading}
          />

          <RecommendationPanel result={result} />
        </div>
      )}

      <RecentAnalyses />
    </DashboardContainer>
  )
}

export default WaterAnalysisPage
