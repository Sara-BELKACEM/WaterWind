import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Card, Container, SectionTitle } from '../ui'

const faqs = [
  {
    question: 'How quickly do you reply?',
    answer: 'Most inquiries receive a response within one business day, and technical questions are typically handled even faster depending on urgency.',
  },
  {
    question: 'Can I request a product demo?',
    answer: 'Yes. You can use the form to request a demo and our team will follow up with the best next step for your operation.',
  },
  {
    question: 'Do you provide installation support?',
    answer: 'WaterWind can guide implementation planning and provide support recommendations for deployment, onboarding, and field optimization.',
  },
]

function FAQPreview() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-20">
      <Container className="space-y-8">
        <SectionTitle eyebrow="FAQ Preview" title="Helpful answers before you reach out" />
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <Card key={faq.question} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white/85 p-0 shadow-[0_10px_36px_rgba(15,23,42,0.06)]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-slate-900">{faq.question}</span>
                  <ChevronDown className={`transition ${isOpen ? 'rotate-180' : ''}`} size={18} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-6 text-slate-600">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default FAQPreview
