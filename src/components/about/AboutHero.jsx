import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'
import { Container } from '../ui'

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%)] pt-28">
      <div className="absolute left-10 top-16 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />

      <Container className="py-16 text-center md:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
            <Droplets size={16} />
            About WaterWind
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">About WaterWind</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Innovating sustainable water production through renewable energy and intelligent agricultural recommendations.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default AboutHero
