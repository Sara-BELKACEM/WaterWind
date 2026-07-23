import { FileDown, Eye } from 'lucide-react'
import { Card, Table } from '../../ui'
import AnalysisRow from './AnalysisRow'

function AnalysisTable({ analyses, onView, onDelete, onDownload }) {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-0 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800">
      <div className="overflow-hidden rounded-[24px]">
        <Table className="bg-white dark:bg-slate-900">
          <thead className="bg-slate-100/90 text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800/90 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Analysis ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Crop</th>
              <th className="px-4 py-3">Soil</th>
              <th className="px-4 py-3">Surface</th>
              <th className="px-4 py-3">Humidity</th>
              <th className="px-4 py-3">Wind</th>
              <th className="px-4 py-3">Match</th>
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {analyses.map((analysis) => (
              <AnalysisRow
                key={analysis.id}
                analysis={analysis}
                onView={onView}
                onDelete={onDelete}
                onDownload={onDownload}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  )
}

export default AnalysisTable
