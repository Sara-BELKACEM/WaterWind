import Hero from '../../components/layout/Hero'
import Technology from '../../components/layout/Technology'
import Features from '../../components/layout/Features'
import Statistics from '../../components/layout/Statistics'
import CTA from '../../components/layout/CTA'

function HomePage() {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Hero />
      <Technology />
      <Features />
      <Statistics />
      <CTA />
    </div>
  )
}

export default HomePage
