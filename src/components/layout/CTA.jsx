import { ArrowRight } from 'lucide-react'
import { Button, Container } from '../ui'

function CTA() {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-[32px] bg-gradient-to-r from-emerald-500 via-emerald-600 to-sky-500 p-[1px] shadow-[0_20px_60px_rgba(16,185,129,0.25)]">
          <div className="rounded-[31px] bg-slate-950 px-6 py-12 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold md:text-5xl">Ready to Optimize Your Agriculture?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
              Turn crop conditions, soil health, and climate signals into fast, practical water recommendations for every field.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" className="bg-white text-emerald-700 hover:bg-slate-100">
                Start Analysis
              </Button>
              <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                Learn More
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTA
