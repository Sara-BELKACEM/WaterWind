import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'
import { Container } from '../ui'

function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.25),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_36%)]" />
      <div className="absolute left-10 top-16 h-24 w-24 rounded-full bg-emerald-300/35 blur-2xl" />
      <div className="absolute right-12 top-20 h-24 w-24 rounded-full bg-sky-300/35 blur-2xl" />

      <Container className="relative py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur">
            <Droplets size={15} />
            Contact WaterWind
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Get In Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Have questions about WaterWind? We’d love to hear from you and help you find the best solution for your agricultural needs.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default ContactHero
