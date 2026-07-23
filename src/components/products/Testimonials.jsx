import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card, Container, SectionTitle } from '../ui'

const testimonials = [
  {
    name: 'Noah Rahmani',
    country: 'Morocco',
    review: 'WaterWind gave our greenhouse a more stable irrigation routine and reduced manual water guesswork.',
  },
  {
    name: 'Amina Bensaid',
    country: 'Algeria',
    review: 'We installed the compact unit quickly and saw better water consistency during hot periods.',
  },
  {
    name: 'Luca Moreau',
    country: 'Tunisia',
    review: 'The recommendation layer helped our team plan field operations more confidently and with less waste.',
  },
]

function Testimonials() {
  return (
    <section className="py-20">
      <Container className="space-y-8">
        <SectionTitle eyebrow="Testimonials" title="Farmers trust WaterWind for smarter field planning" />

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="h-full rounded-[24px] bg-white/85 dark:bg-slate-900/85">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-sm font-bold text-white">
                    {item.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.country}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={`${item.name}-${starIndex}`} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">“{item.review}”</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
