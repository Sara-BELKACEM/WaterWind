import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../ui'
import CropStatusBadge from './CropStatusBadge'

function CropRow({ crop, onView, onEdit, onDelete }) {
  return (
    <motion.tr
      layout
      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/70"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">{crop.name}</td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{crop.recommendedWater}</td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{crop.recommendedPh}</td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{crop.minerals.join(', ')}</td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{crop.compatibleSoils.join(', ')}</td>
      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{crop.recommendedDevice}</td>
      <td className="px-4 py-3">
        <CropStatusBadge status={crop.status} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => onView(crop)} className="rounded-xl px-3 py-2 text-xs">
            <Eye size={14} />
            View
          </Button>
          <Button variant="ghost" onClick={() => onEdit(crop)} className="rounded-xl px-3 py-2 text-xs">
            <Pencil size={14} />
            Edit
          </Button>
          <Button variant="ghost" onClick={() => onDelete(crop)} className="rounded-xl px-3 py-2 text-xs text-rose-600 dark:text-rose-300">
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </td>
    </motion.tr>
  )
}

export default CropRow
