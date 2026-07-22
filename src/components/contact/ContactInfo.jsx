import { motion } from 'framer-motion'
import { Building2, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { Card } from '../ui'

const infoItems = [
  { icon: Building2, title: 'Office', value: 'AgriTech Innovation Center' },
  { icon: Mail, title: 'Email', value: 'contact@waterwind.com' },
  { icon: Phone, title: 'Phone', value: '+212 XXX XX XX XX' },
  { icon: Clock3, title: 'Business Hours', value: 'Monday – Friday\n9:00 AM – 6:00 PM' },
  { icon: MapPin, title: 'Location', value: 'Morocco' },
]

function ContactInfo() {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="relative"
      >
        <Card className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(236,253,245,0.95),rgba(224,242,254,0.86))] p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
          <div className="absolute -right-4 top-4 h-20 w-20 rounded-full bg-emerald-300/50 blur-2xl" />
          <div className="absolute -bottom-6 left-6 h-16 w-16 rounded-full bg-sky-300/45 blur-xl" />

          <div className="relative space-y-4">
            <h3 className="text-2xl font-semibold text-slate-950">Reach our team</h3>
            <p className="text-sm leading-6 text-slate-600">
              Whether you are exploring products, planning a pilot, or need support, our specialists are ready to help.
            </p>

            <div className="space-y-3">
              {infoItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-3 rounded-[20px] bg-white/70 p-4 backdrop-blur">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="whitespace-pre-line text-sm text-slate-600">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default ContactInfo
