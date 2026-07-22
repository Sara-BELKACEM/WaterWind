import { motion } from 'framer-motion'
import {
  BarChart3,
  Droplets,
  Leaf,
  ScanSearch,
  Sprout,
  Zap,
} from 'lucide-react'
import { Card, Container, SectionTitle } from '../ui'

const features = [
  {
    title: 'Renewable Energy',
    description: 'Pair solar and wind resources with intelligent water harvesting to reduce operational overhead.',
    icon: Zap,
  },
  {
    title: 'Smart Recommendations',
    description: 'Receive field-specific guidance driven by crop needs, soil conditions, and climate inputs.',
    icon: ScanSearch,
  },
  {
    title: 'Water Optimization',
    description: 'Improve irrigation timing and water distribution with low-friction decision support.',
    icon: Droplets,
  },
  {
    title: 'Crop Analysis',
    description: 'Evaluate crop stage, water stress, and expected responsiveness before every recommendation.',
    icon: Sprout,
  },
  {
    title: 'Soil Compatibility',
    description: 'Blend soil profile data with crop suitability for more resilient planning outcomes.',
    icon: Leaf,
  },
  {
    title: 'Fast Decision Support',
    description: 'Move from input to insight in one streamlined workflow built for field teams and growers.',
    icon: BarChart3,
  },
]

function Features() {
  return (
    <section className="py-20">
      <Container className="space-y-8">
        <SectionTitle eyebrow="Capabilities" title="Everything needed to make water strategy actionable" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <Card className="group h-full rounded-[24px] border border-transparent bg-gradient-to-br from-emerald-50/80 via-white to-sky-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-lg shadow-emerald-500/10 transition duration-300 group-hover:scale-105">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Features
