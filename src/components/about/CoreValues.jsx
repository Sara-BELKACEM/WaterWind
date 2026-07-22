import { motion } from 'framer-motion'
import { Cpu, HandCoins, Leaf, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import { Card, Container, SectionTitle } from '../ui'

const values = [
  { title: 'Innovation', description: 'We design practical systems for modern agriculture.', icon: Sparkles },
  { title: 'Sustainability', description: 'Every solution is shaped around resource efficiency.', icon: Leaf },
  { title: 'Reliability', description: 'Our products are built to support real farm needs.', icon: ShieldCheck },
  { title: 'Efficiency', description: 'Faster decisions and cleaner water planning.', icon: Wrench },
  { title: 'Environmental Responsibility', description: 'We prioritize low-impact, renewable operations.', icon: Cpu },
  { title: 'Technology for Agriculture', description: 'Smart systems that serve crop performance and resilience.', icon: HandCoins },
]

function CoreValues() {
  return (
    <section className="py-20">
      <Container className="space-y-8">
        <SectionTitle eyebrow="Core Values" title="The principles behind WaterWind" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <Card className="h-full rounded-[24px] border border-transparent bg-gradient-to-br from-white to-emerald-50/60 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{value.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default CoreValues
