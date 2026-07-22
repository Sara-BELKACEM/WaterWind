import { motion } from 'framer-motion'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Card } from '../ui'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler)

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Monthly Analyses',
      data: [18, 24, 22, 34, 28, 39, 42],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
    },
  ],
}

const pieData = {
  labels: ['Maize', 'Tomato', 'Rice', 'Cabbage'],
  datasets: [
    {
      data: [38, 27, 21, 14],
      backgroundColor: ['#10b981', '#38bdf8', '#6366f1', '#f59e0b'],
      borderWidth: 0,
    },
  ],
}

const barData = {
  labels: ['Loam', 'Clay', 'Sandy', 'Organic'],
  datasets: [
    {
      label: 'Most Used Soil Types',
      data: [22, 16, 13, 10],
      backgroundColor: ['#0ea5e9', '#34d399', '#818cf8', '#f59e0b'],
      borderRadius: 10,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#64748b' },
    },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.15)' },
      ticks: { color: '#64748b' },
    },
  },
}

function AnalyticsSection() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Card className="h-full rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Monthly Analyses</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Platform activity trend</p>
            </div>
          </div>
          <div className="h-[300px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800">
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Most Selected Crops</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Crop distribution</p>
            </div>
            <div className="h-[220px]">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="rounded-[24px] border border-slate-200/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] dark:border-slate-800">
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Most Used Soil Types</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Field composition</p>
            </div>
            <div className="h-[220px]">
              <Bar data={barData} options={chartOptions} />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalyticsSection
