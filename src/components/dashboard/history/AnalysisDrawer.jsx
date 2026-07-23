import { Download, Printer, Sparkles } from 'lucide-react'
import { Button, Card, Drawer } from '../../ui'

function AnalysisDrawer({ open, analysis, onClose }) {
  if (!analysis) return null

  return (
    <Drawer open={open} onClose={onClose} title={analysis.id} subtitle="Analysis report">
      <div className="space-y-4">
        <Card className="rounded-[22px] border border-emerald-100 bg-gradient-to-br from-emerald-50/90 to-sky-50/80 p-4 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-sky-950/40">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Recommendation summary</span>
          </div>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{analysis.recommendationSummary}</p>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-[20px] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Crop</p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-white">{analysis.crop}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Soil: {analysis.soil}</p>
          </Card>
          <Card className="rounded-[20px] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Surface area</p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-white">{analysis.surfaceArea}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Humidity: {analysis.humidity}</p>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-[20px] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recommended water</p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-white">{analysis.waterType}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Recommended pH: {analysis.recommendedPh}</p>
          </Card>
          <Card className="rounded-[20px] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Device</p>
            <p className="mt-2 font-semibold text-slate-900 dark:text-white">{analysis.recommendedDevice}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Score: {analysis.matchScore}%</p>
          </Card>
        </div>

        <Card className="rounded-[20px] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Environmental summary</p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{analysis.environmentSummary}</p>
            </div>
            <div className="rounded-[18px] bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {analysis.matchScore}% match
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-[18px]">
            <Printer size={16} />
            Print
          </Button>
          <Button variant="outline" className="rounded-[18px]">
            <Download size={16} />
            Download PDF
          </Button>
          <Button className="rounded-[18px]" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Drawer>
  )
}

export default AnalysisDrawer
