import { motion } from 'framer-motion'
import { Compass, Eye } from 'lucide-react'
import { Card, Container } from '../ui'

const items = [
  {
    title: 'Mission',
    description: 'Empower sustainable agriculture through renewable water generation and intelligent recommendations.',
    icon: Compass,
  },
  {
    title: 'Vision',
    description: 'Become a global leader in smart agricultural water solutions.',
    icon: Eye,
  },
]

function MissionVision() {
  return (
    <section className="py-20">
      <Container className="grid gap-5 lg:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full rounded-[28px] bg-gradient-to-br from-white to-slate-50 p-7 shadow-[0_15px_50px_rgba(15,23,42,0.07)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
              </Card>
            </motion.div>
          )
        })}
      </Container>
    </section>
  )
}

export default MissionVision
