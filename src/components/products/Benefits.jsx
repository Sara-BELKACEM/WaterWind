import { motion } from 'framer-motion'
import { CircleDollarSign, Leaf, ShieldCheck, Sprout, Sun, Waves } from 'lucide-react'
import { Card, Container, SectionTitle } from '../ui'

const benefits = [
  { title: 'Renewable Energy', description: 'Use solar and wind-assisted production to lower energy dependence.', icon: Sun },
  { title: 'Sustainable Farming', description: 'Support resilient irrigation and longer-term soil health.', icon: Leaf },
  { title: 'Clean Water', description: 'Create a reliable water source close to crop demand points.', icon: Waves },
  { title: 'Easy Installation', description: 'Install modular units quickly without major infrastructure change.', icon: ShieldCheck },
  { title: 'Low Operating Cost', description: 'Reduce recurring water and energy overhead for field operations.', icon: CircleDollarSign },
  { title: 'Environment Friendly', description: 'Improve farm sustainability while protecting local resources.', icon: Sprout },
]

function Benefits() {
  return (
    <section className="py-20">
      <Container className="space-y-8">
        <SectionTitle eyebrow="Benefits" title="Designed to make agricultural water systems more resilient" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full rounded-[24px] bg-white/80">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Benefits
