import { Download, Eye, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'

function AnalysisRow({ analysis, onView, onDelete, onDownload }) {
  return (
    <tr className="bg-white/80 text-sm transition hover:bg-slate-50 even:bg-slate-50/70 dark:bg-slate-900/80 dark:hover:bg-slate-800/80 dark:even:bg-slate-800/50">
      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{analysis.id}</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{analysis.date}</td>
      <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{analysis.crop}</td>
      <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{analysis.soil}</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{analysis.surfaceArea}</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{analysis.humidity}</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{analysis.windSpeed}</td>
      <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-300">{analysis.matchScore}%</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{analysis.recommendedDevice}</td>
      <td className="px-4 py-3"><StatusBadge status={analysis.status} /></td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onView(analysis)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800">
            <Eye size={15} />
          </button>
          <button type="button" onClick={() => onDownload(analysis)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-sky-600 dark:hover:bg-slate-800">
            <Download size={15} />
          </button>
          <button type="button" onClick={() => onDelete(analysis.id)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800">
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default AnalysisRow
