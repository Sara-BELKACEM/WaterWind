import { Scatter } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Card } from '../../ui'

ChartJS.register(LinearScale, PointElement, Tooltip)

const data = {
  datasets: [{
    label: 'Humidity vs Recommendation Score',
    data: [
      { x: 58, y: 86 }, { x: 62, y: 89 }, { x: 64, y: 91 }, { x: 67, y: 93 }, { x: 70, y: 95 },
      { x: 71, y: 94 }, { x: 73, y: 96 }, { x: 75, y: 97 }, { x: 77, y: 93 }, { x: 79, y: 92 },
    ],
    backgroundColor: '#10b981',
    pointRadius: 6,
  }],
}

function ScatterAnalyticsChart() {
  return (
    <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-slate-800">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Humidity vs Recommendation Score</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Correlation between humidity and recommendation confidence.</p>
      </div>
      <div className="h-72">
        <Scatter data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: 'Humidity (%)' }, grid: { color: 'rgba(148,163,184,0.2)' } }, y: { title: { display: true, text: 'Score (%)' }, beginAtZero: false, min: 80, max: 100, grid: { color: 'rgba(148,163,184,0.2)' } } } }} />
      </div>
    </Card>
  )
}

export default ScatterAnalyticsChart
