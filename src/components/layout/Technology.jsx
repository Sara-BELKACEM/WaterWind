import { motion } from 'framer-motion'
import { ArrowDown, Droplets, Leaf, Sprout, Wrench } from 'lucide-react'
import { Card, Container, SectionTitle } from '../ui'

const steps = [
  { title: 'Choose Crop', description: 'Select the crop profile and target growth window.', icon: Sprout },
  { title: 'Choose Soil', description: 'Match your field type and soil characteristics.', icon: Leaf },
  { title: 'Enter Conditions', description: 'Add humidity, water stress, and climate signals.', icon: Wrench },
  { title: 'Receive Smart Recommendation', description: 'Get actionable guidance and predicted water demand.', icon: Droplets },
]

function Technology() {
  return (
    <section className="py-20">
      <Container className="space-y-8">
        <SectionTitle eyebrow="Workflow" title="A clean decision pipeline for better water planning" />

        <div className="grid gap-5 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full space-y-4 rounded-[24px] border-transparent bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
                  </div>
                  {index < steps.length - 1 ? (
                    <div className="flex items-center justify-center text-slate-300">
                      <ArrowDown size={18} />
                    </div>
                  ) : null}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Technology
