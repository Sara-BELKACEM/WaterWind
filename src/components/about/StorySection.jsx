import { motion } from 'framer-motion'
import { ArrowRight, Droplets, Leaf, Wind } from 'lucide-react'
import { Button, Card, Container } from '../ui'

function StorySection() {
  return (
    <section className="py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}>
          <Card className="rounded-[32px] bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-slate-950 p-6 text-white">
                <Droplets size={28} className="text-emerald-300" />
                <p className="mt-4 text-3xl font-semibold">20L</p>
                <p className="text-sm text-slate-300">compact water generation</p>
              </div>
              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <Wind size={28} className="text-sky-500" />
                <p className="mt-4 text-3xl font-semibold">Renewable</p>
                <p className="text-sm text-slate-500">solar and wind powered</p>
              </div>
              <div className="rounded-[24px] bg-white p-6 shadow-sm sm:col-span-2">
                <Leaf size={28} className="text-emerald-500" />
                <p className="mt-4 text-xl font-semibold">Smart irrigation guidance</p>
                <p className="text-sm text-slate-500">Supporting better crop decisions with clear, practical recommendations.</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">Who We Are</p>
          <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">Building a smarter water future for agriculture</h2>
          <p className="text-base leading-7 text-slate-600">
            WaterWind is an AgriTech initiative focused on producing clean water from atmospheric humidity using solar and wind energy while helping farmers make smarter irrigation decisions. Our mission is to combine renewable infrastructure with agricultural intelligence so fields can be managed more predictably, efficiently, and sustainably.
          </p>
          <Button variant="primary">
            Learn More
            <ArrowRight size={15} />
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}

export default StorySection
