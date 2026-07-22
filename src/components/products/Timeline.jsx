import { motion } from 'framer-motion'
import { ArrowDown, Cloud, Droplets, Leaf, Sun } from 'lucide-react'
import { Container } from '../ui'

const steps = [
  { title: 'Air Humidity', icon: Cloud },
  { title: 'Renewable Energy', icon: Sun },
  { title: 'Water Generation', icon: Droplets },
  { title: 'Smart Recommendation', icon: Leaf },
  { title: 'Agricultural Usage', icon: Droplets },
]

function Timeline() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-3 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                  <Icon size={19} />
                </div>
                <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                {index < steps.length - 1 ? (
                  <div className="flex justify-center text-slate-300">
                    <ArrowDown size={16} />
                  </div>
                ) : null}
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Timeline
