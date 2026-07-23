import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Container } from '../ui'

const faqs = [
  {
    question: 'How does WaterWind work?',
    answer: 'WaterWind captures moisture from the air using renewable energy sources and translates field conditions into recommendation-ready water plans for agriculture.',
  },
  {
    question: 'Does it require electricity?',
    answer: 'The system is designed to operate with renewables and low-energy support, helping reduce dependency on traditional utility-heavy irrigation setups.',
  },
  {
    question: 'Which model should I choose?',
    answer: 'Choose WaterWind Micro for compact and small-scale operations, and WaterWind Pro for broader agricultural or cooperative deployment.',
  },
  {
    question: 'Can it operate in dry climates?',
    answer: 'Yes. The system is engineered for environments with variable humidity and is most effective when paired with localized monitoring and crop planning.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-20">
      <Container className="mx-auto max-w-4xl space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.question} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <button
              type="button"
              onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="font-semibold text-slate-900 dark:text-white">{faq.question}</span>
              <ChevronDown className={`transition ${openIndex === index ? 'rotate-180' : ''}`} size={18} />
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </Container>
    </section>
  )
}

export default FAQ
