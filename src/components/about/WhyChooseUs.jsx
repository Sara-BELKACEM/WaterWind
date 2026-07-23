import { motion } from 'framer-motion'
import { CheckCircle2, Leaf, Sparkles, Sun } from 'lucide-react'
import { Card, Container } from '../ui'

const checklist = [
  'Renewable Energy',
  'Clean Water Production',
  'AI-assisted Recommendations',
  'Environmentally Friendly',
  'Easy Deployment',
  'Cost Effective',
]

function WhyChooseUs() {
  return (
    <section className="py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}>
          <Card className="rounded-[32px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-slate-950 p-6 text-white dark:bg-slate-800">
                <Sun size={28} className="text-amber-300" />
                <p className="mt-4 text-2xl font-semibold">Renewable</p>
              </div>
              <div className="rounded-[24px] bg-white p-6 shadow-sm dark:bg-slate-800/80 dark:text-slate-100">
                <Leaf size={28} className="text-emerald-500" />
                <p className="mt-4 text-2xl font-semibold dark:text-white">Sustainable</p>
              </div>
              <div className="rounded-[24px] bg-white p-6 shadow-sm sm:col-span-2 dark:bg-slate-800/80 dark:text-slate-100">
                <Sparkles size={28} className="text-sky-500" />
                <p className="mt-4 text-2xl font-semibold dark:text-white">Field-ready water intelligence</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Why Choose WaterWind</p>
          <h2 className="text-3xl font-bold text-slate-950">A platform designed for practical field outcomes</h2>
          <div className="space-y-3">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[20px] bg-white p-4 shadow-sm dark:bg-slate-800/80 dark:text-slate-200">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-slate-700 dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default WhyChooseUs
