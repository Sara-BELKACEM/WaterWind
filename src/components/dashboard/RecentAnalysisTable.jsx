import { Eye } from 'lucide-react'
import { Badge, Button, Card } from '../ui'

const rows = [
  { date: '2026-07-18', crop: 'Maize', soil: 'Loam', humidity: '64%', windSpeed: '12 km/h', device: 'AquaPulse', status: 'Completed' },
  { date: '2026-07-17', crop: 'Tomato', soil: 'Sandy Loam', humidity: '58%', windSpeed: '15 km/h', device: 'DripSmart', status: 'Completed' },
  { date: '2026-07-16', crop: 'Rice', soil: 'Clay', humidity: '70%', windSpeed: '9 km/h', device: 'FlowSense', status: 'Completed' },
  { date: '2026-07-15', crop: 'Cabbage', soil: 'Organic', humidity: '61%', windSpeed: '11 km/h', device: 'AquaPulse', status: 'Completed' },
]

function RecentAnalysisTable() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 bg-white/90 p-0 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur dark:bg-slate-800/90">
            <tr className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Crop</th>
              <th className="px-4 py-3">Soil</th>
              <th className="px-4 py-3">Humidity</th>
              <th className="px-4 py-3">Wind Speed</th>
              <th className="px-4 py-3">Recommended Device</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={`${row.date}-${row.crop}`} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/70">
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.date}</td>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">{row.crop}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.soil}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.humidity}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.windSpeed}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{row.device}</td>
                <td className="px-4 py-3">
                  <Badge variant="success">{row.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" className="rounded-xl px-3 py-2 text-xs">
                    <Eye size={14} />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default RecentAnalysisTable
