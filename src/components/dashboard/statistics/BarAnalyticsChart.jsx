import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js'
import { Card } from '../../ui'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const labels = ['Loamy', 'Clay', 'Silty', 'Sandy', 'Volcanic']
const values = [72, 64, 51, 44, 39]

function BarAnalyticsChart() {
  const data = {
    labels,
    datasets: [{
      label: 'Most Used Soil Types',
      data: values,
      backgroundColor: ['#10b981', '#38bdf8', '#f59e0b', '#6366f1', '#ec4899'],
      borderRadius: 10,
    }],
  }

  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Most Used Soil Types</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Distribution of recommended soil profiles across enterprise analysis history.</p>
      </div>
      <div className="h-72">
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.2)' } } } }} />
      </div>
    </Card>
  )
}

export default BarAnalyticsChart
