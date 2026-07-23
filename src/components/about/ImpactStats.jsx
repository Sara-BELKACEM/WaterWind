import { motion } from 'framer-motion'
import { Droplets, ShieldCheck, Sprout, Users } from 'lucide-react'
import { Card, Container } from '../ui'

const stats = [
  { label: 'Water generation capacity', value: '20L', icon: Droplets },
  { label: 'Crop support coverage', value: '50+', icon: Sprout },
  { label: 'Field resilience focus', value: '24/7', icon: ShieldCheck },
  { label: 'Farm communities enabled', value: '1K+', icon: Users },
]

function ImpactStats() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
              >
                <Card className="rounded-[24px] bg-white p-6 text-center shadow-[0_10px_36px_rgba(15,23,42,0.06)] dark:bg-slate-900/90">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <Icon size={18} />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ImpactStats
