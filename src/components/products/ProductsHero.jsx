import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'
import { Container } from '../ui'

function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_30%)] pt-28">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl" />

      <Container className="py-16 text-center md:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
            <Droplets size={16} />
            WaterWind Solutions
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
            Our WaterWind Solutions
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            WaterWind devices generate clean water from air using renewable energy, helping farms and agricultural teams improve resilience, reduce waste, and make sharper irrigation decisions.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default ProductsHero
