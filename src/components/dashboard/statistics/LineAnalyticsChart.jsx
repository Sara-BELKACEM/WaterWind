import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Card } from '../../ui'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const labels = ['Q1', 'Q2', 'Q3', 'Q4']
const values = [92, 94, 96, 98]

function LineAnalyticsChart() {
  const data = {
    labels,
    datasets: [{
      label: 'Recommendation Accuracy',
      data: values,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.16)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
    }],
  }

  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Recommendation Accuracy</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Platform confidence continues to strengthen as the engine matures.</p>
      </div>
      <div className="h-72">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: false, min: 90, max: 100, grid: { color: 'rgba(148,163,184,0.2)' } } } }} />
      </div>
    </Card>
  )
}

export default LineAnalyticsChart
