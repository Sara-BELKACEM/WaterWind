import { ArrowRight } from 'lucide-react'
import { Button, Container } from '../ui'

function ProductsCTA() {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-[32px] bg-gradient-to-r from-emerald-500 via-emerald-600 to-sky-500 p-[1px]">
          <div className="rounded-[31px] bg-slate-950 px-6 py-12 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold md:text-5xl">Find the Right WaterWind Solution for Your Farm</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
              Match your crop, soil, and operational scale with the model that fits your farm’s water strategy today.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" className="bg-white text-emerald-700 hover:bg-slate-100 dark:bg-slate-100 dark:text-emerald-700 dark:hover:bg-white">Contact Us</Button>
              <Button variant="outline" className="border-white/60 bg-transparent text-white hover:bg-white/10 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800/60">
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

export default ProductsCTA
