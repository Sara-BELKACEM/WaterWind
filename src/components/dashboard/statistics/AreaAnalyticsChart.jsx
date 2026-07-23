import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Card } from '../../ui'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const values = [84, 92, 108, 118, 126, 138, 146, 154, 162, 176, 189, 204]

function AreaAnalyticsChart() {
  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Analyses',
        data: values,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.16)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  }

  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Monthly Analyses</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Growth in analysis throughput across the last twelve months.</p>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">+18% MoM</div>
      </div>
      <div className="h-72">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.2)' } } } }} />
      </div>
    </Card>
  )
}

export default AreaAnalyticsChart
