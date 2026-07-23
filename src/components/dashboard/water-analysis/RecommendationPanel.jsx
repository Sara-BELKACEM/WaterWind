import { motion } from 'framer-motion'
import { Card } from '../../ui'
import RecommendationScore from './RecommendationScore'
import RecommendationCard from './RecommendationCard'
import AnalysisSummary from './AnalysisSummary'
import AIInsights from './AIInsights'
import EnvironmentCard from './EnvironmentCard'
import EmptyRecommendation from './EmptyRecommendation'

function RecommendationPanel({ result }) {
  if (!result) {
    return <EmptyRecommendation />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">AI Recommendation</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{result.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{result.summary}</p>
          </div>
          <RecommendationScore score={result.score} />
        </div>
      </Card>

      <AnalysisSummary
        crop={result.crop}
        soil={result.soil}
        humidity={result.humidity}
        windSpeed={result.windSpeed}
        surfaceArea={result.surfaceArea}
        recommendedLiter={result.recommendedLiter}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <EnvironmentCard label="Water balance" value={result.waterBalance} tone="emerald" />
        <EnvironmentCard label="Irrigation cycle" value={result.irrigationCycle} tone="sky" />
        <EnvironmentCard label="Risk level" value={result.riskLevel} tone="violet" />
      </div>

      <RecommendationCard
        title="Crop hydration plan"
        description={result.planTitle}
        amount={result.recommendedLiter}
        tone="emerald"
        minerals={result.minerals}
      />

      <AIInsights insights={result.insights} />
    </motion.div>
  )
}

export default RecommendationPanel
