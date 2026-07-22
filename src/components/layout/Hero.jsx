import { motion } from 'framer-motion'
import { ArrowRight, CloudSun, Droplets, Leaf, Wind } from 'lucide-react'
import { Button, Card, Container } from '../ui'

const floatingCards = [
  { label: 'Water Production', value: '18.4k L', icon: Droplets },
  { label: 'Renewable Energy', value: '94%', icon: Wind },
  { label: 'Crop Recommendation', value: '24 crops', icon: Leaf },
  { label: 'Humidity Analysis', value: '68%', icon: CloudSun },
]

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_35%)] pt-28">
      <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="absolute right-[-6rem] top-20 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
            Smart Water Recommendation Platform
          </span>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
              Produce Water From Air Using Solar & Wind Energy
            </h1>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
              WaterWind combines renewable energy, crop intelligence, and soil-aware recommendations to help growers conserve water and improve field decisions with confidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" className="px-5">
              Discover Technology
            </Button>
            <Button variant="outline" className="px-5">
              View Products
              <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-emerald-400/20 to-sky-400/20 blur-2xl" />
          <Card className="relative grid gap-4 rounded-[32px] bg-white/80 p-4 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-2">
              {floatingCards.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-[20px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                      <Icon size={18} />
                    </div>
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{item.value}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="rounded-[24px] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Water recommendation engine</p>
                  <p className="text-2xl font-semibold">Optimal now</p>
                </div>
                <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-200">Live</div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-2xl bg-white/10 p-3">Humidity 68%</div>
                <div className="rounded-2xl bg-white/10 p-3">Wind 21 km/h</div>
                <div className="rounded-2xl bg-white/10 p-3">Soil 6.2 pH</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  )
}

export default Hero
