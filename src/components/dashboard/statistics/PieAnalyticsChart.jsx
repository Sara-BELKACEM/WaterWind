import { Pie } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js'
import { Card } from '../../ui'

ChartJS.register(ArcElement, Tooltip)

const data = {
  labels: ['Tomato', 'Maize', 'Rice', 'Wheat', 'Carrot'],
  datasets: [{
    data: [34, 22, 18, 15, 11],
    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#14b8a6'],
    borderWidth: 0,
  }],
}

function PieAnalyticsChart() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Crop Distribution</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Most analyzed crops across the platform.</p>
      </div>
      <div className="h-72">
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
      </div>
    </Card>
  )
}

export default PieAnalyticsChart
