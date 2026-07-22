import { ArrowRight } from 'lucide-react'
import { Button, Card, Container } from '../ui'

function AboutCTA() {
  return (
    <section className="pb-20 pt-8">
      <Container>
        <Card className="rounded-[32px] bg-gradient-to-r from-emerald-600 to-sky-600 p-[1px] shadow-[0_18px_70px_rgba(15,23,42,0.12)]">
          <div className="rounded-[31px] bg-slate-950 px-8 py-10 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold">Join the future of resource-smart farming</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              WaterWind brings together renewable water generation and intelligent guidance for stronger agricultural resilience.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="primary">
                Get Started
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default AboutCTA
