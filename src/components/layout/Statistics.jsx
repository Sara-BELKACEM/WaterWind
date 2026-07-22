import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../ui'

const stats = [
  { value: 120, suffix: '+', label: 'Analyses' },
  { value: 25, suffix: '+', label: 'Crop Types' },
  { value: 15, suffix: '+', label: 'Soil Types' },
  { value: 98, suffix: '%', label: 'Recommendation Accuracy' },
]

function CountCard({ value, suffix, label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((prev) => {
        if (prev >= value) {
          window.clearInterval(timer)
          return value
        }
        return prev + Math.max(1, Math.ceil(value / 20))
      })
    }, 40)

    return () => window.clearInterval(timer)
  }, [value])

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 18 }}
      viewport={{ once: true, amount: 0.4 }}
      className="rounded-[24px] bg-white p-6 text-center shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
    >
      <div className="text-4xl font-bold text-slate-950">{count}{suffix}</div>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </motion.div>
  )
}

function Statistics() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <CountCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Statistics
