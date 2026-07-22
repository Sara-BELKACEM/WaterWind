import { motion } from 'framer-motion'
import { ArrowRight, Droplets, Leaf, Wind, Zap } from 'lucide-react'
import { Button, Card } from '../ui'

const productConfigs = {
  micro: {
    name: 'WaterWind Micro',
    subtitle: 'Small & Medium Farms',
    capacity: '20L/day',
    bestFor: ['Small farms', 'Greenhouses', 'Gardens'],
    features: ['Solar Powered', 'Wind Assisted', 'Compact Design', 'Easy Installation', 'Low Maintenance'],
    accent: 'from-emerald-500/15 via-white to-sky-50',
    icon: Droplets,
  },
  pro: {
    name: 'WaterWind Pro',
    subtitle: 'Large Farms & Industrial Agriculture',
    capacity: '120L/day',
    bestFor: ['Large Farms', 'Agricultural Cooperatives', 'Industrial Use'],
    features: ['High Water Production', 'AI Recommendation Ready', 'Large Storage', 'Professional Monitoring', 'Renewable Energy'],
    accent: 'from-sky-500/15 via-white to-emerald-50',
    icon: Wind,
  },
}

function ProductCard({ variant }) {
  const config = productConfigs[variant]
  const Icon = config.icon

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <Card className={`h-full rounded-[28px] bg-gradient-to-br ${config.accent} p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
              {config.subtitle}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{config.name}</h2>
            <p className="mt-2 text-sm text-slate-600">Capacity: {config.capacity}</p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20">
            <Icon size={22} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-[20px] bg-white/80 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Best For</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {config.bestFor.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Leaf size={14} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] bg-white/80 p-4 shadow-sm md:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Features</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {config.features.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Zap size={14} className="text-sky-500" />
            Renewable-ready output
          </div>
          <Button variant="primary" className="px-4">
            View Details
            <ArrowRight size={15} />
          </Button>
        </div>
      </Card>
    </motion.article>
  )
}

export default ProductCard
