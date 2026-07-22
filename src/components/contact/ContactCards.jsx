import { motion } from 'framer-motion'
import { ArrowRight, Headphones, Handshake, Info, MessageCircle } from 'lucide-react'
import { Card, Container, SectionTitle } from '../ui'

const cards = [
  {
    title: 'Technical Support',
    description: 'Get fast help with set-up, troubleshooting, and irrigation guidance.',
    icon: Headphones,
  },
  {
    title: 'Product Information',
    description: 'Learn how WaterWind adapts to your farm, crop, and climate profile.',
    icon: Info,
  },
  {
    title: 'Partnership Opportunities',
    description: 'Connect with our team to explore distributed AgriTech collaborations.',
    icon: Handshake,
  },
  {
    title: 'General Questions',
    description: 'Ask about pricing, deployment, sustainability, or product potential.',
    icon: MessageCircle,
  },
]

function ContactCards() {
  return (
    <section className="py-20">
      <Container className="space-y-8">
        <SectionTitle eyebrow="Why Contact Us" title="Our team is here to help you move forward" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <Card className="relative h-full overflow-hidden rounded-[24px] border border-transparent bg-[linear-gradient(white,white)] p-6 shadow-[0_12px_40px_rgba(15,23,42,0.07)] before:absolute before:inset-0 before:rounded-[24px] before:bg-[linear-gradient(135deg,rgba(16,185,129,0.25),rgba(14,165,233,0.18))] before:p-[1px] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:xor] before:[mask-composite:exclude]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600">
                    Learn more
                    <ArrowRight size={14} />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ContactCards
