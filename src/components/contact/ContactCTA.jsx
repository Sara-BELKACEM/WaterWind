import { ArrowRight, Droplets } from 'lucide-react'
import { Button, Card, Container } from '../ui'

function ContactCTA() {
  return (
    <section className="pb-20 pt-6">
      <Container>
        <Card className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(14,165,233,0.85))] p-[1px] shadow-[0_18px_70px_rgba(15,23,42,0.12)]">
          <div className="relative rounded-[31px] bg-slate-950/85 px-8 py-10 text-center text-white backdrop-blur">
            <div className="absolute left-6 top-6 rounded-full bg-white/10 p-3 text-emerald-200"><Droplets size={16} /></div>
            <div className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-sky-200"><Droplets size={16} /></div>
            <h2 className="text-3xl font-bold md:text-4xl">Let’s Build a More Sustainable Future Together</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Discover how WaterWind can support cleaner water access, stronger crop performance, and smarter resource planning.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="primary">
                Explore Products
                <ArrowRight size={15} />
              </Button>
              <Button variant="outline" className="bg-white/10 text-white hover:bg-white/15">
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default ContactCTA
